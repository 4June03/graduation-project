"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Search, ShoppingCart, Heart, User, X, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for categories
const categories = [
  { id: 1, name: "Xe số", href: "/categories/1" },
  { id: 2, name: "Xe tay ga", href: "/categories/2" },
  { id: 3, name: "Xe thể thao", href: "/categories/3" },
  { id: 4, name: "Xe phân khối lớn", href: "/categories/4" },
  { id: 5, name: "Xe điện", href: "/categories/5" },
  { id: 6, name: "Xe địa hình", href: "/categories/6" },
]

// Mock data for brands
const brands = [
  { id: "honda", name: "Honda", href: "/brands/honda" },
  { id: "yamaha", name: "Yamaha", href: "/brands/yamaha" },
  { id: "suzuki", name: "Suzuki", href: "/brands/suzuki" },
  { id: "piaggio", name: "Piaggio", href: "/brands/piaggio" },
  { id: "sym", name: "SYM", href: "/brands/sym" },
  { id: "kawasaki", name: "Kawasaki", href: "/brands/kawasaki" },
]

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container flex justify-between items-center">
          <div className="text-sm">Hotline: 1900 1234</div>
          <div className="text-sm">
            <Link href="/promotions" className="hover:underline">
              Khuyến mãi
            </Link>
            <span className="mx-2">|</span>
            <Link href="/news" className="hover:underline">
              Tin tức
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container py-4">
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
                        <Link key={category.id} href={category.href} className="block py-1 hover:text-primary">
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="py-2">
                    <div className="font-medium mb-1">Thương hiệu</div>
                    <div className="pl-4 space-y-1">
                      {brands.map((brand) => (
                        <Link key={brand.id} href={brand.href} className="block py-1 hover:text-primary">
                          {brand.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link href="/promotions" className="block py-2 hover:text-primary">
                    Khuyến mãi
                  </Link>
                  <Link href="/news" className="block py-2 hover:text-primary">
                    Tin tức
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <Image src="/placeholder.svg?height=40&width=40" alt="Logo" fill className="object-contain" />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">MotorBike</span>
          </Link>

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
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link href={category.href}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
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
            </DropdownMenu>
            <Link href="/promotions" className="text-sm font-medium hover:text-primary">
              Khuyến mãi
            </Link>
            <Link href="/news" className="text-sm font-medium hover:text-primary">
              Tin tức
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Search">
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
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">2</Badge>
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
                <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 relative">
            <div className="flex">
              <Input placeholder="Tìm kiếm sản phẩm..." className="flex-1" autoFocus />
              <Button className="ml-2">Tìm kiếm</Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 mr-16"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
