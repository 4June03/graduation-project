import { FunctionButtonProps } from "@/client/products/common/interfaces";
import { FC } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const FunctionButton: FC<FunctionButtonProps> = ({ className, text }) => {
  return (
    <button
      className={`flex gap-2 items-center uppercase ring-2 ring-red-700 text-red-600 py-2 px-4 text-xl hover:bg-red-600 hover:text-white font-semibold transition-all duration-600 ${className}`}
    >
      {text}
      <FaLongArrowAltRight />
    </button>
  );
};

export default FunctionButton;
