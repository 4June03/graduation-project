import React from "react";

const DetailMovieBanner = () => {
  return (
    <div className="w-full h-[250px] md:h-[300px] xl:h-[473px] relative wrapper">
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2F0018364_0.jpg&w=1920&q=75"
          alt=""
          className="object-cover w-full overflow-hidden h-full"
        />
      </div>
      <div className="absolute bg-primary/60 inset-0 w-full h-full z-10"></div>
      <div className="hidden xl:block absolute w-full inset-0 m-auto z-20">
        <img
          src="https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2F0018364_0.jpg&w=1920&q=75"
          alt=""
          className="object-cover w-full overflow-hidden h-full"
        />
      </div>
    </div>
  );
};

export default DetailMovieBanner;
