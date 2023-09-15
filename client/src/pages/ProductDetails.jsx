import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import useCart from "../context/useCart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const api = import.meta.env.VITE_API;
  useEffect(() => {
    if (params.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${api}/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data?.product);
      getRelatedProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get Related Products
  const getRelatedProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${api}/api/v1/product/similar-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Product Details"}>
      <div className="row container m-3">
        <div className="col-md-5 mb-5">
          <img
            src={`${api}/api/v1/product/product-image/${product._id}`}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        <div className="col-md-7 text-uppercase p-7">
          <h4>
            <span>{product?.name}</span>
          </h4>
          <p>{product?.description}</p>
          <h4>
            Category: <span>{product?.category?.name}</span>{" "}
          </h4>
          <h4>
            Price: <span>$ {product?.price}</span>
          </h4>

          <button
            className="btn btn-primary ms-1 w-auto mt-5"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added Successfully");
            }}
          >
            Add to Cart
          </button>
        </div>
        <hr />
        <div className="row container m-3 h-40">
          <h6>Similar Products</h6>
          {relatedProducts.length < 1 && (
            <p className="text-center">No similar products found</p>
          )}
          <div className="d-flex flex-wrap">
            {relatedProducts.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${api}/api/v1/product/product-image/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{p.name}</h5>
                  <h6 className="card-text">
                    {p.description.substring(0, 30)}...
                  </h6>
                  <h6 className="card-text fw-bold">$ {p.price}</h6>

                  <div className="mt-2 d-flex justify-content-center">
                    <button
                      className="btn btn-primary ms-1 w-auto"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
