
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import shortid from 'shortid';

interface LatLng {
  lat: number;
  lng: number;
}

interface PolygonZone {
  id: string;
  type: 'polygon';
  path: LatLng[];
}

interface CircleZone {
  id: string;
  type: 'circle';
  center: LatLng;
  radius: number; // in meters
}

interface PolylineZone {
  id: string;
  type: 'polyline';
  path: LatLng[];
}

export type Zone = PolygonZone | CircleZone | PolylineZone;

interface DeliveryZonesState {
  zones: Zone[];
  addZone: (zoneData: Omit<Zone, 'id'>) => void;
  removeZone: (zoneId: string) => void;
  updateZone: (zone: Zone) => void;
  clearZones: () => void;
}

export const useDeliveryZones = create<DeliveryZonesState>()(
  persist(
    (set) => ({
      zones: [],
      addZone: (zoneData) => {
        const newZone = { ...zoneData, id: shortid.generate() } as Zone;
        set((state) => ({
          zones: [...state.zones, newZone],
        }));
      },
      removeZone: (zoneId) => {
        set((state) => ({
          zones: state.zones.filter((z) => z.id !== zoneId),
        }));
      },
      updateZone: (zone) => {
        set((state) => ({
          zones: state.zones.map((z) => (z.id === zone.id ? zone : z)),
        }));
      },
      clearZones: () => {
        set({ zones: [] });
      },
    }),
    {
      name: 'delivery-zones-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
