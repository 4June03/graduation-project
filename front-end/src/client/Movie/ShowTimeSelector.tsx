import React, { useState } from "react";
import RoundedButton from "../../components/common/RoundedButton";

interface ShowDay {
  day: string;
  date: string;
  month: string;
  showTimes: string[];
}

interface ShowTimeSelectorProps {
  showDays: ShowDay[];
}

const ShowTimeSelector: React.FC<ShowTimeSelectorProps> = ({ showDays }) => {
  const [selectedDay, setSelectedDay] = useState(showDays[0].date);
  const [ShowTimes, setShowTimes] = useState(showDays[0].showTimes);

  const handleChangeDay = (date: string) => {
    setSelectedDay(date);

    setShowTimes(
      showDays.find((showday) => showday.date === date)?.showTimes || []
    );
  };

  return (
    <>
      <div className="flex h-[91px] text-xs bg-[#1A1D23] justify-center gap-2">
        {showDays.map((showDay) => (
          <>
            <div
              className={`h-full  text-white flex flex-col items-center justify-center px-6 gap-1 cursor-pointer ${
                selectedDay === showDay.date ? "bg-red-500" : ""
              }`}
              onClick={() => handleChangeDay(showDay.date)}
            >
              <p>th.{showDay.month}</p>
              <p className="font-bold text-xl">{showDay.date}</p>
              <p>{showDay.day}</p>
            </div>
          </>
        ))}
      </div>
      <div className="mt-4 text-sm mx-4 md:px-6 lg:mx-auto text-center">
        <p className="text-orange-500">
          <span className="font-bold">Lưu ý: </span>Khán giả dưới 13 tuổi chỉ
          chọn suất chiếu kết thúc trước 22h và Khán giả dưới 16 tuổi chỉ chọn
          suất chiếu kết thúc trước 23h.
        </p>
        <div className="flex gap-3 justify-center py-4 flex-wrap ">
          {ShowTimes.map((showtime) => (
            <>
              <RoundedButton
                text={showtime}
                className="ring-1 font-bold text-[16px] px-14 hover:bg-black/90 basis-1/6"
              />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowTimeSelector;
