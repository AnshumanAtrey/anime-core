'use client';

import { useState, useRef, useEffect } from 'react';
import { useUser, UserButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProfilePage() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();
  // State management
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(user?.imageUrl || '');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Fetch user's photo when component mounts or user changes
  useEffect(() => {
    const fetchUserPhoto = async () => {
      if (!user) return;
      
      console.log('[Profile] Fetching user photo for user ID:', user.id);
      console.log('[Profile] Clerk image URL:', user.imageUrl);
      
      try {
        console.log('[Profile] Making request to /api/get-user-photo');
        const startTime = Date.now();
        const response = await fetch('/api/get-user-photo', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store'
        });
        
        const responseTime = Date.now() - startTime;
        console.log(`[Profile] API response received in ${responseTime}ms`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('[Profile] API response data:', {
            hasPhoto: !!data.photo,
            photoLength: data.photo ? data.photo.length : 0,
            updatedAt: data.updatedAt || 'N/A'
          });
          
          if (data.photo) {
            console.log('[Profile] Setting preview URL from database');
            setPreviewUrl(data.photo);
          } else {
            console.log('[Profile] No photo found in database');
            // Fallback to Clerk's image if available
            if (user.imageUrl) {
              console.log('[Profile] Falling back to Clerk image');
              setPreviewUrl(user.imageUrl);
            } else {
              console.log('[Profile] No fallback image available');
              setPreviewUrl('');
            }
          }
        } else {
          const error = await response.text();
          console.error('[Profile] Error response from API:', {
            status: response.status,
            statusText: response.statusText,
            error: error
          });
          // Fallback to Clerk's image if available
          if (user.imageUrl) {
            console.log('[Profile] Falling back to Clerk image after error');
            setPreviewUrl(user.imageUrl);
          }
        }
      } catch (error) {
        console.error('[Profile] Error in fetchUserPhoto:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : 'No stack trace'
        });
        // Fallback to Clerk's image if available
        if (user?.imageUrl) {
          console.log('[Profile] Falling back to Clerk image after exception');
          setPreviewUrl(user.imageUrl);
        }
      }
    };

    console.log('[Profile] Component mounted');
    if (user) {
      console.log('[Profile] User data:', {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        hasImage: !!user.imageUrl
      });
      fetchUserPhoto();
    }
  }, [user]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('[Profile] File selected:', {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: new Date(file.lastModified).toISOString()
    });

    // Reset states
    setError(null);
    setUploadProgress(0);
    setIsUploading(true);
    
    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('style', 'anime style, detailed, high quality');

    try {
      console.log('[Profile] Starting image upload and processing');
      const startTime = Date.now();
      
      const response = await fetch('/api/process-image', {
        method: 'POST',
        body: formData,
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      console.log(`[Profile] API response received in ${responseTime}ms`, {
        status: response.status,
        statusText: response.statusText
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to process image');
      }
      
      console.log('[Profile] Image processed successfully', {
        requestId: data.requestId,
        hasImageUrl: !!data.imageUrl,
        descriptionLength: data.description?.length || 0
      });
      
      // Save the request ID for debugging
      setRequestId(data.requestId);
      
      // Update the preview URL
      if (data.imageUrl) {
        console.log('[Profile] Updating preview with new image');
        setPreviewUrl(data.imageUrl);
      }
      
      // Show success message if there was a previous error
      if (error) {
        setError(null);
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('[Profile] Error processing image:', {
        error: errorMessage,
        requestId: (error as any)?.requestId || 'unknown'
      });
      
      setError(`Error: ${errorMessage}`);
      
      // Show error to user
      alert(`Failed to process image: ${errorMessage}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const triggerFileInput = () => {
    console.log('[Profile] Triggering file input');
    fileInputRef.current?.click();
  };
  
  // Log when preview URL changes
  useEffect(() => {
    if (previewUrl) {
      console.log('[Profile] Preview URL updated:', {
        url: previewUrl.substring(0, 50) + '...',
        length: previewUrl.length
      });
    }
  }, [previewUrl]);

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
          
        </div>

        {/* Profile Card */}
        <div className="bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-2xl">
          <h1 className="text-4xl font-bold mb-8 text-white [text-shadow:_0_0_10px_rgba(255,0,0,0.5)]">
            Account
          </h1>
          
          <div className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8">
            {/* Profile Avatar */}
            <div 
              className="relative w-32 h-32 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-4xl font-bold text-white shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={triggerFileInput}
            >
              {previewUrl ? (
                <>
                  {console.log('[Profile] Rendering Image component with src:', 
                    previewUrl.startsWith('data:') ? 
                    `${previewUrl.substring(0, 50)}...` : 
                    previewUrl
                  )}
                  {previewUrl.startsWith('data:') ? (
                    // For base64 images
                    <img
                      src={previewUrl}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                      onLoad={() => console.log('[Profile] Base64 image loaded successfully')}
                      onError={(e) => {
                        console.error('[Profile] Error loading base64 image:', e);
                        console.error('[Profile] Image source type:', typeof previewUrl);
                        console.error('[Profile] Image source length:', previewUrl.length);
                      }}
                    />
                  ) : (
                    // For external URLs (like Clerk)
                    <Image
                      src={previewUrl}
                      alt="Profile"
                      fill
                      className="rounded-full object-cover"
                      onLoadingComplete={() => console.log('[Profile] External image loaded successfully')}
                      onError={(e) => console.error('[Profile] Error loading external image:', e)}
                      unoptimized={previewUrl.includes('clerk.com')}
                    />
                  )}
                </>
              ) : (
                <span className="text-4xl">{user?.firstName?.[0] || '?'}</span>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                disabled={isUploading}
              />
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
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
