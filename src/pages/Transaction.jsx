import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentForm from "../components/transaction/PaymentForm";
import PaymentSummary from "../components/transaction/PaymentSummary";

function Transaction() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // ✅ Get booking data passed from RentForm
  const bookingData = location.state?.bookingData;

  // ✅ If user navigates here directly (no data)
  if (!bookingData) {
    return (
      <div className="text-center text-white py-20">
        <h2 className="text-2xl font-bold">No booking data found</h2>
        <p className="text-gray-400 mt-2">
          Please go back and select your car again.
        </p>
        <button
          onClick={() => navigate("/cars")}
          className="mt-6 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
        >
          Go to Cars
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-full text-sm transition-all"
        >
          ← Back to Rent Form
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Complete Your <span className="text-orange-500">Payment</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Secure and fast card payment for your booking
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left side — Payment form */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-lg rounded-2xl p-8 border bg-slate-900/50 border-slate-700">
              <PaymentForm bookingData = {bookingData}/>
            </div>
          </div>

          {/* Right side — Payment Summary */}
          <div className="lg:col-span-1">
            <PaymentSummary bookingData={bookingData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
