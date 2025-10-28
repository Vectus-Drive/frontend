import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaLock, FaArrowLeft, FaBell } from "react-icons/fa";
import ProfileCard from "../components/user/ProfileCard";
import BookingList from "../components/user/BookingList";
import ChangePasswordModal from "../components/user/ChangePasswordModal";
import BookingDetailsModal from "../components/user/BookingDetailsModal";
import { CarContext } from "../context/CarProvider";

function UserProfile() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Your booking for CAR_THLCY5Y1M1XRRMXQTFDD was canceled",
      read: false,
    },
    { id: 2, message: "Your new booking is confirmed", read: false },
  ]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const { cars } = useContext(CarContext);

  const booking = [
    {
      booking_id: "B001",
      customer_id: "C001",
      car_id: "CAR_THLCY5Y1M1XRRMXQTFDD",
      booked_at: "2025-09-11",
      time_period: "12 days",
      returned_at: "2025-09-23",
      fine: "LKR 0.00",
      payment_method: "Credit Card",
      transaction_id: "pi_355vovRVkJoUVWZMojvGrce",
    },
  ];

  const bookedCars = booking.map((b) =>
    cars.find((car) => car.car_id === b.car_id)
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotifClick = () => {
    setShowNotifDropdown(!showNotifDropdown);
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-[#0e1a2b] text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-orange-400 hover:text-orange-500"
        >
          <FaArrowLeft /> Back to Home
        </Link>

        <div className="flex items-center gap-3 relative">
          <button
            onClick={handleNotifClick}
            className="relative flex items-center justify-center p-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            <FaBell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifDropdown && (
            <div className="absolute mt-60 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
              <div className="flex justify-end p-3 border-b border-gray-700">
                <button
                  onClick={() => setShowNotifDropdown(false)}
                  className="text-gray-400 hover:text-white"
                >
                  &times;
                </button>
              </div>

              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-4 text-center text-gray-400">
                    No notifications
                  </p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors ${
                        notif.read ? "bg-gray-900" : "bg-gray-800"
                      }`}
                    >
                      <p className="text-sm">{notif.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg"
          >
            <FaLock /> Change Password
          </button>

          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white">
            <FaSignOutAlt /> Log Out
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ProfileCard onChangePassword={() => setShowPasswordModal(true)} />
        </div>

        <div className="lg:col-span-2">
          <BookingList cars={bookedCars} onSelectCar={setSelectedCar} />
        </div>
      </div>

      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}

      {selectedCar && (
        <BookingDetailsModal
          car={selectedCar}
          booking={booking.find((b) => b.car_id === selectedCar.car_id)}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </div>
  );
}

export default UserProfile;
