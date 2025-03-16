import FunctionButton from "@/client/products/common/FunctionButton";
import { FC } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";

interface FunctionBarProps {
  openDrawerFilter: () => void;
}

const FunctionBar: FC<FunctionBarProps> = ({ openDrawerFilter }) => {
  return (
    <div className="flex mt-10 justify-between">
      <div className="flex gap-4 items-center ">
        <button
          className="rounded-full ring-1 ring-red-600 flex items-center justify-center w-14 h-14"
          title="filter-button"
          onClick={openDrawerFilter}
        >
          <MdOutlineFilterAlt className="text-red-600 text-3xl" />
        </button>
        <p className="flex flex-col text-xl">
          <span>Kết quả: </span>
          <span className="font-bold">34 Sản phẩm</span>
        </p>
      </div>
      <div className="flex gap-4">
        <FunctionButton text="Bảng giá sản phẩm" />
        <FunctionButton text="So sánh sản phẩm" />
      </div>
    </div>
  );
};

export default FunctionBar;
