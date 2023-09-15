import Layout from "../components/Layouts/Layout";
import "./Policy.css";

const Policy = () => {
  return (
    <Layout title="Privacy Policy">
      <div className="row policy">
        <div className="col-md-5">
          <img src="/images/policy.jpg" style={{ width: "100%" }} />
        </div>
        <div className="col-md-5">
          <ul>
            <li>Policy 1</li>
            <li>Policy 2</li>
            <li>Policy 3</li>
            <li>Policy 4</li>
            <li>Policy 5</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
