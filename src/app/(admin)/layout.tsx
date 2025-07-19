
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
                  <Link href={item.href} legacyBehavior passHref>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={{
                        children: item.label,
                      }}
                       aria-disabled={item.disabled}
                    >
                      <a>
                        <item.icon />
                        <span>{item.label}</span>
                      </a>
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
