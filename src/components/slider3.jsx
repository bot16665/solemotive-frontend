import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import TagTable from "./lowpart";

const sliderItems = [
  {
    img: "/image/p1.jpg",
    title: "Your Exclusive Access",
    description: "Member Product",
    button: "Shop",
  },
  {
    img: "/image/p2.png",
    title: "Your Customisation Service",
    description: "Nike By You",
    button: "Customise",
  },
  {
    img: "/image/p3.jpg",
    title: "How We Say Thank You",
    description: "Member Rewards",
    button: "Celebrate",
  },
  {
    img: "/image/p4.png",
    title: "Join the Upcoming Workshop",
    description: "Exclusive Event",
    button: "Register",
  },
  {
    img: "/image/p5.jpg",
    title: "Discounts Just for You",
    description: "Special Offers",
    button: "Shop Now",
  },
  {
    img: "/image/p6.jpg",
    title: "Be the First to Know",
    description: "VIP Access",
    button: "Explore",
  },
];

const MemberBenefitsSlider = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 pt-20 md:pt-30">
      {/* Heading */}
      <h2 className="text-black text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">
        Member Benefits
      </h2>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={20} // Reduced space for mobile
        slidesPerView={1} // Default for mobile
        navigation
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 }, // 2 slides on tablets
          1024: { slidesPerView: 3 }, // 3 slides on desktop
        }}
        className="px-4 md:px-6"
      >
        {sliderItems.map((item, index) => (
          <SwiperSlide key={index} className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-[500px] md:h-[500px] object-cover rounded-lg" 
              // ✅ Ensures the same height for mobile & desktop
            />
            <div className="absolute bottom-5 left-5 text-white">
              <p className="text-base md:text-lg">{item.description}</p>
              <h3 className="text-xl md:text-2xl font-bold">{item.title}</h3>
              <button className="mt-2 px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition">
                {item.button}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Additional Component */}
      <TagTable />
    </div>
  );
};


export default MemberBenefitsSlider;
