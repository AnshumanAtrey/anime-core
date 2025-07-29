import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export function useUserPhoto() {
  const { user } = useUser();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserPhoto = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/get-user-photo', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store'
        });

        if (response.ok) {
          const data = await response.json();
          if (data.photo) {
            setPhotoUrl(data.photo);
          } else if (user.imageUrl) {
            setPhotoUrl(user.imageUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching user photo:', error);
        if (user.imageUrl) {
          setPhotoUrl(user.imageUrl);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPhoto();
  }, [user]);

  return { photoUrl, isLoading };
}
