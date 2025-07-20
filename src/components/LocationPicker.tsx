
'use client';

import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Skeleton } from './ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: 'var(--radius)',
  position: 'relative' as const,
};

const defaultCenter = {
  lat: 37.788,
  lng: -122.407
};

const libraries: ("drawing" | "places")[] = ["drawing", "places"];

interface LocationPickerProps {
  onLocationSelect: (location: { address: string, city: string, zip: string, lat: number, lng: number }) => void;
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const { toast } = useToast();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(userPos);
          setMarkerPosition(userPos);
          if (map) {
             map.panTo(userPos);
          }
        },
        () => {
          // Fallback to default if permission is denied
          setMapCenter(defaultCenter);
        }
      );
    }
  }, [map]);

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
    <div style={containerStyle}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%'}}
        center={mapCenter}
        zoom={18}
        onClick={handleMapClick}
        mapTypeId='satellite'
        onLoad={setMap}
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: true,
          myLocationControl: true,
          myLocationControlOptions: {
              position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
          },
          restriction: {
            latLngBounds: {
              north: mapCenter.lat + 0.01,
              south: mapCenter.lat - 0.01,
              east: mapCenter.lng + 0.01,
              west: mapCenter.lng - 0.01,
            },
            strictBounds: false,
          },
          minZoom: 16,
          maxZoom: 20,
        }}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </div>
  );
}
