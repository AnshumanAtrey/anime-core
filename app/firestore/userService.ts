// userService.ts
import { getAdminDb, getAdminDbSync, initPromise } from './firebase-admin';
import { DocumentData, FieldValue } from 'firebase-admin/firestore';

// Initialize Firebase when this module is loaded
initPromise.catch(error => {
  console.error('❌ Failed to initialize Firebase:', error);
});

// Define the UserData type based on your Firestore document structure
type UserData = {
  photo: string;
  // Add other user fields here as needed
};

// Define the FirestoreUser type
type FirestoreUser = {
  id: string;
  data: UserData;
};

// Get a single user by Clerk ID
export async function getUserById(clerkUserId: string): Promise<FirestoreUser | null> {
  try {
    const db = await getAdminDb();
    const userDoc = await db.collection('users').doc(clerkUserId).get();
    
    if (!userDoc.exists) {
      console.log('No user found with ID:', clerkUserId);
      return null;
    }

    const userData = userDoc.data() as UserData;
    return {
      id: clerkUserId,
      data: userData
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Get all users
export async function getAllUsers(): Promise<FirestoreUser[]> {
  try {
    const db = await getAdminDb();
    const usersSnapshot = await db.collection('users').get();
    
    const users: FirestoreUser[] = [];
    usersSnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        data: doc.data() as UserData
      });
    });

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

/**
 * Check if user exists, if not create a new user document with empty photo
 * @param clerkUserId The Clerk user ID
 * @returns Promise<boolean> - true if user was created, false if already exists
 */
export async function ensureUserExists(clerkUserId: string): Promise<boolean> {
  console.log(' [userService] ensureUserExists called for user ID:', clerkUserId);
  
  try {
    console.log(' [userService] Connecting to Firestore...');
    const db = await getAdminDb();
    const userRef = db.collection('users').doc(clerkUserId);
    
    console.log(' [userService] Checking if user exists...');
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      console.log(' [userService] User does not exist, creating new document...');
      const userData: UserData = {
        photo: '',
        // Add other required fields here
      };
      
      console.log(' [userService] Creating user with data:', JSON.stringify(userData, null, 2));
      
      await userRef.set({
        ...userData,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });
      console.log(' [userService] Successfully created user document');
      return true; // User was created
    }
    
    console.log(' [userService] User already exists in Firestore');
    return false; // User already existed
  } catch (error) {
    console.error(' [userService] Error ensuring user exists:', error);
    if (error instanceof Error) {
      console.error(' [userService] Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    throw error;
  }
}

// Test connection
export async function testFirebaseConnection(): Promise<boolean> {
  try {
    console.log(' [testFirebaseConnection] Getting Firestore instance...');
    const db = await getAdminDb();
    console.log(' [testFirebaseConnection] Querying users collection...');
    // Try to read from the users collection
    const testQuery = await db.collection('users').limit(1).get();
    console.log('✅ Firebase connection successful!');
    console.log('📊 Users collection exists:', !testQuery.empty);
    if (!testQuery.empty) {
      console.log('📄 First user document:', testQuery.docs[0].id);
    }
    return true;
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
    }
    return false;
  }
}