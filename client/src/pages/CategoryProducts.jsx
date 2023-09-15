import { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./CategoriesProduct.css";
import toast from "react-hot-toast";
import useCart from "../context/useCart";

const CategoryProducts = () => {
  const api = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    if (params?.slug) getAllProductsByCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug]);
  const getAllProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${api}/api/v1/product/product-category/${params?.slug}`
      );
      setCategory(data?.category);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={`All ${params.slug}`}>
      <div className="container mt-3 text-center">
        <h4>Category : {category.name}</h4>
        <h6>{products.length} Products Found</h6>
        <div className="d-flex flex-wrap justify-content-evenly home-page">
          {products.map((p) => (
            <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`${api}/api/v1/product/product-image/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text price">$ {p.price}</p>

                <div className="mt-2 d-flex justify-content-between">
                  <button
                    className="btn btn-primary ms-1 w-auto"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Info
                  </button>
                  <button
                    className="btn btn-primary ms-1 w-auto"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added Successfully");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
