"use client"

import { LineChart, PieChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SalesStatisticsProps {
  period: string
  year: string
}

export function SalesStatistics({ period, year }: SalesStatisticsProps) {
  // In a real application, this data would be fetched based on period and year
  const periodText = period === "week" ? "tuần" : period === "month" ? "tháng" : period === "quarter" ? "quý" : "năm"

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2 tỷ VND</div>
            <p className="text-xs text-muted-foreground">+12% so với kỳ trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Số lượng đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">432</div>
            <p className="text-xs text-muted-foreground">+8% so với kỳ trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Giá trị trung bình đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 triệu VND</div>
            <p className="text-xs text-muted-foreground">+5% so với kỳ trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ chuyển đổi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
            <p className="text-xs text-muted-foreground">+2.5% so với kỳ trước</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Doanh thu theo thời gian</CardTitle>
            <CardDescription>Biểu đồ doanh thu theo {periodText}</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
              <LineChart className="h-16 w-16 text-muted" />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Doanh thu theo hãng xe</CardTitle>
            <CardDescription>Phân bổ doanh thu theo các hãng xe</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
              <PieChart className="h-16 w-16 text-muted" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
