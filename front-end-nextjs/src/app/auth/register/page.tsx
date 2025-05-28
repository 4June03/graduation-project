import Link from "next/link";
import Image from "next/image";
import RegisterForm from "@/components/authentication/RegisterForm";

export default function RegisterPage() {
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

            <RegisterForm />
          </div>
        </div>

        <div className="relative hidden w-0 flex-1 lg:block">
          <Image
            src="/images/register-bg.png"
            alt="Register background"
            fill
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}
