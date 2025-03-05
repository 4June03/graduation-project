import React from "react";
import RoundedButton from "../../components/common/RoundedButton";

interface DetailMovieInfoProps {
  movieName: string;
  roomType: string;
  movieCategories: string;
  movieDuration: string;
  movieActors: string;
  movieDirector: string;
  movieReleaseDate: string;
  movieDescription: string;
  movieNation: string;
}

const DetailMovieInfo: React.FC<DetailMovieInfoProps> = ({
  movieName,
  roomType,
  movieCategories,
  movieDuration,
  movieActors,
  movieDirector,
  movieReleaseDate,
  movieDescription,
  movieNation,
}) => {
  return (
    <div className="relative px-4 md:px-6 pb-10  flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <div
          className="h-[200px] w-full max-w-[150px] md:w-[200px] md:max-w-[200px]
        md:h-[250px] relative 
        "
        >
          <img
            src="https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2F0018364_0.jpg&w=1920&q=75"
            alt=""
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-bold md:text-xl">
            {movieName}{" "}
            <span className="ring-1 ring-white ml-2 p-1 rounded-md">
              {roomType}
            </span>{" "}
          </p>
          <div className="flex gap-2 text-[17px] mt-2 overflow-hidden truncate">
            <p>{movieCategories}</p>
            <p>- {movieNation}</p>
            <p>- {movieDuration}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div>
          <p>Đạo diễn: {movieDirector}</p>
          <p>Diễn viên: {movieActors}</p>
          <p>Khởi chiếu: {movieReleaseDate}</p>
        </div>

        <p>{movieDescription}</p>

        <p className="text-red-500">Kiểm duyệt: .</p>

        <div className="flex gap-4 items-center justify-center">
          <p className="underline text-white cursor-pointer">
            Chi tiết nội dung
          </p>
          <RoundedButton
            text="Xem trailer"
            className="ring-1 ring-yellow-500 text-yellow-500 py-1 px-10"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailMovieInfo;
