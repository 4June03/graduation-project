import SearchBox from "../../components/common/SearchBox";
import { IoMenu } from "react-icons/io5";

const Header = () => {
  return (
    <div className="fixed top-0 right-0 w-full flex py-5 px-10 items-center justify-between gap-4 h-[70px] z-20 bg-white shadow-md">
      <div className="w-20 h-5">
        <img
          src="https://yamaha-motor.com.vn/wp/wp-content/themes/yamaha/assets/img/share/logo_sp.png"
          alt=""
          className="object-cover"
        />
      </div>
      <ul className="items-center gap-7 text-black font-semibold uppercase hidden md:flex">
        <li className="menu-text-style">Sản phẩm</li>
        <li className="menu-text-style">Khuyến mãi</li>
        <li className="menu-text-style">Tin tức</li>
        <li className="menu-text-style">Bảng giá</li>
        <li className="menu-text-style">Phụ tùng và phụ kiện</li>
        <li className="menu-text-style">Khuyến mãi</li>
      </ul>

      <SearchBox />
      <span className=" text-3xl block md:hidden text-black">
        <IoMenu />
      </span>
    </div>
  );
};

export default Header;
