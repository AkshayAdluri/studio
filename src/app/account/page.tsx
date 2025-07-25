
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAddress, type Address } from '@/store/address';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AddressForm } from '@/components/AddressForm';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Pencil } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { addresses, addAddress, removeAddress, updateAddress } = useAddress();
  const { toast } = useToast();
  const [isAddAddressDialogOpen, setIsAddAddressDialogOpen] = useState(false);
  const [isEditAddressDialogOpen, setIsEditAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isSaving, setIsSaving] = useState(false);


  useEffect(() => {
    // Redirect if not a regular user
    if (!user || user.role !== 'user') {
      router.push('/login');
    }
  }, [user, router]);

  const handleAddAddress = (newAddress: Omit<Address, 'id'>) => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      const success = addAddress(newAddress);
      if (success) {
        toast({
          title: 'Address Added',
          description: 'Your new address has been saved.',
        });
        setIsAddAddressDialogOpen(false);
      } else {
        toast({
          title: 'Could Not Add Address',
          description: 'You can only have up to 5 addresses.',
          variant: 'destructive',
        });
      }
      setIsSaving(false);
    }, 500);
    return true; 
  };
  
  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setIsEditAddressDialogOpen(true);
  };
  
  const handleUpdateAddress = (updatedAddressData: Omit<Address, 'id'>) => {
    if (!editingAddress) return false;
    
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      updateAddress({ ...updatedAddressData, id: editingAddress.id });
       toast({
        title: 'Address Updated',
        description: 'Your address has been successfully updated.',
      });
      setIsSaving(false);
      setIsEditAddressDialogOpen(false);
      setEditingAddress(null);
    }, 500);
    return true;
  };

  if (!user || user.role !== 'user') {
    return null; // or a loading spinner
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">My Account</h1>
        <p className="text-muted-foreground">Manage your account settings and addresses.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>This is the email associated with your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-semibold">{user.email}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your Addresses</CardTitle>
            <CardDescription>Manage your saved shipping addresses.</CardDescription>
          </div>
          <Dialog open={isAddAddressDialogOpen} onOpenChange={setIsAddAddressDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={addresses.length >= 5}>Add New Address</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a new address</DialogTitle>
              </DialogHeader>
              <AddressForm onSubmit={handleAddAddress} isSaving={isSaving} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {addresses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div key={address.id} className="border rounded-lg p-4 flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{address.name}</p>
                    <p className="text-sm text-muted-foreground">{address.address}</p>
                    <p className="text-sm text-muted-foreground">{address.city}, {address.zip}</p>
                  </div>
                  <div className="flex gap-1">
                     <Button variant="ghost" size="icon" onClick={() => handleEditAddress(address)}>
                        <Pencil className="h-4 w-4" />
                     </Button>
                     <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                         </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this address.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => removeAddress(address.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">You have no saved addresses.</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditAddressDialogOpen} onOpenChange={(open) => {
        setIsEditAddressDialogOpen(open);
        if (!open) setEditingAddress(null);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit address</DialogTitle>
          </DialogHeader>
          <AddressForm onSubmit={handleUpdateAddress} initialData={editingAddress || undefined} isSaving={isSaving} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
