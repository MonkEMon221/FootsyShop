import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import useCart from "../../context/useCart";

const Order = () => {
  const [cart] = useCart();
  const api = import.meta.env.VITE_API;
  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
