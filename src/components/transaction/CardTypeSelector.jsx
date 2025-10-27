function CardTypeSelector({ cardType, setCardType }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">Card Type</h3>
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
            <span className="text-white font-semibold">Credit Card</span>
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
            <span className="text-white font-semibold">Debit Card</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default CardTypeSelector;
