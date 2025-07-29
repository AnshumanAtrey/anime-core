'use client';

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function TestFirestore() {
  const { isLoaded, userId } = useAuth();
  const [testResult, setTestResult] = useState<string>('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('/api/ensure-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const data = await response.json();
        setTestResult(JSON.stringify(data, null, 2));
      } catch (error) {
        setTestResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    if (isLoaded && userId) {
      testConnection();
    }
  }, [isLoaded, userId]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Firestore Test</h1>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Test Results:</h2>
        <pre className="bg-black p-4 rounded overflow-auto">
          {isLoaded ? (
            userId ? (
              testResult || 'Testing...'
            ) : (
              'Please sign in to test Firestore connection'
            )
          ) : (
            'Loading...'
          )}
        </pre>
      </div>
    </div>
  );
}
