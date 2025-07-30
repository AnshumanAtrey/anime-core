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
    type Model = {
      id: string;
      name?: string;
      type: string;
      created: number;
    };

    const availableModels = models.data
      .map((model: Model) => ({
        id: model.id,
        name: model.name || model.id.split('/')[1],
        type: model.type,
        created: new Date(model.created * 1000).toLocaleString(),
      }))
      .filter((model: Model) => model.type === 'image');

    // Check if our target model is available
    const targetModel = 'black-forest-labs/FLUX.1-schnell-Free';
    const modelAvailable = availableModels.some((m: Model) => m.id === targetModel);

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
