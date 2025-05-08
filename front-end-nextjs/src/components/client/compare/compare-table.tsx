"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, Minus } from "lucide-react"

interface Motorcycle {
  id: number
  name: string
  brand: string
  category: string
  price: number
  image: string
  engine: string
  power: string
  torque: string
  fuelCapacity: string
  fuelConsumption: string
  weight: string
  dimensions: string
  seatHeight: string
  groundClearance: string
  frontBrake: string
  rearBrake: string
  frontSuspension: string
  rearSuspension: string
  frontTire: string
  rearTire: string
  features: string[]
}

interface CompareTableProps {
  motorcycles: Motorcycle[]
  compareValues: (values: any[], higherIsBetter?: boolean) => string[]
  compareFeatures: (motorcycles: Motorcycle[]) => { feature: string; hasFeature: boolean[] }[]
}

export function CompareTable({ motorcycles, compareValues, compareFeatures }: CompareTableProps) {
  // Format price to VND
  function formatPrice(price: number) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Accordion type="single" collapsible defaultValue="basic">
      <AccordionItem value="basic">
        <AccordionTrigger>
          <h3 className="text-lg font-medium">Thông tin cơ bản</h3>
        </AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Thông số</TableHead>
                {motorcycles.map((motorcycle, index) => (
                  <TableHead key={index}>
                    {motorcycle.brand} {motorcycle.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Hãng xe</TableCell>
                {motorcycles.map((motorcycle, index) => (
                  <TableCell key={index}>{motorcycle.brand}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Loại xe</TableCell>
                {motorcycles.map((motorcycle, index) => (
                  <TableCell key={index}>{motorcycle.category}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Giá bán</TableCell>
                {motorcycles.map((motorcycle, index) => {
                  const prices = motorcycles.map((m) => m.price)
                  const styles = compareValues(prices, false)

                  return (
                    <TableCell key={index} className={styles[index]}>
                      {formatPrice(motorcycle.price)}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="engine">
        <AccordionTrigger>
          <h3 className="text-lg font-medium">Động cơ & Hiệu suất</h3>
        </AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Thông số</TableHead>
                {motorcycles.map((motorcycle, index) => (
                  <TableHead key={index}>
                    {motorcycle.brand} {motorcycle.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Động cơ</TableCell>
                {motorcycles.map((motorcycle, index) => (
                  <TableCell key={index}>{motorcycle.engine}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Công suất</TableCell>
                {motorcycles.map((motorcycle, index) => {
                  const powers = motorcycles.map((m) => {
                    const match = m.power.match(/(\d+\.\d+|\d+)/)
                    return match ? Number.parseFloat(match[0]) : 0
                  })
                  const styles = compareValues(powers, true)

                  return (
                    <TableCell key={index} className={styles[index]}>
                      {motorcycle.power}
                    </TableCell>
                  )
                })}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mô-men xoắn</TableCell>
                {motorcycles.map((motorcycle, index) => {
                  const torques = motorcycles.map((m) => {
                    const match = m.torque.match(/(\d+\.\d+|\d+)/)
                    return match ? Number.parseFloat(match[0]) : 0
                  })
                  const styles = compareValues(torques, true)

                  return (
                    <TableCell key={index} className={styles[index]}>
                      {motorcycle.torque}
                    </TableCell>
                  )
                })}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Dung tích bình xăng</TableCell>
                {motorcycles.map((motorcycle, index) => {
                  const capacities = motorcycles.map((m) => {
                    const match = m.fuelCapacity.match(/(\d+\.\d+|\d+)/)
                    return match ? Number.parseFloat(match[0]) : 0
                  })
                  const styles = compareValues(capacities, true)

                  return (
                    <TableCell key={index} className={styles[index]}>
                      {motorcycle.fuelCapacity}
                    </TableCell>
                  )
                })}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mức tiêu thụ nhiên liệu</TableCell>
                {motorcycles.map((motorcycle, index) => {
                  const consumptions = motorcycles.map((m) => {
                    const match = m.fuelConsumption.match(/(\d+\.\d+|\d+)/)
                    return match ? Number.parseFloat(match[0]) : 0
                  })
                  const styles = compareValues(consumptions, false)

                  return (
                    <TableCell key={index} className={styles[index]}>
                      {motorcycle.fuelConsumption}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="dimensions">
        <AccordionTrigger>
          <h3 className="text-lg font-medium">Kích thước & Trọng lượng</h3>
        </AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Thông số</TableHead>
                {motorcycles.map((motorcycle, index) => (
                  <TableHead key={index}>
                    {motorcycle.brand} {motorcycle.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Kích thước tổng thể</TableCell>
                {motorcycles.map((motorcycle, index) => (
                  <TableCell key={index}>{motorcycle.dimensions}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Chiều cao yên</TableCell>
                {motorcycles.map((motorcycle, index) => {
                  const heights = motorcycles.map((m) => {
                    const match = m.seatHeight.match(/(\d+)/)
                    return match ? Number.parseInt(match[0]) : 0
                  })
                  const styles = compareValues(heights, false)

                  return (
                    <TableCell key={index} className={styles[index]}>
                      {motorcycle.seatHeight}
                    </TableCell>
                  )
                })}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Khoảng sáng gầm</TableCell>
                {motorcycles.map((motorcycle, index) => {
                  const clearances = motorcycles.map((m) => {
                    const match = m.groundClearance.match(/(\d+)/)
                    return match ? Number.parseInt(match[0]) : 0
                  })
                  const styles = compareValues(clearances, true)

                  return (
                    <TableCell key={index} className={styles[index]}>
                      {motorcycle.groundClearance}
                    </TableCell>
                  )
                })}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Trọng lượng</TableCell>
                {motorcycles.map((motorcycle, index) => {
                  const weights = motorcycles.map((m) => {
                    const match = m.weight.match(/(\d+)/)
                    return match ? Number.parseInt(match[0]) : 0
                  })
                  const styles = compareValues(weights, false)

                  return (
                    <TableCell key={index} className={styles[index]}>
                      {motorcycle.weight}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="chassis">
        <AccordionTrigger>
          <h3 className="text-lg font-medium">Khung gầm & Hệ thống treo</h3>
        </AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Thông số</TableHead>
                {motorcycles.map((motorcycle, index) => (
                  <TableHead key={index}>
                    {motorcycle.brand} {motorcycle.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Phanh trước</TableCell>
                {motorcycles.map((motorcycle, index) => {
                  const brakes = motorcycles.map((m) => m.frontBrake)
                  const styles = compareValues(brakes, true)

                  return (
                    <TableCell key={index} className={styles[index]}>
                      {motorcycle.frontBrake}
                    </TableCell>
                  )
                })}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phanh sau</TableCell>
                {motorcycles.map((motorcycle, index) => {
                  const brakes = motorcycles.map((m) => m.rearBrake)
                  const styles = compareValues(brakes, true)

                  return (
                    <TableCell key={index} className={styles[index]}>
                      {motorcycle.rearBrake}
                    </TableCell>
                  )
                })}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Giảm xóc trước</TableCell>
                {motorcycles.map((motorcycle, index) => (
                  <TableCell key={index}>{motorcycle.frontSuspension}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Giảm xóc sau</TableCell>
                {motorcycles.map((motorcycle, index) => (
                  <TableCell key={index}>{motorcycle.rearSuspension}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Lốp trước</TableCell>
                {motorcycles.map((motorcycle, index) => (
                  <TableCell key={index}>{motorcycle.frontTire}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Lốp sau</TableCell>
                {motorcycles.map((motorcycle, index) => (
                  <TableCell key={index}>{motorcycle.rearTire}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="features">
        <AccordionTrigger>
          <h3 className="text-lg font-medium">Tính năng</h3>
        </AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Tính năng</TableHead>
                {motorcycles.map((motorcycle, index) => (
                  <TableHead key={index}>
                    {motorcycle.brand} {motorcycle.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {compareFeatures(motorcycles).map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.feature}</TableCell>
                  {item.hasFeature.map((has, idx) => (
                    <TableCell key={idx} className="text-center">
                      {has ? (
                        <Check className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <Minus className="h-5 w-5 text-red-600 mx-auto" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
