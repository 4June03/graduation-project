import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

export const FooterContact = () => {
  return (
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
  );
};
