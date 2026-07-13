import { Link } from "react-router-dom";

import {
  FaTools,
  FaClock,
  FaUsers,
  FaStar,
  FaCheckCircle,
  FaClipboardList,
  FaMapMarkerAlt,
  FaUserEdit
} from "react-icons/fa";

function MechanicHome() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const mechanicName =
    user?.name || "Mechanic";

  return (

    <div className="container py-5">

      {/* Welcome Card */}
      <div className="card shadow-lg border-0 p-5 mb-5 bg-primary text-white">

        <h1 className="fw-bold">
          👋 Welcome back, {mechanicName}
        </h1>

        <p className="fs-5 mb-0">
          Manage bookings, customers and availability
          from your dashboard.
        </p>

      </div>


      {/* Statistics */}

      <div className="row mb-5">

        <div className="col-md-3 mb-3">

          <div className="card shadow text-center p-4 h-100">

            <FaTools
              size={40}
              className="mb-3 text-primary"
            />

            <h2>126</h2>

            <h5>Total Jobs</h5>

          </div>

        </div>

        <div className="col-md-3 mb-3">

          <div className="card shadow text-center p-4 h-100">

            <FaClock
              size={40}
              className="mb-3 text-warning"
            />

            <h2>5</h2>

            <h5>Pending Requests</h5>

          </div>

        </div>

        <div className="col-md-3 mb-3">

          <div className="card shadow text-center p-4 h-100">

            <FaUsers
              size={40}
              className="mb-3 text-success"
            />

            <h2>98</h2>

            <h5>Customers Served</h5>

          </div>

        </div>

        <div className="col-md-3 mb-3">

          <div className="card shadow text-center p-4 h-100">

            <FaStar
              size={40}
              className="mb-3 text-warning"
            />

            <h2>4.8</h2>

            <h5>Average Rating</h5>

          </div>

        </div>

      </div>


      {/* Quick Actions */}

      <h3 className="mb-4">
        Quick Actions
      </h3>

      <div className="row">

        {/* View Bookings */}
        <div className="col-md-3 mb-3">

          <Link
            to="/mechanic-dashboard"
            className="text-decoration-none text-dark"
          >

            <div className="card shadow text-center p-4 h-100">

              <FaClipboardList
                size={35}
              />

              <h5 className="mt-3">
                View Bookings
              </h5>

            </div>

          </Link>

        </div>


        {/* Availability */}
        <div className="col-md-3 mb-3">

          <Link
            to="/mechanic-dashboard"
            className="text-decoration-none text-dark"
          >

            <div className="card shadow text-center p-4 h-100">

              <FaCheckCircle
                size={35}
              />

              <h5 className="mt-3">
                Availability
              </h5>

            </div>

          </Link>

        </div>


        {/* Update Location */}
        <div className="col-md-3 mb-3">

          <Link
            to="/mechanic-dashboard"
            className="text-decoration-none text-dark"
          >

            <div className="card shadow text-center p-4 h-100">

              <FaMapMarkerAlt
                size={35}
              />

              <h5 className="mt-3">
                Update Location
              </h5>

            </div>

          </Link>

        </div>


        {/* Edit Profile */}
        <div className="col-md-3 mb-3">

          <Link
            to="/mechanic-dashboard"
            className="text-decoration-none text-dark"
          >

            <div className="card shadow text-center p-4 h-100">

              <FaUserEdit
                size={35}
              />

              <h5 className="mt-3">
                Edit Profile
              </h5>

            </div>

          </Link>

        </div>

      </div>

    </div>

  );

}

export default MechanicHome;