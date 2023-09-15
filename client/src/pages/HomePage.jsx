import { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useCart from "../context/useCart";
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const api = import.meta.env.VITE_API;

  //fetch products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${api}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);
  //fetch categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${api}/api/v1/category/categories`);
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //product count
  const getProductCount = async () => {
    try {
      const { data } = await axios.get(`${api}/api/v1/product/product-count`);
      if (data?.success) {
        setTotal(data.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getProductCount();
    // eslint-disable-next-line
  }, []);

  //filter products

  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${api}/api/v1/product/filter-product`,
        { checked, radio }
      );
      if (data?.success) setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Error filtering Products");
    }
  };

  useEffect(() => {
    if (checked.length > 0 || radio.length) filterProducts();
  }, [checked, radio]);

  const handleCategoryFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    }
    if (!value) {
      all = all.filter((c) => c != id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${api}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...(data?.products ?? [])]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={"All Products"}>
      <div className="d-flex flex-column">
        <img
          src="/images/banner.jpg"
          className="banner-img"
          alt="bannerimage"
          width={"100%"}
        />
        <div className="container-fluid row mt-3 w-100 home-page">
          <div className="col-md-3 filters">
            <h4 className="text-center">Filter By Categories</h4>
            {categories.map((c) => (
              <div
                key={c._id}
                className="d-flex flex-column align-items-center"
              >
                <Checkbox
                  className="m-2 fs-6"
                  onChange={(e) =>
                    handleCategoryFilter(e.target.checked, c._id)
                  }
                >
                  {c.name}
                </Checkbox>
              </div>
            ))}
            <h4 className="text-center mt-3">Filter By Price</h4>
            <div className="d-flex flex-column ">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices.map((p) => (
                  <div
                    key={p._id}
                    className="d-flex flex-col justify-content-center"
                  >
                    <Radio className="m-2 fs-6" value={p.array}>
                      {p.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex justify-content-center m-3 text-center">
              <button
                className="btn btn-danger w-auto"
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h2 className="text-center">All Products</h2>
            <div className="d-flex flex-wrap justify-content-evenly">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="card m-2"
                  style={{ width: "18rem" }}
                >
                  <img
                    src={`${api}/api/v1/product/product-image/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text card-price">$ {p.price}</p>

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
            <div className="d-flex justify-content-center">
              {products && products.length < total && (
                <button
                  className="m-3 p-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "...Loading" : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
