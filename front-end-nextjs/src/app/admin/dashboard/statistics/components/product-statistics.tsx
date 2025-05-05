"use client"

import { BarChart3, PieChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProductStatisticsProps {
  period: string
  year: string
}

export function ProductStatistics({ period, year }: ProductStatisticsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thống kê sản phẩm</CardTitle>
        <CardDescription>Phân tích chi tiết về sản phẩm bán ra</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 xe bán chạy nhất</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <BarChart3 className="h-16 w-16 text-muted" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Phân bổ theo danh mục</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <PieChart className="h-16 w-16 text-muted" />
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
