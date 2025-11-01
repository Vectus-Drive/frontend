import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaTimes } from "react-icons/fa";

function EditUserName({ setShowEditUserName }) {
  const oldUsername = "john_anderson";

  const schema = yup.object().shape({
    newUsername: yup
      .string()
      .required("New username is required")
      .min(4, "Username must be at least 4 characters")
      .max(20, "Username cannot exceed 20 characters")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("✅ Username updated successfully!", data);
    setTimeout(() => {
      setShowEditUserName(false);
    }, 2000);
    reset();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
        <div className="bg-slate-800 text-white p-6 rounded-xl shadow-lg w-[90%] max-w-md relative">
          <button
            onClick={() => setShowEditUserName(false)}
            className="absolute top-4 right-4 text-slate-300 hover:text-white"
          >
            <FaTimes size={18} />
          </button>

          <h2 className="text-xl font-semibold mb-4 text-center">
            Edit Username
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Old Username
              </label>
              <input
                type="text"
                value={oldUsername}
                readOnly
                className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-300 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">
                New Username
              </label>
              <input
                type="text"
                placeholder="Enter new username"
                {...register("newUsername")}
                className={`w-full px-3 py-2 rounded-lg bg-slate-700 border ${
                  errors.newUsername
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-600 focus:ring-orange-500"
                } text-white focus:outline-none focus:ring-2`}
              />
              {errors.newUsername && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.newUsername.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditUserName;
