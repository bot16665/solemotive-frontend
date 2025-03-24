import React, { useState } from "react";
import Footer from "./footer";

const categories = [
  {
    title: "Air Max",
    items: ["Air Max 90", "Air Max 95", "Air Max 97", "Air Max 270", "Air Max 720", "All Air Max", "Air Max Invigor", "Air Max 1", "Air Max 2015", "Air Max 2017"],
  },
  {
    title: "Jordan",
    items: ["Jordan 1", "Jordan 4", "Jordan 5", "Jordan 6", "Jordan 11", "Jordan 12", "Jordan 13", "Jordan 14", "Jordan 15", "Jordan 16"],
  },
  {
    title: "Running",
    items: ["Nike Air Zoom Pegasus", "Nike Vaporfly", "Nike Air Max Invigor", "Nike Flex Experience", "Nike Air Max 270 React", "Nike Air Zoom Structure", "Nike Air Max 2017", "Nike Air Max 2018", "Nike Air Max 2019", "Nike Air Max 2020"],
  },
  {
    title: "Basketball",
    items: ["Nike LeBron", "Nike KD", "Nike Kyrie", "Nike Paul George", "Nike Zoom Freak", "Nike Air Force 1", "Nike Hyperdunk", "Nike Kobe", "Nike PG", "Nike Zoom"],
  },
];

const TagTable = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Categories Grid (Hidden on Mobile) */}
      <div className="hidden md:flex flex-wrap justify-center gap-8 md:gap-50 py-8 md:py-16 flex-grow">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group text-black text-center"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Category Title */}
            <h3 className="text-2xl md:text-3xl font-bold cursor-pointer transition-all duration-300">
              {category.title}
            </h3>

            {/* Category Items */}
            <ul className="list-none p-0 mt-2">
              {category.items.map((item, idx) => (
                <li
                  key={idx}
                  className={`mt-2 ${idx >= 4 && hovered !== index ? "hidden" : "block"} transition-all duration-300`}
                >
                  <a href="#" className="text-black transition duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};


export default TagTable;

