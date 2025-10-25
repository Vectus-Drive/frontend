function PaymentSummary() {
  return (
    <div
      className="backdrop-blur-lg rounded-2xl p-6 border sticky top-6"
      style={{
        backgroundColor: "rgba(22, 32, 51, 0.6)",
        borderColor: "rgba(71, 85, 105, 0.4)",
      }}
    >
      <h3 className="text-xl font-bold text-white mb-6">Payment Summary</h3>
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
  );
}

export default PaymentSummary;
