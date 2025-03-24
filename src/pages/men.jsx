import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import api from '../utils/axios'; // assuming you have an axios instance in axios.js

const categories = ["Lifestyle", "Jordan", "Running", "Football", "Basketball"];
const genders = ["Men", "Women"];
const sizes = [7, 8, 9, 10];

function Men() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("Men");
  const [searchQuery, setSearchQuery] = useState("");
  const [showGender, setShowGender] = useState(false);
  const [showSize, setShowSize] = useState(false);
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) {
      setSearchQuery(search);
      setSelectedCategory("");
    } else {
      setSearchQuery("");
    }
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/products");
        const data = response.data;
        setShoes(data);
        setError(null);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    const params = new URLSearchParams(location.search);
    navigate(gender === "Men" ? `/men?${params.toString()}` : `/women?${params.toString()}`);
  };

  const handleCategoryChange = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
      setSearchQuery("");
      navigate("/men");
    }
  };

  const handleShoeClick = (shoe) => {
    navigate(`/shoesdetails/${shoe._id}`, { state: { shoe } });
  };

  const filteredShoes = shoes.filter(
    (shoe) =>
      shoe.gender === selectedGender &&
      (selectedCategory ? shoe.category === selectedCategory : true) &&
      (searchQuery === "" ||
        shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shoe.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row p-4 min-h-screen bg-[#dfd86b]">
        <div className="hidden md:block w-1/4 p-4 border-r-2 border-gray-300">
          <h2 className="font-bold mb-4">Categories</h2>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`block mb-2 px-4 py-2 rounded ${
                selectedCategory === category
                  ? "text-blue-600 font-bold"
                  : "text-black"
              }`}
            >
              {category}
            </button>
          ))}

          <div className="border-t-2 border-gray-300 my-4"></div>
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Gender</h2>
            <button onClick={() => setShowGender(!showGender)}>
              {showGender ? "▲" : "▼"}
            </button>
          </div>
          {showGender && (
            <div>
              {genders.map((gender) => (
                <button
                  key={gender}
                  onClick={() => handleGenderChange(gender)}
                  className={`block mb-2 px-4 py-2 rounded ${
                    selectedGender === gender
                      ? "bg-blue-500 text-white font-bold"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          )}

          <div className="border-t-2 border-gray-300 my-4"></div>
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Size</h2>
            <button onClick={() => setShowSize(!showSize)}>
              {showSize ? "▲" : "▼"}
            </button>
          </div>
          {showSize &&
            sizes.map((size) => (
              <button
                key={size}
                className="block mb-2 px-4 py-2 rounded bg-gray-200 text-black"
              >
                {size}
              </button>
            ))}
        </div>

        <div className="md:hidden p-4">
          <div className="mb-4">
            <h2 className="font-bold text-lg mb-2">Categories</h2>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded text-sm ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white font-bold"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h2 className="font-bold text-lg mb-2">Gender</h2>
            <div className="flex gap-2">
              {genders.map((gender) => (
                <button
                  key={gender}
                  onClick={() => handleGenderChange(gender)}
                  className={`px-4 py-2 rounded text-sm ${
                    selectedGender === gender
                      ? "bg-blue-500 text-white font-bold"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">Sizes</h2>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 rounded text-sm bg-gray-200 text-black"
                >
                  UK {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2">Loading products...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-8 text-red-500">
              {error}
            </div>
          ) : filteredShoes.length > 0 ? (
            filteredShoes.map((shoe) => (
              <div
                key={shoe._id}
                className="p-4 cursor-pointer hover:shadow-lg transition duration-300"
                onClick={() => handleShoeClick(shoe)}
              >
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  className="w-full"
                  style={{ width: "100%", height: "300px", objectFit: "cover" }}
                />
                <h3 className="font-bold">{shoe.name}</h3>
                <p>{shoe.category}</p>
                <p>₹{shoe.price}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-red-500">
              No shoes found for "{searchQuery || selectedCategory}"
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Men;
