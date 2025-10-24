import { useEffect, useState } from "react";

import type { Coordinates } from "@/api/types";

interface GeolocationState {
  loading: boolean;
  error: string | null;
  coordinates: Coordinates | null;
}

export function useGeoLocation() {
  const [locationData, setLocationData] = useState<GeolocationState>({
    loading: false,
    error: null,
    coordinates: null,
  });

  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setLocationData((prev) => ({
        ...prev,
        loading: false,
        error: "Geolocation is not supported by your browser",
      }));

      return;
    }

    navigator.geolocation.getCurrentPosition(
        // success callback
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          loading: false,
          error: null,
        });
      },

        // error callback
      (error) => {
        if (error.code === error.POSITION_UNAVAILABLE && 
            (error.message.includes('kCLErrorLocationUnknown') || 
             error.message.includes('CoreLocationProvider') ||
             error.message.includes('Location unknown'))) {
          // Don't resolve the promise, keep waiting for a real result
          console.log('Ignoring kCLErrorLocationUnknown, waiting for real result...');
          return;
        }

        let errorMessage = error.message;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable. Try refreshing or check your connection.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again.";
            break;
          default:
            errorMessage = "Unable to retrieve location. You can search for cities manually.";
            break;
        }

        setLocationData((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
      },

      // options
      {
        enableHighAccuracy: true,
        timeout: 15000, // Increased timeout to 15 seconds
        maximumAge: 300000, // Accept cached location up to 5 minutes old
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
}
