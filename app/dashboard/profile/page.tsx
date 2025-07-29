'use client';

import { useUser, UserButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProfilePage() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black p-8">

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Content */}
      <div className="relaive z-20 w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="jacquard-12-regular text-5xl md:text-5xl text-white/90 [text-shadow:_0_0_15px_rgba(255,0,0,0.8)] hover:scale-105 transition-transform">
            ANIME CORE
          </Link>
          <div className="bg-black/50 p-2 rounded-full border border-white/10">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-2xl">
          <h1 className="text-4xl font-bold mb-8 text-white [text-shadow:_0_0_10px_rgba(255,0,0,0.5)]">
            Account
          </h1>
          
          <div className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8">
            {/* Profile Avatar */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
              {user?.firstName?.[0]}
            </div>
            
            {/* Profile Details */}
            <div className="flex-1 w-full">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-1">
                  {user?.fullName}
                </h2>
                <p className="text-gray-300">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
              
              {/* Membership Card */}
              <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 p-6 rounded-lg border border-white/5 mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Membership & Billing
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-gray-400">Email</span>
                    <span className="font-medium">{user?.primaryEmailAddress?.emailAddress}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-gray-400">Password</span>
                    <span className="text-gray-300">•••••••••</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Plan</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full text-sm font-medium">
                      Premium
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={handleSignOut}
                  className="mt-8 w-full md:w-auto px-6 py-2.5 border border-white/20 bg-gradient-to-r from-red-600/90 to-red-700/90 text-white font-medium rounded-md hover:from-red-500 hover:to-red-600 transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>Sign out of all devices</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
              
              {/* Settings Section */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Settings</h3>
                <div className="space-y-3">
                  <Link 
                    href="/dashboard" 
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors group"
                  >
                    <span>←</span>
                    <span>Back to Home</span>
                  </Link>
                  <button className="text-red-400 hover:text-red-300 transition-colors flex items-center space-x-2 group">
                    <span className="group-hover:scale-110 transition-transform">✕</span>
                    <span>Cancel Membership</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
