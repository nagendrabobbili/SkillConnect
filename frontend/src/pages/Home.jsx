import { Link } from "react-router-dom";
import {
  FaSearch,
  FaTools,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

function Home() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div>

      {/* Hero Section */}
      <div
        className="text-white text-center d-flex align-items-center"
        style={{
          minHeight: "90vh",
          background:
            "linear-gradient(135deg, #0d6efd, #198754)",
        }}
      >
        <div className="container">
          <h1 className="display-3 fw-bold mb-4">
            🚗 SkillConnect
          </h1>

          <h2 className="mb-4">
            Find Trusted Mechanics Near You
          </h2>

          <p className="lead mb-5">
            Connect with verified mechanics for
            bike, car and vehicle services.
          </p>

          {/* CUSTOMER OR GUEST */}
          {/* CUSTOMER */}
{user?.role === "CUSTOMER" && (
  <Link to="/mechanics">
    <button className="btn btn-light btn-lg px-5 me-3">
      <FaSearch className="me-2" />
      Find Mechanics
    </button>
  </Link>
)}

{/* GUEST */}
{!user && (
  <>
    <Link to="/mechanics">
      <button className="btn btn-light btn-lg px-5 me-3">
        <FaSearch className="me-2" />
        Find Mechanics
      </button>
    </Link>

    <Link to="/register">
      <button className="btn btn-warning btn-lg px-5">
        <FaTools className="me-2" />
        Join as Mechanic
      </button>
    </Link>
  </>
)}

          {/* ADMIN */}
          {user?.role === "ADMIN" && (
            <>
              <Link to="/mechanics">
                <button className="btn btn-light btn-lg px-5 me-3">
                  Manage Mechanics
                </button>
              </Link>

              <Link to="/add-mechanic">
                <button className="btn btn-warning btn-lg px-5">
                  Add Mechanic
                </button>
              </Link>
            </>
          )}

          {/* MECHANIC */}
          {user?.role === "MECHANIC" && (
            <Link to="/mechanic-dashboard">
              <button className="btn btn-warning btn-lg px-5">
                Open Dashboard
              </button>
            </Link>
          )}

        </div>
      </div>

      {/* Statistics Section */}
      <div className="container py-5">
        <div className="row text-center">

          <div className="col-md-4 mb-4">
            <div className="card shadow border-0 p-4">
              <h1 className="text-primary">500+</h1>
              <h5>Registered Mechanics</h5>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow border-0 p-4">
              <h1 className="text-success">1000+</h1>
              <h5>Completed Bookings</h5>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow border-0 p-4">
              <h1 className="text-warning">4.8 ⭐</h1>
              <h5>Average Rating</h5>
            </div>
          </div>

        </div>
      </div>

      {/* Features */}
      <div className="bg-light py-5">
        <div className="container">

          <h2 className="text-center mb-5 fw-bold">
            Why Choose SkillConnect?
          </h2>

          <div className="row text-center">

            <div className="col-md-4 mb-4">
              <div className="card shadow border-0 p-4 h-100">
                <FaSearch
                  size={50}
                  className="mx-auto text-primary mb-3"
                />
                <h4>Easy Search</h4>
                <p>
                  Search mechanics by city,
                  specialization or name.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card shadow border-0 p-4 h-100">
                <FaMapMarkerAlt
                  size={50}
                  className="mx-auto text-danger mb-3"
                />
                <h4>Nearby Mechanics</h4>
                <p>
                  View mechanics on an
                  interactive map.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card shadow border-0 p-4 h-100">
                <FaStar
                  size={50}
                  className="mx-auto text-warning mb-3"
                />
                <h4>Trusted Service</h4>
                <p>
                  Choose mechanics with
                  ratings and reviews.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center p-4">
        <h5>🚗 SkillConnect</h5>
        <p>
          Connecting Customers with Trusted Mechanics
        </p>
        <small>
          © 2026 SkillConnect. All Rights Reserved.
        </small>
      </footer>

    </div>
  );
}

export default Home;