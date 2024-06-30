export const getMapPreview = (lat, long) =>
  `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${long}&key=${process.env.EXPO_PUBLIC_MAPS_API_KEY}`;

export const getAddress = async (lat, long) => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.EXPO_PUBLIC_MAPS_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch address.");
  }

  const data = await res.json();
  return data.results[0].formatted_address;
};
