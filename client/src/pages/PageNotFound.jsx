import { Link } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <Layout title="Go Back- Page not Found">
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h4 className="pnf-heading">Page Not Found</h4>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
