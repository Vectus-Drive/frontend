import { useEffect, useState } from "react";
import HeaderBar from "../components/user/HeaderBar";
import ProfileSidebar from "../components/user/ProfileSidebar";
import BookingTabs from "../components/user/BookingTabs";
import EditProfileModal from "../components/user/EditProfileModal";
import ChangePassword from "../components/user/ChangePassword";
import BookingDetails from "../components/user/BookingDetails";
import EditProfileImageModal from "../components/user/EditProfileImageModal";
import EditUserName from "../components/user/EditUserName";
import {
  getAllBookingsFromCustomerId,
  getCustomerData,
  getNotifications,
  getAllReviewsFromCustomerId
} from "../api/api";
import { useAuth } from "../hooks/AuthContext";
import ReviewsGrid from "../components/user/ReviewsGrid";

function UserProfile() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showEditUserName, setShowEditUserName] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]); // new

  const { user } = useAuth();

  useEffect(() => {
    getCustomerData(user.id)
      .then(res => {
        const data = res.data;
        setUserData({ ...data, customer_id: user.id });
      });

    getNotifications(user.id)
      .then(res => setNotifications(res?.data || []));

    getAllBookingsFromCustomerId(user.id)
      .then(res => setBookings(res?.data || []));

    getAllReviewsFromCustomerId(user.id)
      .then(res => setReviews(res?.data || []));
  }, [showEditProfileModal, showImageModal, showPasswordModal]);

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

        <div className="w-full space-y-8">
          <BookingTabs
            bookings={bookings}
            setSelectedBooking={setSelectedBooking}
            setBookings={setBookings}
          />

          {/* Reviews Section */}

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden flex flex-col">
            <div className="border-b border-slate-700 px-6 py-4 flex-shrink-0">
              <h2 className="text-lg font-semibold text-orange-400">My Reviews</h2>
            </div>

            <ReviewsGrid reviews={reviews} setReviews={setReviews}/>
          </div>


        </div>
      </div>

      {/* Modals */}
      {showEditProfileModal && (
        <EditProfileModal
          id={user.id}
          userData={userData}
          setShowEditProfileModal={setShowEditProfileModal}
        />
      )}

      {showEditUserName && (
        <EditUserName setShowEditUserName={setShowEditUserName} userData={userData} id={user.id} />
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

      {/* {showReviewsModal && (
        <ReviewsModal
          show={showReviewsModal}
          setShow={setShowReviewsModal}
          reviews={reviews}
          setReviews={setReviews}
          userId={user.id}
        />
      )} */}
    </div>
  );
}

export default UserProfile;
