import Layout from "../components/Layouts/Layout";
import "./About.css";

const About = () => {
  return (
    <Layout title="About Us">
      <div className="row about">
        <div className="col-md-5">
          <img src="/images/about.jpeg" style={{ width: "100%" }} />
        </div>
        <div className="col-md-5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry &apos;s standard dummy
          text ever since the 1500s, when an unknown printer took a galley of
          type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged.
        </div>
      </div>
    </Layout>
  );
};

export default About;
