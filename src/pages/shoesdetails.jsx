import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import Footer from "../components/footer";
import { useCart } from "../context/CartContext";
import api from '../utils/axios'; // Updated import path

const CustomAlert = ({ message, type, onClose }) => (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
    <div className={`${
      type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
    } px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]`}>
      <div className={`${
        type === "success" ? "text-green-500" : "text-red-500"
      }`}>
        {type === "success" ? "✓" : "!"} 
      </div>
      <p className="flex-1 font-medium">{message}</p>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
    </div>
  </div>
);

const ShoeDetails = () => {
  const { id } = useParams(); 
  const location = useLocation(); 
  const { addToCart } = useCart(); 
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });
  const [shoe, setShoe] = useState(location.state?.shoe || null);
  const [loading, setLoading] = useState(!location.state?.shoe);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!shoe && id) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/products/${id}`);
          const data = response.data;
          setShoe({ ...data, id: data._id });
          setMainImage(data.image);
          setError(null);
        } catch (err) {
          setError('Failed to load product. Please try again later.');
          console.error('Error fetching product:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    } else if (shoe && !mainImage) {
      setMainImage(shoe.image);
    }
  }, [id, shoe]);

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert.show]);

  // Touch event handlers for mobile drag-to-scroll
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#dfd86b] pt-20 flex justify-center items-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-2">Loading product...</p>
      </div>
    );
  }

  if (error || !shoe) {
    return (
      <div className="min-h-screen bg-[#dfd86b] pt-20 flex justify-center items-center">
        <h1 className="text-2xl text-center text-red-500">
          {error || "Shoe not found!"}
        </h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setAlert({
        show: true,
        message: "Please select a size first!",
        type: "error"
      });
      return;
    }
    
    const cleanPrice = parseFloat(String(shoe.price).replace(/[^0-9.-]+/g, ""));
    const itemToAdd = {
      id: shoe.id,
      name: shoe.name,
      price: cleanPrice,
      size: selectedSize,
      image: shoe.image,
      quantity: 1
    };
    
    addToCart(itemToAdd);
    setAlert({
      show: true,
      message: "Added to cart successfully!",
      type: "success"
    });
  };

  return (
    <div className="min-h-screen bg-[#dfd86b] pt-12 md:pt-20">
      {/* Alert */}
      {alert.show && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
  
      {/* Main Content */}
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Thumbnails (Desktop) */}
          <div className="hidden md:block w-full md:w-1/6 flex flex-row md:flex-col items-center justify-center md:justify-start gap-4 mb-6 md:mb-0">
            {shoe.thumbnails?.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 md:w-20 md:h-20 object-cover cursor-pointer rounded-md ${
                  mainImage === thumb ? "border-2 border-black" : ""
                }`}
                onClick={() => setMainImage(thumb)}
              />
            ))}
          </div>
  
          {/* Middle - Main Shoe Image (Desktop) */}
          <div className="hidden md:block w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
            <img
              src={mainImage}
              alt={shoe.name}
              className="w-full h-auto max-h-[400px] md:max-h-[600px] object-contain rounded-lg"
            />
          </div>
  
          {/* Mobile View - Drag-to-Scroll Images */}
          <div
            ref={containerRef}
            className="md:hidden w-full overflow-auto flex gap-4 mb-6 cursor-grab"
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            onTouchCancel={handleMouseLeave}
          >
            {[shoe.image, ...(shoe.thumbnails || [])].map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Shoe Image ${index + 1}`}
                className="w-full h-auto max-h-[400px] object-contain rounded-lg flex-shrink-0"
              />
            ))}
          </div>
  
          {/* Right Side - Shoe Details */}
          <div className="w-full md:w-1/3 md:pr-8">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">{shoe.name}</h1>
            <p className="text-xl md:text-2xl font-semibold mb-4">MRP: ₹{shoe.price}</p>
            <p className="text-gray-600 mb-6">Inclusive of all taxes</p>
  
            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {["UK6", "UK7", "UK8", "UK9", "UK10"].map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 md:px-6 md:py-3 border text-base md:text-lg font-semibold rounded-lg ${
                      selectedSize === size ? "bg-black text-white" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
  
            {/* Add to Cart */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <button
                className="bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-900"
                onClick={handleAddToCart}
              >
                ADD to Cart
              </button>
              <button className="bg-gray-200 text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300">
                Favourite
              </button>
            </div>
          </div>
        </div>
      </div>
  
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ShoeDetails;
