import { ListProductByTabProps } from "@/client/products/common/interfaces";
import MotorCard from "@/client/products/common/MotorCard";
import React, { FC } from "react";

const ListProductByTab: FC<ListProductByTabProps> = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-5 md:my-10">
      <MotorCard
        image="https://cdn.honda.com.vn/motorbikes/November2024/sYTCNfgI5E0JUJ8BCTQ3.png"
        name="SH 350i"
        price={40000000}
      />
      <MotorCard
        image="https://cdn.honda.com.vn/motorbikes/November2024/sYTCNfgI5E0JUJ8BCTQ3.png"
        name="SH 350i"
        price={40000000}
      />
      <MotorCard
        image="https://cdn.honda.com.vn/motorbikes/November2024/sYTCNfgI5E0JUJ8BCTQ3.png"
        name="SH 350i"
        price={40000000}
      />
      <MotorCard
        image="https://cdn.honda.com.vn/motorbikes/November2024/sYTCNfgI5E0JUJ8BCTQ3.png"
        name="SH 350i"
        price={40000000}
      />
      <MotorCard
        image="https://cdn.honda.com.vn/motorbikes/November2024/sYTCNfgI5E0JUJ8BCTQ3.png"
        name="SH 350i"
        price={40000000}
      />
      <MotorCard
        image="https://cdn.honda.com.vn/motorbikes/November2024/sYTCNfgI5E0JUJ8BCTQ3.png"
        name="SH 350i"
        price={40000000}
      />
      <MotorCard
        image="https://cdn.honda.com.vn/motorbikes/November2024/sYTCNfgI5E0JUJ8BCTQ3.png"
        name="SH 350i"
        price={40000000}
      />
      <MotorCard
        image="https://cdn.honda.com.vn/motorbikes/November2024/sYTCNfgI5E0JUJ8BCTQ3.png"
        name="SH 350i"
        price={40000000}
      />
    </div>
  );
};

export default ListProductByTab;
