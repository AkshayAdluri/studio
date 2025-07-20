
'use client';

import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Skeleton } from './ui/skeleton';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: 'var(--radius)',
};

const defaultCenter = {
  lat: 37.788,
  lng: -122.407
};

const libraries: ("drawing" | "places")[] = ["drawing", "places"];

const myLocationMarkerIcon = {
  path: 'M-10,0a10,10 0 1,0 20,0a10,10 0 1,0 -20,0',
  fillColor: '#4285F4',
  fillOpacity: 1,
  strokeColor: '#FFFFFF',
  strokeWeight: 2,
  scale: 1,
};


interface LocationPickerProps {
  onLocationSelect: (location: { address: string, city: string, zip: string, lat: number, lng: number }) => void;
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [myLocation, setMyLocation] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    let watchId: number;
    if (navigator.geolocation) {
      // Get initial position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(userPos);
          setMarkerPosition(userPos);
          setMyLocation(userPos);
        },
        () => {
          // Fallback to default if permission is denied
          setMapCenter(defaultCenter);
        }
      );

       // Watch for position changes
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMyLocation(userPos);
        },
        (error) => {
          console.error("Error watching position:", error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }

     return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

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
      center={mapCenter}
      zoom={18}
      onClick={handleMapClick}
      mapTypeId='satellite'
      options={{
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
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
       {myLocation && (
          <Marker
            position={myLocation}
            icon={{
              ...myLocationMarkerIcon,
              path: google.maps.SymbolPath.CIRCLE,
            }}
            title="Your Location"
          />
        )}
    </GoogleMap>
  );
}
