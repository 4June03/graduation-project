"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { FormControl, FormField, FormLabel } from "@/components/ui/form";
const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Email không hợp lệ" }),
  });

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onsubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    console.log(data);
    setIsSubmitted(true);
  };

  return (
    <>
      {isSubmitted ? (
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">Kiểm tra email của bạn</h3>
          <p className="text-muted-foreground mb-6">
            Chúng tôi đã gửi email hướng dẫn đặt lại mật khẩu đến {email}. Vui
            lòng kiểm tra hộp thư đến của bạn.
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <>
                  <div className="grid gap-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          placeholder="name@example.com"
                          type="email"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </div>
                </>
              )}
            />

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
        </Form>
      )}
    </>
  );
};

export default ForgotPasswordForm;
