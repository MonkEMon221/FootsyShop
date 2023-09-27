import { useNavigate } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import useAuth from "../context/useAuth";
import useCart from "../context/useCart";
import toast from "react-hot-toast";
import "./CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const api = import.meta.env.VITE_API;

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      const index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const onCheckOutClick = () => {
    toast.success("Order Placed Successfully");
    localStorage.setItem("orders", JSON.stringify([...cart]));
    localStorage.setItem("cart", []);
    navigate("/dashboard/user/orders");

    window.location.reload();
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart.map((item) => {
        total = total + parseInt(item.price);
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Cart"}>
      <div className=" w-100 mt-3 p-3">
        <div>
          <h2 className="text-uppercase mb-3">
            Hi! {auth?.token ? `${auth?.user?.name}` : ""}
          </h2>
          <h4>
            {cart.length > 1
              ? `You have ${cart.length} items in your Cart ${
                  auth?.token
                    ? "Proceed To Checkout"
                    : "Please Login To Checkout"
                }`
              : "Add items to you Cart"}
          </h4>
        </div>
        <div className="row w-100 mt-5 d-flex justify-content-center">
          <div className="col-md-5 ">
            {cart.map((c) => (
              <div key={c._id} className="card d-flex flex-row mb-3 ">
                <img
                  src={`${api}/api/v1/product/product-image/${c._id}`}
                  className="p-3 object-fit-cover"
                  alt={c.name}
                  width={"100px"}
                  height={"100px"}
                />
                <div className="p-3">
                  <h5 className="text-uppercase">{c.name}</h5>
                  <h6>{c.description.substring(0, 30)}...</h6>
                  <h6>${c.price}</h6>
                  <button
                    className="btn btn-danger p-2 ps-5 pe-5 w-auto btn-remove"
                    onClick={() => removeCartItem(c._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h3>Checkout Details</h3>
            <h6>Total | Checkout | Payment</h6>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                  <button
                    className="btn btn-outline-success mt-3 btn-order"
                    onClick={onCheckOutClick}
                  >
                    Checkout Now
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
