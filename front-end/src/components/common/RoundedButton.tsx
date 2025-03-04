import React from "react";

interface RoundedButtonProps {
  text: string;
  className?: string;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  text,
  className = "",
}) => {
  return (
    <button
      className={`rounded-full h-10 flex justify-center items-center text-sm font-medium py-2 px-8 focus-visible:outline-0 ${className}`}
    >
      {text}
    </button>
  );
};

export default RoundedButton;
