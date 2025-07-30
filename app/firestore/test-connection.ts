/* eslint-disable @typescript-eslint/no-explicit-any */
// test-connection.ts
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, cert } from 'firebase-admin/app';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the service account file
const serviceAccountPath = join(__dirname, 'serviceAccountKey.json');
const serviceAccount = JSON.parse(await readFile(serviceAccountPath, 'utf-8'));

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert(serviceAccount as any)
});

const db = getFirestore(app);

async function testConnection() {
  try {
    console.log('Testing Firestore connection...');
    
    // Test a simple query
    const usersRef = db.collection('users');
    const snapshot = await usersRef.limit(1).get();
    
    if (snapshot.empty) {
      console.log('✅ Firestore connection successful!');
      console.log('ℹ️  No documents found in users collection.');
    } else {
      console.log('✅ Firestore connection successful!');
      console.log('📄 Found documents in users collection:', snapshot.size);
      snapshot.forEach(doc => {
        console.log('Document ID:', doc.id);
        console.log('Document data:', JSON.stringify(doc.data(), null, 2));
      });
    }
    
    return true;
  } catch (error) {
    console.error('❌ Firestore connection failed:', error);
    return false;
  } finally {
    // Clean up - no need to explicitly delete the app in most cases
    // Firebase Admin SDK manages connections efficiently
  }
}

// Run the test
testConnection()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
  });