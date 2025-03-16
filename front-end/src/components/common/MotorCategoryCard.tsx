import { FC } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

interface MotorCategoryCardProps {
  image?: string;
  title: string;
  onClick: () => void;
}

const MotorCategoryCard: FC<MotorCategoryCardProps> = ({
  image,
  title,
  onClick,
}) => {
  return image ? (
    <>
      <div
        className="flex flex-col hover:text-red-700 hover:cursor-pointer"
        onClick={onClick}
      >
        <img src={image} alt="" className="w-full h-[70%] object-cover" />
        <div className="flex flex-col flex-1 justify-center items-center w-full bg-[#f5f5f5] text-xl font-semibold uppercase gap-4">
          <FaArrowRight />
          {title}
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex flex-col hover:text-red-700 hover:cursor-pointer">
        <div className="flex flex-col flex-1 justify-center items-center w-full h-full bg-[#f5f5f5] text-xl font-semibold uppercase gap-4">
          <IoMdAddCircle className="text-4xl" />
          Xem tất cả
        </div>
      </div>
    </>
  );
};

export default MotorCategoryCard;
