import ButtonChangeTab from "@/client/products/common/ButtonChangeTab";
import React, { FC } from "react";

interface MenuTabProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MenuTab: FC<MenuTabProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full mt-10">
      <ul className="flex border-b-2 border-b-gray-400">
        <li>
          <ButtonChangeTab
            text="Tất cả"
            onClick={onTabChange}
            activeTab={activeTab}
            className="border-b-4 border-b-red-500"
          />
        </li>
        <li>
          <ButtonChangeTab
            text="Xe tay ga"
            onClick={onTabChange}
            activeTab={activeTab}
            className="border-b-4 border-b-red-500"
          />
        </li>
        <li>
          <ButtonChangeTab
            text="Xe số"
            onClick={onTabChange}
            activeTab={activeTab}
            className="border-b-4 border-b-red-500"
          />
        </li>
        <li>
          <ButtonChangeTab
            text="Xe phân khối lớn"
            onClick={onTabChange}
            activeTab={activeTab}
            className="border-b-4 border-b-red-500"
          />
        </li>
        <li>
          <ButtonChangeTab
            text="Xe điện"
            onClick={onTabChange}
            activeTab={activeTab}
            className="border-b-4 border-b-red-500"
          />
        </li>
        <li>
          <ButtonChangeTab
            text="Xe côn tay"
            onClick={onTabChange}
            activeTab={activeTab}
            className="border-b-4 border-b-red-500"
          />
        </li>
      </ul>
    </div>
  );
};

export default MenuTab;
