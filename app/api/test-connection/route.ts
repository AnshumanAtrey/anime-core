import { NextResponse } from 'next/server';
import { testFirebaseConnection } from '@/app/firestore/userService';
import { initPromise } from '@/app/firestore/firebase-admin';

export async function GET() {
  try {
    console.log('🔍 Testing Firestore connection...');
    
    // Ensure Firebase is initialized
    try {
      await initPromise;
      console.log('✅ Firebase initialized successfully');
    } catch (initError) {
      console.error('❌ Firebase initialization failed:', initError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Firebase initialization failed',
          error: initError instanceof Error ? initError.message : String(initError)
        },
        { status: 500 }
      );
    }

    // Test the connection
    const isConnected = await testFirebaseConnection();
    
    if (isConnected) {
      console.log('✅ Successfully connected to Firestore');
      return NextResponse.json({ 
        success: true, 
        message: 'Successfully connected to Firestore' 
      });
    } else {
      console.error('❌ Failed to connect to Firestore');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to connect to Firestore' 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('❌ Error testing Firestore connection:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error testing Firestore connection',
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
