import React from "react";
import HeaderBar from "../../components/common/HeaderBar";
import UpComingFilmSlide from "./UpComingFilmSlide";

const UpComingFilm = () => {
  return (
    <div className="w-full flex flex-col items-center mt-4 px-4 ">
      <HeaderBar header="Phim sắp chiếu" className="" />
      <UpComingFilmSlide />
    </div>
  );
};

export default UpComingFilm;
