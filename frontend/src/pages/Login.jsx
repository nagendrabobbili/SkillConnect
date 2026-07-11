import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaLock
} from "react-icons/fa";

import api from "../services/api";


function Login() {

  const navigate = useNavigate();


  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");


  const handleLogin = async (e) => {

    e.preventDefault();


    try {

      const response = await api.post(
        "/api/auth/login",
        {
          username,
          password
        }
      );


      // Store JWT Token

      localStorage.setItem(
        "token",
        response.data.token
      );


      // Store User Details

      localStorage.setItem(
        "user",
        JSON.stringify({

          name: response.data.name,

          email: response.data.email,

          phone: response.data.phone,

          role: response.data.role

        })
      );


      alert(
        "Login Successful!"
      );


      // Role Based Redirect

      if (
        response.data.role === "ADMIN"
      ) {


        navigate("/admin");


      }

      else if (
        response.data.role === "MECHANIC"
      ) {


        navigate(
          "/mechanic-dashboard"
        );


      }

      else if (
        response.data.role === "CUSTOMER"
      ) {


        navigate("/");


      }

      else {


        navigate("/");


      }


    }

    catch (error) {


      console.error(error);


      alert(
        "Invalid Phone/Email or Password"
      );


    }

  };


  return (

    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0d6efd,#198754)"
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



        <form
          onSubmit={handleLogin}
        >


          {/* Phone or Email */}


          <div className="mb-3">


            <label>

              Phone Number or Email

            </label>


            <div className="input-group">


              <span className="input-group-text">

                <FaUser />

              </span>


              <input

                type="text"

                className="form-control"

                placeholder="Enter Phone or Email"

                value={username}

                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }

                required

              />


            </div>


          </div>




          {/* Password */}


          <div className="mb-4">


            <label>

              Password

            </label>


            <div className="input-group">


              <span className="input-group-text">

                <FaLock />

              </span>



              <input

                type="password"

                className="form-control"

                placeholder="Enter Password"

                value={password}

                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }

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


          <Link to="/register">

            {" "}

            Register

          </Link>


        </p>



      </div>


    </div>

  );

}


export default Login;