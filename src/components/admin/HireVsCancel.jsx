const HireVsCancel = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
    <div className="flex justify-between items-center text-sm text-gray-500">
      <span>Hire vs Cancel</span>
      <select className="text-xs border px-2 py-0.5 rounded-md focus:outline-none">
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
    </div>

    <div className="flex items-center justify-center h-40 mt-4">
      <div
        className="w-32 h-32 rounded-full border-[1.5rem]"
        style={{
          borderLeftColor: "#3B82F6", // Blue
          borderTopColor: "#10B981", // Green
          borderRightColor: "#EF4444", // Red
          borderBottomColor: "#3B82F6",
          borderStyle: "solid",
          borderWidth: "1.5rem",
          transform: "rotate(135deg)",
        }}
      ></div>
    </div>

    <div className="mt-4 space-y-1 text-sm">
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
        <span className="flex-1">
          Total Hired <strong className="float-right text-blue-600">58%</strong>
        </span>
      </div>
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
        <span className="flex-1">
          Total Pending <strong className="float-right text-green-600">25%</strong>
        </span>
      </div>
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
        <span className="flex-1">
          Total Canceled <strong className="float-right text-red-600">17%</strong>
        </span>
      </div>
    </div>
  </div>
);

export default HireVsCancel;
