import React from "react";

interface showAllButtonProps {
  className?: string;
  onClick?: () => void;
}

const ShowAllButton: React.FC<showAllButtonProps> = ({
  className,
  onClick,
}) => {
  return (
    <button
      className={`primary-font-size underline ${className}`}
      onClick={onClick}
    >
      Xem tất cả
    </button>
  );
};

export default ShowAllButton;
