import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const PaymentForm = ({ amount, onSuccess, discount, subtotal, shippingAddress }) => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: ''
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'cardNumber':
        if (!value.trim()) return 'Card number is required';
        break;

      case 'expiryDate':
        if (!value.trim()) return 'Expiry date is required';
        const [month, year] = value.split('/');
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        
        if (!/^\d\d\/\d\d$/.test(value)) return 'Invalid date';
        if (parseInt(month) < 1 || parseInt(month) > 12) return 'Invalid month';
        if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
          return 'Card has expired';
        }
        break;

      case 'cvv':
        if (!value.trim()) return 'CVV is required';
        if (!/^\d{3}$/.test(value)) return 'Invalid CVV';
        break;

      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 3) return 'Please enter your full name';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Name should only contain letters';
        break;

      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
        break;

      default:
        return '';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(paymentData).forEach(field => {
      const error = validateField(field, paymentData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsProcessing(true);
      try {
        // Add a slight delay to simulate processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Since this is a mock system, we'll create a successful order
        const mockOrder = {
          id: Date.now().toString(),
          status: 'confirmed',
          amount: parseFloat(amount),
          items: cartItems,
          shippingAddress,
          customerEmail: paymentData.email,
          customerName: paymentData.name,
          discount: discount,
          subtotal: parseFloat(subtotal),
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        };

        // Call onSuccess with the mock order
        onSuccess({
          success: true,
          order: mockOrder
        });

        // Navigate to success page
        navigate('/order-success', { 
          state: { 
            order: mockOrder,
            customerEmail: paymentData.email 
          } 
        });
      } catch (error) {
        console.error('Payment error:', error);
        // Even if there's an error, we'll succeed since this is a mock system
        const mockOrder = {
          id: Date.now().toString(),
          status: 'confirmed',
          amount: parseFloat(amount),
          items: cartItems,
          shippingAddress,
          customerEmail: paymentData.email,
          customerName: paymentData.name,
          discount: discount,
          subtotal: parseFloat(subtotal),
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        };

        onSuccess({
          success: true,
          order: mockOrder
        });
        
        navigate('/order-success', { 
          state: { 
            order: mockOrder,
            customerEmail: paymentData.email 
          } 
        });
      } finally {
        setIsProcessing(false);
      }
    } else {
      const touchedFields = {};
      Object.keys(paymentData).forEach(field => {
        touchedFields[field] = true;
      });
      setTouched(touchedFields);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    switch (name) {
      case 'cardNumber':
        // Allow any digits, remove non-digits
        formattedValue = value.replace(/[^0-9]/g, '');
        // Add spaces for readability (optional)
        formattedValue = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
        break;
      case 'expiryDate':
        formattedValue = formatExpiryDate(value);
        break;
      case 'cvv':
        formattedValue = value.replace(/\D/g, '').slice(0, 3);
        break;
      case 'name':
        formattedValue = value.replace(/[^a-zA-Z\s]/g, '');
        break;
    }

    setPaymentData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    if (touched[name]) {
      const error = validateField(name, formattedValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    const error = validateField(name, paymentData[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 max-w-lg mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Payment Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Information Section */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Card Information</h3>
          
          {/* Card Number */}
          <div className="space-y-1">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number *
            </label>
            <div className="relative">
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-4 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.cardNumber && touched.cardNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter card number"
                autoComplete="cc-number"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>
            {errors.cardNumber && touched.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
            )}
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date *
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={paymentData.expiryDate}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength="5"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.expiryDate && touched.expiryDate ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="MM/YY"
                autoComplete="cc-exp"
              />
              {errors.expiryDate && touched.expiryDate && (
                <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV *
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="cvv"
                  name="cvv"
                  value={paymentData.cvv}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength="3"
                  className={`w-full pl-4 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.cvv && touched.cvv ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="123"
                  autoComplete="cc-csc"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              {errors.cvv && touched.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Customer Information</h3>
          
          {/* Name */}
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={paymentData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
              autoComplete="cc-name"
            />
            {errors.name && touched.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={paymentData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
              autoComplete="email"
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-medium text-gray-700 mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discount && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Discount</span>
                <span className="text-green-600">-{formatPrice(discount.amount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span>{subtotal >= 2000 ? 'Free' : formatPrice(100)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg pt-2 border-t">
              <span>Total</span>
              <span>{formatPrice(amount)}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full bg-black text-white py-4 rounded-lg text-lg font-medium transition-all ${
            isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-gray-800'
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            `Pay ${formatPrice(amount)}`
          )}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
