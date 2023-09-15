import { Link } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import useCategory from "../hooks/useCategory";
import "./Categories.css";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container d-flex align-items-center justify-content-center">
        <div className="row">
          {categories.map((c) => (
            <div key={c._id} className="col-md-6 mt-3 mb-3 ">
              <Link
                className="nav-link btn btn-success p-3 category-link"
                to={`/category/${c.slug}`}
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
