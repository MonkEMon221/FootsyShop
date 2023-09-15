import { useNavigate } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import useSearch from "../context/useSearch";
import "./CategoriesProduct.css";
import useCart from "../context/useCart";
import toast from "react-hot-toast";

const Search = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [value] = useSearch();
  const api = import.meta.env.VITE_API;
  return (
    <Layout title={"Search Products"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {value?.result.length < 1
              ? "No Matching Items Found"
              : `Found ${value?.result.length} Matching item`}
          </h6>
          <div className="d-flex flex-wrap justify-content-evenly home-page">
            {value?.result.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
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
                  <p className="card-text">$ {p.price}</p>

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
      </div>
    </Layout>
  );
};

export default Search;
