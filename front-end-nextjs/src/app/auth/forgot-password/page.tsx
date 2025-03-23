"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ForgotPasswordForm from "@/components/authentication/ForgotPasswordForm";

export default function ForgotPasswordPage() {
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

            <ForgotPasswordForm />
          </div>
        </div>

        <div className="relative hidden w-0 flex-1 lg:block">
          <Image
            src="/images/register-bg.png"
            alt="Forgot password background"
            fill
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}
