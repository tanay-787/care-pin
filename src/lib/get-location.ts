// utils/getLocation.ts
export const getUserLocation = (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported by your browser."));
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              reject(new Error("Permission denied. Please allow location access."));
              break;
            case err.POSITION_UNAVAILABLE:
              reject(new Error("Location unavailable."));
              break;
            case err.TIMEOUT:
              reject(new Error("Location request timed out."));
              break;
            default:
              reject(new Error("An unknown error occurred while retrieving location."));
          }
        },
        { timeout: 10000 } // 10s timeout
      );
    });
  };
  