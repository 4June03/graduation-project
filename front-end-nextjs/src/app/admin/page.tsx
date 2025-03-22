"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Box,
  Home,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Dashboard } from "@/components/admin/dashboard";
import { Categories } from "@/components/admin/categories";
import { Products } from "@/components/admin/products";
import { Accounts } from "@/components/admin/accounts";
import { Orders } from "@/components/admin/orders";
import { Inventory } from "@/components/admin/inventory";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    // Handle logout logic here
    router.push("/auth/login");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/40 w-full">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-center py-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">MotoAdmin</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveTab("dashboard")}
                  isActive={activeTab === "dashboard"}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveTab("categories")}
                  isActive={activeTab === "categories"}
                >
                  <Box className="h-5 w-5" />
                  <span>Categories</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveTab("products")}
                  isActive={activeTab === "products"}
                >
                  <Package className="h-5 w-5" />
                  <span>Products</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveTab("accounts")}
                  isActive={activeTab === "accounts"}
                >
                  <Users className="h-5 w-5" />
                  <span>Accounts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveTab("orders")}
                  isActive={activeTab === "orders"}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Orders</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveTab("inventory")}
                  isActive={activeTab === "inventory"}
                >
                  <Home className="h-5 w-5" />
                  <span>Inventory</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <main className="p-6">
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "categories" && <Categories />}
            {activeTab === "products" && <Products />}
            {activeTab === "accounts" && <Accounts />}
            {activeTab === "orders" && <Orders />}
            {activeTab === "inventory" && <Inventory />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
