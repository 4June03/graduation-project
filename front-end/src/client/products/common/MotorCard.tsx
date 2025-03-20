import { MotorCardProps } from "@/client/products/common/interfaces";
import React, { FC } from "react";

const MotorCard: FC<MotorCardProps> = ({ name, image, price, handleClick }) => {
  return (
    <div className="flex flex-col p-4 gap-4" onClick={handleClick}>
      <h2 className="font-bold text-2xl">{name}</h2>
      <p className="w-full h-[70%]">
        <img
          src="https://cdn.honda.com.vn/motorbikes/November2024/sYTCNfgI5E0JUJ8BCTQ3.png"
          alt={image}
          className="object-cover w-[40%] md:w-[80%] h-full mx-auto hover:scale-110 transition-all duration-300 hover:cursor-pointer"
        />
      </p>
      <p className="text-xl">
        Giá từ <span className="font-bold">{price}</span>
        <span className="uppercase">vnđ</span>
      </p>
    </div>
  );
};

export default MotorCard;
