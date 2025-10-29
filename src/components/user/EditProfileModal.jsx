export default function EditProfileModal({
  editForm,
  setEditForm,
  setUserData,
  setShowEditProfileModal,
}) {
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setUserData(editForm);
    setShowEditProfileModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Edit Profile</h2>
          <button
            onClick={() => setShowEditProfileModal(false)}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          {["name", "nic", "username", "email", "telephone_no", "address"].map((field) => (
            <div key={field}>
              <label className="block text-slate-300 text-sm font-medium mb-2 capitalize">
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={editForm[field]}
                onChange={handleEditChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleSaveProfile}
          className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-medium"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
