import { useForm } from "react-hook-form";
import { FaEnvelope, FaUser, FaPhone, FaWhatsapp } from "react-icons/fa";

function InquiryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    console.log("🚗 Inquiry Form Data:", data);
    alert("Inquiry submitted successfully!");
    reset();
  };

  return (
    <div className="bg-gray-800 bg-opacity-80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
      <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-orange-500">
        <FaEnvelope className="text-orange-500" /> Contact us
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        Fill out the form and we'll get back to you promptly.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center bg-gray-700 rounded-md px-3">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
                className="bg-transparent w-full py-3 text-white outline-none placeholder-gray-400"
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-center bg-gray-700 rounded-md px-3">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="bg-transparent w-full py-3 text-white outline-none placeholder-gray-400"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <div className="flex items-center bg-gray-700 rounded-md px-3">
            <FaPhone className="text-gray-400 mr-2" />
            <input
              type="tel"
              placeholder="Phone Number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
              className="bg-transparent w-full py-3 text-white outline-none placeholder-gray-400"
            />
          </div>
          {errors.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <div className="flex items-start bg-gray-700 rounded-md px-3 py-2">
            <FaEnvelope className="text-gray-400 mt-3 mr-2" />
            <textarea
              placeholder="Tell us about your rental needs..."
              {...register("message", { required: "Message is required" })}
              rows="3"
              className="bg-transparent w-full text-white outline-none placeholder-gray-400 resize-none py-2"
            ></textarea>
          </div>
          {errors.message && (
            <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
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
