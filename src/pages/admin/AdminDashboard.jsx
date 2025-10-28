import { useState } from 'react';
import {
  FaCar,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaCalendarAlt
} from "react-icons/fa";
import StatOverviewCard from '../../components/admin/StatOverviewCard';
import CarStatsCard from '../../components/admin/CarStatsCard';

function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const recentBookings = [
    { id: 'BK-1024', customer: 'John Doe', car: 'Toyota Camry', status: 'confirmed', amount: 450 },
    { id: 'BK-1025', customer: 'Sarah Smith', car: 'Honda Accord', status: 'pending', amount: 380 },
    { id: 'BK-1026', customer: 'Mike Johnson', car: 'BMW X5', status: 'completed', amount: 890 },
    { id: 'BK-1027', customer: 'Emily Davis', car: 'Tesla Model 3', status: 'confirmed', amount: 650 },
  ];

  const bookingStatusData = [
    { name: 'Confirmed', value: 198, color: 'bg-green-500', percent: 77 },
    { name: 'Pending', value: 18, color: 'bg-yellow-500', percent: 7 },
    { name: 'Completed', value: 29, color: 'bg-blue-500', percent: 11 },
    { name: 'Cancelled', value: 12, color: 'bg-red-500', percent: 5 },
  ];

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      completed: 'bg-blue-100 text-blue-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-sm text-gray-600 mt-1">
              Welcome back! Here's what's happening today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
              <FaCalendarAlt className="text-sm" />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatOverviewCard
          title="Total Cars"
          count={42}
          icon={<FaCar className="text-white text-2xl" />}
          color="bg-blue-500"
        />
        <StatOverviewCard
          title="Total Bookings"
          count={118}
          icon={<FaClipboardList className="text-white text-2xl" />}
          color="bg-orange-500"
        />
        <StatOverviewCard
          title="Pending Bookings"
          count={16}
          icon={<FaClock className="text-white text-2xl" />}
          color="bg-yellow-500"
        />
        <StatOverviewCard
          title="Completed Trips"
          count={94}
          icon={<FaCheckCircle className="text-white text-2xl" />}
          color="bg-green-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <CarStatsCard
          title="Total Revenue"
          value={9450}
          change="+3.8%"
          comparedValue={8920}
        />
        <CarStatsCard
          title="Total Expenses"
          value={5620}
          change="-1.2%"
          comparedValue={5690}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Booking Status Distribution</h2>
          <div className="space-y-4">
            {bookingStatusData.map((status, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${status.color}`}></span>
                    <span className="font-medium text-gray-700">{status.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">{status.value} bookings</span>
                    <span className="font-semibold text-gray-800">{status.percent}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${status.color} h-3 rounded-full transition-all`}
                    style={{ width: `${status.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Bookings</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Booking ID</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Customer</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Car</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Status</th>
                  <th className="text-right text-xs font-semibold text-gray-600 pb-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 text-sm font-medium text-gray-800">{booking.id}</td>
                    <td className="py-3 text-sm text-gray-700">{booking.customer}</td>
                    <td className="py-3 text-sm text-gray-700">{booking.car}</td>
                    <td className="py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm font-semibold text-gray-800 text-right">
                      ${booking.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;
