/* eslint-disable no-unsafe-optional-chaining */
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import "../Auth/Register.css";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import useAuth from "../../context/useAuth";

const Profile = () => {
  const [auth, setAuth] = useAuth();

  const api = import.meta.env.VITE_API;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const { name, address, email, phone } = auth?.user;
    setEmail(email);
    setAddress(address);
    setName(name);
    setPhone(phone);
  }, [auth?.user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${api}/api/v1/auth/profile`, {
        name,
        email,
        password,
        address,
        phone,
      });
      if (data.error) {
        toast.error(data.message);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Wrong");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 d-flex flex-column align-items-center">
            <h1>Edit Profile</h1>
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="mb-3 input-box">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="mb-3 input-box">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter your E-Mail Address"
                  disabled
                />
              </div>
              <div className="mb-3 input-box">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Password"
                />
              </div>
              <div className="mb-3 input-box">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter your Address"
                />
              </div>
              <div className="mb-3 input-box">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter your Mobile Number"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
