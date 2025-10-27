import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaLock, FaArrowLeft } from "react-icons/fa";
import ProfileCard from "../components/user/ProfileCard";
import BookingList from "../components/user/BookingList";
import ChangePasswordModal from "../components/user/ChangePasswordModal";
import BookingDetailsModal from "../components/user/BookingDetailsModal";
import { CarContext } from "../context/CarProvider";

function UserProfile() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const { cars } = useContext(CarContext);

  const booking = [
    {
      booking_id: "B001",
      customer_id: "C001",
      car_id: "ADD3455",
      booked_at: "2025-09-11",
      time_period: "12 days",
      returned_at: "2025-09-23",
      fine: "LKR 0.00",
      payment_method: "Credit Card",
      transaction_id: "pi_355vovRVkJoUVWZMojvGrce",
    },
    {
      booking_id: "B001",
      customer_id: "C001",
      car_id: "CAD2189",
      booked_at: "2025-09-11",
      time_period: "12 days",
      returned_at: "2025-09-23",
      fine: "LKR 0.00",
      payment_method: "Credit Card",
      transaction_id: "pi_355vovRVkJoUVWZMojvGrce",
    },
  ];

  const bookedCars = booking.map((b) =>
    cars.find((car) => car.no === b.car_id)
  );

  return (
    <div className="min-h-screen bg-[#0e1a2b] text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-orange-400 hover:text-orange-500"
        >
          <FaArrowLeft /> Back to Home
        </Link>

        <div className="flex items-center gap-3">
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
          booking={booking.find((b) => b.car_id === selectedCar.no)}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </div>
  );
}

export default UserProfile;
