import { NextRequest, NextResponse } from 'next/server';
import { ensureUserExists } from '@/app/firestore/userService';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  console.log('🔍 [API/ensure-user] Request received');
  
  try {
    console.log('🔍 [API/ensure-user] Getting auth...');
    const auth = getAuth(request);
    console.log('🔍 [API/ensure-user] Auth object:', JSON.stringify(auth, null, 2));
    
    const { userId } = auth;
    
    if (!userId) {
      console.log('❌ [API/ensure-user] No user ID found in auth');
      return NextResponse.json(
        { error: 'Unauthorized', details: 'No user ID found in session' },
        { status: 401 }
      );
    }

    console.log(`🔍 [API/ensure-user] Ensuring user exists: ${userId}`);
    const created = await ensureUserExists(userId);
    
    console.log(`✅ [API/ensure-user] Successfully processed user: ${userId}, created: ${created}`);
    return NextResponse.json({
      success: true,
      created,
      userId
    });
    
  } catch (error) {
    console.error('❌ [API/ensure-user] Error:', error);
    if (error instanceof Error) {
      console.error('❌ [API/ensure-user] Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
