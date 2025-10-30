import { useFormik } from "formik";

export default function ChangePassword({ setShowPasswordModal }) {
  const formik = useFormik({
    initialValues: { current: "", newPass: "", confirm: "" },
    validate: (v) => {
      const e = {};
      if (!v.current) e.current = "Current password required";
      if (!v.newPass) e.newPass = "New password required";
      else if (v.newPass.length < 6) e.newPass = "At least 6 characters";
      if (!v.confirm) e.confirm = "Confirm password required";
      else if (v.newPass !== v.confirm) e.confirm = "Passwords do not match";
      return e;
    },
    onSubmit: (v, { resetForm }) => {
      console.log("🔐 Password Change Data:", v);
      alert("Password changed successfully!");
      resetForm();
      setShowPasswordModal(false);
    },
  });

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl w-96 text-white space-y-4"
      >
        <h2 className="text-2xl mb-4 text-center">Change Password</h2>
        {["current", "newPass", "confirm"].map((f, i) => (
          <div key={i}>
            <input
              type="password"
              name={f}
              placeholder={
                f === "current"
                  ? "Current Password"
                  : f === "newPass"
                  ? "New Password"
                  : "Confirm Password"
              }
              value={formik.values[f]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 outline-none"
            />
            {formik.touched[f] && formik.errors[f] && (
              <p className="text-red-400 text-sm mt-1">{formik.errors[f]}</p>
            )}
          </div>
        ))}

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
