import React from "react";
import HeaderRoundedIcon from "./HeaderRoundedIcon";
import ShowAllButton from "./ShowAllButton";

interface HeaderBarProps {
  header: string;
  className?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ header, className }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-2 items-center">
        <HeaderRoundedIcon />{" "}
        <p className={`header-primary-font-size font-semibold ${className}`}>
          {header}
        </p>
      </div>
      <ShowAllButton />
    </div>
  );
};

export default HeaderBar;
