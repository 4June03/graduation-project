"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowLeft, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

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
                Quên mật khẩu
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Nhập email của bạn để nhận liên kết đặt lại mật khẩu
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  Kiểm tra email của bạn
                </h3>
                <p className="text-muted-foreground mb-6">
                  Chúng tôi đã gửi email hướng dẫn đặt lại mật khẩu đến {email}.
                  Vui lòng kiểm tra hộp thư đến của bạn.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Không nhận được email? Kiểm tra thư mục spam hoặc{" "}
                  <button
                    className="text-primary hover:underline font-medium"
                    onClick={() => setIsSubmitted(false)}
                  >
                    thử lại
                  </button>
                </p>
                <Button asChild className="w-full">
                  <Link href="/auth/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại đăng nhập
                  </Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Gửi liên kết đặt lại mật khẩu
                </Button>

                <div className="text-center">
                  <Link
                    href="/auth/login"
                    className="text-sm font-medium text-primary hover:underline inline-flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại đăng nhập
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="relative hidden w-0 flex-1 lg:block">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Forgot password background"
            fill
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}
