import Layout from "../../components/Layouts/Layout";
import "./Register.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import useAuth from "../../context/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const api = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout title="Login Here">
      <div className="register">
        <h1>Login Here</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="mb-3 input-box">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your E-Mail Address"
              required
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
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <button
            type="button"
            className="mt-3 border-0 bg-transparent"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
