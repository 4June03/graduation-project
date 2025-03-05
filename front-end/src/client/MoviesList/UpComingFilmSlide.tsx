import React from "react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../../components/common/MovieCard";

const UpComingFilmSlide = () => {
  return (
    <div className="w-full mx-auto mt-10">
      <Swiper
        slidesPerView={3}
        breakpoints={{
          1280: {
            slidesPerView: 4,
          },
        }}
        centerInsufficientSlides={true}
        spaceBetween={0}
        autoplay={true}
        grabCursor={true}
        initialSlide={1}
        centeredSlides={true}
        loop={true}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 0,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper xl:hidden"
      >
        <SwiperSlide>
          <MovieCard
            className="relative w-[220px] h-[290px] md:w-[280px] md:h-[390px]"
            titleClassName="line-clamp-2 w-[220px] md:w-[280px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard
            className="relative w-[220px] h-[290px] md:w-[280px] md:h-[390px]"
            titleClassName="line-clamp-2 w-[220px] md:w-[280px]"
          />
        </SwiperSlide>

        <SwiperSlide>
          <MovieCard
            className="relative w-[220px] h-[290px] md:w-[280px] md:h-[390px]"
            titleClassName="line-clamp-2 w-[220px] md:w-[280px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard
            className="relative w-[220px] h-[290px] md:w-[280px] md:h-[390px]"
            titleClassName="line-clamp-2 w-[220px] md:w-[280px]"
          />
        </SwiperSlide>

        <SwiperSlide>
          <MovieCard
            className="relative w-[220px] h-[290px] md:w-[280px] md:h-[390px]"
            titleClassName="line-clamp-2 w-[220px] md:w-[280px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard
            className="relative w-[220px] h-[290px] md:w-[280px] md:h-[390px]"
            titleClassName="line-clamp-2 w-[220px] md:w-[280px]"
          />
        </SwiperSlide>

        <SwiperSlide>
          <MovieCard
            className="relative w-[220px] h-[290px] md:w-[280px] md:h-[390px]"
            titleClassName="line-clamp-2 w-[220px] md:w-[280px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard
            className="relative w-[220px] h-[290px] md:w-[280px] md:h-[390px]"
            titleClassName="line-clamp-2 w-[220px] md:w-[280px]"
          />
        </SwiperSlide>

        <SwiperSlide>
          <MovieCard
            className="relative w-[220px] h-[290px] md:w-[280px] md:h-[390px]"
            titleClassName="line-clamp-2 w-[220px] md:w-[280px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard
            className="relative w-[220px] h-[290px] md:w-[280px] md:h-[390px]"
            titleClassName="line-clamp-2 w-[220px] md:w-[280px]"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default UpComingFilmSlide;
