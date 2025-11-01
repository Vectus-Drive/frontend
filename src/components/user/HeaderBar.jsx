import { FaArrowLeft, FaBell, FaLock, FaSignOutAlt } from "react-icons/fa";

export default function HeaderBar({
  showNotifDropdown,
  notifications,
  setShowNotifDropdown,
  handleNotifClick,
  setShowPasswordModal,
}) {
  const handleBackToHome = () => (window.location.href = "/");

  return (
    <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <button
          onClick={handleBackToHome}
          className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors"
        >
          <FaArrowLeft size={16} />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={handleNotifClick}
              className="relative p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <FaBell size={18} className="text-slate-300" />
                <span className="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold text-white bg-orange-500 rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 top-14 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-slate-700">
                  <h3 className="text-white font-semibold">Notifications</h3>
                  <button
                    onClick={() => setShowNotifDropdown(false)}
                    className="text-slate-400 hover:text-white text-xl"
                  >
                    ×
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.notification_id}
                      className={`p-4 border-b border-slate-700 hover:bg-slate-700/50 ${
                        !n.read ? "bg-slate-700/30" : ""
                      }`}
                    >
                      <p
                        // className={`text-sm ${
                        //   n.status === "booked"
                        //     ? "text-green-400"
                        //     : "text-red-400"
                        // }`}
                        className={`text-sm`}
                      >
                        {n.text}
                      </p>
                      <span className="text-xs text-slate-400 mt-1 block">
                        {n.created_at}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2.5 rounded-lg font-medium"
          >
            <FaLock size={14} /> Change Password
          </button>

          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-lg font-medium">
            <FaSignOutAlt size={14} /> Log Out
          </button>
        </div>
      </div>
    </header>
  );
}
