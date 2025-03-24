import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="min-h-screen bg-[#dfd86b] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <svg 
            className="w-32 h-32 mx-auto text-black opacity-90" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1.5" 
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
            />
          </svg>
        </div>
        <h2 className="text-4xl font-bold text-black mb-6">Your Cart is Empty</h2>
        <Link
          to="/home"
          className="inline-block bg-black text-white px-10 py-4 rounded-lg text-xl font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
