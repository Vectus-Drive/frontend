import { useForm } from "react-hook-form";

export default function EditProfileModal({
  editForm,
  setUserData,
  setShowEditProfileModal,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: editForm,
  });

  const onSubmit = (data) => {
    console.log("📝 Updated Profile Data:", data);
    alert("Profile updated successfully!");
    setUserData(data);
    reset();
    setShowEditProfileModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-6 rounded-2xl w-full max-w-md text-white space-y-4 border border-gray-700"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <button
            type="button"
            onClick={() => setShowEditProfileModal(false)}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* Input Fields */}
        {[
          { label: "Name", name: "name" },
          { label: "NIC", name: "nic" },
          { label: "Username", name: "username" },
          { label: "Email", name: "email", type: "email" },
          { label: "Telephone No", name: "telephone_no" },
          { label: "Address", name: "address" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block text-gray-300 text-sm mb-1">{label}</label>
            <input
              type={type}
              placeholder={label}
              className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 outline-none text-white"
              {...register(name, {
                required: `${label} is required`,
                ...(name === "email" && {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                }),
              })}
            />
            {errors[name] && (
              <p className="text-red-400 text-sm mt-1">
                {errors[name]?.message}
              </p>
            )}
          </div>
        ))}

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowEditProfileModal(false)}
            className="flex-1 bg-gray-600 hover:bg-gray-500 rounded-lg py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-orange-600 hover:bg-orange-700 rounded-lg py-2"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
