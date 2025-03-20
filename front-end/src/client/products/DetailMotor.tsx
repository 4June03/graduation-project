import { Breadcrumb } from "antd";
import React, { FC, useEffect, useState } from "react";

const DetailMotor: FC = () => {
  return (
    <div className="mt-[70px] w-full container">
      <Breadcrumb separator=">">
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Xe tay ga</Breadcrumb.Item>
        <Breadcrumb.Item>Tên xe</Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex gap-4 w-[70%] h-[50vh] mt-10">
        <ul className="flex flex-col w-1/6 md:max-h-[50vh] gap-4 overflow-hidden">
          {[1, 1, 1, 1, 1, 1, 1].map((item) => (
            <li key={item} className="w-full  overflow-y-hidden ">
              <img
                src="https://cdn.honda.com.vn/motorbike-versions/Image360/October2024/1729507554/1.png"
                alt=""
                className="w-full h-auto object-cover"
              />
            </li>
          ))}
        </ul>
        <div className="md:w-5/6 w-full">
          <img
            src="https://cdn.honda.com.vn/motorbike-versions/Image360/October2024/1729507554/1.png"
            alt=""
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      <div className="flex gap-5"></div>
    </div>
  );
};

export default DetailMotor;
