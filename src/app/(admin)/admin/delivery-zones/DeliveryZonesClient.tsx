
'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, DrawingManager, Polygon, Circle, Polyline } from '@react-google-maps/api';
import { useStoreLocation } from '@/store/location';
import { useDeliveryZones, Zone } from '@/store/delivery-zones';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: 'var(--radius)',
};

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

const libraries: ("drawing" | "places")[] = ["drawing", "places"];

export default function DeliveryZonesClient() {
  const { location: storeLocation } = useStoreLocation();
  const { zones, addZone, removeZone, clearZones } = useDeliveryZones();
  const { toast } = useToast();

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  useEffect(() => {
    // Prioritize saved store location
    if (storeLocation.lat && storeLocation.lng) {
      setMapCenter({ lat: storeLocation.lat, lng: storeLocation.lng });
    } 
    // Otherwise, try to get user's current location
    else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
           // Fallback to default if permission is denied
           setMapCenter(defaultCenter);
        }
      );
    }
  }, [storeLocation]);


  const onPolygonComplete = useCallback((polygon: google.maps.Polygon) => {
    const path = polygon.getPath().getArray().map(p => ({ lat: p.lat(), lng: p.lng() }));
    addZone({ type: 'polygon', path });
    polygon.setMap(null); 
    toast({ title: "Area zone added" });
  }, [addZone, toast]);

  const onCircleComplete = useCallback((circle: google.maps.Circle) => {
    const center = circle.getCenter();
    const radius = circle.getRadius();
    if (center) {
      addZone({ type: 'circle', center: { lat: center.lat(), lng: center.lng() }, radius });
      circle.setMap(null); 
      toast({ title: "Radius zone added" });
    }
  }, [addZone, toast]);

  const onPolylineComplete = useCallback((polyline: google.maps.Polyline) => {
    const path = polyline.getPath().getArray().map(p => ({ lat: p.lat(), lng: p.lng() }));
    addZone({ type: 'polyline', path });
    polyline.setMap(null); 
    toast({ title: "Street zone added" });
  }, [addZone, toast]);

  const handleSaveZones = () => {
    setIsSaving(true);
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
        center={mapCenter}
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
                google.maps.drawing.OverlayType.POLYGON,
                google.maps.drawing.OverlayType.CIRCLE,
                google.maps.drawing.OverlayType.POLYLINE,
              ],
            },
            polygonOptions: {
              fillColor: 'hsl(var(--primary))',
              fillOpacity: 0.3,
              strokeWeight: 2,
              strokeColor: 'hsl(var(--primary))',
              clickable: false,
              editable: false,
              zIndex: 1,
            },
            circleOptions: {
              fillColor: 'hsl(var(--accent))',
              fillOpacity: 0.3,
              strokeWeight: 2,
              strokeColor: 'hsl(var(--accent))',
              clickable: false,
              editable: false,
              zIndex: 1,
            },
            polylineOptions: {
                strokeColor: 'hsl(var(--destructive))',
                strokeWeight: 4,
            }
          }}
        />
        {zones.map(zone => {
          if (zone.type === 'polygon') {
            return <Polygon key={zone.id} path={zone.path} options={{ fillColor: 'hsl(var(--primary))', fillOpacity: 0.3, strokeWeight: 2, strokeColor: 'hsl(var(--primary))'}} />
          }
          if (zone.type === 'circle') {
            return <Circle key={zone.id} center={zone.center} radius={zone.radius} options={{fillColor: 'hsl(var(--accent))', fillOpacity: 0.3, strokeWeight: 2, strokeColor: 'hsl(var(--accent))'}} />
          }
           if (zone.type === 'polyline') {
            return <Polyline key={zone.id} path={zone.path} options={{ strokeColor: 'hsl(var(--destructive))', strokeWeight: 4 }} />
          }
          return null;
        })}
      </GoogleMap>
    );
  };
  
  const getZoneTypeLabel = (type: Zone['type']) => {
    switch (type) {
      case 'polygon': return <Badge variant="default">Area</Badge>;
      case 'circle': return <Badge variant="secondary">Radius</Badge>;
      case 'polyline': return <Badge variant="destructive">Street</Badge>;
      default: return null;
    }
  }

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
            <h3 className="font-medium mb-2">Current Zones ({zones.length})</h3>
            {zones.length > 0 ? (
               <ul className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-2">
                 {zones.map((zone, index) => (
                   <li key={zone.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                     <div className='flex items-center gap-2'>
                        {getZoneTypeLabel(zone.type)}
                        <span>Zone #{index + 1}</span>
                     </div>
                      <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className='h-8 w-8 text-destructive'>
                                <Trash2 className='h-4 w-4' />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete this zone?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the selected zone. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => removeZone(zone.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                   </li>
                 ))}
               </ul>
            ) : (
              <p className="text-muted-foreground text-sm">No zones defined yet. Use the map tools to add one.</p>
            )}
           </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                 <Button variant="destructive" disabled={zones.length === 0}>
                    <Trash2 className="mr-2" />
                    Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear all zones?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all defined delivery zones. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearAllZones}>Clear All</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button onClick={handleSaveZones} disabled={isSaving || zones.length === 0}>
                {isSaving && <Loader2 className="mr-2 animate-spin" />}
                Save Zones
            </Button>
        </CardFooter>
      </Card>
    </>
  );
}
