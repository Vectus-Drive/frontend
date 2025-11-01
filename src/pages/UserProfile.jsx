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

  }, [showEditProfileModal, showImageModal, showPasswordModal])


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
        <EditUserName setShowEditUserName={setShowEditUserName} userData={userData} id={user.id}/>
      )}

      {showPasswordModal && (
        <ChangePassword setShowPasswordModal={setShowPasswordModal} userData={userData} id={user.id} />
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
