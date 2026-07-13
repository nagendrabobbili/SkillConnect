import { Link, useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaUserTie,
  FaUserPlus,
  FaTools,
  FaCalendarCheck,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";

function Home() {

  const navigate = useNavigate();

  const requireLogin = () => {
    alert(
      "Please login to access verified mechanics and booking services."
    );

    navigate("/login");
  };

  return (

    <div>

      {/* HERO SECTION */}

      <section
        className="text-white text-center d-flex align-items-center"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.60)), url('https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >

        <div className="container">

          <h1
            className="fw-bold mb-4"
            style={{
              fontSize: "4rem"
            }}
          >
            Find Trusted Mechanics Near You,
            <span className="text-warning">
              {" "}Instantly.
            </span>
          </h1>

          <p
            className="lead mb-5"
            style={{
              maxWidth: "750px",
              margin: "auto"
            }}
          >
            Connect with verified mechanics for repairs,
            maintenance and emergency roadside assistance
            whenever your vehicle needs help.
          </p>


          {/* DEMO SEARCH BOX */}

          <div
            className="bg-white rounded-4 shadow-lg p-4 mx-auto mb-4"
            style={{
              maxWidth: "950px"
            }}
          >

            <div className="row g-3">

              <div className="col-md-5">

                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Select Service Type"
                  disabled
                />

              </div>

              <div className="col-md-4">

                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your City"
                  disabled
                />

              </div>

              <div className="col-md-3">

                <button
                  className="btn btn-warning btn-lg w-100"
                  onClick={requireLogin}
                >
                  <FaSearch className="me-2" />
                  Search
                </button>

              </div>

            </div>

          </div>

          <p className="text-light mb-4">
            Login required to access verified mechanics and booking services.
          </p>


          {/* CTA BUTTONS */}

          <div className="d-flex justify-content-center gap-3 flex-wrap">

            <button
              className="btn btn-light btn-lg px-4"
              onClick={requireLogin}
            >
              <FaSearch className="me-2" />
              Browse Mechanics
            </button>

            <Link to="/register">

              <button className="btn btn-warning btn-lg px-4">

                <FaUserPlus className="me-2" />

                Create Free Account

              </button>

            </Link>

          </div>

          <div className="mt-5 fs-5">
            ⭐ Trusted by thousands of vehicle owners
          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section className="py-5 bg-light">

        <div className="container">

          <h2 className="text-center fw-bold mb-5">
            How SkillConnect Works
          </h2>

          <div className="row text-center">

            <div className="col-md-3 mb-4">

              <FaUserTie
                size={55}
                className="text-primary mb-3"
              />

              <h4>Create Account</h4>

              <p>
                Register as a customer in less than a minute.
              </p>

            </div>

            <div className="col-md-3 mb-4">

              <FaSearch
                size={55}
                className="text-primary mb-3"
              />

              <h4>Search Mechanics</h4>

              <p>
                Find mechanics near your location.
              </p>

            </div>

            <div className="col-md-3 mb-4">

              <FaCalendarCheck
                size={55}
                className="text-primary mb-3"
              />

              <h4>Book Service</h4>

              <p>
                Schedule service instantly with one click.
              </p>

            </div>

            <div className="col-md-3 mb-4">

              <FaCheckCircle
                size={55}
                className="text-primary mb-3"
              />

              <h4>Get Assistance</h4>

              <p>
                Mechanics arrive and complete the service.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section className="py-5">

        <div className="container">

          <h2 className="text-center fw-bold mb-5">
            Why Choose SkillConnect?
          </h2>

          <div className="row text-center">

            <div className="col-md-4 mb-4">

              <FaTools
                size={50}
                className="text-warning mb-3"
              />

              <h4>Verified Professionals</h4>

              <p>
                Connect only with verified and trusted mechanics.
              </p>

            </div>

            <div className="col-md-4 mb-4">

              <FaClock
                size={50}
                className="text-warning mb-3"
              />

              <h4>Quick Response</h4>

              <p>
                Get assistance whenever your vehicle needs help.
              </p>

            </div>

            <div className="col-md-4 mb-4">

              <FaCheckCircle
                size={50}
                className="text-warning mb-3"
              />

              <h4>Secure Booking</h4>

              <p>
                Manage bookings with complete transparency.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>

  );

}

export default Home;