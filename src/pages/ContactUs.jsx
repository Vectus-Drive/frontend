import Infor from "../components/contact/Infor";
import InquiryForm from "../components/contact/InquiryForm";
import BannerHeader from "../components/BannerHeader";

function ContactUs() {
  return (
    <div className="text-white px-6 md:px-20 py-10 space-y-20">
      <BannerHeader
        bgImg="./car.jpg"
        t1="Contact"
        t2="Us"
        des="Have questions about our premium fleet? Our team is ready to assist
          you with your car rental needs."
        page="CONTACT"
      />
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
