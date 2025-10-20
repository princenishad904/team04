"use client";
import { Suspense, useState } from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

function CheckoutContent() {
  const [loading, setLoading] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [errors, setErrors] = useState({});

  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const validateForm = () => {
    const newErrors = {};
    
    if (!whatsappNumber.trim()) {
      newErrors.whatsappNumber = "WhatsApp number is required";
    } else if (!/^\d{10}$/.test(whatsappNumber.replace(/\D/g, ""))) {
      newErrors.whatsappNumber = "Please enter a valid 10-digit WhatsApp number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const team = JSON.parse(localStorage.getItem("myTeam"));
      if (!team) {
        alert("Please enter team details first");
        return;
      }

      // Prepare data with WhatsApp number
      const paymentData = {
        ...team,
        whatsAppNumber: whatsappNumber,
        amount: 1,
        code: code
      };

      // 1️⃣ Get session ID from your backend
      const { data } = await axios.post("/api/payment", paymentData);
      const sessionId = data.payment_session_id;

      // 2️⃣ Initialize Cashfree
      const cashfree = await load({ mode:"production" }); // 'production' in live

      const returnUrl = process.env.NODE_ENV !== "dev" ? "https://apnasquad.site"  :"http://localhost:3000"
      // 3️⃣ Open checkout popup
      cashfree.checkout({
        paymentSessionId: sessionId,
        returnUrl: `${returnUrl}/success?order_id=${data.order_id}`
      });
    } catch (error) {
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Please try after sometime.");
      }
      setLoading(false);
    }
  };

  const handleWhatsAppNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setWhatsappNumber(value);
    // Clear error when user starts typing
    if (errors.whatsappNumber) {
      setErrors({ ...errors, whatsappNumber: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
            Tournament Registration
          </h1>
          <p className="text-gray-400">Complete your payment to secure your slot</p>
        </div>

        {/* Card Container */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700">
          {/* Tournament Info */}
          <div className="mb-6 p-4 bg-gray-700 rounded-lg border-l-4 border-blue-500">
            <h2 className="text-lg font-semibold text-white mb-1">Tournament Details</h2>
            <p className="text-gray-300 text-sm">Code: {code}</p>
            <p className="text-gray-300 text-sm">Entry Fee: ₹1</p>
          </div>

          {/* WhatsApp Number Input */}
          <div className="mb-6">
            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-2">
              WhatsApp Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">+91</span>
              </div>
              <input
                id="whatsapp"
                type="text"
                value={whatsappNumber}
                onChange={handleWhatsAppNumberChange}
                placeholder="Enter your WhatsApp number"
                className={`w-full pl-12 pr-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                  errors.whatsappNumber 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                }`}
                maxLength={10}
              />
            </div>
            {errors.whatsappNumber && (
              <p className="mt-2 text-sm text-red-400 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.whatsappNumber}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-400">
              We will send tournament updates on this number
            </p>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Payment...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Pay ₹1 & Register
              </div>
            )}
          </button>

          {/* Security Note */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400 flex items-center justify-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure payment powered by Cashfree
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Having trouble? Contact support</p>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}