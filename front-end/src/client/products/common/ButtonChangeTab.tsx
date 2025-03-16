import React, { FC } from "react";

interface ButtonChangeTabProps {
  text: string;
  onClick: (tab: string) => void;
  className: string;
  activeTab: string;
}

const ButtonChangeTab: FC<ButtonChangeTabProps> = ({
  text,
  onClick,
  className,
  activeTab,
}) => {
  return (
    <button
      onClick={() => onClick(text)}
      className={`py-4 px-6 font-bold  ${
        activeTab == text ? className : ""
      } text`}
    >
      {text}
    </button>
  );
};

export default ButtonChangeTab;
