
'use client';

import { useState, useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, DrawingManager } from '@react-google-maps/api';
import { useStoreLocation } from '@/store/location';
import { useDeliveryZones, Zone } from '@/store/delivery-zones';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Trash2 } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: 'var(--radius)',
};

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

// Define the type for the libraries array
const libraries: ("drawing")[] = ["drawing"];

export default function DeliveryZonesClient() {
  const { location: storeLocation } = useStoreLocation();
  const { zones, addZone, clearZones } = useDeliveryZones();
  const { toast } = useToast();

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script-delivery',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries,
  });

  const [isSaving, setIsSaving] = useState(false);

  const center = useMemo(() => {
    return storeLocation.lat && storeLocation.lng ? { lat: storeLocation.lat, lng: storeLocation.lng } : defaultCenter;
  }, [storeLocation]);

  const onPolygonComplete = useCallback((polygon: google.maps.Polygon) => {
    const path = polygon.getPath().getArray().map(p => ({ lat: p.lat(), lng: p.lng() }));
    addZone({ type: 'polygon', path });
    polygon.setMap(null); // Remove the drawn polygon, it will be rendered from the store
    toast({ title: "Area zone added" });
  }, [addZone, toast]);

  const onCircleComplete = useCallback((circle: google.maps.Circle) => {
    const center = circle.getCenter();
    const radius = circle.getRadius();
    if (center) {
      addZone({ type: 'circle', center: { lat: center.lat(), lng: center.lng() }, radius });
      circle.setMap(null); // Remove the drawn circle
      toast({ title: "Radius zone added" });
    }
  }, [addZone, toast]);

  const onPolylineComplete = useCallback((polyline: google.maps.Polyline) => {
    const path = polyline.getPath().getArray().map(p => ({ lat: p.lat(), lng: p.lng() }));
    addZone({ type: 'polyline', path });
    polyline.setMap(null); // Remove the drawn polyline
    toast({ title: "Street zone added" });
  }, [addZone, toast]);

  const handleSaveZones = () => {
    setIsSaving(true);
    // In a real app, this would be an API call to save `zones`.
    // Here we just simulate it.
    setTimeout(() => {
      toast({
        title: 'Delivery Zones Saved',
        description: 'Your delivery zones have been updated.',
      });
      setIsSaving(false);
    }, 1000);
  };
  
  const handleClearAllZones = () => {
    clearZones();
    toast({
      title: 'Zones Cleared',
      description: 'All delivery zones have been removed.',
      variant: 'destructive',
    });
  };

  const renderMap = () => {
    if (loadError) return <div>Error loading maps. Please check your API key.</div>;
    if (!isLoaded) return <Skeleton className="w-full h-[500px]" />;

    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        <DrawingManager
          onPolygonComplete={onPolygonComplete}
          onCircleComplete={onCircleComplete}
          onPolylineComplete={onPolylineComplete}
          options={{
            drawingControl: true,
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [
                google.maps.drawing.OverlayType.POLYGON, // For areas
                google.maps.drawing.OverlayType.CIRCLE, // For radius
                google.maps.drawing.OverlayType.POLYLINE, // For streets
              ],
            },
            polygonOptions: {
              fillColor: '#6e3bff',
              fillOpacity: 0.3,
              strokeWeight: 2,
              strokeColor: '#6e3bff',
              clickable: false,
              editable: false,
              zIndex: 1,
            },
            circleOptions: {
              fillColor: '#ff5722',
              fillOpacity: 0.3,
              strokeWeight: 2,
              strokeColor: '#ff5722',
              clickable: false,
              editable: false,
              zIndex: 1,
            },
            polylineOptions: {
                strokeColor: '#00bcd4',
                strokeWeight: 4,
            }
          }}
        />
        {/* We would render saved zones here from the `zones` state, but let's do that next. */}
      </GoogleMap>
    );
  };

  return (
    <>
       <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Delivery Zones</h1>
          <p className="text-muted-foreground">Draw areas, radiuses, or streets for product delivery.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Define Your Zones</CardTitle>
          <CardDescription>Use the tools on the map to draw your delivery zones. Drawn shapes will be added automatically. You can add multiple zones of different types.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-[500px]">
            {renderMap()}
          </div>
          <div>
            <h3 className="font-medium">Current Zones: {zones.length}</h3>
            {/* We'll list zones here later */}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            <Button onClick={handleClearAllZones} variant="destructive" disabled={zones.length === 0}>
                <Trash2 className="mr-2" />
                Clear All
            </Button>
            <Button onClick={handleSaveZones} disabled={isSaving || zones.length === 0}>
                {isSaving && <Loader2 className="mr-2 animate-spin" />}
                Save Zones
            </Button>
        </CardFooter>
      </Card>
    </>
  );
}
