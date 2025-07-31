export const openGoogleMaps = (coordinates: string, name: string) => {
  const [lat, lng] = coordinates.split(', ').map(coord => coord.trim());
  
  // Check if running in a mobile environment
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // For mobile devices, try to open in Google Maps app first
    const mapsAppUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&t=m`;
    window.open(mapsAppUrl, '_blank');
  } else {
    // For desktop/automotive systems, open in web browser
    const webMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`;
    window.open(webMapsUrl, '_blank');
  }
};

export const openWaze = (coordinates: string) => {
  const [lat, lng] = coordinates.split(', ').map(coord => coord.trim());
  const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
  window.open(wazeUrl, '_blank');
};

export const getDirectionsUrl = (coordinates: string, name: string) => {
  const [lat, lng] = coordinates.split(', ').map(coord => coord.trim());
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(name)}`;
};