"use client"

import type { Control } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { MotorcycleFormValues } from "./motorcycle-form-schema"

interface SpecificationsSectionProps {
  control: Control<MotorcycleFormValues>
}

export function SpecificationsSection({ control }: SpecificationsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông số kỹ thuật cơ bản</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField
            control={control}
            name="basicSpecification.weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trọng lượng (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập trọng lượng"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="basicSpecification.length"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chiều dài (mm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập chiều dài"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="basicSpecification.width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chiều rộng (mm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập chiều rộng"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="basicSpecification.height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chiều cao (mm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập chiều cao"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="basicSpecification.wheelbase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chiều dài cơ sở (mm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập chiều dài cơ sở"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="basicSpecification.seatHeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chiều cao yên (mm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập chiều cao yên"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="basicSpecification.groundClearance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Khoảng sáng gầm (mm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập khoảng sáng gầm"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="basicSpecification.fuelTankCapacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dung tích bình xăng (lít)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập dung tích bình xăng"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="basicSpecification.frontTireSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kích thước lốp trước (inch)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập kích thước lốp trước"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="basicSpecification.rearTireSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kích thước lốp sau (inch)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập kích thước lốp sau"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}
