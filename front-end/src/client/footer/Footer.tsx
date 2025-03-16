import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full bg-[#0B0D13] text-white mt-10">
      <div className="p-8 flex flex-col ">
        <ul className="flex gap-4 sm:gap-10 text-sm md:text-base justify-center ">
          <Link to={"/"}>
            <li>Chính sách</li>
          </Link>
          <Link to={"/"}>
            <li>Lịch chiếu</li>
          </Link>
          <Link to={"/"}>
            <li>Tin tức</li>
          </Link>
          <Link to={"/"}>
            <li>Giá vé</li>
          </Link>
          <Link to={"/"}>
            <li>Hỏi đáp</li>
          </Link>
          <Link to={"/"}>
            <li>Liên hệ</li>
          </Link>
        </ul>
        <ul className="flex gap-4 sm:gap-10 justify-center mt-10 flex-wrap items-center">
          <li className="flex gap-5">
            <img
              src="https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Ffacebook.png&w=64&q=75"
              className="w-8 h-8 rounded-sm"
              alt=""
            />
            <img
              src="https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Fyoutube2.png&w=64&q=75"
              className="w-8 h-8 rounded-sm"
              alt=""
            />
            <img
              src="https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Fzalo.webp&w=64&q=75"
              className="w-8 h-8 rounded-sm"
              alt=""
            />
          </li>
          <li className="flex gap-5 sm:gap-10 flex-wrap">
            <img
              src="https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Fgoogleplay.png&w=256&q=75"
              alt=""
              className="w-36 h-10 rounded-sm"
            />
            <img
              src="https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Fappstore.png&w=384&q=75"
              alt=""
              className="w-32 h-10 rounded-sm"
            />
            <img
              src="https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Fcertification.png&w=256&q=75"
              alt=""
              className="w-32 h-10 rounded-sm"
            />
          </li>
        </ul>
        <div className="text-center space-y-2 text-xs md:text-base mb-6 mt-10">
          <p>Cơ quan chủ quản: BỘ VĂN HÓA, THỂ THAO VÀ DU LỊCH</p>
          <p>Bản quyền thuộc Trung tâm Chiếu phim Quốc gia.</p>
          <p>
            Giấy phép số: 224/GP- TTĐT ngày 31/8/2010 - Chịu trách nhiệm: Vũ Đức
            Tùng – Giám đốc.
          </p>
          <p>
            Địa chỉ: 87 Láng Hạ, Quận Ba Đình, Tp. Hà Nội - Điện thoại:
            024.35141791
          </p>
        </div>
        <div className="text-center text-sm">
          Copyright 2023. NCC All Rights Reservered. Dev by
          <a href="https://anvui.vn/">Anvui.vn</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
