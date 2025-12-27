function PaymentSummary({ bookingDatac }) {
  const serviceFee = 10;
  const tax = bookingDatac.total * 0.1;
  const total = bookingDatac.total + tax + serviceFee;

  return (
    <div className="backdrop-blur-lg rounded-2xl p-6 border sticky top-6 bg-slate-900/50 border-slate-700">
      <h3 className="text-xl font-bold text-white mb-6">Payment Summary</h3>
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-300">
          <span>Rental Amount</span>
          <span className="font-semibold">${bookingDatac.total}</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Tax (10%)</span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Service Fee</span>
          <span className="font-semibold">${serviceFee.toFixed(2)}</span>
        </div>
        <div className="border-t border-slate-700 pt-4">
          <div className="flex justify-between text-white text-lg font-bold">
            <span>Total</span>
            <span className="text-orange-500">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSummary;
