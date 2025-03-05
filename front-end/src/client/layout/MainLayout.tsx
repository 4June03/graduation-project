import React from "react";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col w-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
