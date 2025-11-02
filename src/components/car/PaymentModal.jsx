
function PaymentModal({ onClose, onSelectMethod }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md animate-fadeIn rounded-3xl bg-gray-900 p-8 text-center shadow-2xl mx-4">
        {/* Close X */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="mb-6 text-xl font-extrabold tracking-wide text-white">
          Choose Payment Method
        </h2>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => onSelectMethod("card")}
            className="rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 py-3 font-bold text-white shadow-md transition-all duration-200 hover:from-orange-600 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Pay by Card
          </button>

          <button
            onClick={() => onSelectMethod("cash")}
            className="rounded-xl bg-gradient-to-r from-green-500 to-lime-400 py-3 font-bold text-white shadow-md transition-all duration-200 hover:from-green-600 hover:to-lime-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Pay by Cash
          </button>

          <button
            onClick={onClose}
            className="mt-2 rounded-xl bg-gray-700 py-3 font-semibold text-gray-200 transition-all duration-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;