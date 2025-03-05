import React from "react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../../components/common/MovieCard";

// interface ShowingFilmSlideProps{

// }

const ShowingFilmSlide = () => {
  return (
    <div className="w-full max-w-[1280px] mx-auto mt-10">
      <Swiper
        slidesPerView={4}
        breakpoints={{
          1100: {
            slidesPerView: 6,
          },
          765: {
            slidesPerView: 4,
          },
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        effect={"coverflow"}
        grabCursor={true}
        initialSlide={3}
        centeredSlides={true}
        loop={true}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 100,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper xl:hidden"
      >
        <SwiperSlide>
          <MovieCard
            className="h-[290px] md:h-[390px] w-[200px] md:w-[300px] relative"
            titleClassName="line-clamp-2 w-[200px] md:w-[300px]"
          />
        </SwiperSlide>

        <SwiperSlide>
          <MovieCard
            className="h-[290px] md:h-[390px] w-[200px] md:w-[300px] relative"
            titleClassName="line-clamp-2 w-[200px] md:w-[300px]"
          />
        </SwiperSlide>

        <SwiperSlide>
          <MovieCard
            className="h-[290px] md:h-[390px] w-[200px] md:w-[300px] relative"
            titleClassName="line-clamp-2 w-[200px] md:w-[300px]"
          />
        </SwiperSlide>

        <SwiperSlide>
          <MovieCard
            className="h-[290px] md:h-[390px] w-[200px] md:w-[300px] relative"
            titleClassName="line-clamp-2 w-[200px] md:w-[300px]"
          />
        </SwiperSlide>

        <SwiperSlide>
          <MovieCard
            className="h-[290px] md:h-[390px] w-[200px] md:w-[300px] relative"
            titleClassName="line-clamp-2 w-[200px] md:w-[300px]"
          />
        </SwiperSlide>

        <SwiperSlide>
          <MovieCard
            className="h-[290px] md:h-[390px] w-[200px] md:w-[300px] relative"
            titleClassName="line-clamp-2 w-[200px] md:w-[300px]"
          />
        </SwiperSlide>

        <SwiperSlide>
          <MovieCard
            className="h-[290px] md:h-[390px] w-[200px] md:w-[300px] relative"
            titleClassName="line-clamp-2 w-[200px] md:w-[300px]"
          />
        </SwiperSlide>

        <SwiperSlide>
          <MovieCard
            className="h-[290px] md:h-[390px] w-[200px] md:w-[300px] relative"
            titleClassName="line-clamp-2 w-[200px] md:w-[300px]"
          />
        </SwiperSlide>

        <SwiperSlide>
          <MovieCard
            className="h-[290px] md:h-[390px] w-[200px] md:w-[300px] relative"
            titleClassName="line-clamp-2 w-[200px] md:w-[300px]"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ShowingFilmSlide;
