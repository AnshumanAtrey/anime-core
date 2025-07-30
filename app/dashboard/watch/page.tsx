import { Suspense } from 'react';
import WatchPageClient from './WatchPageClient';

// A loading component to show while the client component is loading
function Loading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );
}

export default function WatchPage() {
  return (
    <Suspense fallback={<Loading />}>
      <WatchPageClient />
    </Suspense>
  );
}
