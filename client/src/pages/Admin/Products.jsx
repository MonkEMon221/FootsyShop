import { useEffect, useState } from "react";
import AdminMenu from "../../components/Layouts/AdminMenu";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const api = import.meta.env.VITE_API;

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${api}/api/v1/product/products`);
      if (data.success) {
        setProducts(data.products);
        console.log(products);
        toast.success("All products fetched");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout title="Dashboard - Products">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div>
              <h1 className="text-center">All Products</h1>
              <div className="d-flex flex-wrap m-2">
                {products.map((p) => (
                  <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <img
                        src={`${api}/api/v1/product/product-image/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
