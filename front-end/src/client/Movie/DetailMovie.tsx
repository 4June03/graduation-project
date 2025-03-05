import React from "react";
import DetailMovieBanner from "./DetailMovieBanner";
import DetailMovieInfo from "./DetailMovieInfo";
import ShowTimeSelector from "./ShowTimeSelector";

interface DetailMovieProps {
  id?: string;
}

const showDays = [
  {
    day: "thứ tư",
    date: "05",
    month: "3",
    showTimes: ["16:10", "18:20", "20:30", "22:40"],
  },

  {
    day: "thứ năm",
    date: "06",
    month: "3",
    showTimes: [
      "09:40",
      "10:00",
      "11:50",
      "14:00",
      "16:10",
      "18:20",
      "20:30",
      "22:40",
    ],
  },
  {
    day: "thứ sáu",
    date: "07",
    month: "3",
    showTimes: ["16:10", "18:20", "20:30", "22:40"],
  },
  {
    day: "thứ bảy",
    date: "08",
    month: "3",
    showTimes: ["16:10", "18:20", "20:30", "22:40"],
  },
];

const DetailMovie = () => {
  return (
    <div className="flex-none">
      <DetailMovieBanner />
      <DetailMovieInfo
        movieName="MICKEY 17"
        roomType="2D"
        movieCategories="Hành động, khoa học viễn tưởng"
        movieDuration="100 phút"
        movieDirector="Boong Joon Ho"
        movieActors="Robert Pattinson; Naomi Ackie; Steven Yeun; Toni Collette; Mark Ruffalo"
        movieReleaseDate="14/03/2025"
        movieDescription="Được chuyển thể từ tiểu thuyết Mickey 7 của nhà văn Edward Ashton, Cuốn tiểu thuyết xoay quanh các phiên bản nhân bản vô tính mang tên “Mickey”, dùng để thay thế con người thực hiện cuộc chinh phạt nhằm thuộc địa hóa vương quốc băng giá Niflheim. Mỗi khi một Mickey chết đi, một Mickey mới sẽ được tạo ra, với phiên bản được đánh số 1, 2, 3 tiếp theo. Mickey số 17 được cho rằng đã chết, để rồi một ngày kia, hắn quay lại và bắt gặp phiên bản tiếp theo của mình."
        movieNation="Mỹ"
      />
      <ShowTimeSelector showDays={showDays} />
    </div>
  );
};

export default DetailMovie;
