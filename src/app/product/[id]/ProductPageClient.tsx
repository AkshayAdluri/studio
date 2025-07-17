
'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/store/cart';
import { useWishlist } from '@/store/wishlist';
import type { Product } from '@/lib/products';
import { PlusCircle, Heart } from 'lucide-react';
import { useAuth } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface ProductPageClientProps {
  product: Product;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const { addItem: addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isInWishlist = isClient && wishlistItems.some(item => item.id === product.id);

  const handleWishlistToggle = () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to add items to your wishlist.",
        variant: "destructive"
      });
      router.push('/login');
      return;
    }
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button onClick={() => addToCart(product)} size="lg" className="flex-grow">
        <PlusCircle className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
      <Button
        onClick={handleWishlistToggle}
        variant="outline"
        size="icon"
        className={cn(
          "h-12 w-12",
          isInWishlist ? 'text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600' : ''
        )}
      >
        <Heart className={cn("h-6 w-6", isInWishlist && "fill-current")} />
      </Button>
    </div>
  );
}
