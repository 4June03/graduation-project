import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative h-10 w-10">
                <Image src="/placeholder.svg?height=40&width=40" alt="Logo" fill className="object-contain" />
              </div>
              <span className="font-bold text-xl">MotorBike</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Chuyên cung cấp các loại xe máy chính hãng với giá cả cạnh tranh và dịch vụ chăm sóc khách hàng tốt nhất.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Danh mục sản phẩm</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/1" className="text-muted-foreground hover:text-foreground">
                  Xe số
                </Link>
              </li>
              <li>
                <Link href="/categories/2" className="text-muted-foreground hover:text-foreground">
                  Xe tay ga
                </Link>
              </li>
              <li>
                <Link href="/categories/3" className="text-muted-foreground hover:text-foreground">
                  Xe thể thao
                </Link>
              </li>
              <li>
                <Link href="/categories/4" className="text-muted-foreground hover:text-foreground">
                  Xe phân khối lớn
                </Link>
              </li>
              <li>
                <Link href="/categories/5" className="text-muted-foreground hover:text-foreground">
                  Xe điện
                </Link>
              </li>
              <li>
                <Link href="/categories/6" className="text-muted-foreground hover:text-foreground">
                  Xe địa hình
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Thông tin</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-muted-foreground hover:text-foreground">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="text-muted-foreground hover:text-foreground">
                  Khuyến mãi
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-muted-foreground hover:text-foreground">
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                <span className="text-muted-foreground">
                  123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">1900 1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">info@motorbike.com</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Đăng ký nhận tin</h4>
              <div className="flex gap-2">
                <Input placeholder="Email của bạn" />
                <Button>Đăng ký</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2023 MotorBike. Tất cả các quyền được bảo lưu.</p>
          <div className="flex items-center gap-4">
            <Image src="/placeholder.svg?height=30&width=50&text=Visa" alt="Visa" width={50} height={30} />
            <Image src="/placeholder.svg?height=30&width=50&text=Mastercard" alt="Mastercard" width={50} height={30} />
            <Image src="/placeholder.svg?height=30&width=50&text=PayPal" alt="PayPal" width={50} height={30} />
            <Image src="/placeholder.svg?height=30&width=50&text=MoMo" alt="MoMo" width={50} height={30} />
          </div>
        </div>
      </div>
    </footer>
  )
}
