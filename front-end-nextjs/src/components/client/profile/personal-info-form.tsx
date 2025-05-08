"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

export function PersonalInfoForm() {
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin cá nhân</CardTitle>
        <CardDescription>Cập nhật thông tin cá nhân của bạn</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="flex flex-col items-center gap-4 mb-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Avatar" />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Thay đổi ảnh
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="first-name">Họ</Label>
              <Input id="first-name" defaultValue="Nguyễn" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Tên</Label>
              <Input id="last-name" defaultValue="Văn A" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="nguyenvana@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input id="phone" type="tel" defaultValue="0912345678" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Ngày sinh</Label>
            <Input id="dob" type="date" defaultValue="1990-01-01" />
          </div>

          <div className="space-y-2">
            <Label>Giới tính</Label>
            <RadioGroup defaultValue="male" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Nam</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Nữ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Khác</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="change-password"
              checked={showChangePassword}
              onCheckedChange={(checked) => setShowChangePassword(checked === true)}
            />
            <Label htmlFor="change-password">Đổi mật khẩu</Label>
          </div>

          {showChangePassword && (
            <div className="space-y-4 border p-4 rounded-md bg-muted/20">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                <div className="relative">
                  <Input id="current-password" type={showCurrentPassword ? "text" : "password"} className="pr-10" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-10 w-10"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Mật khẩu mới</Label>
                <div className="relative">
                  <Input id="new-password" type={showNewPassword ? "text" : "password"} className="pr-10" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-10 w-10"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                <div className="relative">
                  <Input id="confirm-password" type={showConfirmPassword ? "text" : "password"} className="pr-10" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-10 w-10"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Hủy</Button>
        <Button>Lưu thay đổi</Button>
      </CardFooter>
    </Card>
  )
}
