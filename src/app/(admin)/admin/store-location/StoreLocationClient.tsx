
'use client';

import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useStoreLocation } from '@/store/location';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: 'var(--radius)',
};

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

const libraries: ("places")[] = ["places"];


export default function StoreLocationClient() {
  const { location, setLocation } = useStoreLocation();
  const { toast } = useToast();
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const [markerPosition, setMarkerPosition] = useState(location.lat && location.lng ? { lat: location.lat, lng: location.lng } : defaultCenter);
  const [address, setAddress] = useState(location.address);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (location.lat && location.lng) {
      setMarkerPosition({ lat: location.lat, lng: location.lng });
    }
    setAddress(location.address);
  }, [location]);

  const geocodePosition = useCallback((pos: { lat: number, lng: number }) => {
    if (!window.google) {
      console.error("Google Maps JavaScript API not loaded");
      return;
    }
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: pos }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        setAddress(results[0].formatted_address);
      } else {
        setAddress('Could not determine address.');
        console.error('Geocoder failed due to: ' + status);
      }
    });
  }, []);

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newPos = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarkerPosition(newPos);
      geocodePosition(newPos);
    }
  }, [geocodePosition]);
  
  const handleSaveLocation = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setLocation({
        ...markerPosition,
        address: address,
      });
      toast({
        title: 'Location Saved',
        description: 'Your store location has been updated.',
      });
      setIsSaving(false);
    }, 500);
  };

  const renderMap = () => {
    if (loadError) return <div>Error loading maps. Please check your API key.</div>;
    if (!isLoaded) return <Skeleton className="w-full h-[400px]" />;

    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={12}
        onClick={handleMapClick}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    );
  };

  return (
    <>
       <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Store Location</h1>
          <p className="text-muted-foreground">Set your physical store's location on the map.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Map</CardTitle>
          <CardDescription>Click on the map to set your store's location. The address will be automatically fetched.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-[400px]">
            {renderMap()}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Store Address</Label>
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address will appear here" />
          </div>
          <Button onClick={handleSaveLocation} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 animate-spin" />}
            Save Location
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
