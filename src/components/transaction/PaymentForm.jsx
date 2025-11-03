import React, { useState } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";

function PaymentForm({ bookingData }) {
  const [formData, setFormData] = useState({
    paymentMethod: "Card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    email: "",
    saveCard: false,
  });

  // Format card number as XXXX XXXX XXXX XXXX
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.join(" ");
  };

  // Format expiry as MM/YY
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    return v.length >= 2 ? v.slice(0, 2) + "/" + v.slice(2, 4) : v;
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCardNumberChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      cardNumber: formatCardNumber(e.target.value),
    }));

  const handleExpiryChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      expiryDate: formatExpiryDate(e.target.value),
    }));

  // Submit handler for both Cash and Card
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.paymentMethod === "Cash") {
        console.log(bookingData);
        
        // ✅ For cash payment — create booking record
        const res = await api.post("/bookings", bookingData);
        toast.success("Booking successfully created with Cash Payment!");
        console.log("Booking response:", res.data);
      } else if (formData.paymentMethod === "Card") {
        // 💳 For card payment — just simulate success (no API call)
        if (
          !formData.email ||
          !formData.cardNumber ||
          !formData.cardName ||
          !formData.expiryDate ||
          !formData.cvv
        ) {
          toast.error("Please fill in all card details!");
          return;
        }
        toast.success("Payment completed successfully via Card!");
        console.log("Card payment details:", formData);
      }
    } catch (error) {
      console.error("Payment/Booking error:", error);
      toast.error("Failed to process your payment. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ---- Payment Method Selector ---- */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Payment Method
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="Card"
              checked={formData.paymentMethod === "Card"}
              onChange={handleChange}
              className="accent-orange-500 w-5 h-5"
            />
            Card
          </label>
          <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="Cash"
              checked={formData.paymentMethod === "Cash"}
              onChange={handleChange}
              className="accent-orange-500 w-5 h-5"
            />
            Cash
          </label>
        </div>
      </div>

      {/* ---- Card Fields ---- */}
      {formData.paymentMethod === "Card" && (
        <>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="w-full pl-4 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
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
              required
              className="w-full pl-4 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
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
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full pl-4 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
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
                required
                className="w-full pl-4 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
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
                onChange={handleChange}
                placeholder="123"
                maxLength="4"
                required
                className="w-full pl-4 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="saveCard"
              id="saveCard"
              checked={formData.saveCard}
              onChange={handleChange}
              className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
            <label htmlFor="saveCard" className="text-gray-300 cursor-pointer">
              Save card for future payments
            </label>
          </div>
        </>
      )}

      {/* ---- Submit Button ---- */}
      <button
        type="submit"
        className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        {formData.paymentMethod === "Cash"
          ? "Confirm Cash Payment"
          : "Pay Securely"}
      </button>
    </form>
  );
}

export default PaymentForm;
