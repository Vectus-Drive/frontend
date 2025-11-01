const CarStatsCard = ({ title, value, change, comparedValue }) => (
  <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
    <div className="flex justify-between items-center text-sm text-gray-500">
      <span>{title}</span>
    </div>

    <div className="mt-2">
      <span className="text-3xl font-bold">${value.toLocaleString()}</span>
      <span
        className={`ml-2 text-sm font-semibold ${
          change.startsWith("-") ? "text-red-500" : "text-green-500"
        }`}
      >
        {change}
      </span>
    </div>

    <div className="mt-1 text-xs text-gray-500">
      Compared to ${comparedValue.toLocaleString()}
    </div>
  </div>
);

export default CarStatsCard;
