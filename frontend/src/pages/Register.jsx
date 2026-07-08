import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await api.post(
        "/api/auth/register",
        formData
      );

      console.log(response.data);

      alert("Registration Successful!");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "CUSTOMER"
      });

    } catch (error) {

      console.error(error);

      alert("Registration Failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #198754, #0d6efd)"
      }}
    >
      <div
        className="card shadow-lg p-5 border-0"
        style={{
          width: "500px",
          borderRadius: "20px"
        }}
      >
        <h1 className="text-center text-success mb-4">
          🚗 SkillConnect
        </h1>

        <h3 className="text-center mb-4">
          Create Account
        </h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label>Name</label>

            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>

            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>

            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label>Role</label>

            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="CUSTOMER">Customer</option>
              <option value="MECHANIC">Mechanic</option>
            </select>
          </div>

          <button
            className="btn btn-success w-100"
            type="submit"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-4">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;