
// firebase-adminDb.ts
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

let app: App | null = null;
let adminDb: Firestore | null = null;
let isInitialized = false;
let initializationError: Error | null = null;

// Get the directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initializeFirebase() {
  if (isInitialized) return { app: app!, adminDb: adminDb! };
  if (initializationError) throw initializationError;

  try {
    console.log('🔧 Initializing Firebase Admin...');
    
    // Read the service account file
    const serviceAccountPath = join(__dirname, 'serviceAccountKey.json');
    console.log('📁 Service account path:', serviceAccountPath);
    
    const serviceAccount = JSON.parse(await readFile(serviceAccountPath, 'utf-8'));
    console.log('✅ Successfully loaded service account for project:', serviceAccount.project_id);
    
    if (!serviceAccount.project_id || !serviceAccount.client_email || !serviceAccount.private_key) {
      throw new Error('Service account is missing required fields');
    }

    const firebaseAdminConfig = {
      credential: cert(serviceAccount),
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
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