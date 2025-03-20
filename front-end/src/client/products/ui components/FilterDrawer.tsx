import React, { FC } from "react";
import { IoClose } from "react-icons/io5";

import { Slider } from "antd";
import PriceRangeFilter from "@/client/products/ui components/PriceRangeFilter";
import { CSSTransition } from "react-transition-group";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterDrawer: FC<FilterDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-30"
        onClick={onClose}
      ></div>
      <div className="fixed top-0 right-0 w-[100vw] md:w-[50vw] bg-white shadow-lg h-full p-6 overflow-y-auto z-30">
        {/* Nút đóng */}
        <button
          className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-3xl"
          onClick={onClose}
          title="btn"
        >
          <IoClose />
        </button>
        <h2 className="text-xl font-semibold text-red-600 italic mb-4">
          LỌC THEO THÔNG SỐ XE
        </h2>
        {/* Loại xe */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Loại xe</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <button className="border px-4 py-2 rounded-lg hover:bg-gray-200">
              Xe tay ga
            </button>
            <button className="border px-4 py-2 rounded-lg hover:bg-gray-200">
              Xe số
            </button>
            <button className="border px-4 py-2 rounded-lg hover:bg-gray-200">
              Xe côn tay
            </button>
            <button className="border px-4 py-2 rounded-lg hover:bg-gray-200">
              Xe phân khối lớn
            </button>
            <button className="border px-4 py-2 rounded-lg hover:bg-gray-200">
              Xe điện
            </button>
          </div>
        </div>
        {/* Màu sắc */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Màu sắc</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="w-6 h-6 rounded-full bg-black cursor-pointer" />
            <span className="w-6 h-6 rounded-full bg-red-600 cursor-pointer" />
            <span className="w-6 h-6 rounded-full bg-white border cursor-pointer" />
            <span className="w-6 h-6 rounded-full bg-gray-400 cursor-pointer" />
            <span className="w-6 h-6 rounded-full bg-yellow-400 cursor-pointer" />
            <span className="w-6 h-6 rounded-full bg-green-500 cursor-pointer" />
            <span className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer" />
          </div>
        </div>

        <PriceRangeFilter minPrice={200} maxPrice={100000} />

        <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
          LỌC ➜
        </button>
      </div>
      ;
    </div>
  );
};

export default FilterDrawer;
