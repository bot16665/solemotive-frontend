import React, { useState } from "react";
import bannerImage from "/image/banner.jpg"; // Ensure correct path
import ImageSlider from "./slider";
import "swiper/css";
import "swiper/css/navigation";

const HomePage = () => {
  const images = [
    "/image/Vomero 5.png",
    "/image/Air Force 1.png",
    "/image/Air Jorden 1.png",
    "/image/Dunks.png",
    "/image/Cortez.png",
    "/image/Blazer.png",
    "/image/Air Max DN.png",
    "/image/Metcon.png",
    "/image/V2K.png",
    "/image/pegasus 41.png",
  ];

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollAmount = 320; // Adjust scroll step size (matches image width)

  const moveSlide = (direction) => {
    // Calculate the new scroll position
    const newScrollPosition = scrollPosition + direction * scrollAmount;

    // Ensure the scroll position stays within bounds
    const maxScroll = (images.length - 1) * scrollAmount;
    const clampedScrollPosition = Math.max(0, Math.min(newScrollPosition, maxScroll));

    setScrollPosition(clampedScrollPosition);
  };

  return (
    <div className="min-h-screen flex flex-col pt-20">
      {/* Video Section */}
      <div className="w-full flex justify-center mb-0">
        <video autoPlay muted loop className="w-full h-[300px] md:h-[600px] object-cover">
          <source src="/video/Nike ads.mp4" type="video/mp4" />
        </video>
      </div>
    

      {/* Main Content */}
      <div className="flex-grow container mx-auto px-4 py-10">
        {/* Text Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Welcome to Our Shoe Store</h1>
          <p className="text-base md:text-lg text-gray-600 mt-2">
            Explore the latest and hottest collections of sneakers.
          </p>
        </div>

        {/* Banner Section */}
        <div className="w-full flex justify-center">
          <img
            src={bannerImage}
            alt="Nike Vomero 18"
            className="w-full h-auto max-h-[300px] md:max-h-[500px] object-cover"
          />
        </div>

        {/* New Section After Banner */}
        <div className="text-center mt-8 md:mt-16 mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            CUSHIONING TO THE MAX
          </h2>
          <p className="text-base md:text-lg text-gray-600 mt-2">Coming 2.27</p>
          <button className="mt-4 px-6 py-2 bg-black text-white font-semibold rounded-full shadow-md hover:bg-gray-800 transition">
            Notify Me
          </button>
        </div>

        {/* Featured Section */}
        <div className="w-full max-w-[1300px] px-4 md:px-8">
  {/* Title */}
  <div className="text-center mb-6">
    <h2 className="text-xl md:text-2xl font-bold text-left">Featured</h2>
  </div>

  {/* Image Grid (Same Layout for Mobile & Desktop) */}
  <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
    
    {/* Poster 1 */}
    <div className="relative flex-1 m-2">
      <img src="/image/banner 1.png" alt="Poster Image 1" className="w-full h-auto" />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center p-4">
        <h2 className="text-lg md:text-lg font-bold">Nothing Beats The City</h2>
        <button className="bg-[#FF5733] hover:bg-[#C70039] text-white font-medium px-5 py-2 rounded mt-2 transition">
          SHOP NOW
        </button>
      </div>
    </div>

    {/* Poster 2 */}
    <div className="relative flex-1 m-2">
      <img src="/image/banner 2.png" alt="Poster Image 2" className="w-full h-auto" />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center p-4">
        <h2 className="text-lg md:text-lg font-bold">Vomero Roam</h2>
        <button className="bg-[#FF5733] hover:bg-[#C70039] text-white font-medium px-5 py-2 rounded mt-2 transition">
          SHOP NOW
        </button>
      </div>
    </div>

    {/* Poster 3 */}
    <div className="relative flex-1 m-2">
      <img src="/image/banner 3.jpg" alt="Poster Image 3" className="w-full h-auto" />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center p-4">
        <h2 className="text-lg md:text-lg font-bold">LeBron XX|| 'Currency'</h2>
        <button className="bg-[#FF5733] hover:bg-[#C70039] text-white font-medium px-5 py-2 rounded mt-2 transition">
          SHOP NOW
        </button>
      </div>
    </div>

  </div>
</div>


        {/* Slider Section */}
        <div className="relative w-full overflow-hidden pt-12 md:pt-20">
          <h2 className="text-black text-2xl md:text-4xl font-bold text-center py-8 md:py-12">Classics Spotlight</h2>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white text-2xl p-3 z-10"
            onClick={() => moveSlide(-1)}
            disabled={scrollPosition === 0}
          >
            &#10094;
          </button>
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${scrollPosition}px)` }}>
            {images.map((src, index) => (
              <img key={index} src={src} alt={`Slide ${index + 1}`} className="w-[300px] md:w-[400px] mx-1 object-cover" />
            ))}
          </div>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white text-2xl p-3 z-10"
            onClick={() => moveSlide(1)}
            disabled={scrollPosition >= (images.length - 1) * scrollAmount}
          >
            &#10095;
          </button>
        </div>

        {/* Banner 2 */}
        <div className="text-left mt-4 pt-12 md:pt-20">
          <h2 className="text-black text-2xl md:text-4xl font-bold text-left py-8 md:py-12">Don't Miss</h2>
          <img src="/image/advertise.jpg" alt="Banner 2" className="w-full mt-0" />
          <div className="text-center mt-8 md:mt-16 mb-12 md:mb-20">
            <p className="text-base md:text-lg mt-2">Women's Air Jorden 4RM</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              RIDE EASY
            </h2>
            <p className="text-base md:text-lg mt-2">This now taken on a classic comes in a comfortable low profile with iconic style.</p>
            <button className="mt-4 px-6 py-2 bg-black text-white font-semibold rounded-full shadow-md hover:bg-gray-800 transition">
              Shop
            </button>
          </div>
        </div>

        {/* Ads 3 */}
        <div className="flex flex-col md:flex-row justify-center mt-8 md:mt-16 mb-12 md:mb-20">
          <div className="flex-1 rounded-lg relative mb-4 md:mb-0">
            <video autoPlay muted loop className="w-full rounded-lg">
              <source src="/video/ads 1.mp4" type="video/mp4" />
            </video>
            <div className="absolute bottom-0 left-0 p-4 bg-opacity-50 text-white font-bold" style={{ fontFamily: 'Arial, Fantasy' }}>
              <p>New Arrivals</p>
            </div>
          </div>
          <div className="flex-1 md:ml-4 rounded-lg relative mb-4 md:mb-0">
            <video autoPlay muted loop className="w-full rounded-lg">
              <source src="/video/ads 2.mp4" type="video/mp4" />
            </video>
            <div className="absolute bottom-0 left-0 p-4 bg-opacity-50 text-white font-bold" style={{ fontFamily: 'Arial, Fantasy' }}>
              <p>Nike Air Jordan 1 Retro High OG - George Green</p>
            </div>
          </div>
          <div className="flex-1 md:ml-4 rounded-lg relative">
            <video autoPlay muted loop className="w-full rounded-lg">
              <source src="/video/ads 3.mp4" type="video/mp4" />
            </video>
            <div className="absolute bottom-0 left-0 p-4 bg-opacity-50 text-white font-bold" style={{ fontFamily: 'Arial, Fantasy' }}>
              <p>Nike Sneakers Collection</p>
            </div>
          </div>
        </div>
        <ImageSlider />
      </div>
    </div>
  );
}

export default HomePage;
