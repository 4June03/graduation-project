"use client"

import type { Control } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { MotorcycleFormValues } from "./motorcycle-form-schema"

interface EngineSectionProps {
  control: Control<MotorcycleFormValues>
}

export function EngineSection({ control }: EngineSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Động cơ & Khung xe</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField
            control={control}
            name="engineAndFrame.frontSuspension"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giảm xóc trước</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập loại giảm xóc trước" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="engineAndFrame.rearSuspension"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giảm xóc sau</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập loại giảm xóc sau" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="engineAndFrame.engineType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại động cơ</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập loại động cơ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="engineAndFrame.maximumPower"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Công suất tối đa (HP)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập công suất tối đa"
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
            name="engineAndFrame.displacement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dung tích xi-lanh (cc)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập dung tích xi-lanh"
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
            name="engineAndFrame.bore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường kính xi-lanh (mm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập đường kính xi-lanh"
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
            name="engineAndFrame.stroke"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hành trình piston (mm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập hành trình piston"
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
            name="engineAndFrame.compressionRatio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tỷ số nén</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập tỷ số nén"
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
