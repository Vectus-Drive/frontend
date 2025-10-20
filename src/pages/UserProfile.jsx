import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../components/user/ProfileCard";
import BookingList from "../components/user/BookingList";
import ChangePasswordModal from "../components/user/ChangePasswordModal";
import BookingDetailsModal from "../components/user/BookingDetailsModal";

function UserProfile() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const car = [
    {
      car_id: 1,
      license_no: "ADD3455",
      make: "Toyota",
      model: "Sedan",
      image: "car1.jpg",
      seats: 4,
      fuel: "Petrol",
      transmission: "Automatic",
      doors: 2,
      description:
        "A reliable and fuel-efficient sedan, perfect for city driving and long trips.",
      features: 6,
      price_per_day: 50,
      availability_status: "Available",
      condition: "Excellent",
      services: "Oil changed - 2025-10-15",
    },
  ];

  const booking = {
    booking_id: "B001",
    customer_id: "C001",
    car_id: car.car_id,
    booked_at: "2025-09-11",
    time_period: "12 days",
    returned_at: "2025-09-23",
    fine: "LKR 0.00",
    payment_method: "Credit Card",
    transaction_id: "pi_355vovRVkJoUVWZMojvGrce",
  };

  const user = {
    name: "Dilusha Madushan",
    email: "dilusha@example.com",
    phone: "0774747474",
    address: "Galle, Sri Lanka",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative text-white">
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm transition-all"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="flex gap-8 p-10 w-11/12">
        <div className="w-1/3">
          <ProfileCard onChangePassword={() => setShowPasswordModal(true)} />
          <button className="bg-red-600 hover:bg-red-700 mt-4 w-full py-2 rounded-lg">
            Log Out
          </button>
        </div>

        <div className="w-2/3 h-[750px] overflow-y-auto bg-gray-800 rounded-2xl p-6 shadow-lg">
          <BookingList cars={car} onSelectCar={setSelectedCar} />
        </div>
      </div>

      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}

      {selectedCar && (
        <BookingDetailsModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          booking={booking}
          user={user}
        />
      )}
    </div>
  );
}

export default UserProfile;
