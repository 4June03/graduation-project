import React from "react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SliderBanner = () => {
  return (
    <div className="h-[50vh] w-full">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <img
            src="https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0018290.jpg&w=3840&q=75"
            alt=""
            className="object-cover w-[100vw] h-auto"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0018290.jpg&w=3840&q=75"
            alt=""
            className="object-cover w-[100vw] h-auto"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0018290.jpg&w=3840&q=75"
            alt=""
            className="object-cover w-[100vw] h-auto"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderBanner;
