import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) return parts.join(" ");
    return value;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) return v.slice(0, 2) + "/" + v.slice(2, 4);
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData((prev) => ({ ...prev, expiryDate: formatted }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment submitted:", formData);
    alert("Payment submitted successfully!");
  };

  return (
    <div
      className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8"
    >
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
              className="backdrop-blur-lg rounded-2xl p-8 border"
              style={{
                backgroundColor: "rgba(22, 32, 51, 0.6)",
                borderColor: "rgba(71, 85, 105, 0.4)",
              }}
            >
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Card Type
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setCardType("credit")}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      cardType === "credit"
                        ? "bg-orange-500/20 border-orange-500"
                        : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">💳</div>
                      <span className="text-white font-semibold">
                        Credit Card
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => setCardType("debit")}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      cardType === "debit"
                        ? "bg-orange-500/20 border-orange-500"
                        : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">🏦</div>
                      <span className="text-white font-semibold">
                        Debit Card
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full pl-4 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className="w-full pl-4 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full pl-4 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      className="w-full pl-4 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength="4"
                      className="w-full pl-4 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="saveCard"
                    id="saveCard"
                    checked={formData.saveCard}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                  <label
                    htmlFor="saveCard"
                    className="text-gray-300 cursor-pointer"
                  >
                    Save card for future payments
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Pay Securely
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div
              className="backdrop-blur-lg rounded-2xl p-6 border sticky top-6"
              style={{
                backgroundColor: "rgba(22, 32, 51, 0.6)",
                borderColor: "rgba(71, 85, 105, 0.4)",
              }}
            >
              <h3 className="text-xl font-bold text-white mb-6">
                Payment Summary
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Rental Amount</span>
                  <span className="font-semibold">$250.00</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">$25.00</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Service Fee</span>
                  <span className="font-semibold">$10.00</span>
                </div>
                <div className="border-t border-slate-700 pt-4">
                  <div className="flex justify-between text-white text-lg font-bold">
                    <span>Total</span>
                    <span className="text-orange-500">$285.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
