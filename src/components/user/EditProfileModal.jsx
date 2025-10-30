import { useFormik } from "formik";

export default function EditProfileModal({
  editForm,
  setEditForm,
  setUserData,
  setShowEditProfileModal,
}) {
  const formik = useFormik({
    initialValues: editForm,
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = "Name is required";
      if (!values.nic) errors.nic = "NIC is required";
      if (!values.username) errors.username = "Username is required";
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Invalid email format";
      }
      if (!values.telephone_no) errors.telephone_no = "Phone number is required";
      if (!values.address) errors.address = "Address is required";
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      console.log("📝 Updated Profile Data:", values);
      alert("Profile updated successfully!");
      setUserData(values);
      resetForm();
      setShowEditProfileModal(false);
    },
  });

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

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {[
            { label: "Name", name: "name" },
            { label: "NIC", name: "nic" },
            { label: "Username", name: "username" },
            { label: "Email", name: "email" },
            { label: "Telephone No", name: "telephone_no" },
            { label: "Address", name: "address" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                {label}
              </label>
              <input
                type="text"
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
              />
              {formik.touched[name] && formik.errors[name] && (
                <p className="text-red-400 text-sm mt-1">
                  {formik.errors[name]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-medium"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
