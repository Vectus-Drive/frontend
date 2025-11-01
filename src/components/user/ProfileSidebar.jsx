import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaUser,
  FaEdit,
} from "react-icons/fa";

export default function ProfileSidebar({
  userData,
  setShowEditProfileModal,
  setShowEditUserName,
  setShowImageModal,
}) {

  return (
    <div className="space-y-6 w-150">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden relative">
        <div className="h-24 bg-gradient-to-r from-orange-500 to-orange-600"></div>
        <div className="px-6 pb-6">
          <div className="-mt-12 mb-4 relative w-24 h-24 mx-auto">
            <img
              src={userData.image}
              alt={userData.name}
              className="w-24 h-24 rounded-full border-4 border-slate-800 object-cover cursor-pointer"
              onClick={() => setShowImageModal(true)}
            />

          </div>

          <h2 className="text-2xl font-bold text-white mb-1">
            {userData.name}
          </h2>
          <p className="text-slate-400 text-sm mb-4">@{userData?.user?.username || ""}</p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-300">
              <FaIdCard className="text-orange-400" size={16} />
              <span className="text-sm">
                {userData.customer_id}
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <FaUser className="text-orange-400" size={16} />
              <span className="text-sm">{userData.nic}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <FaEnvelope className="text-orange-400" size={16} />
              <span className="text-sm">{userData.email}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <FaPhone className="text-orange-400" size={16} />
              <span className="text-sm">{userData.telephone_no}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <FaMapMarkerAlt className="text-orange-400" size={16} />
              <span className="text-sm">{userData.address}</span>
            </div>
          </div>

          <button
            onClick={() => setShowEditProfileModal(true)}
            className="mt-6 flex items-center gap-2 text-sm bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors w-full justify-center"
          >
            <FaEdit size={14} />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={() => setShowEditUserName(true)}
             className="mt-6 flex items-center gap-2 text-sm bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors w-full justify-center"
          >
            <FaEdit size={14} />
            <span>Edit Username</span>
          </button>
        </div>
      </div>
    </div>
  );
}
