import React from "react";
import HeaderBar from "../../components/common/HeaderBar";
import ShowingFilmSlide from "./ShowingFilmSlide";

const ShowingFilm = () => {
  return (
    <div className="w-full flex flex-col items-center mt-4 px-4 ">
      <HeaderBar header="Phim đang chiếu" className="" />
      <ShowingFilmSlide />
    </div>
  );
};

export default ShowingFilm;
