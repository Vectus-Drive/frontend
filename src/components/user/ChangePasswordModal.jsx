function ChangePasswordModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-2xl w-96 text-white">
        <h2 className="text-2xl mb-4 text-center">Change Password</h2>
        <form className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full p-2 bg-gray-700 rounded-md border border-gray-600"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 bg-gray-700 rounded-md border border-gray-600"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 bg-gray-700 rounded-md border border-gray-600"
          />
          <div className="flex gap-3 mt-4">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-600 rounded-lg py-2">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700 rounded-lg py-2">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
