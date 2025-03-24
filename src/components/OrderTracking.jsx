import React, { useState, useEffect } from 'react';

const OrderTracking = ({ orderId }) => {
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}/tracking`);
        if (!response.ok) {
          throw new Error('Failed to fetch tracking information');
        }
        const data = await response.json();
        setTrackingInfo(data);
      } catch (err) {
        setError('Unable to load tracking information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchTrackingInfo();
    }
  }, [orderId]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-500';
      case 'out for delivery':
        return 'bg-blue-500';
      case 'in transit':
        return 'bg-yellow-500';
      case 'processing':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <div className="text-red-600 text-center">
          <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!trackingInfo) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <p className="text-gray-600 text-center">No tracking information available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      {/* Order Details */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Order #{orderId}</h2>
        <div className="flex items-center space-x-2">
          <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor(trackingInfo.currentStatus)}`}></span>
          <span className="text-gray-600">{trackingInfo.currentStatus}</span>
        </div>
      </div>

      {/* Estimated Delivery */}
      {trackingInfo.estimatedDelivery && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Estimated Delivery</h3>
          <p className="text-gray-600">{formatDate(trackingInfo.estimatedDelivery)}</p>
        </div>
      )}

      {/* Tracking Timeline */}
      <div className="relative">
        {trackingInfo.events?.map((event, index) => (
          <div key={index} className="mb-8 flex items-start">
            {/* Timeline Line */}
            {index !== trackingInfo.events.length - 1 && (
              <div className="absolute w-0.5 bg-gray-200 h-full left-2.5 top-3 -z-10"></div>
            )}

            {/* Status Dot */}
            <div className={`flex-shrink-0 w-5 h-5 rounded-full ${getStatusColor(event.status)} mr-4`}></div>

            {/* Event Details */}
            <div className="flex-grow">
              <h4 className="font-medium">{event.status}</h4>
              <p className="text-sm text-gray-600 mb-1">{event.location}</p>
              <time className="text-xs text-gray-500">{formatDate(event.timestamp)}</time>
            </div>
          </div>
        ))}
      </div>

      {/* Shipping Address */}
      {trackingInfo.shippingAddress && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{trackingInfo.shippingAddress.street}</p>
            <p>{trackingInfo.shippingAddress.city}, {trackingInfo.shippingAddress.state}</p>
            <p>PIN: {trackingInfo.shippingAddress.pincode}</p>
            <p>Phone: {trackingInfo.shippingAddress.phone}</p>
          </div>
        </div>
      )}

      {/* Support Information */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-semibold mb-2">Need Help?</h3>
        <p className="text-sm text-gray-600 mb-2">
          If you have any questions about your delivery, please contact our support team.
        </p>
        <a
          href="mailto:support@solemotive.com"
          className="inline-flex items-center text-sm text-black hover:text-gray-700"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          support@solemotive.com
        </a>
      </div>
    </div>
  );
};

export default OrderTracking;
