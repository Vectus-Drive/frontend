import { useForm } from "react-hook-form";

export default function ChangePassword({ setShowPasswordModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { current: "", newPass: "", confirm: "" },
  });

  const onSubmit = (data) => {
    console.log("🔐 Password Change Data:", data);
    alert("Password changed successfully!");
    reset();
    setShowPasswordModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-6 rounded-2xl w-96 text-white space-y-4"
      >
        <h2 className="text-2xl mb-4 text-center">Change Password</h2>

        {/* Current Password */}
        <div>
          <input
            type="password"
            placeholder="Current Password"
            {...register("current", {
              required: "Current password required",
            })}
            className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 outline-none"
          />
          {errors.current && (
            <p className="text-red-400 text-sm mt-1">{errors.current.message}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <input
            type="password"
            placeholder="New Password"
            {...register("newPass", {
              required: "New password required",
              minLength: {
                value: 6,
                message: "At least 6 characters",
              },
            })}
            className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 outline-none"
          />
          {errors.newPass && (
            <p className="text-red-400 text-sm mt-1">{errors.newPass.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirm", {
              required: "Confirm password required",
              validate: (value, formValues) =>
                value === formValues.newPass || "Passwords do not match",
            })}
            className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 outline-none"
          />
          {errors.confirm && (
            <p className="text-red-400 text-sm mt-1">{errors.confirm.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={() => setShowPasswordModal(false)}
            className="flex-1 bg-gray-600 rounded-lg py-2"
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
