import { useState, useEffect, useCallback } from 'react';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationData {
  coords: Coordinates;
  accuracy: number;
  timestamp: number;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<PermissionState | null>(null);

  // Check geolocation support
  const isSupported = 'geolocation' in navigator;

  // Check permission status
  useEffect(() => {
    if (isSupported && 'permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' })
        .then(permission => {
          setPermissionStatus(permission.state);
          
          permission.addEventListener('change', () => {
            setPermissionStatus(permission.state);
          });
        })
        .catch(err => {
          console.warn('Permission API not supported:', err);
        });
    }
  }, [isSupported]);

  const getCurrentPosition = useCallback((options?: PositionOptions) => {
    if (!isSupported) {
      setError('Geolocalização não é suportada pelo seu dispositivo');
      return;
    }

    setLoading(true);
    setError(null);

    const defaultOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 300000, // 5 minutes
      ...options
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData: LocationData = {
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        };
        
        setLocation(locationData);
        setLoading(false);
      },
      (err) => {
        let errorMessage = 'Erro ao obter localização';
        
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Permissão de localização negada. Ative nas configurações.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Localização indisponível no momento.';
            break;
          case err.TIMEOUT:
            errorMessage = 'Tempo limite esgotado para obter localização.';
            break;
        }
        
        setError(errorMessage);
        setLoading(false);
      },
      defaultOptions
    );
  }, [isSupported]);

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = useCallback((coord1: Coordinates, coord2: Coordinates): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (coord2.latitude - coord1.latitude) * Math.PI / 180;
    const dLon = (coord2.longitude - coord1.longitude) * Math.PI / 180;
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coord1.latitude * Math.PI / 180) * Math.cos(coord2.latitude * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.round(distance * 100) / 100; // Round to 2 decimal places
  }, []);

  // Format distance for display
  const formatDistance = useCallback((distance: number): string => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance}km`;
  }, []);

  // Open navigation app
  const openNavigation = useCallback((destination: Coordinates, label?: string) => {
    if (!location) {
      setError('Localização atual não disponível');
      return;
    }

    const { latitude, longitude } = destination;
    const labelParam = label ? `&q=${encodeURIComponent(label)}` : '';
    
    // Try Google Maps first (works on most devices)
    const googleMapsUrl = `https://www.google.com/maps/dir/${location.coords.latitude},${location.coords.longitude}/${latitude},${longitude}${labelParam}`;
    
    // Fallback to basic geo URL
    const geoUrl = `geo:${latitude},${longitude}${labelParam}`;
    
    // Try to open in native app, fallback to web
    const userAgent = navigator.userAgent;
    
    if (userAgent.includes('Android')) {
      // Android - try Waze, then Google Maps, then fallback
      const wazeUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
      window.open(wazeUrl, '_blank');
    } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
      // iOS - try Apple Maps first
      const appleMapsUrl = `https://maps.apple.com/?daddr=${latitude},${longitude}${label ? `&q=${encodeURIComponent(label)}` : ''}`;
      window.open(appleMapsUrl, '_blank');
    } else {
      // Desktop or other - open Google Maps
      window.open(googleMapsUrl, '_blank');
    }
  }, [location]);

  // Get coordinates from string (e.g., "-21.1167, -56.4833")
  const parseCoordinates = useCallback((coordString: string): Coordinates | null => {
    try {
      const [latStr, lonStr] = coordString.split(',').map(s => s.trim());
      const latitude = parseFloat(latStr);
      const longitude = parseFloat(lonStr);
      
      if (isNaN(latitude) || isNaN(longitude)) {
        return null;
      }
      
      return { latitude, longitude };
    } catch {
      return null;
    }
  }, []);

  return {
    location,
    error,
    loading,
    permissionStatus,
    isSupported,
    getCurrentPosition,
    calculateDistance,
    formatDistance,
    openNavigation,
    parseCoordinates,
  };
};