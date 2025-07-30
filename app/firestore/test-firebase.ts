// test-firebase.ts
import { testFirebaseConnection } from './userService';

async function main() {
  try {
    console.log('Testing Firebase connection...');
    const isConnected = await testFirebaseConnection();
    
    if (isConnected) {
      console.log('✅ Firebase connection test passed!');
    } else {
      console.warn('⚠️  Could not verify Firebase connection');
    }
  } catch (error) {
    console.error('❌ Error during Firebase test:', error);
    process.exit(1);
  } finally {
    // No need to close the connection as it's managed by the firebase-admin module
    process.exit(0);
  }
}

// Run the test
main();