
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useWishlist } from '@/store/wishlist';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useAuth } from '@/store/auth';
import { useRouter } from 'next/navigation';

export default function WishlistPage() {
  const { items } = useWishlist();
  const [isClient, setIsClient] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    setIsClient(true);
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!isClient || !user) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <Heart className="h-16 w-16 mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold font-headline mb-2">Loading your wishlist...</h1>
        <p className="text-muted-foreground mb-6">Please log in to see your wishlist.</p>
         <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <Heart className="h-16 w-16 mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold font-headline mb-2">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-6">Explore products and add your favorites to your wishlist.</p>
        <Button asChild>
          <Link href="/">Discover Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline">Your Wishlist</h1>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
