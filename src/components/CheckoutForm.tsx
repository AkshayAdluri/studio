
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation';
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, LogIn, PlusCircle } from "lucide-react";
import { createRazorpayOrder, verifyPayment } from "@/lib/razorpay";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { useAuth } from "@/store/auth";
import Link from "next/link";
import { useAddress, type Address } from "@/store/address";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { AddressForm } from "./AddressForm";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  zip: z.string().regex(/^\d{5}$/, { message: "Please enter a valid 5-digit zip code." }),
});

export function CheckoutForm() {
  const router = useRouter();
  const { clearCart, getTotalPrice } = useCart();
  const { toast } = useToast();
  const { user } = useAuth();
  const { addresses, addAddress } = useAddress();
  const [isClient, setIsClient] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const totalPrice = getTotalPrice();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: user || "",
      address: "",
      city: "",
      zip: "",
    },
  });

   useEffect(() => {
    if (user) {
      form.setValue('email', user);
    }
  }, [user, form]);

  const handleAddressSelect = (addressId: string) => {
    const selectedAddress = addresses.find(a => a.id === addressId);
    if (selectedAddress) {
      form.setValue('name', selectedAddress.name);
      form.setValue('address', selectedAddress.address);
      form.setValue('city', selectedAddress.city);
      form.setValue('zip', selectedAddress.zip);
    }
  };

  const handleAddNewAddress = (newAddress: Omit<Address, 'id'>) => {
    addAddress(newAddress);
    setIsAddressDialogOpen(false);
    toast({
      title: "Address added",
      description: "Your new address has been saved and selected."
    })
    // Select the newly added address
    // Note: addAddress returns the new address with an ID, but here we'll just find it.
    // A more robust solution might have addAddress return the full new address object.
    const addedAddress = addresses[addresses.length-1];
    if (addedAddress) {
        handleAddressSelect(addedAddress.id);
    }
  }

  if (isClient && !user) {
     return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Please Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">You need to be logged in to proceed to checkout.</p>
          <Button asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const amountInPaisa = Math.round(totalPrice * 100);

    try {
      const order = await createRazorpayOrder({ amount: amountInPaisa });
      if (!order) {
        throw new Error('Order creation failed');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "QuickBuy",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response: any) {
          const data = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };

          const isVerified = await verifyPayment(data);
          
          if(isVerified) {
            clearCart();
            router.push('/confirmation');
          } else {
             toast({
              title: "Payment Verification Failed",
              description: "Please try again.",
              variant: "destructive"
            });
          }
        },
        prefill: {
          name: values.name,
          email: values.email,
        },
        theme: {
          color: "#A020F0"
        }
      };
      
      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Error processing order:", error);
      toast({
        title: "Error",
        description: "Something went wrong while processing your order. Please try again.",
        variant: "destructive"
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
             {isClient && addresses.length > 0 && (
               <div className="space-y-2">
                <Label>Select Address</Label>
                <div className="flex gap-2">
                  <Select onValueChange={handleAddressSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a saved address" />
                    </SelectTrigger>
                    <SelectContent>
                      {addresses.map((address) => (
                        <SelectItem key={address.id} value={address.id}>
                          {address.name} - {address.address}, {address.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Address</DialogTitle>
                      </DialogHeader>
                      <AddressForm onSubmit={handleAddNewAddress} />
                    </DialogContent>
                  </Dialog>
                </div>
               </div>
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Anytown" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP Code</FormLabel>
                    <FormControl>
                      <Input placeholder="12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4">
             <div className="flex justify-between font-bold text-lg border-t pt-4">
                <span>Order Total</span>
                {isClient ? 
                  <span>${totalPrice.toFixed(2)}</span> :
                  <Skeleton className="h-6 w-24" />
                }
              </div>
            <Button type="submit" className="w-full" disabled={!isClient || form.formState.isSubmitting || totalPrice <= 0}>
              {isClient ? 
                (form.formState.isSubmitting ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`) :
                'Loading...'
              }
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
