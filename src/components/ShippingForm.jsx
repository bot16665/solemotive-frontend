import React, { useState } from 'react';

const ShippingForm = ({ onSubmit }) => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    country: 'India' // Default country
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'street':
        if (!value.trim()) return 'Street address is required';
        if (value.trim().length < 5) return 'Please enter a complete street address';
        break;
      case 'city':
        if (!value.trim()) return 'City is required';
        if (value.trim().length < 2) return 'Please enter a valid city name';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'City name should only contain letters';
        break;
      case 'state':
        if (!value.trim()) return 'State is required';
        if (value.trim().length < 2) return 'Please enter a valid state name';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'State name should only contain letters';
        break;
      case 'pincode':
        if (!value.trim()) return 'Pincode is required';
        if (!/^\d{6}$/.test(value)) return 'Please enter a valid 6-digit pincode';
        break;
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^\d{10}$/.test(value)) return 'Please enter a valid 10-digit phone number';
        break;
      default:
        return '';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(address).forEach(field => {
      const error = validateField(field, address[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(address);
    } else {
      // Mark all fields as touched to show errors
      const touchedFields = {};
      Object.keys(address).forEach(field => {
        touchedFields[field] = true;
      });
      setTouched(touchedFields);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format phone and pincode to only allow numbers
    if (name === 'phone' || name === 'pincode') {
      formattedValue = value.replace(/\D/g, '');
    }

    // Format city and state to only allow letters and spaces
    if (name === 'city' || name === 'state') {
      formattedValue = value.replace(/[^a-zA-Z\s]/g, '');
    }

    setAddress(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Validate field on change if it's been touched
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
    const error = validateField(name, address[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Shipping Address</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Street Address */}
        <div className="space-y-1">
          <label htmlFor="street" className="block text-sm font-medium text-gray-700">
            Street Address *
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={address.street}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
              errors.street && touched.street ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your street address"
          />
          {errors.street && touched.street && (
            <p className="text-red-500 text-sm">{errors.street}</p>
          )}
        </div>

        {/* City and State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={address.city}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                errors.city && touched.city ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your city"
            />
            {errors.city && touched.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={address.state}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                errors.state && touched.state ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your state"
            />
            {errors.state && touched.state && (
              <p className="text-red-500 text-sm">{errors.state}</p>
            )}
          </div>
        </div>

        {/* Pincode and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
              Pincode *
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength="6"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                errors.pincode && touched.pincode ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter 6-digit pincode"
            />
            {errors.pincode && touched.pincode && (
              <p className="text-red-500 text-sm">{errors.pincode}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength="10"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter 10-digit phone number"
            />
            {errors.phone && touched.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Country */}
        <div className="space-y-1">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country *
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={address.country}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
              errors.country && touched.country ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your country"
            disabled
          />
          {errors.country && touched.country && (
            <p className="text-red-500 text-sm">{errors.country}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors mt-6"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;