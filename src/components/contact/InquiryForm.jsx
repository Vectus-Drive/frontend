import { useContext } from "react";
import { useFormik } from "formik";
import { FaEnvelope, FaUser, FaPhone, FaCarSide, FaWhatsapp } from "react-icons/fa";
import { CarContext } from "../../context/CarProvider";

function InquiryForm() {
  const { cars } = useContext(CarContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      type: "all",
      message: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = "Name is required";
      if (!values.email) errors.email = "Email is required";
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
        errors.email = "Invalid email address";
      if (!values.phone) errors.phone = "Phone number is required";
      else if (!/^\d{10}$/.test(values.phone))
        errors.phone = "Phone number must be 10 digits";
      if (!values.message) errors.message = "Message is required";
      return errors;
    },
    onSubmit: (values, {resetForm}) => {
      console.log("🚗 Inquiry Form Data:", values);
      alert("Inquiry submitted successfully!");
      resetForm();
    },
  });

  return (
    <div className="bg-gray-800 bg-opacity-80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
      <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-orange-500">
        <FaEnvelope className="text-orange-500" /> Send Your Inquiry
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        Fill out the form and we'll get back to you promptly.
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center bg-gray-700 rounded-md px-3">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="bg-transparent w-full py-3 text-white outline-none placeholder-gray-400"
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <div className="flex items-center bg-gray-700 rounded-md px-3">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="bg-transparent w-full py-3 text-white outline-none placeholder-gray-400"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center bg-gray-700 rounded-md px-3">
              <FaPhone className="text-gray-400 mr-2" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="bg-transparent w-full py-3 text-white outline-none placeholder-gray-400"
              />
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.phone}</p>
            )}
          </div>

          <div>
            <div className="flex items-center bg-gray-700 rounded-md px-3">
              <FaCarSide className="text-gray-400 mr-2" />
              <select
                name="type"
                onChange={formik.handleChange}
                value={formik.values.type}
                className="bg-[#0f172a] text-gray-200 px-4 py-3.5 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all w-full"
              >
                <option value="all">All Types</option>
                {cars.map((c) => (
                  <option key={c.car_id} value={c.model}>
                    {c.model}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-start bg-gray-700 rounded-md px-3 py-2">
            <FaEnvelope className="text-gray-400 mt-3 mr-2" />
            <textarea
              name="message"
              placeholder="Tell us about your rental needs..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              rows="3"
              className="bg-transparent w-full text-white outline-none placeholder-gray-400 resize-none py-2"
            ></textarea>
          </div>
          {formik.touched.message && formik.errors.message && (
            <p className="text-red-400 text-sm mt-1">{formik.errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md font-semibold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          Send Message <FaWhatsapp />
        </button>
      </form>
    </div>
  );
}

export default InquiryForm;
