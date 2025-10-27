function PaymentModal({ onClose, onSelectMethod }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-2xl text-center shadow-xl w-80">
        <h2 className="text-white text-lg font-bold mb-4">
          Choose Payment Method
        </h2>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onSelectMethod("card")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Pay by Card
          </button>
          <button
            onClick={() => onSelectMethod("cash")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Pay by Cash
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
