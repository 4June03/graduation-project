import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import RoundedButton from "../../components/common/RoundedButton";

const DropDownMenu = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="xl:hidden w-full absolute top-full bg-black flex flex-col items-center justify-evenly gap-8 transition-all duration-300 overflow-hidden max-h-0 pt-5 z-20 shadow-md"
    >
      <Link to={"/"} className="menu-text-style">
        Trang chủ
      </Link>
      <Link to={"/"} className="menu-text-style">
        Lịch chiếu
      </Link>
      <Link to={"/"} className="menu-text-style">
        Tin tức
      </Link>
      <Link to={"/"} className="menu-text-style">
        Khuyến mãi
      </Link>
      <Link to={"/"} className="menu-text-style">
        Giá vé
      </Link>
      <Link to={"/"} className="menu-text-style">
        Giới thiệu
      </Link>
      <div className="h-[1px] w-full shrink-0 bg-border"></div>
      <div className=" w-full flex justify-center gap-4 py-4">
        <RoundedButton
          text="Đăng ký"
          className="py-2 px-8 hover:scale-105 trasition duration-500 ring-2 rounded-md"
        />
        <RoundedButton
          text="đăng nhập"
          className={`hover:scale-105 trasition duration-500 bg-red-500 text-black rounded-md`}
        />
      </div>
    </div>
  );
});

export default DropDownMenu;
