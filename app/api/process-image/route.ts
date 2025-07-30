import { NextResponse } from 'next/server';
import { getAdminDb } from '@/app/firestore/firebase-admin';
import { currentUser } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic'; // Ensure this API route is dynamic

interface TogetherAIResponse {
  output: Array<{
    image: string;
  }>;
  error?: string;
  details?: string;
}

// Configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const TOGETHER_API_URL = 'https://api.together.xyz/v1';

// Validate the API key
function validateApiKey() {
  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) {
    throw new Error('TOGETHER_API_KEY is not set in environment variables');
  }
  return apiKey;
}

function log(step: string, data?: unknown) {
  console.log(`[Process-Image] ${step}`, data || '');
}

export async function POST(request: Request) {
  // Log the incoming request
  console.log('[Process-Image] Received request');
  
  // Validate the request method
  if (request.method !== 'POST') {
    console.error(`[Process-Image] Invalid method: ${request.method}`);
    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 405 }
    );
  }
  const requestId = Math.random().toString(36).substring(2, 8);
  log(`[${requestId}] Starting image processing request`);
  
  try {
    // Get user from Clerk
    log(`[${requestId}] Getting user from Clerk`);
    const user = await currentUser();
    if (!user) {
      const error = 'No authenticated user found';
      log(`[${requestId}] Error: ${error}`);
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const userId = user.id;
    log(`[${requestId}] Processing request for user: ${userId}`);
    log(`[${requestId}] Parsing form data`);
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const stylePrompt = formData.get('style')?.toString() || 'anime style, detailed, high quality';
    log(`[${requestId}] Received file:`, file ? `${file.name} (${file.size} bytes)` : 'none');
    log(`[${requestId}] Style prompt:`, stylePrompt);
    
    // Validate file
    log(`[${requestId}] Validating file`);
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a JPEG, PNG, or WebP image' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Convert file to base64
    log(`[${requestId}] Converting image to base64`);
    const arrayBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');
    const base64Data = `data:${file.type};base64,${base64Image}`;
    log(`[${requestId}] Image converted to base64, length: ${base64Data.length} characters`);

    // Get and validate API key
    let togetherApiKey;
    try {
      togetherApiKey = validateApiKey();
    } catch (error) {
      console.error('[Process-Image] API key validation failed:', error);
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Step 1: Analyze the image
    log(`[${requestId}] Starting image analysis`);
    const analysisPrompt = `Analyze this image and describe the person's appearance focusing on facial features, hair, and style. Keep it concise.`;
    
    // Step 1: Analyze the image with vision model
    log(`[${requestId}] Sending request to Together AI Vision API`);
    const visionEndpoint = `${TOGETHER_API_URL}/chat/completions`;
    
    const analysisResponse = await fetch(visionEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${togetherApiKey}`
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo',
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: analysisPrompt },
            { 
              type: 'image_url',
              image_url: { url: base64Data }
            }
          ]
        }],
        max_tokens: 200
      })
    });

    if (!analysisResponse.ok) {
      const errorText = await analysisResponse.text();
      console.error('Image analysis error:', errorText);
      return NextResponse.json(
        { error: 'Failed to analyze image' },
        { status: analysisResponse.status }
      );
    }

    const analysisData = await analysisResponse.json();
    const imageDescription = analysisData.choices[0]?.message?.content || '';

    // Step 2: Generate anime avatar
    log(`[${requestId}] Starting anime avatar generation`);
    log(`[${requestId}] Image description:`, imageDescription);
    
    // Enhanced prompt for better anime generation
    const generationPrompt = `Create a high-quality anime-style avatar with these characteristics: 
    ${imageDescription}
    Style: ${stylePrompt}
    - Anime art style, vibrant colors
    - Focus on facial features and expressions
    - Clean, detailed artwork
    - Studio-quality illustration
    - No text, watermarks, or signatures`;
    
    // Generate the image using the FLUX model
    const modelName = 'black-forest-labs/FLUX.1-schnell-Free';
    log(`[${requestId}] Using model: ${modelName}`);
    
    const imageGenerationEndpoint = `${TOGETHER_API_URL}/images/generations`;
    log(`[${requestId}] Sending request to: ${imageGenerationEndpoint}`);
    
    // FLUX.1-schnell-Free has specific requirements:
    // - steps must be between 1 and 4
    // - width and height must be multiples of 8
    const generationParams = {
      model: modelName,
      prompt: generationPrompt,
      image: base64Data,
      width: 1024,  // Must be multiple of 8
      height: 1024, // Must be multiple of 8
      steps: 4,     // Must be between 1-4 for this model
      strength: 0.6,
      response_format: 'b64_json',
      negative_prompt: 'blurry, low quality, distorted, bad anatomy, text, watermark, signature',
      guidance_scale: 7.5,
      seed: Math.floor(Math.random() * 1000000) // Add seed for reproducibility
    };
    
    log(`[${requestId}] Generation params:`, {
      ...generationParams,
      image: '[base64 data]' // Don't log the full base64 string
    });
    
    const generationResponse = await fetch(imageGenerationEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${togetherApiKey}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(generationParams)
    });

    if (!generationResponse.ok) {
      const errorText = await generationResponse.text();
      console.error(`[${requestId}] Generation error (${generationResponse.status}):`, errorText);
      
      let errorMessage = 'Failed to generate anime avatar';
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error?.message || errorMessage;
      } catch (e) {
        console.error(`[${requestId}] Error parsing error response:`, e);
      }
      
      return NextResponse.json(
        { 
          error: errorMessage,
          details: generationResponse.statusText,
          requestId
        },
        { status: generationResponse.status }
      );
    }

    const generationData = await generationResponse.json();
    
    if (!generationData?.data?.[0]?.b64_json) {
      console.error('Invalid generation response:', generationData);
      return NextResponse.json(
        { error: 'Invalid response from AI service' },
        { status: 500 }
      );
    }

    log(`[${requestId}] Received generation response`);
    const animeImageBase64 = generationData.data[0].b64_json;
    const animeImageUrl = `data:image/png;base64,${animeImageBase64}`;
    log(`[${requestId}] Generated image size: ${Math.round(animeImageUrl.length / 1024)} KB`);

    // Save to Firestore
    log(`[${requestId}] Saving to Firestore`);
    try {
      const db = await getAdminDb();
      const userRef = db.collection('users').doc(userId);
      
      const userData = {
        animeAvatar: animeImageUrl,
        photo: animeImageUrl, // Also store in the 'photo' field as requested
        originalImage: base64Data,
        stylePrompt: stylePrompt,
        generatedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      log(`[${requestId}] Updating user document with:`, {
        hasAnimeAvatar: !!animeImageUrl,
        hasOriginalImage: !!base64Data,
        stylePromptLength: stylePrompt.length
      });
      
      await userRef.set(userData, { merge: true });
      log(`[${requestId}] Successfully updated Firestore`);

      log(`[${requestId}] Sending success response`);
      return NextResponse.json({ 
        success: true, 
        imageUrl: animeImageUrl,
        description: imageDescription,
        requestId: requestId
      });
      
    } catch (firebaseError) {
      const errorMsg = firebaseError instanceof Error ? firebaseError.message : 'Unknown Firebase error';
      log(`[${requestId}] Firebase error:`, errorMsg);
      
      // Still return the generated image even if Firestore fails
      log(`[${requestId}] Returning image with warning about Firestore`);
      return NextResponse.json({
        success: true,
        imageUrl: animeImageUrl,
        warning: 'Image processed but could not save to database',
        description: imageDescription,
        error: errorMsg,
        requestId: requestId
      }, { status: 200 });
    }
    
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    log(`[${requestId}] Error in process-image API:`, errorMsg);
    if (error instanceof Error) {
      log(`[${requestId}] Error stack:`, error.stack);
    }
    
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: errorMsg,
        requestId: requestId
      },
      { status: 500 }
    );
  } finally {
    log(`[${requestId}] Request processing completed`);
  }
}