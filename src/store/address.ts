
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import shortid from 'shortid';

export interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  zip: string;
  lat?: number;
  lng?: number;
}

interface AddressState {
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => boolean;
  removeAddress: (addressId: string) => void;
  updateAddress: (address: Address) => void;
  clearAddresses: () => void;
}

export const useAddress = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: [],
      addAddress: (address) => {
        const currentAddresses = get().addresses;
        if (currentAddresses.length >= 5) {
          return false; // Indicate failure due to limit
        }
        const newAddress = { ...address, id: shortid.generate() };
        set({ addresses: [...currentAddresses, newAddress] });
        return true; // Indicate success
      },
      removeAddress: (addressId) => {
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== addressId),
        }));
      },
      updateAddress: (address) => {
        set((state) => ({
          addresses: state.addresses.map((a) =>
            a.id === address.id ? address : a
          ),
        }));
      },
      clearAddresses: () => {
        set({ addresses: [] });
      }
    }),
    {
      name: 'address-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
