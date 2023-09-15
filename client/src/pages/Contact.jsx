import Layout from "../components/Layouts/Layout";
import "./Contact.css";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/Bi";

const Contact = () => {
  return (
    <Layout title="Contact Us">
      <div className="row contactus">
        <div className="col-md-6">
          <img src="/images/contactus.jpeg" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
          <h1 className="contact-heading">Contact Us</h1>
          <p className="text-justify mt-2">
            Some Random text for help and all.
          </p>
          <p className="mt-3">
            <BiMailSend /> www.helpsupport@ecom.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> 9988776655
          </p>
          <p className="mt-3">
            <BiSupport /> 1800-333-5777
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
