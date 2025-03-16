import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper-bundle.css";

// import required modules
import { Pagination } from "swiper/modules";
import { FC } from "react";

interface CategoryMotorBannerProps {
  className?: string;
}

const CategoryMotorBanner: FC<CategoryMotorBannerProps> = ({ className }) => {
  return (
    <div className={className}>
      <Swiper
        style={{ height: "60vh" }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        <SwiperSlide>
          <img
            src="https://yamaha-motor.com.vn/wp/wp-content/uploads/2021/09/08J-Sirius-Kv-MEDIA-1.jpg"
            alt=""
            className="object-cover w-full h-full"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://yamaha-motor.com.vn/wp/wp-content/uploads/2021/09/08J-Sirius-Kv-MEDIA-1.jpg"
            alt=""
            className="object-cover w-full h-full"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://yamaha-motor.com.vn/wp/wp-content/uploads/2022/09/R15V4-Visual-2-1-FA-scaled.jpg"
            alt=""
            className="object-cover w-full h-full"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://yamaha-motor.com.vn/wp/wp-content/uploads/2021/09/08J-Sirius-Kv-MEDIA-1.jpg"
            alt=""
            className="object-cover w-full h-full"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CategoryMotorBanner;
