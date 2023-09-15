import AdminMenu from "../../components/Layouts/AdminMenu";
import Layout from "../../components/Layouts/Layout";
import useAuth from "../../context/useAuth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Admin Dashboard"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-3 m-3">
              <h1>Admin Name: {auth?.user?.name}</h1>
              <h1>Admin E-mail: {auth?.user?.email}</h1>
              <h1>Admin Contact: {auth?.user?.phone}</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
