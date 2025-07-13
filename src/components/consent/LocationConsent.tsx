import { addUserProfile } from '@/providers/userProfileProvider';
import type { PostUserProfileType } from '@/types/userProfileType';
import React from 'react';

interface LocationConsentProps {
  showCookieConsent: boolean;
  handleCookieConsent: (accepted: boolean) => void;
  cookieConsentGiven: boolean;
  userId: number;
}

const LocationConsent: React.FC<LocationConsentProps> = ({
  showCookieConsent,
  cookieConsentGiven,
  handleCookieConsent,
  userId
}) => {

  const handleAllow = () => {
    handleCookieConsent(true);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);

            const data: PostUserProfileType = await addUserProfile(
              userId,{
              userId: userId,
              isLocationShared: true,
              latitude,
              longitude,
            });

            console.log("Profile updated:", data);
          } catch (error) {
            console.error("Failed to save user profile:", error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation not supported');
    }
  };

  const handleDeny = () => {
    handleCookieConsent(false);
  };

  if (!showCookieConsent || cookieConsentGiven) return null;

  return (
  <div className="fixed inset-0 z-50">
  <div className="absolute inset-0 bg-tertiary opacity-40"></div>

  <div className="relative flex items-center justify-center h-full">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
      <h2 className="text-lg font-semibold mb-3">Izinkan Akses Lokasi</h2>
      <p className="mb-5 text-sm text-gray-600">
        Aplikasi ini memerlukan akses lokasi untuk menampilkan data yang relevan di sekitar Anda.
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={handleDeny}
          className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
        >
          Tolak
        </button>
        <button
          onClick={handleAllow}
          className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Izinkan
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default LocationConsent;
