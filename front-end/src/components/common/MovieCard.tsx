import React from "react";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  className?: string;
  titleClassName?: string;
  image?: string;
  title?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ className, titleClassName }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/movie");
  };

  return (
    <>
      <div className={` ${className}`} onClick={handleClick}>
        <img
          src="https://chieuphimquocgia.com.vn/_next/image?url=https%3A%2F%2Fapi.chieuphimquocgia.com.vn%2FContent%2FImages%2F0018333_0.jpg&w=384&q=75"
          alt=""
          className="object-cover object-center rounded-xl transition duration-500"
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: 0,
            color: "transparent",
          }}
        />
      </div>
      <div
        className={`mt-2 text-sm font-semibold text-center relative  ${titleClassName}`}
      >
        CUỘC ĐÀO TẨU TRÊN KHÔNG-T16
      </div>
    </>
  );
};

export default MovieCard;
