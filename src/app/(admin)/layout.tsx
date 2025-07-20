
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Package, Map, Truck, PanelLeft, LogOut } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Zap } from 'lucide-react';
import { useAuth } from '@/store/auth';
import { Button } from '@/components/ui/button';

const menuItems = [
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/store-location', label: 'Store Location', icon: Map, disabled: false },
  { href: '/admin/delivery-zones', label: 'Delivery Zones', icon: Truck, disabled: false },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If there is no user, or the user is not an owner, redirect to admin login
    if (!user || user.role !== 'owner') {
      router.push('/admin/login');
    }
  }, [user, router]);
  
  // If we're on the login page, just render the children (the login page itself)
  // without the admin layout shell.
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Render a loading state or null while we wait for the redirect to happen
  if (!user || user.role !== 'owner') {
    return null; // or a loading component
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/40">
        <Sidebar collapsible="icon" side="left" variant="sidebar">
          <SidebarHeader>
             <Link href="/admin/products" className="flex items-center gap-2 font-bold text-xl px-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="group-data-[collapsible=icon]:hidden">QuickBuy</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={{
                        children: item.label,
                      }}
                       aria-disabled={item.disabled}
                    >
                      <span>
                        <item.icon />
                        <span>{item.label}</span>
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <SidebarMenu>
                <SidebarMenuItem>
                     <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                         <LogOut className="mr-2 h-4 w-4"/>
                         <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                    </Button>
                </SidebarMenuItem>
             </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="max-w-screen-2xl mx-auto p-4 md:p-6 lg:p-8 flex-1 flex flex-col">
            <header className="flex items-center justify-between gap-4 mb-6 md:hidden">
                 <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    <h1 className="font-semibold text-lg">Admin</h1>
                 </div>
                 <Button variant="ghost" size="icon" onClick={logout}>
                    <LogOut className="h-4 w-4"/>
                 </Button>
            </header>
          <div className="flex-1">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
