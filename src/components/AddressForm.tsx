
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Address } from "@/store/address";
import { Loader2, MapPin } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import LocationPicker from "./LocationPicker";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  zip: z.string().regex(/^\d{5}$/, { message: "Please enter a valid 5-digit zip code." }),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddressFormProps {
  onSubmit: (data: Omit<Address, 'id'>) => boolean | void;
  initialData?: Omit<Address, 'id'>;
  isSaving?: boolean;
}

export function AddressForm({ onSubmit, initialData, isSaving = false }: AddressFormProps) {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      address: "",
      city: "",
      zip: "",
      lat: undefined,
      lng: undefined,
    },
  });

  function handleFormSubmit(values: FormValues) {
    const result = onSubmit(values);
    if (result !== false) {
      form.reset();
    }
  }

  const handleLocationSelect = (location: { address: string, city: string, zip: string, lat: number, lng: number }) => {
    form.setValue("address", location.address, { shouldValidate: true });
    form.setValue("city", location.city, { shouldValidate: true });
    form.setValue("zip", location.zip, { shouldValidate: true });
    form.setValue("lat", location.lat);
    form.setValue("lng", location.lng);
    setIsMapOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <MapPin className="mr-2 h-4 w-4" />
              Pick on Map
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Select your location</DialogTitle>
            </DialogHeader>
            <div className="h-[500px]">
              <LocationPicker onLocationSelect={handleLocationSelect} />
            </div>
          </DialogContent>
        </Dialog>

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
        <Button type="submit" className="w-full" disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSaving ? 'Saving...' : 'Save Address'}
        </Button>
      </form>
    </Form>
  );
}
