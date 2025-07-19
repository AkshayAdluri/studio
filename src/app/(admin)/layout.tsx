
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Package, Map, Truck, PanelLeft } from 'lucide-react';
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
} from '@/components/ui/sidebar';
import { Zap } from 'lucide-react';
import { useAuth } from '@/store/auth';

const menuItems = [
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/store-location', label: 'Store Location', icon: Map, disabled: true },
  { href: '/admin/delivery-zones', label: 'Delivery Zones', icon: Truck, disabled: true },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
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
             <Link href="/" className="flex items-center gap-2 font-bold text-xl px-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="group-data-[collapsible=icon]:hidden">Admin</span>
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
        </Sidebar>
        <SidebarInset className="max-w-screen-2xl mx-auto p-4 md:p-6 lg:p-8">
            <header className="flex items-center gap-4 mb-6 md:hidden">
                 <SidebarTrigger />
                 <h1 className="font-semibold text-lg">Admin</h1>
            </header>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
