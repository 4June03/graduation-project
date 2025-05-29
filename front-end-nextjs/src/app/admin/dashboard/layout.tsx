"use client";

import type React from "react";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  BarChart3,
  Bike,
  FileText,
  Gift,
  LayoutDashboard,
  Menu,
  Package,
  ShoppingCart,
  Tag,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Quản lí danh mục xe",
    href: "/admin/dashboard/categories",
    icon: Tag,
  },
  {
    title: "Quản lí danh sách xe",
    href: "/admin/dashboard/motorcycles",
    icon: Bike,
  },

  {
    title: "Quản lí đơn hàng",
    href: "/admin/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Quản lí tồn kho",
    href: "/admin/dashboard/inventory",
    icon: Package,
  },
  {
    title: "Quản lí tài khoản",
    href: "/admin/dashboard/users",
    icon: Users,
  },

  // {
  //   title: "Quản lí thống kê",
  //   href: "/admin/dashboard/statistics",
  //   icon: BarChart3,
  // },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 pr-0">
            <div className="flex items-center gap-2 pb-4">
              <Bike className="h-6 w-6" />
              <span className="text-lg font-semibold">Motorcycle Admin</span>
            </div>
            <nav className="grid gap-2 text-sm">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent",
                    pathname === item.href ? "bg-accent" : "transparent"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Bike className="h-6 w-6" />
          <span className="text-lg font-semibold hidden md:inline-block">
            Motorcycle Admin
          </span>
        </div>
        <div className="flex-1" />
        <nav className="hidden md:flex gap-4">
          <Button variant="outline" size="sm">
            Hỗ trợ
          </Button>
          <Button variant="outline" size="sm">
            Đăng xuất
          </Button>
        </nav>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r md:block">
          <nav className="grid gap-2 p-4 text-sm">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent",
                  pathname === item.href ? "bg-accent" : "transparent"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
