import Image from "next/image";
import React from "react";

export const FooterEnd = () => {
  return (
    <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm text-muted-foreground">
        © 2023 MotorBike. Tất cả các quyền được bảo lưu.
      </p>
      <div className="flex items-center gap-4">
        <Image
          src="/placeholder.svg?height=30&width=50&text=Visa"
          alt="Visa"
          width={50}
          height={30}
        />
        <Image
          src="/placeholder.svg?height=30&width=50&text=Mastercard"
          alt="Mastercard"
          width={50}
          height={30}
        />
        <Image
          src="/placeholder.svg?height=30&width=50&text=PayPal"
          alt="PayPal"
          width={50}
          height={30}
        />
        <Image
          src="/placeholder.svg?height=30&width=50&text=MoMo"
          alt="MoMo"
          width={50}
          height={30}
        />
      </div>
    </div>
  );
};
