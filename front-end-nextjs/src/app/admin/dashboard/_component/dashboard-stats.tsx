"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bike,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

import { toast } from "sonner";
import {
  BrandRevenue,
  formatCurrency,
  getMonthName,
  getRevenueByBrand,
  getRevenueByMonth,
  getTopSellingBikes,
  getTotalBikesSold,
  getTotalRevenue,
  MonthlyRevenue,
  TopSellingBike,
} from "@/app/admin/dashboard/_lib/stats-service";

interface DashboardStatsProps {
  className?: string;
}

export function DashboardStats({ className }: DashboardStatsProps) {
  const [loading, setLoading] = useState(true);
  const [topSellingBikes, setTopSellingBikes] = useState<TopSellingBike[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);
  const [brandRevenue, setBrandRevenue] = useState<BrandRevenue[]>([]);
  const [totalBikesSold, setTotalBikesSold] = useState<number>(0);

  const fetchAllStats = async () => {
    setLoading(true);
    try {
      const [topBikes, revenue, monthlyData, brandData, bikesSold] =
        await Promise.all([
          getTopSellingBikes(),
          getTotalRevenue(),
          getRevenueByMonth(),
          getRevenueByBrand(),
          getTotalBikesSold(),
        ]);

      setTopSellingBikes(topBikes);
      setTotalRevenue(revenue);
      setMonthlyRevenue(monthlyData);
      setBrandRevenue(brandData);
      setTotalBikesSold(bikesSold);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);

      toast.error("Không thể tải dữ liệu thống kê. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStats();
  }, []);

  if (loading) {
    return (
      <div className={`flex flex-col gap-4 ${className}`}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Đang tải...</span>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-40"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Calculate current month revenue for display
  const currentMonthRevenue =
    monthlyRevenue.length > 0
      ? monthlyRevenue[monthlyRevenue.length - 1].revenue
      : 0;

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={fetchAllStats} disabled={loading}>
          <RefreshCw
            className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
          />
          Làm mới
        </Button>
      </div>

      {/* Main Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng doanh thu
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Tổng doanh thu từ trước đến nay
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Doanh thu tháng này
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(currentMonthRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              {monthlyRevenue.length > 0
                ? getMonthName(monthlyRevenue[monthlyRevenue.length - 1].month)
                : "Chưa có dữ liệu"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng xe đã bán
            </CardTitle>
            <Bike className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalBikesSold.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Tổng số xe đã bán</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Số mẫu xe</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topSellingBikes.length}</div>
            <p className="text-xs text-muted-foreground">Số mẫu xe đang bán</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Details */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Top Selling Bikes */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Top 5 xe bán chạy nhất</CardTitle>
            <CardDescription>Doanh thu và số lượng bán ra</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSellingBikes.slice(0, 5).map((bike, index) => (
                <div key={bike.bikeId} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-bold">#{index + 1}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {bike.bikeName}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">
                        {bike.totalSold} xe đã bán
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {formatCurrency(bike.revenue)}
                      </Badge>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      index === 0 ? "text-green-500" : ""
                    }`}
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span>
                      {((bike.revenue / totalRevenue) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Brand */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Doanh thu theo hãng xe</CardTitle>
            <CardDescription>
              Phân bổ doanh thu theo các hãng xe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {brandRevenue.map((brand, index) => {
                const percentage = (brand.revenue / totalRevenue) * 100;
                return (
                  <div key={brand.brandId} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            index === 0
                              ? "bg-blue-500"
                              : index === 1
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        ></div>
                        <span className="text-sm font-medium">
                          {brand.brandName}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {formatCurrency(brand.revenue)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {percentage.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          index === 0
                            ? "bg-blue-500"
                            : index === 1
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue Chart */}
      {monthlyRevenue.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu theo tháng</CardTitle>
            <CardDescription>Biểu đồ doanh thu theo từng tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyRevenue.map((month) => (
                <div
                  key={`${month.year}-${month.month}`}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {getMonthName(month.month)} {month.year}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Doanh thu tháng
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {formatCurrency(month.revenue)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {((month.revenue / totalRevenue) * 100).toFixed(1)}% tổng
                      doanh thu
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
