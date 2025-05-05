"use client"

import { BarChart3, PieChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CustomerStatisticsProps {
  period: string
  year: string
}

export function CustomerStatistics({ period, year }: CustomerStatisticsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thống kê khách hàng</CardTitle>
        <CardDescription>Phân tích chi tiết về khách hàng</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Khách hàng theo độ tuổi</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <BarChart3 className="h-16 w-16 text-muted" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Khách hàng theo khu vực</CardTitle>
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
