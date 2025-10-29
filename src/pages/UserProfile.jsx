import { useState } from "react";
import HeaderBar from "../components/user/HeaderBar";
import ProfileSidebar from "../components/user/ProfileSidebar";
import BookingTabs from "../components/user/BookingTabs";
import EditProfileModal from "../components/user/EditProfileModal";
import ChangePassword from "../components/user/ChangePassword";
import BookingDetails from "../components/user/BookingDetails"

function UserProfile() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Your booking for CAR_THLCY5Y1M1XRRMXQTFDD was canceled",
      status: "canceled",
      read: false,
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "Your new booking is confirmed",
      status: "booked",
      read: false,
      time: "5 hours ago",
    },
  ]);

  const [userData, setUserData] = useState({
    customer_id: "C001",
    name: "John Anderson",
    nic: "982345678V",
    username: "john_anderson",
    email: "john.anderson@email.com",
    telephone_no: "+94 77 123 4567",
    address: "123 Palm Grove, Colombo, Sri Lanka",
    image:
      "https://ui-avatars.com/api/?name=John+Anderson&background=f97316&color=fff&size=200",
  });

  const [editForm, setEditForm] = useState(userData);

  const cars = [
    {
      availability_status: true,
      car_id: "CAR_Q0Q5TKC9M1ZOE1Q2BXNK",
      condition: "Excellent",
      description:
        "A reliable and fuel-efficient sedan, perfect for city driving and long trips.",
      doors: 4,
      features: ["Air Conditioning", "Bluetooth", "Backup Camera"],
      fuel: "petrol",
      image: "Toyota - Corolla.jpg",
      license_no: "ADD3458",
      make: "Toyota",
      model: "Corolla",
      price_per_day: 50.0,
      seats: 4,
      services: [],
      transmission: "automatic",
    },
  ];

  const bookings = [
    {
      booking_id: "B001",
      customer_id: "C001",
      car_id: "CAR_Q0Q5TKC9M1ZOE1Q2BXNK",
      booked_at: "2025-09-11",
      time_period: "12 days",
      returned_at: "2025-09-23",
      fine: "LKR 0.00",
      payment_method: "Credit Card",
      transaction_id: "pi_355vovRVkJoUVWZMojvGrce",
      status: "pending",
      total: "LKR 102,000",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotifClick = () => {
    setShowNotifDropdown(!showNotifDropdown);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div>
      <HeaderBar
        unreadCount={unreadCount}
        showNotifDropdown={showNotifDropdown}
        notifications={notifications}
        setShowNotifDropdown={setShowNotifDropdown}
        handleNotifClick={handleNotifClick}
        setShowPasswordModal={setShowPasswordModal}
      />

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        <ProfileSidebar
          userData={userData}
          setShowEditProfileModal={setShowEditProfileModal}
        />
        <div className="w-full h-[80vh]">
          <BookingTabs
            bookings={bookings}
            cars={cars}
            setSelectedBooking={setSelectedBooking}
          />
        </div>
      </div>

      {showEditProfileModal && (
        <EditProfileModal
          editForm={editForm}
          setEditForm={setEditForm}
          setUserData={setUserData}
          setShowEditProfileModal={setShowEditProfileModal}
        />
      )}

      {showPasswordModal && (
        <ChangePassword setShowPasswordModal={setShowPasswordModal} />
      )}

      {selectedBooking && (

        <BookingDetails
          selectedBooking={selectedBooking}
          setSelectedBooking={setSelectedBooking}
        />
      )}
    </div>
  );
}

export default UserProfile;
