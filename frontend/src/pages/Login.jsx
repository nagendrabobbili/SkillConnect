import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      alert("Login Successful!");

      console.log(response.data);

      if (response.data.role === "MECHANIC") {
  window.location.href = "/mechanic-dashboard";
} else {
  window.location.href = "/";
}

    } catch (error) {

      console.error(error);

      alert("Invalid Email or Password");

    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0d6efd, #198754)"
      }}
    >
      <div
        className="card shadow-lg p-5 border-0"
        style={{
          width: "450px",
          borderRadius: "20px"
        }}
      >
        <h1 className="text-center text-primary mb-4">
          🚗 SkillConnect
        </h1>

        <h3 className="text-center mb-4">
          Login
        </h3>

        <form onSubmit={handleLogin}>

          <div className="mb-3">
            <label>Email</label>

            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
              </span>

              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label>Password</label>

            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>

              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-4">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;