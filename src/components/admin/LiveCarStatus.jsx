const LiveCarStatus = ({ trips }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-800">Live Car Status</h2>
    </div>

    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <th className="py-3 px-2">No.</th>
          <th className="py-3 px-2">Car No.</th>
          <th className="py-3 px-2">Driver</th>
          <th className="py-3 px-2">Trip Status</th>
          <th className="py-3 px-2">Earnings</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {trips.map((trip) => (
          <tr key={trip.no} className="text-sm text-gray-800">
            <td className="py-3 px-2">{trip.no}</td>
            <td className="py-3 px-2 font-medium">{trip.carNo}</td>
            <td className="py-3 px-2 flex items-center">
              <img
                src={trip.image}
                alt={trip.driver}
                className="w-6 h-6 rounded-full mr-2"
              />
              {trip.driver}
            </td>
            <td className="py-3 px-2">
              <span className={`flex items-center font-medium ${trip.statusColor}`}>
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    trip.status === "Completed"
                      ? "bg-green-500"
                      : trip.status === "Pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                ></span>
                {trip.status}
              </span>
            </td>
            <td className="py-3 px-2 font-medium">{trip.earning}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default LiveCarStatus;
