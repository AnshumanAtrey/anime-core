
// firebase-adminDb.ts
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let app: App | null = null;
let adminDb: Firestore | null = null;
let isInitialized = false;
let initializationError: Error | null = null;

async function initializeFirebase() {
  if (isInitialized) return { app: app!, adminDb: adminDb! };
  if (initializationError) throw initializationError;

  try {
    console.log('🔧 Initializing Firebase Admin...');
    
    // Construct service account from environment variables
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
      throw new Error('Firebase environment variables (PROJECT_ID, CLIENT_EMAIL, PRIVATE_KEY) are not set.');
    }

    console.log('✅ Loaded Firebase credentials for project:', serviceAccount.projectId);

    const firebaseAdminConfig = {
      credential: cert(serviceAccount),
      databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`
    };

    // Initialize Firebase Admin (avoid multiple initializations)
    app = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];
    adminDb = getFirestore(app);
    
    // Test the connection with a simple operation
    await adminDb.collection('users').limit(1).get();
    
    console.log('✅ Firebase Admin initialized and connected successfully');
    isInitialized = true;
    return { app, adminDb };
    
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error('❌ Failed to initialize Firebase Admin:', err);
    console.error('Error details:', {
      message: err.message,
      name: err.name,
      stack: err.stack
    });
    
    initializationError = err;
    throw err;
  }
}

// Initialize immediately and export the promise
const initPromise = initializeFirebase();

// Safe getter that ensures initialization
const getAdminDb = async (): Promise<Firestore> => {
  if (!isInitialized) {
    try {
      await initPromise;
    } catch (error) {
      throw new Error(`Firebase Admin initialization failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  return adminDb!;
};

// For use in contexts where you can't use async/await
const getAdminDbSync = (): Firestore => {
  if (!isInitialized) {
    throw new Error('Firebase Admin not initialized. Make sure to await initPromise before using getAdminDbSync()');
  }
  return adminDb!;
};

export { getAdminDb, getAdminDbSync, initPromise };

export default async () => {
  if (!isInitialized) {
    await initPromise;
  }
  if (!app) {
    throw new Error('Firebase App not initialized');
  }
  return app;
};