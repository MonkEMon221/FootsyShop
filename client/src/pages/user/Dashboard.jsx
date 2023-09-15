import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import useAuth from "../../context/useAuth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard- Ecom App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-3 m-3">
              <h1>User Name: {auth?.user?.name}</h1>
              <h1>User E-mail: {auth?.user?.email}</h1>
              <h1>User Contact: {auth?.user?.phone}</h1>
              <h1>User Address: {auth?.user?.address}</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
