import CategoryMotorBanner from "@/client/banner/CategoryMotorBanner";
import FunctionBar from "@/client/products/FunctionBar";
import ListProductByTab from "@/client/products/ListProductByTab";
import MenuTab from "@/client/products/MenuTab";
import { useState } from "react";
import { Breadcrumb, Pagination } from "antd";
import FilterDrawer from "@/client/products/ui components/FilterDrawer";

const MotorByCategoryPage = () => {
  const [activeTab, setActiveTab] = useState("Tất cả");

  const handleChangeTab = (tab: string) => {
    setActiveTab(tab);
  };

  const [isDrawerFilterOpen, setIsDrawerFilterOpen] = useState(false);

  return (
    <>
      <CategoryMotorBanner className="hidden md:block" />

      <div className="w-full container">
        <Breadcrumb className="my-4" separator=">">
          <Breadcrumb.Item>
            <a href="/">Trang chủ</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/category">Danh mục</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Motor</Breadcrumb.Item>
        </Breadcrumb>

        <MenuTab activeTab={activeTab} onTabChange={handleChangeTab} />
        <FunctionBar openDrawerFilter={() => setIsDrawerFilterOpen(true)} />
        <ListProductByTab activeTab={activeTab} />
        <Pagination align="end" defaultCurrent={1} total={50} />
        <FilterDrawer
          isOpen={isDrawerFilterOpen}
          onClose={() => setIsDrawerFilterOpen(false)}
        />
      </div>
    </>
  );
};

export default MotorByCategoryPage;
