"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesStatistics } from "./sales-statistics"
import { ProductStatistics } from "./product-statistics"
import { CustomerStatistics } from "./customer-statistics"

export function StatisticsClient() {
  const [period, setPeriod] = useState("month")
  const [year, setYear] = useState("2023")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lí thống kê</h1>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn kỳ thống kê" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Tuần</SelectItem>
              <SelectItem value="month">Tháng</SelectItem>
              <SelectItem value="quarter">Quý</SelectItem>
              <SelectItem value="year">Năm</SelectItem>
            </SelectContent>
          </Select>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Chọn năm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Xuất báo cáo</Button>
        </div>
      </div>
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Doanh số</TabsTrigger>
          <TabsTrigger value="products">Sản phẩm</TabsTrigger>
          <TabsTrigger value="customers">Khách hàng</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="space-y-4">
          <SalesStatistics period={period} year={year} />
        </TabsContent>
        <TabsContent value="products" className="space-y-4">
          <ProductStatistics period={period} year={year} />
        </TabsContent>
        <TabsContent value="customers" className="space-y-4">
          <CustomerStatistics period={period} year={year} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
