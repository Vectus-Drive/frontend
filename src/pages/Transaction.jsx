import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardTypeSelector from "../components/transaction/CardTypeSelector";
import PaymentForm from "../components/transaction/PaymentForm";
import PaymentSummary from "../components/transaction/PaymentSummary";

function Transaction() {
  const navigate = useNavigate();
  const [cardType, setCardType] = useState("credit");

  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    email: "",
    saveCard: false,
  });

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
          <p className="text-gray-400 text-lg">Secure and fast card payment</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div
              className="backdrop-blur-lg rounded-2xl p-8 border bg-slate-900/50 border-slate-700"
            >
              <CardTypeSelector cardType={cardType} setCardType={setCardType} />
              <PaymentForm formData={formData} setFormData={setFormData} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <PaymentSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
