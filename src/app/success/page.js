"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentStatusPage() {
  const [status, setStatus] = useState("Checking...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const orderId = query.get("order_id");

    if (orderId) {
      axios
        .get(`/api/verify-payment?order_id=${orderId}`)
        .then((res) => {
          setStatus(res.data.order_status);
          setIsLoading(false);
        })
        .catch(() => {
          setStatus("error");
          setIsLoading(false);
        });
    } else {
      setStatus("invalid");
      setIsLoading(false);
    }
  }, []);

  const getStatusConfig = () => {
    const statusLower = status.toLowerCase();
    
    if (statusLower === "success" || statusLower === "paid" || statusLower === "completed") {
      return {
        icon: (
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ),
        title: "Payment Successful!",
        description: "Your payment has been processed successfully. Thank you for Registration!",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200"
      };
    } else if (statusLower === "pending" || statusLower === "processing") {
      return {
        icon: (
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 12v4m8-10h-4M6 12H2" />
            </svg>
          </div>
        ),
        title: "Payment Processing",
        description: "Your payment is being processed. This may take a few moments.",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200"
      };
    } else if (statusLower === "failed" || statusLower === "error") {
      return {
        icon: (
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        ),
        title: "Payment Failed",
        description: "We couldn't process your payment. Please try again or use a different payment method.",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200"
      };
    } else {
      return {
        icon: (
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        ),
        title: "Unable to Verify",
        description: "We couldn't verify your payment status. Please contact support if the issue persists.",
        color: "text-gray-600",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200"
      };
    }
  };

  const statusConfig = getStatusConfig();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 12v4m8-10h-4M6 12H2" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Checking Payment Status</h2>
          <p className="text-gray-600">Please wait while we verify your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border-2 ${statusConfig.borderColor}`}>
        {statusConfig.icon}
        
        <h1 className={`text-2xl font-bold mb-3 ${statusConfig.color}`}>
          {statusConfig.title}
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {statusConfig.description}
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-500 mb-1">Current Status</div>
          <div className={`font-semibold ${statusConfig.color}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => window.location.href = '/'}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            Back to Home
          </button>
          {(status.toLowerCase() === "failed" || status.toLowerCase() === "error") && (
            <button 
              onClick={() => window.location.href = '/checkout'}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              Try Again
            </button>
          )}
        </div>

        <div className="mt-6 text-xs text-gray-500">
          Need help? <a href="mailto:support@example.com" className="text-blue-600 hover:underline">Contact Support</a>
        </div>
      </div>
    </div>
  );
}