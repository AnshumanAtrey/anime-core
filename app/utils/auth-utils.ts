'use client';

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

/**
 * Hook to handle user setup in Firestore when a user signs in or signs up
 * This will create a user document if it doesn't exist
 */
export function useUserSetup() {
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    console.log('🔍 [auth-utils] useUserSetup effect running');
    console.log(`🔍 [auth-utils] Auth state - isLoaded: ${isLoaded}, userId: ${userId || 'none'}`);
    
    if (isLoaded && userId) {
      console.log(`🔍 [auth-utils] User authenticated: ${userId}`);
      console.log('🔍 [auth-utils] Calling ensure-user API...');
      
      fetch('/api/ensure-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(async (response) => {
        const data = await response.json();
        console.log(`🔍 [auth-utils] API response status: ${response.status}`);
        
        if (!response.ok) {
          console.error('❌ [auth-utils] API error response:', {
            status: response.status,
            statusText: response.statusText,
            data
          });
          throw new Error(data.error || 'API request failed');
        }
        
        if (data.success) {
          console.log(`✅ [auth-utils] User ${data.userId} ensured in Firestore`);
          console.log(`   - Created new user: ${data.created ? 'Yes' : 'No'}`);
        } else {
          console.error('❌ [auth-utils] Failed to ensure user in Firestore:', data.error);
        }
        return data;
      })
      .catch(error => {
        console.error('❌ [auth-utils] Error in ensure-user flow:', {
          message: error.message,
          name: error.name,
          stack: error.stack
        });
      });
    } else if (isLoaded) {
      console.log('ℹ️ [auth-utils] No user is currently signed in');
    }
  }, [isLoaded, userId]);

  return { isLoaded, userId };
}
