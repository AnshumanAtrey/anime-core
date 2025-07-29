'use client';

import { useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-[#141414] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-red-600 font-bold text-2xl">
            ANIME CORE
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>

        <div className="bg-black bg-opacity-70 p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-8">Account</h1>
          
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center text-2xl font-bold">
              {user?.firstName?.[0]}
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">
                {user?.fullName}
              </h2>
              <p className="text-gray-400 mb-4">{user?.primaryEmailAddress?.emailAddress}</p>
              
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Membership & Billing</h3>
                <div className="bg-[#2A2A2A] p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Email:</span>
                    <span>{user?.primaryEmailAddress?.emailAddress}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Password:</span>
                    <span>•••••••••</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Plan:</span>
                    <span className="text-red-500">Premium</span>
                  </div>
                </div>
                
                <button className="mt-6 px-4 py-2 border border-gray-600 text-sm font-medium rounded hover:bg-white hover:bg-opacity-10 transition-colors">
                  Sign out of all devices
                </button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-800">
                <h3 className="text-lg font-medium mb-4">Settings</h3>
                <div className="space-y-4">
                  <Link href="/dashboard" className="block text-blue-400 hover:underline">
                    Back to Home
                  </Link>
                  <button className="text-red-500 hover:underline">
                    Cancel Membership
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
