import { NextResponse } from 'next/server';
import { getAdminDb } from '@/app/firestore/firebase-admin';
import { currentUser } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get the current user from Clerk
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get Firestore instance
    const db = await getAdminDb();
    
    // Get user document from Firestore
    const userDoc = await db.collection('users').doc(user.id).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    
    // Return the photo field if it exists
    if (userData?.photo) {
      return NextResponse.json({
        photo: userData.photo,
        updatedAt: userData.updatedAt || null
      });
    }

    return NextResponse.json(
      { error: 'No photo found' },
      { status: 404 }
    );
    
  } catch (error) {
    console.error('Error fetching user photo:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch user photo',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
