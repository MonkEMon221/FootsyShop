import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <div style={{ minHeight: "15vh" }} className="footer bg-dark text-light">
      <h4 className="text-center"> All Rights Reserved &copy; @</h4>
      <p className="text-center mt-3 m-auto">
        <Link to="/about" className="footers">
          About
        </Link>
        <Link to="/contact" className="footers">
          Contact Us
        </Link>
        <Link to="/policy" className="footers">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Footer;
