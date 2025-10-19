import Infor from "../components/contact/Infor";
import InquiryForm from "../components/contact/InquiryForm";

function ContactUs() {
  return (
    <div className="text-white md:px-25 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-4xl font-extrabold text-white">
          Contact <span className="text-orange-500">Our Team</span>
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Have questions about our premium fleet? Our team is ready to assist
          you with your car rental needs.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
          < Infor/>
          < InquiryForm/>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
