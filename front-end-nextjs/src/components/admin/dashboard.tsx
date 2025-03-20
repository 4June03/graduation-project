"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Bike,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

const salesData = [
  { name: "Jan", sales: 4000, revenue: 240000000 },
  { name: "Feb", sales: 3000, revenue: 180000000 },
  { name: "Mar", sales: 5000, revenue: 300000000 },
  { name: "Apr", sales: 2780, revenue: 166800000 },
  { name: "May", sales: 1890, revenue: 113400000 },
  { name: "Jun", sales: 2390, revenue: 143400000 },
  { name: "Jul", sales: 3490, revenue: 209400000 },
];

const topSellingProducts = [
  { id: 1, name: "Honda Wave Alpha", sales: 245, revenue: 7350000000 },
  { id: 2, name: "Yamaha Exciter 155", sales: 187, revenue: 9350000000 },
  { id: 3, name: "Honda Vision", sales: 156, revenue: 5460000000 },
  { id: 4, name: "Honda SH 150i", sales: 132, revenue: 9240000000 },
  { id: 5, name: "Yamaha Grande", sales: 121, revenue: 4235000000 },
];

export function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,243,000,000₫</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">8%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />
              <span className="text-red-500">3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>
                Monthly sales and revenue for the current year
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "revenue") {
                        return [`${value.toLocaleString()}₫`, "Revenue"];
                      }
                      return [value, name === "sales" ? "Sales" : name];
                    }}
                  />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="sales"
                    fill="#8884d8"
                    name="Sales"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="revenue"
                    fill="#82ca9d"
                    name="Revenue"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>
                  Top 5 selling products for the current month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSellingProducts.map((product) => (
                    <div key={product.id} className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <Bike className="h-5 w-5 text-primary" />
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {product.sales} units sold
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        {(product.revenue / 1000000).toFixed(1)}M₫
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest activities in your store
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                      <ShoppingCart className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        New Order #1234
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Honda SH 150i - 70,000,000₫
                      </p>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">
                      2h ago
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        New User Registration
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Nguyen Van A
                      </p>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">
                      5h ago
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100">
                      <Package className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Inventory Update
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Honda Wave Alpha - 10 units added
                      </p>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">
                      1d ago
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>
                Monthly revenue trends for the current year
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      `${value.toLocaleString()}₫`,
                      "Revenue",
                    ]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    name="Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
