
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface StoreLocationData {
  lat: number | null;
  lng: number | null;
  address: string;
}

interface StoreLocationState {
  location: StoreLocationData;
  setLocation: (location: StoreLocationData) => void;
  clearLocation: () => void;
}

const initialState: StoreLocationData = {
  lat: null,
  lng: null,
  address: '',
};

export const useStoreLocation = create<StoreLocationState>()(
  persist(
    (set) => ({
      location: initialState,
      setLocation: (location) => {
        set({ location });
      },
      clearLocation: () => {
        set({ location: initialState });
      },
    }),
    {
      name: 'store-location-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
