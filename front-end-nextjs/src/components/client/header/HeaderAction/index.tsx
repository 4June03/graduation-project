import { useAuth } from "@/components/provider/AuthProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Heart, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
import { toast } from "sonner";

interface HeaderActionProps {
  setIsSearchOpen: (isOpen: boolean) => void;
  isSearchOpen: boolean;
}

export const HeaderAction: FC<HeaderActionProps> = ({
  setIsSearchOpen,
  isSearchOpen,
}) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    // xóa token
    // document.cookie = "authToken=; Max-Age=0; path=/";
    localStorage.removeItem("accessToken");
    router.push("/");
    toast.success("Đăng xuất thành công");
    window.location.reload();
  };

  useEffect(() => {
    console.log("Đăng nhập chưa,", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <Link href="/favorites" aria-label="Favorites">
          <Heart className="h-5 w-5" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <Link href="/cart" aria-label="Cart">
          <div className="relative">
            <ShoppingCart className="h-5 w-5" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
              2
            </Badge>
          </div>
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="User menu">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>

          {isLoggedIn && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Thông tin cá nhân</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile?tab=orders">Đơn hàng của tôi</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/favorites">Sản phẩm yêu thích</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Đăng xuất
              </DropdownMenuItem>
            </>
          )}
          {!isLoggedIn && (
            <>
              <DropdownMenuItem asChild>
                <Link href="/auth/login">Đăng nhập</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/auth/register">Đăng ký</Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
