import React from "react";

const Footer = () => {
  return (
    <footer className="text-white p-6 md:p-10 w-full flex-grow flex-1 bg-[#dfd86b]">
      {/* Horizontal Line */}
      <hr className="border-t border-gray-600 my-4 md:my-6" />
  
      {/* Footer Sections */}
      <div className="flex flex-col md:flex-row justify-between flex-wrap">
        {/* Resource Section */}
        <div className="min-w-[200px] text-black mb-6 md:mb-4">
          <h1 className="text-base md:text-lg font-bold uppercase mb-2">Resource</h1>
          <ul>
            <li><a href="#" className="text-xs md:text-sm hover:text-orange-500 transition">Find A Store</a></li>
            <li><a href="#" className="text-xs md:text-sm hover:text-orange-500 transition">Become a member</a></li>
            <li><a href="#" className="text-xs md:text-sm hover:text-orange-500 transition">Send us Feedback</a></li>
          </ul>
        </div>
  
        {/* Help Section */}
        <div className="min-w-[200px] text-black mb-6 md:mb-4">
          <h1 className="text-base md:text-lg font-bold uppercase mb-2">Help</h1>
          <ul>
            <li><a href="#" className="text-xs md:text-sm hover:text-orange-500 transition">Get Help</a></li>
            <li><a href="#" className="text-xs md:text-sm hover:text-orange-500 transition">Order Status</a></li>
            <li><a href="#" className="text-xs md:text-sm hover:text-orange-500 transition">Delivery</a></li>
            <li><a href="#" className="text-xs md:text-sm hover:text-orange-500 transition">Returns</a></li>
            <li><a href="#" className="text-xs md:text-sm hover:text-orange-500 transition">Payment Options</a></li>
            <li><a href="#" className="text-xs md:text-sm hover:text-orange-500 transition">Contact Us On Nike.com Inquiries</a></li>
            <li><a href="#" className="text-xs md:text-sm hover:text-orange-500 transition">Contact Us On All Other Inquiries</a></li>
          </ul>
        </div>
  
        {/* Company Section */}
        <div className="min-w-[200px] text-black mb-6 md:mb-4">
          <h1 className="text-base md:text-lg font-bold uppercase mb-2">Company</h1>
          <ul>
            <li><a href="#" className="text-xs md:text-sm hover:text-orange-500 transition">About Nike</a></li>
            <li><a href="#" className="text-xs md:text-sm hover:text-orange-500 transition">News</a></li>
            <li><a href="#" className="text-xs md:text-sm hover:text-orange-500 transition">Careers</a></li>
            <li><a href="#" className="text-xs md:text-sm hover:text-orange-500 transition">Investor</a></li>
            <li><a href="#" className="text-xs md:text-sm hover:text-orange-500 transition">Sustainability</a></li>
          </ul>
        </div>
  
        {/* India Section */}
        <div className="min-w-[200px] text-black mb-6 md:mb-4">
          <h1 className="text-base md:text-lg font-bold uppercase mb-2">India</h1>
          <img src="/image/India.png" alt="India Symbol" className="w-12 mt-5 mx-auto md:ml-20" />
        </div>
      </div>
  
      {/* Footer Bottom */}
      <div className="text-center mt-6 text-black text-xs md:text-sm pt-10 md:pt-20">
        <h1>&copy; 2024 Nike, Inc. ALL rights reserved</h1>
        <h1>Created by Azhar Shaikh</h1>
      </div>
    </footer>
  );
};

export default Footer;
