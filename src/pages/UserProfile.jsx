import { useEffect, useState } from "react";
import HeaderBar from "../components/user/HeaderBar";
import ProfileSidebar from "../components/user/ProfileSidebar";
import BookingTabs from "../components/user/BookingTabs";
import EditProfileModal from "../components/user/EditProfileModal";
import ChangePassword from "../components/user/ChangePassword";
import BookingDetails from "../components/user/BookingDetails";
import EditProfileImageModal from "../components/user/EditProfileImageModal";
import EditUserName from "../components/user/EditUserName";
import { getAllBookingsFromCustomerId, getCustomerData, getNotifications } from "../api/api";
import { useAuth } from "../hooks/AuthContext";

function UserProfile() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showEditUserName, setShowEditUserName] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [notifications, setNotifications] = useState({});
  const [bookings, setBookings] = useState({});

  const { user } = useAuth();

  useEffect(() => {
    getCustomerData(user.id)
      .then(res => {
        const data = res.data
        setUserData({
          ...data,
          customer_id: user.id
        });
      })

    getNotifications(user.id)
      .then(res => {
        setNotifications(res.data);
      })

    getAllBookingsFromCustomerId(user.id)
    .then(res => {
      setBookings(res.data)
    })


  }, [showEditProfileModal, showImageModal])



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

  // const bookings = [
  //   {
  //     booking_id: "B001",
  //     customer_id: "C001",
  //     car_id: "CAR_Q0Q5TKC9M1ZOE1Q2BXNK",
  //     booked_at: "2025-09-11",
  //     time_period: "12 days",
  //     returned_at: "2025-09-23",
  //     fine: "LKR 0.00",
  //     payment_method: "Credit Card",
  //     transaction_id: "pi_355vovRVkJoUVWZMojvGrce",
  //     status: "pending",
  //     total: "LKR 102,000",
  //   },
  // ];

  const handleNotifClick = () => {
    setShowNotifDropdown(!showNotifDropdown);
  };

  return (
    <div>
      <HeaderBar
        showNotifDropdown={showNotifDropdown}
        notifications={notifications}
        setShowNotifDropdown={setShowNotifDropdown}
        handleNotifClick={handleNotifClick}
        setShowPasswordModal={setShowPasswordModal}
      />

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        <ProfileSidebar
          userData={userData}
          setUserData={setUserData}
          setShowEditProfileModal={setShowEditProfileModal}
          setShowEditUserName={setShowEditUserName}
          setShowImageModal={setShowImageModal}
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
          id={user.id}
          userData={userData}
          setShowEditProfileModal={setShowEditProfileModal}
        />
      )}

      {showEditUserName && (
        <EditUserName setShowEditUserName={setShowEditUserName} />
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

      {showImageModal && (
        <EditProfileImageModal
          id={user.id}
          show={showImageModal}
          setShow={setShowImageModal}
          userData={userData}
          setUserData={setUserData}
        />
      )}
    </div>
  );
}

export default UserProfile;
