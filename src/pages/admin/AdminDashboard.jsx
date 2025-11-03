import { useEffect, useState } from "react";
import {
  FaCar,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaCalendarAlt,
  FaDollarSign,
  FaChartLine,
} from "react-icons/fa";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function AdminDashboard() {
  const navigate = useNavigate();

  const [carCount, setCarCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [pendingBookingCount, setPendingBookingCount] = useState(0);
  const [completedBookingCount, setCompletedBookingCount] = useState(0);
  const [cancelledBookingCount, setCancelledBookingCount] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);
  const [bookingStatusData, setBookingStatusData] = useState([]);

  // 💰 New state for transactions
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "bg-gradient-to-r from-green-500 to-green-600 text-white",
      pending: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white",
      booked: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
      completed: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
      cancelled: "bg-gradient-to-r from-red-500 to-red-600 text-white",
    };
    return (
      colors[status] || "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
    );
  };

  const getStatusData = async () => {
    try {
      // Fetch cars and bookings first (they are essential)
      const [resCars, resBookings] = await Promise.all([
        api.get("/cars"),
        api.get("/bookings"),
      ]);

      // --- CARS ---
      const cars = resCars.data?.data || [];
      setCarCount(cars.length);

      // --- BOOKINGS ---
      const bookings = resBookings.data?.data || [];
      let pending = 0,
        completed = 0,
        cancelled = 0;

      bookings.forEach((b) => {
        if (b.status === "pending") pending++;
        else if (b.status === "booked" || b.status === "completed") completed++;
        else if (b.status === "canceled") cancelled++;
      });

      setPendingBookingCount(pending);
      setCompletedBookingCount(completed);
      setCancelledBookingCount(cancelled);
      setBookingCount(bookings.length);

      const total = bookings.length || 1;
      const bookingStats = [
        {
          name: "Completed",
          value: completed,
          color: "from-green-500 to-green-600",
          percent: Math.round((completed / total) * 100),
        },
        {
          name: "Pending",
          value: pending,
          color: "from-yellow-500 to-yellow-600",
          percent: Math.round((pending / total) * 100),
        },
        {
          name: "Cancelled",
          value: cancelled,
          color: "from-red-500 to-red-600",
          percent: Math.round((cancelled / total) * 100),
        },
      ];
      setBookingStatusData(bookingStats);

      // --- RECENT BOOKINGS ---
      const latestBookings = bookings.slice(-5).reverse();
      const bookingDetails = await Promise.all(
        latestBookings.map(async (b) => {
          try {
            const [customerRes, carRes] = await Promise.all([
              api.get(`/customers/${b.customer_id}`),
              api.get(`/cars/${b.car_id}`),
            ]);
            const customerName =
              customerRes.data?.data?.name || "Unknown Customer";
            const carLicense =
              carRes.data?.data?.license_no || "Unknown License";
            return {
              id: b.booking_id,
              customer: customerName,
              car: carLicense,
              status: b.status,
              amount: b.fine || 0,
            };
          } catch {
            return {
              id: b.booking_id,
              customer: b.customer_id,
              car: b.car_id,
              status: b.status,
              amount: b.fine || 0,
            };
          }
        })
      );
      setRecentBookings(bookingDetails);

      // --- TRANSACTIONS ---
      try {
        const resTransactions = await api.get("/transactions");
        const transactions = resTransactions.data?.data || [];

        let revenue = 0;
        let expenses = 0;
        transactions.forEach((t) => {
          if (t.transaction_type === "credit") revenue += t.transaction_amount;
          else if (t.transaction_type === "debit")
            expenses += t.transaction_amount;
        });

        setTotalRevenue(revenue);
        setTotalExpenses(expenses);
      } catch (transactionError) {
        console.warn(
          "⚠️ No transactions found or failed to fetch:",
          transactionError
        );
        setTotalRevenue(0);
        setTotalExpenses(0);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    getStatusData();
  }, []);

  const generateXLSXReport = () => {
    try {
      // Create workbook
      const wb = XLSX.utils.book_new();

      // Sheet 1 - Dashboard Summary
      const summaryData = [
        ["Metric", "Value"],
        ["Total Cars", carCount],
        ["Total Bookings", bookingCount],
        ["Pending Bookings", pendingBookingCount],
        ["Completed Bookings", completedBookingCount],
        ["Cancelled Bookings", cancelledBookingCount],
        ["Total Revenue ($)", totalRevenue],
        ["Total Expenses ($)", totalExpenses],
      ];
      const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, summarySheet, "Dashboard Summary");

      // Sheet 2 - Booking Status Distribution
      const statusData = [
        ["Status", "Bookings", "Percentage"],
        ...bookingStatusData.map((s) => [s.name, s.value, `${s.percent}%`]),
      ];
      const statusSheet = XLSX.utils.aoa_to_sheet(statusData);
      XLSX.utils.book_append_sheet(wb, statusSheet, "Booking Status");

      // Sheet 3 - Recent Bookings
      const bookingData = [
        ["Booking ID", "Customer", "Car License", "Status", "Amount ($)"],
        ...recentBookings.map((b) => [
          b.id,
          b.customer,
          b.car,
          b.status,
          b.amount,
        ]),
      ];
      const bookingSheet = XLSX.utils.aoa_to_sheet(bookingData);
      XLSX.utils.book_append_sheet(wb, bookingSheet, "Recent Bookings");

      // Save File
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const fileData = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(
        fileData,
        `Admin_Dashboard_Report_${new Date().toISOString().slice(0, 10)}.xlsx`
      );
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="relative z-10">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Dashboard{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Overview
              </span>
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Welcome back! Here's what's happening today.
            </p>
          </div>
          <button
            onClick={generateXLSXReport}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 duration-300"
          >
            <FaCalendarAlt className="text-sm" />
            Generate Report
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg shadow-lg shadow-blue-500/30">
                <FaCar className="text-white text-2xl" />
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                +12%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Total Cars
            </h3>
            <p className="text-3xl font-bold text-gray-800">{carCount}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-lg shadow-lg shadow-orange-500/30">
                <FaClipboardList className="text-white text-2xl" />
              </div>
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">
                +8%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Total Bookings
            </h3>
            <p className="text-3xl font-bold text-gray-800">{bookingCount}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-lg shadow-lg shadow-yellow-500/30">
                <FaClock className="text-white text-2xl" />
              </div>
              <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                {pendingBookingCount}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Pending Bookings
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {pendingBookingCount}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg shadow-lg shadow-green-500/30">
                <FaCheckCircle className="text-white text-2xl" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                +15%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Completed Bookings
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {completedBookingCount}
            </p>
          </div>
        </div>

        {/* 💰 Revenue & Expenses Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 rounded-lg shadow-lg shadow-emerald-500/30">
                  <FaDollarSign className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm font-medium">
                    Total Revenue
                  </h3>
                  <p className="text-2xl font-bold text-gray-800">
                    ${totalRevenue.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-green-600 font-semibold flex items-center gap-1 text-sm">
                  <FaChartLine /> +3.8%
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Updated from Transactions
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full shadow-sm"
                style={{
                  width: `${Math.min(
                    (totalRevenue / (totalRevenue + totalExpenses)) * 100 || 0,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-lg shadow-lg shadow-red-500/30">
                  <FaDollarSign className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm font-medium">
                    Total Expenses
                  </h3>
                  <p className="text-2xl font-bold text-gray-800">
                    ${totalExpenses.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-red-600 font-semibold flex items-center gap-1 text-sm">
                  <FaChartLine className="rotate-180" /> -1.2%
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Updated from Transactions
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full shadow-sm"
                style={{
                  width: `${Math.min(
                    (totalExpenses / (totalRevenue + totalExpenses)) * 100 || 0,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Status Distribution */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded"></span>
              Booking Status Distribution
            </h2>
            <div className="space-y-5">
              {bookingStatusData.map((status, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${status.color} shadow-md`}
                      ></div>
                      <span className="font-medium text-gray-700">
                        {status.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">
                        {status.value} bookings
                      </span>
                      <span className="font-bold text-gray-800 min-w-[3rem] text-right">
                        {status.percent}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${status.color} h-3 rounded-full transition-all duration-500 shadow-sm`}
                      style={{ width: `${status.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded"></span>
                Recent Bookings
              </h2>
              <button
                onClick={() => navigate("/dashboard/booking-management")}
                className="text-sm text-orange-600 hover:text-orange-700 font-semibold transition-colors"
              >
                View All →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3 px-2">
                      Customer
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3 px-2">
                      Car License
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3 px-2">
                      Status
                    </th>
                    <th className="text-right text-xs font-semibold text-gray-600 pb-3 px-2">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b) => (
                    <tr
                      key={b.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-2 text-sm text-gray-700">
                        {b.customer}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-700">
                        {b.car}
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
                            b.status
                          )} shadow-md`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-sm font-bold text-gray-800 text-right">
                        ${b.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
