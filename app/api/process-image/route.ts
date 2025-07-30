import { NextResponse } from 'next/server';

type ChatMessage = { role: string; content: string };

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = body.messages as ChatMessage[];

    const response = await fetch('https://api.example.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({ messages }),
    });

    const result: unknown = await response.json();

    if (
      typeof result === 'object' &&
      result !== null &&
      'choices' in result &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Array.isArray((result as any).choices)
    ) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ error: 'Invalid response format' }, { status: 500 });
    }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}