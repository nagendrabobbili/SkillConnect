import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // Refresh navbar whenever localStorage changes
  useEffect(() => {

    const checkUser = () => {
      setUser(
        JSON.parse(localStorage.getItem("user"))
      );
    };

    window.addEventListener(
      "storage",
      checkUser
    );

    // Check every 500ms for same-tab updates
    const interval = setInterval(
      checkUser,
      500
    );

    return () => {
      window.removeEventListener(
        "storage",
        checkUser
      );

      clearInterval(interval);
    };

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("user");

    setUser(null);

    window.location.href = "/login";
  };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

      <div className="container">

        <Link
          className="navbar-brand fw-bold fs-3"
          to="/"
        >
          🚗 SkillConnect
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {/* CUSTOMER MENU */}
            {
              user?.role === "CUSTOMER" && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/mechanics"
                    >
                      Mechanics
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/my-bookings"
                    >
                      My Bookings
                    </Link>
                  </li>
                </>
              )
            }

            {/* MECHANIC MENU */}
            {
              user?.role === "MECHANIC" && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/mechanic-dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
              )
            }

            {/* ADMIN MENU */}
            {
              user?.role === "ADMIN" && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/admin"
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/mechanics"
                    >
                      Manage Mechanics
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/admin/customers"
                    >
                      Customers
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/join-mechanic"
                    >
                      Add Mechanic
                    </Link>
                  </li>
                </>
              )
            }

            {
              user ? (
                <>
                  <li className="nav-item d-flex align-items-center mx-3 text-white">

                    👋 Welcome, {user.name} ({user.role})

                  </li>

                  <li className="nav-item">
                    <button
                      className="btn btn-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item ms-2">
                    <Link to="/login">
                      <button className="btn btn-outline-light me-2">
                        Login
                      </button>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/register">
                      <button className="btn btn-warning">
                        Register
                      </button>
                    </Link>
                  </li>
                </>
              )
            }

          </ul>

        </div>

      </div>

    </nav>

  );
}

export default Navbar;