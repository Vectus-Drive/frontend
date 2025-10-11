const StatCardCar = ({ title, count, icon, color }) => (
  <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-1">{count.toLocaleString()}</h2>
    </div>
    <div className={`p-3 rounded-full ${color}`}>{icon}</div>
  </div>
);

export default StatCardCar;
