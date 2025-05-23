import type React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProfileSidebar } from "@/components/client/profile-sidebar";

interface ProfileLayoutProps {
  children: React.ReactNode;
  title: string;
  activeTab: string;
}

export function ProfileLayout({
  children,
  title,
  activeTab,
}: ProfileLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container w-full mx-auto">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/profile" className="hover:text-foreground">
              Tài khoản
            </Link>
            {title !== "Tài khoản của tôi" && (
              <>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span>{title}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container py-8 w-full mx-auto">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <ProfileSidebar activeTab={activeTab} />

          {/* Main Content */}
          <div className="md:col-span-3">{children}</div>
        </div>
      </div>
    </main>
  );
}
