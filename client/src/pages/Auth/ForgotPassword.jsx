import Layout from "../../components/Layouts/Layout";
import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const api = import.meta.env.VITE_API;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/api/v1/auth/forgot-password`, {
        email,
        answer,
        newPassword,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Wrong Credentials");
    }
  };
  return (
    <Layout title="Reset Your Password">
      <div className="register">
        <h1>Reset you Password</h1>
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
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value.toLowerCase())}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="What is your favourite sports?"
              required
            />
          </div>
          <div className="mb-3 input-box">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
