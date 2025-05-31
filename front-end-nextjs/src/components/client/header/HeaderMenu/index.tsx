"usse client";
import React, { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HeaderAction } from "@/components/client/header/HeaderAction";
import { HeaderLogo } from "@/components/client/header/HeaderLogo";
import { useFetchData } from "@/hooks/useCRUD";
import { Category } from "@/components/client/category";

// Mock data for brands
const brands = [
  { id: "honda", name: "Honda", href: "/brands/honda" },
  { id: "yamaha", name: "Yamaha", href: "/brands/yamaha" },
  { id: "suzuki", name: "Suzuki", href: "/brands/suzuki" },
  { id: "piaggio", name: "Piaggio", href: "/brands/piaggio" },
  { id: "sym", name: "SYM", href: "/brands/sym" },
  { id: "kawasaki", name: "Kawasaki", href: "/brands/kawasaki" },
];
interface HeaderMenuProps {
  setIsSearchOpen: (isOpen: boolean) => void;
  isSearchOpen: boolean;
}

export const HeaderMenu: FC<HeaderMenuProps> = ({
  setIsSearchOpen,
  isSearchOpen,
}) => {
  const { data: apiResponse } = useFetchData<{
    success: boolean;
    message: string;
    data: Category[];
  }>(["categories"], `/categories`);

  const categories = apiResponse?.data || [];

  return (
    <>
      <div className="flex items-center justify-between">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="py-6">
              <div className="space-y-2">
                <Link href="/" className="block py-2 hover:text-primary">
                  Trang chủ
                </Link>
                <div className="py-2">
                  <div className="font-medium mb-1">Danh mục sản phẩm</div>
                  <div className="pl-4 space-y-1">
                    {categories.map((category) => (
                      <Link
                        key={category.categoryId}
                        href={`/categories/${category.categoryId}`}
                        className="block py-1 hover:text-primary"
                      >
                        {category.categoryName}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link href="/news" className="block py-2 hover:text-primary">
                  Tin tức
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <HeaderLogo />
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Trang chủ
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="h-auto p-0 text-sm font-medium">
                Danh mục
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {(categories || []).map((category) => (
                <DropdownMenuItem key={category.categoryId} asChild>
                  <Link href={`/categories/${category.categoryId}`}>
                    {category.categoryName}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="h-auto p-0 text-sm font-medium">
                Thương hiệu
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {brands.map((brand) => (
                <DropdownMenuItem key={brand.id} asChild>
                  <Link href={brand.href}>{brand.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}
          {/* <Link
            href="/promotions"
            className="text-sm font-medium hover:text-primary"
          >
            Khuyến mãi
          </Link> */}
          <Link href="/news" className="text-sm font-medium hover:text-primary">
            Tin tức
          </Link>
        </nav>

        {/* Actions */}
        <HeaderAction
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />
      </div>
    </>
  );
};
