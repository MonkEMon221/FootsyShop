import Footer from "./Footer";
import Header from "./Header";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta charSet="keywords" content={keywords} />
        <meta charSet="author" content={author} />

        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="d-flex" style={{ minHeight: "75vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App",
  description: "Full Satck program",
  keywords: "mern, mongo db, react, node js",
  author: "Vishesh",
};

Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  author: PropTypes.string,
};

export default Layout;
