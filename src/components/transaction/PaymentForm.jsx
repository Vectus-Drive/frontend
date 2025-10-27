function PaymentForm({ formData, setFormData }) {
  const formatCardNumber = (value) => {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = v.match(/\d+/g); 
  const match = (matches && matches[0]) || "";
  const parts = [];
  for (let i = 0; i < match.length; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  return parts.join(" ");
};


  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    return v.length >= 2 ? v.slice(0, 2) + "/" + v.slice(2, 4) : v;
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment submitted:", formData);
    alert("Payment submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          className="w-full pl-4 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
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
          className="w-full pl-4 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
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
          className="w-full pl-4 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
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
            className="w-full pl-4 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
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
            className="w-full pl-4 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
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
          className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        <label htmlFor="saveCard" className="text-gray-300 cursor-pointer">
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
  );
}

export default PaymentForm;
