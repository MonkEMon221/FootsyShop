import Layout from "../../components/Layouts/Layout";
import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const api = import.meta.env.VITE_API;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/api/v1/auth/register`, {
        name,
        email,
        password,
        address,
        phone,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Wrong");
    }
  };

  return (
    <Layout title="Register Here">
      <div className="register">
        <h1>Register Here</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="mb-3 input-box">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
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
          <div className="mb-3 input-box">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Address"
              required
            />
          </div>
          <div className="mb-3 input-box">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value.toLowerCase())}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="What is your favourite Sports"
              required
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
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register Here
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
