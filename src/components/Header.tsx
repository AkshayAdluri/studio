'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Zap } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '@/store/cart';

export function Header() {
  const totalItems = useCart((state) => state.getTotalItems());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl font-headline">QuickBuy</span>
        </Link>
        <div className="flex-1 flex justify-center px-4 lg:px-16">
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {isClient && totalItems > 0 && (
                <Badge className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center p-0 text-xs transform translate-x-1/2 -translate-y-1/2 bg-accent text-accent-foreground rounded-full">
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
