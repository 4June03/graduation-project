import React, { useRef } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineExpandMore } from "react-icons/md";
import { Link } from "react-router-dom";
import RoundedButton from "../../components/common/RoundedButton";
import { IoMdMenu } from "react-icons/io";
import DropDownMenu from "./DropDownMenu";

const Header = () => {
  const user: string = "";

  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("max-h-[600px]");
    }
  };

  return (
    <div className="w-full text-white z-40 fixed transition duration-500 bg-black py-1 xl:py-3 top-0 left-0 px-4">
      <div className="mx-auto max-w-7xl flex items-center h-16 xl:h20 gap-2 ">
        <div className="relative w-[100px] xl:w-[110px] h-[35px] xl:h-[40px]">
          <Link to={"/"}>
            <img
              src="https://chieuphimquocgia.com.vn/images/logo-text-new.svg"
              alt=""
              className="object-cover w-full h-full"
            />
          </Link>
        </div>
        <div className="font-semibold xl:hidden text-left">
          <p className="text-md">Trung tâm chiếu phim quốc gia</p>
          <p className="text-md">National Cinema Center</p>
        </div>
        <nav className="hidden xl:flex items-center justify-between gap-6 px-6 flex-1 z-30">
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
        </nav>
        <div className="hidden xl:flex lg:gap-2 items-center">
          {user ? (
            <>
              <span>
                <FaCircleUser />
              </span>
              <p>username</p>
              <span>
                <MdOutlineExpandMore />
              </span>
            </>
          ) : (
            <div className="flex gap-4">
              <RoundedButton
                text="Đăng ký"
                className="py-2 px-8 hover:scale-105 trasition duration-500 ring-2"
              />
              <RoundedButton
                text="đăng nhập"
                className={`hover:scale-105 trasition duration-500 bg-red-500 text-black`}
              />
            </div>
          )}
        </div>
        <div
          className="xl:hidden ml-auto inline-flex text-4xl cursor-pointer"
          onClick={handleToggleMenu}
        >
          <IoMdMenu />
        </div>
      </div>
      <DropDownMenu ref={menuRef} />
    </div>
  );
};

export default Header;
