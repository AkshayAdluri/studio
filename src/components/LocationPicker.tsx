
'use client';

import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Skeleton } from './ui/skeleton';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: 'var(--radius)',
};

// A more specific, zoomed-in location (e.g., near Union Square, SF)
const defaultCenter = {
  lat: 37.788,
  lng: -122.407
};

interface LocationPickerProps {
  onLocationSelect: (location: { address: string, city: string, zip: string, lat: number, lng: number }) => void;
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newPos = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      setMarkerPosition(newPos);
      
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: newPos }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const addressComponents = results[0].address_components;
          const streetNumber = addressComponents.find(c => c.types.includes('street_number'))?.long_name || '';
          const route = addressComponents.find(c => c.types.includes('route'))?.long_name || '';
          const city = addressComponents.find(c => c.types.includes('locality'))?.long_name || '';
          const zip = addressComponents.find(c => c.types.includes('postal_code'))?.long_name || '';
          
          onLocationSelect({
            address: `${streetNumber} ${route}`.trim(),
            city,
            zip,
            lat: newPos.lat,
            lng: newPos.lng
          });
        }
      });
    }
  }, [onLocationSelect]);

  if (loadError) {
    return <div>Error loading maps. Please check your API key and configuration.</div>;
  }

  if (!isLoaded) {
    return <Skeleton className="w-full h-full" />;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={18} // Zoomed in to street level
      onClick={handleMapClick}
      mapTypeId='satellite' // Set to satellite view
      options={{
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
        // Restrict panning and zooming
        restriction: {
          latLngBounds: {
            north: defaultCenter.lat + 0.01,
            south: defaultCenter.lat - 0.01,
            east: defaultCenter.lng + 0.01,
            west: defaultCenter.lng - 0.01,
          },
          strictBounds: false,
        },
        minZoom: 16,
        maxZoom: 20,
      }}
    >
      <Marker position={markerPosition} />
    </GoogleMap>
  );
}
