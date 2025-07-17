
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useCart } from '@/store/cart';
import { useWishlist } from '@/store/wishlist';
import { PlusCircle, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem: addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist();
  
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product)
  };

  return (
    <Link href={`/product/${product.id}`} className="block h-full">
      <Card className="flex flex-col overflow-hidden h-full transition-all hover:shadow-lg group">
        <CardHeader className="p-0 relative">
          <div className="aspect-square relative">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={product.dataAiHint}
            />
          </div>
          <Button
            size="icon"
            className={cn(
              "absolute top-2 right-2 rounded-full h-8 w-8 bg-background/70 hover:bg-background",
              isInWishlist ? 'text-red-500 hover:text-red-600' : 'text-foreground/70 hover:text-foreground'
            )}
            onClick={handleWishlistToggle}
          >
            <Heart className={cn("h-4 w-4", isInWishlist && "fill-current")} />
          </Button>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
          <CardTitle className="text-lg font-medium font-headline mb-1 leading-tight line-clamp-1">{product.name}</CardTitle>
          <p className="text-muted-foreground text-sm flex-grow line-clamp-1">{product.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-xl font-semibold text-primary">${product.price.toFixed(2)}</p>
          <Button onClick={handleAddToCart} size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
