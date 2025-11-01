import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateCustomer } from "../../api/api";

function EditProfileModal({ userData, setShowEditProfileModal, id }) {
  // ✅ Validation Schema with Yup
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    nic: yup.string().required("NIC is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    telephone_no: yup
      .string()
      .matches(/^\d{10}$/, "Telephone number must be 10 digits")
      .required("Telephone number is required"),
    address: yup.string().required("Address is required"),
  });

  // ✅ React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: userData,
  });

  const onSubmit = async (data) => {
    try {
      await updateCustomer(data, id);
      reset();
      setShowEditProfileModal(false);
      } catch (err) {
        console.error(err);
      }
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

        {/* ✅ Normal fields instead of mapping */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Name</label>
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 outline-none text-white"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-1">NIC</label>
          <input
            {...register("nic")}
            placeholder="NIC"
            className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 outline-none text-white"
          />
          {errors.nic && (
            <p className="text-red-400 text-sm mt-1">{errors.nic.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-300 text-sm mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 outline-none text-white"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-1">Telephone No</label>
          <input
            {...register("telephone_no")}
            placeholder="Telephone No"
            className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 outline-none text-white"
          />
          {errors.telephone_no && (
            <p className="text-red-400 text-sm mt-1">
              {errors.telephone_no.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-1">Address</label>
          <input
            {...register("address")}
            placeholder="Address"
            className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 outline-none text-white"
          />
          {errors.address && (
            <p className="text-red-400 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

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

export default EditProfileModal;