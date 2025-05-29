import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/stats";

// Types for statistics API responses
export interface TopSellingBike {
  bikeId: number;
  bikeName: string;
  revenue: number;
  totalSold: number;
}

export interface MonthlyRevenue {
  month: number;
  revenue: number;
  year: number;
}

export interface BrandRevenue {
  brandId: number;
  brandName: string;
  revenue: number;
}

// Get top selling bikes
export async function getTopSellingBikes(): Promise<TopSellingBike[]> {
  try {
    const response = await axios.get<TopSellingBike[]>(
      `${API_BASE_URL}/top-selling`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching top selling bikes:", error);
    throw new Error("Không thể lấy dữ liệu xe bán chạy");
  }
}

// Get total revenue
export async function getTotalRevenue(): Promise<number> {
  try {
    const response = await axios.get<number>(`${API_BASE_URL}/total-revenue`);
    return response.data;
  } catch (error) {
    console.error("Error fetching total revenue:", error);
    throw new Error("Không thể lấy dữ liệu tổng doanh thu");
  }
}

// Get revenue by month
export async function getRevenueByMonth(): Promise<MonthlyRevenue[]> {
  try {
    const response = await axios.get<MonthlyRevenue[]>(
      `${API_BASE_URL}/revenue-by-month`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching revenue by month:", error);
    throw new Error("Không thể lấy dữ liệu doanh thu theo tháng");
  }
}

// Get revenue by brand
export async function getRevenueByBrand(): Promise<BrandRevenue[]> {
  try {
    const response = await axios.get<BrandRevenue[]>(
      `${API_BASE_URL}/revenue-by-brand`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching revenue by brand:", error);
    throw new Error("Không thể lấy dữ liệu doanh thu theo hãng");
  }
}

// Get total bikes sold
export async function getTotalBikesSold(): Promise<number> {
  try {
    const response = await axios.get<number>(
      `${API_BASE_URL}/total-bikes-sold`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching total bikes sold:", error);
    throw new Error("Không thể lấy dữ liệu tổng xe đã bán");
  }
}

// Helper function to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

// Helper function to format month name
export function getMonthName(month: number): string {
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  return months[month - 1] || `Tháng ${month}`;
}

// Helper function to calculate percentage change (mock for now)
export function calculatePercentageChange(
  current: number,
  previous: number
): string {
  if (previous === 0) return "+100%";
  const change = ((current - previous) / previous) * 100;
  return change >= 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
}
