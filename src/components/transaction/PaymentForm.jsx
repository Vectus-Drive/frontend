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
    return v.match(/.{1,4}/g)?.join(" ") || "";
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

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // --- CASH PAYMENT ---
      if (formData.paymentMethod === "Cash") {
        const res = await api.post("/bookings", bookingData);
        toast.success("Booking successfully created with Cash Payment!");
        console.log("Booking (Cash):", res.data);
      }

      // --- CARD PAYMENT ---
      else if (formData.paymentMethod === "Card") {
        const { email, cardNumber, cardName, expiryDate, cvv } = formData;

        // Validate required fields
        if (!email || !cardNumber || !cardName || !expiryDate || !cvv) {
          toast.error("Please fill in all card details!");
          return;
        }

        // Clone and ensure booking status is "booked"
        const cardBookingData = {
          ...bookingData,
          status: "booked",
        };

        const res = await api.post("/bookings", cardBookingData);
        toast.success("Booking created successfully via Card!");
        // console.log("Card payment info:", formData);
        // console.log("Booking (Card):", res.data.data.car_id);
        // const resC = await api.put(`/cars/${res.data.car_id}`, {
        //   availability_status: false,
        // });
        // if (resC) {
        //   console.log("Done");
        // }
      }
    } catch (error) {
      console.error("Payment/Booking error:", error);
      toast.error("Failed to process your payment. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ---- Payment Method ---- */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Payment Method
        </label>
        <div className="flex gap-6">
          {["Card", "Cash"].map((method) => (
            <label
              key={method}
              className="flex items-center gap-2 text-gray-300 cursor-pointer"
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={formData.paymentMethod === method}
                onChange={handleChange}
                className="accent-orange-500 w-5 h-5"
              />
              {method}
            </label>
          ))}
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
