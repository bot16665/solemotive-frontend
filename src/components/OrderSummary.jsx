import React from 'react';

const OrderSummary = ({ items, subtotal, discount, shippingAddress }) => {
  const shippingCost = subtotal >= 2000 ? 0 : 100;
  const discountAmount = discount?.amount || (
    discount?.type === 'PERCENTAGE' 
      ? (subtotal * discount.value / 100)
      : (discount?.value || 0)
  );
  const total = subtotal + shippingCost - discountAmount;

  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Order Summary</h2>
  
      {/* Items List */}
      <div className="space-y-4 mb-4 md:mb-6">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-medium text-sm md:text-base">{item.name}</h3>
                <p className="text-xs md:text-sm text-gray-600">
                  Size: {item.size} • Qty: {item.quantity || 1}
                </p>
              </div>
            </div>
            <span className="font-medium text-sm md:text-base">
              {formatPrice(item.price * (item.quantity || 1))}
            </span>
          </div>
        ))}
      </div>
  
      {/* Price Breakdown */}
      <div className="space-y-3 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-gray-600 text-sm md:text-base">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-gray-600 text-sm md:text-base">
          <span>Shipping</span>
          <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
        </div>

        {discount && (
          <div className="flex justify-between text-green-600 text-sm md:text-base">
            <span>
              Discount
              {discount.code && ` (${discount.code})`}
            </span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Shipping Info */}
      {shippingAddress && (
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{shippingAddress.street}</p>
            <p>{shippingAddress.city}, {shippingAddress.state}</p>
            <p>PIN: {shippingAddress.pincode}</p>
            <p>Phone: {shippingAddress.phone}</p>
          </div>
        </div>
      )}

      {/* Free Shipping Notice */}
      {subtotal < 2000 && (
        <div className="mt-4 bg-blue-50 text-blue-700 p-3 rounded-lg text-sm">
          Add {formatPrice(2000 - subtotal)} more to get free shipping!
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
