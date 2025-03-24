import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const { order, customerEmail } = location.state || {};

  if (!order) {
    return (
      <div className="min-h-screen bg-[#dfd86b] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center max-w-md w-full">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find your order details. Please try placing your order again.</p>
          <Link
            to="/home"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return (price || 0).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString || Date.now());
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const estimatedDeliveryDate = formatDate(order.estimatedDelivery);

  return (
    <div className="min-h-screen bg-[#dfd86b] py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-green-500 mb-6">
            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
          <p className="text-xl text-gray-600 mb-2">
            Your order has been confirmed
          </p>
          <p className="text-gray-500">
            We've sent a confirmation email to <span className="font-medium">{customerEmail}</span>
          </p>
        </div>

        {/* Order Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-gray-500">Order Number</p>
              <p className="text-lg font-medium">#{order.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Order Status</p>
              <p className="text-lg font-medium text-green-600">{order.status}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Estimated Delivery</p>
              <p className="text-lg font-medium">{estimatedDeliveryDate}</p>
            </div>
          </div>
        </div>

        {/* Items Summary */}
        {order.items && order.items.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <div key={index} className="py-4 flex items-center">
                  <img
                    src={item.image || '/placeholder-product.png'}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} • Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(item.price * (item.quantity || 1))}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{(order.subtotal || 0) >= 2000 ? 'Free' : formatPrice(100)}</span>
                </div>
                {order.discount && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(order.discount.amount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>{formatPrice(order.amount)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shipping Address */}
        {order.shippingAddress && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Delivery Details</h2>
            <div className="text-gray-600">
              <p className="font-medium text-black">{order.customerName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/home"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-white bg-black hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Continue Shopping
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Receipt
          </button>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-600 mb-2">
            Questions about your order?
          </p>
          <a
            href="mailto:support@solemotive.com"
            className="text-black hover:underline font-medium"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
