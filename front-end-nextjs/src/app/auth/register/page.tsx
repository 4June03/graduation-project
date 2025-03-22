"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="flex justify-center mb-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-10 w-10">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-xl">MotorBike</span>
              </Link>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight">
                Đăng ký tài khoản
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Đã có tài khoản?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-primary hover:underline"
                >
                  Đăng nhập
                </Link>
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">Họ</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="first-name"
                      placeholder="Nguyễn"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="last-name">Tên</Label>
                  <Input id="last-name" placeholder="Văn A" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="0912345678"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-10 w-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    className="pl-10 pr-10"
                  />
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

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Tôi đồng ý với{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    điều khoản sử dụng
                  </Link>{" "}
                  và{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    chính sách bảo mật
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full">
                Đăng ký
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Hoặc đăng ký với
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <Image
                    src="/placeholder.svg?height=24&width=24&text=G"
                    alt="Google"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <Image
                    src="/placeholder.svg?height=24&width=24&text=FB"
                    alt="Facebook"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden w-0 flex-1 lg:block">
          <Image
            src="https://cdn.honda.com.vn/home-banner/September2024/gNG8YzaJg6Ns8AbvTGp4wAVFJVR8Aka9DXqhn5Ek.png"
            alt="Register background"
            fill
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}
