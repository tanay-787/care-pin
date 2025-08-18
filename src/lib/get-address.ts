// utils/getAddress.ts
export const getAddressFromCoords = async (lat: number, lon: number) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
      
      const res = await fetch(url, {
        headers: {
          "User-Agent": "care-pin", // REQUIRED
          "Accept-Language": "en", 
        },
      });
  
      if (!res.ok) throw new Error("Failed to fetch location from Nominatim");
  
      const data = await res.json();
      return data.display_name || "Unknown location";
    } catch (err) {
      console.error(err);
      return "Unable to fetch address"; // fallback label
    }
  };
  