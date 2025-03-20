import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import DetailMotor from "@/client/products/DetailMotor";

const MainLayout = () => {
  return (
    <div className=" w-full">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
