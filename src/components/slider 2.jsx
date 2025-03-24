import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MemberBenefitsSlider from "./slider3";

const images = [
  "/image/b1.jpg",
  "/image/b2.jpg",
  "/image/b3.jpg",
  "/image/b4.jpg",
  "/image/b5.jpg",
  "/image/b6.jpg",
  "/image/b7.jpg",
  "/image/b8.jpg"
];

const labels = [
  "Training and Gym",
  "Basketball",
  "Running",
  "Football",
  "Tennis",
  "Yoga",
  "Skateboarding",
  "Dance"
];

const ShopBySportSlider = () => {
  return (
    <section className="text-center text-black pt-20 md:pt-30">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Shop By Sport</h2>

      {/* Swiper Slider */}
      <div className="relative w-full max-w-full mx-auto px-4 md:px-0">
        <Swiper
          className="slider-2"
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1} // Default for mobile
          navigation
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 }, // 2 slides on tablets
            1024: { slidesPerView: 3 }, // 3 slides on desktop
          }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index} className="slider-item-2 flex flex-col items-center">
              <img
                src={src}
                alt={labels[index]}
                className="w-full h-[300px] md:h-[300px] rounded-lg object-cover"
                // ✅ Ensures same height for mobile & desktop
              />
              <div className="mt-2 text-lg font-semibold">{labels[index]}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Additional Slider */}
      <MemberBenefitsSlider />
    </section>
  );
};


export default ShopBySportSlider;
