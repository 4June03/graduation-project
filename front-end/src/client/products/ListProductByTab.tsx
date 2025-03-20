import { ListProductByTabProps } from "@/client/products/common/interfaces";
import MotorCard from "@/client/products/common/MotorCard";
import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

const ListProductByTab: FC<ListProductByTabProps> = () => {
  const navigate = useNavigate();

  const handleSeeDetail = () => {
    navigate("/product/1");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-5 md:my-10">
      {[1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
        <>
          <MotorCard
            key={item}
            image="https://cdn.honda.com.vn/motorbikes/November2024/sYTCNfgI5E0JUJ8BCTQ3.png"
            name="SH 350i"
            price={40000000}
            handleClick={handleSeeDetail}
          />
        </>
      ))}
    </div>
  );
};

export default ListProductByTab;
