import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.TOGETHER_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'TOGETHER_API_KEY is not set in environment variables' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch('https://api.together.xyz/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { 
          error: 'Failed to fetch models',
          status: response.status,
          details: error
        },
        { status: 500 }
      );
    }

    const models = await response.json();
    const availableModels = models.data.map((m: any) => ({
      id: m.id,
      name: m.name,
      type: m.type,
      description: m.description
    }));

    // Check if our target model is available
    const targetModel = 'black-forest-labs/FLUX.1-schnell-Free';
    const modelAvailable = availableModels.some((m: any) => m.id === targetModel);

    return NextResponse.json({
      success: true,
      apiKeyConfigured: true,
      targetModel,
      modelAvailable,
      availableModels: availableModels,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Error testing AI service',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
