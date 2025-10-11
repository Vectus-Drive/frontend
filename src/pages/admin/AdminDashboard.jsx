import { FaCar, FaClipboardList, FaClock, FaCheckCircle } from "react-icons/fa";
import StatCard from "../../components/admin/StatCard";
import StatCardCar from "../../components/admin/StatCardCar";
import HireVsCancel from "../../components/admin/HireVsCancel";
import LiveCarStatus from "../../components/admin/LiveCarStatus";

const liveTrips = [
  {
    no: "01",
    carNo: "CAR-1024",
    driver: "Alex Norman",
    status: "Completed",
    earning: "$45.80",
    statusColor: "text-green-500",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    no: "02",
    carNo: "CAR-2365",
    driver: "Sofia Rahman",
    status: "Pending",
    earning: "$0.00",
    statusColor: "text-yellow-500",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    no: "03",
    carNo: "CAR-4589",
    driver: "Luke Norton",
    status: "In Route",
    earning: "$32.60",
    statusColor: "text-blue-500",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
  },
];

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Today’s Overview</h1>
        <p className="text-sm text-gray-600">Saturday, 11 Oct, 11:30 AM</p>
      </div>

      <div className="flex space-x-6 overflow-y-auto hide-scrollbar">
        <div className="w-72 space-y-6">
          <StatCard title="Total Revenue" value={9450} change="+3.8%" comparedValue={8920} />
          <StatCard title="Total Expenses" value={5620} change="-1.2%" comparedValue={5690} />
          <HireVsCancel />
        </div>

        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCardCar
              title="Total Cars"
              count={42}
              icon={<FaCar className="text-white text-2xl" />}
              color="bg-blue-500"
            />
            <StatCardCar
              title="Total Bookings"
              count={118}
              icon={<FaClipboardList className="text-white text-2xl" />}
              color="bg-orange-500"
            />
            <StatCardCar
              title="Pending Bookings"
              count={16}
              icon={<FaClock className="text-white text-2xl" />}
              color="bg-yellow-500"
            />
            <StatCardCar
              title="Completed Trips"
              count={94}
              icon={<FaCheckCircle className="text-white text-2xl" />}
              color="bg-green-500"
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
            <h2 className="text-md font-semibold text-gray-700">Car Availability</h2>
            <select className="border p-2 rounded-lg text-sm text-gray-600">
              <option>Select Car No</option>
              <option>CAR-1024</option>
              <option>CAR-2365</option>
              <option>CAR-4589</option>
            </select>
            <input type="date" className="border p-2 rounded-lg text-sm text-gray-600" />
            <input type="time" className="border p-2 rounded-lg text-sm text-gray-600" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Check
            </button>
          </div>

          <LiveCarStatus trips={liveTrips} />

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Earnings Summary</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                  <span>Last 6 months</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-gray-300 mr-2"></span>
                  <span>Same period last year</span>
                </div>
              </div>
            </div>

            <div className="h-64 flex items-end justify-center border-t border-l pt-2 px-2 text-gray-400">
              <p>Chart component placeholder (use Recharts or Chart.js)</p>
            </div>

            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>May</span><span>Jun</span><span>Jul</span>
              <span>Aug</span><span>Sep</span><span>Oct</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
