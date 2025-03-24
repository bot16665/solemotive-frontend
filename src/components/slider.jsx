import React from "react";
import { Link } from "react-router-dom";
import ShopBysportSlider from "./slider 2"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ImageSlider = () => {
    const images = [
        { src: "/image/buy/Nike Air Force 1 LE.png", name: "Nike Air Force 1 LE", price: "6,995.00", category: "Men's Shoes" },
        { src: "/image/buy/Nike Cortez.png", name: "Nike Cortez", price: "8595.00", category: "Women's Shoes" },
        { src: "/image/buy/Nike Air Force 1 '07.png", name: "Nike Air Force 1 '07", price: "8,195.00", category: "Men's Shoes" },
        { src: "/image/buy/Nike Air Force 1 '07 Texture.png", name: "Nike Air Force 1 '07 Texture", price: "9,695.00", category: "Men's Shoes" },
        { src: "/image/buy/Nike Air Force 1 '07 White.png", name: "Nike Air Force 1 '07 White", price: "7,495.00", category: "Men's Shoes" },
        { src: "/image/buy/Nike Pegasus 41.png", name: "Nike Pegasus 41", price: "11,895.00", category: "Men's Running Shoes" },
        { src: "/image/buy/Jordan Spizike Low.jpeg", name: "Jordan Spizike Low", price: "14,274.00", category: "Men's Shoes" },
        { src: "/image/buy/Luka 3 PF.png", name: "Luka 3 PF", price: "11,895.00", category: "Basketball Shoes" },
        { src: "/image/buy/Nike C1TY.png", name: "Nike C1TY", price: "8,695.00", category: "Men's Shoes" },
        { src: "/image/buy/Nike Pegasus Premium.png", name: "Nike Pegasus Premium", price: "19,295.00", category: "Men's Running Shoes" },
    ];

    return (
      <div className="max-w-6xl mx-auto py-12">
        {/* Heading */}
        <h2 className="text-black text-3xl md:text-4xl font-bold text-center py-8 md:py-12">
          Trending Now: Triple White
        </h2>
    
        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1} // Default for mobile
          navigation
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 }, // 2 slides on tablets
            1024: { slidesPerView: 4 }, // 4 slides on desktop
          }}
          className="px-4 md:px-6"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="relative rounded-lg overflow-hidden shadow-lg">
              <Link to="/men">
                <img
                  src={image.src}
                  alt={image.name}
                  className="w-full h-[300px] md:h-[300px] object-cover rounded-lg"
                  // ✅ Ensures same height for mobile & desktop
                />
                <div className="text-center mt-2">
                  <p className="text-lg font-semibold">{image.name}</p>
                  <p className="text-gray-600">MRP: {image.price}</p>
                  <p className="text-gray-600">{image.category}</p>
                </div>
                <div className="mt-2 text-center">
                  <button className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
                    Shop
                  </button>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
    
        {/* Additional Slider */}
        <ShopBysportSlider />
      </div>
    );
    
};

export default ImageSlider;

