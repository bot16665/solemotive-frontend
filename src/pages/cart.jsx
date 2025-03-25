import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../components/PaymentForm";
import ShippingForm from "../components/ShippingForm";
import EmptyCart from "../components/EmptyCart";
import OrderSummary from "../components/OrderSummary";
import api from '../utils/axios'; // Updated import path

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showPayment, setShowPayment] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [discountError, setDiscountError] = useState("");
  const [validating, setValidating] = useState(false); // New state variable to track validation status

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = typeof item.price === 'string' ? 
        parseFloat(item.price.replace(/[^0-9.-]+/g, "")) : 
        parseFloat(item.price) || 0;
      return total + price * (item.quantity || 1);
    }, 0);
  }, [cart]);

  const total = useMemo(() => {
    if (!discount) return subtotal;
    
    const discountAmount = discount.type === 'PERCENTAGE' 
      ? (subtotal * discount.value / 100)
      : discount.value;
      
    return Math.max(0, subtotal - discountAmount);
  }, [subtotal, discount]);

  const handleShippingSubmit = (address) => {
    setShippingAddress(address);
    setShowShipping(false);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    clearCart();
  };

  const handleDiscountApply = async (code) => {
    setDiscountError("");
    setValidating(true); // Set validating to true before making the API call
    if (!code) {
      setDiscountError("Please enter a discount code");
      setValidating(false); // Set validating to false if no code is entered
      return;
    }

    try {
      const response = await api.post(`/discount/validate`, {
        code: code,
        subtotal: subtotal
      });
      const data = response.data;
      if (data.success) {
        setDiscount(data.discount);
      } else {
        setDiscountError(data.error || "Invalid discount code");
      }
      setValidating(false); // Set validating to false after the API call
    } catch (error) {
      setDiscountError("Failed to validate discount code");
      setValidating(false); // Set validating to false if there's an error
    }
  };

  const handleBack = () => {
    if (showPayment) {
      setShowPayment(false);
      setShowShipping(true);
    } else if (showShipping) {
      setShowShipping(false);
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  if (cart.length === 0 && !paymentSuccess) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-[#dfd86b] pt-20">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        
        {paymentSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            <strong className="font-bold">Payment Successful!</strong>
            <p className="block sm:inline"> Thank you for your purchase.</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {!showShipping && !showPayment && (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div 
                    key={`${item.id}-${item.size}`} 
                    className="flex items-center bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover rounded-lg mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <p className="text-gray-600">Size: {item.size}</p>
                      <p className="text-gray-700 font-semibold">{formatPrice(item.price)}</p>
                      <p className="text-sm text-gray-500">
                        Subtotal: {formatPrice(item.price * (item.quantity || 1))}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, (item.quantity || 1) - 1)}
                          className="bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                          disabled={(item.quantity || 1) <= 1}
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold min-w-[2rem] text-center">
                          {item.quantity || 1}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, (item.quantity || 1) + 1)}
                          className="bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-red-500 font-semibold hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                {/* Discount Code Input */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter discount code"
                      className="flex-grow px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      onChange={(e) => {
                        setDiscountError("");
                        if (!e.target.value) setDiscount(null);
                      }}
                    />
                    <button
                      onClick={(e) => handleDiscountApply(e.target.value)}
                      className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
                      disabled={validating} // Disable the button while validating
                    >
                      Apply
                    </button>
                  </div>
                  {discountError && (
                    <p className="text-red-500 text-sm mt-2">{discountError}</p>
                  )}
                  {discount && (
                    <p className="text-green-500 text-sm mt-2">
                      Discount applied: {discount.type === 'PERCENTAGE' ? `${discount.value}%` : formatPrice(discount.value)} off
                    </p>
                  )}
                </div>
              </div>
            )}

            {showShipping && (
              <div>
                <button onClick={handleBack} className="mb-4 text-gray-600 hover:text-gray-800">← Back to Cart</button>
                <ShippingForm onSubmit={handleShippingSubmit} />
              </div>
            )}

            {showPayment && (
              <div>
                <button onClick={handleBack} className="mb-4 text-gray-600 hover:text-gray-800">← Back to Shipping</button>
                <PaymentForm 
                  amount={total} 
                  items={cart}
                  shippingAddress={shippingAddress}
                  discount={discount}
                  subtotal={subtotal}
                  onSuccess={handlePaymentSuccess}
                />
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:sticky lg:top-24 h-fit">
            <OrderSummary
              items={cart}
              subtotal={subtotal}
              discount={discount}
              shippingAddress={shippingAddress}
            />
            
            {!showShipping && !showPayment && (
              <button
                onClick={() => setShowShipping(true)}
                className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 mt-4"
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
