
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useWishlist } from './wishlist';
import { useCart } from './cart';
import { useAddress } from './address';

export type User = {
  email: string;
  role: 'user' | 'owner';
}

interface AuthState {
  user: User | null;
  login: (email: string, role: 'user' | 'owner') => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email, role) => set({ user: { email, role } }),
      logout: () => {
        set({ user: null });
        // Clear user-specific data on logout
        useWishlist.getState().clearWishlist();
        useCart.getState().clearCart();
        useAddress.getState().clearAddresses();
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
