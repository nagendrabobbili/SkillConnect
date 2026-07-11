import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

import {
  FaCalendarAlt,
  FaPhone,
  FaTools,
  FaMapMarkerAlt,
  FaStar,
  FaUserCog,
  FaCheckCircle,
  FaClock,
  FaTimesCircle
} from "react-icons/fa";

function MyBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {

    try {

      const response = await api.get(
        "/api/bookings/my-bookings"
      );

      setBookings(response.data);

    } catch (error) {

      console.error(error);

      if (error.response?.status === 401) {

        alert("Session expired. Please login again.");

        localStorage.clear();

        window.location.href = "/login";
      }
    }
  };

  const getStatusBadge = (status) => {

    switch (status) {

      case "PENDING":
        return "bg-warning text-dark";

      case "ACCEPTED":
        return "bg-success";

      case "REJECTED":
        return "bg-danger";

      case "COMPLETED":
        return "bg-primary";

      default:
        return "bg-secondary";
    }
  };

  const getStatusIcon = (status) => {

    switch (status) {

      case "PENDING":
        return <FaClock className="me-2" />;

      case "ACCEPTED":
        return <FaCheckCircle className="me-2" />;

      case "REJECTED":
        return <FaTimesCircle className="me-2" />;

      case "COMPLETED":
        return <FaCheckCircle className="me-2" />;

      default:
        return null;
    }
  };

  const activeBookings = bookings.filter(
    booking => booking.status !== "COMPLETED"
  );

  const completedBookings = bookings.filter(
    booking => booking.status === "COMPLETED"
  );

  const BookingCard = ({ booking }) => (

    <div className="col-lg-4 col-md-6 mb-4">

      <div
        className="card shadow-lg border-0 h-100"
        style={{
          borderRadius: "20px"
        }}
      >

        <div className="card-body">

          <h4 className="fw-bold text-primary">
            🚗 {booking.mechanic?.fullName || "Mechanic"}
          </h4>

          <p className="text-muted">
            <FaUserCog className="me-2" />
            {booking.mechanic?.specialization || "General Mechanic"}
          </p>

          <hr />

          <p>
            <FaPhone className="me-2 text-success" />
            {booking.mechanic?.phone || "Not Available"}
          </p>

          <p>
            <FaMapMarkerAlt className="me-2 text-danger" />
            {booking.mechanic?.city || "Unknown City"}
          </p>

          <p>
            <FaMapMarkerAlt className="me-2 text-danger" />
            {booking.mechanic?.address || "Address not provided"}
          </p>

          <hr />

          <p>
            <FaTools className="me-2 text-warning" />
            <strong>Service:</strong>
            {" "}
            {booking.serviceType}
          </p>

          <p>
            <FaCalendarAlt className="me-2 text-info" />
            <strong>Date:</strong>
            {" "}
            {booking.bookingDate}
          </p>

          <div className="mt-3 mb-3">

            <span
              className={`badge ${getStatusBadge(
                booking.status
              )} fs-6`}
            >
              {getStatusIcon(
                booking.status
              )}
              {booking.status}
            </span>

          </div>

          {
            booking.status === "PENDING" &&
            <p className="text-warning fw-bold">
              Waiting for mechanic response...
            </p>
          }

          {
            booking.status === "ACCEPTED" &&
            <p className="text-success fw-bold">
              Mechanic accepted your request.
            </p>
          }

          {
            booking.status === "REJECTED" &&
            <p className="text-danger fw-bold">
              Mechanic rejected your request.
            </p>
          }

          {
            booking.status === "COMPLETED" &&
            <>
              <p className="text-primary fw-bold">
                Service completed successfully.
              </p>

              <Link
                to={`/review/${booking.id}`}
              >
                <button className="btn btn-warning w-100">
                  <FaStar className="me-2" />
                  Rate Mechanic
                </button>
              </Link>
            </>
          }

        </div>

      </div>

    </div>
  );

  return (

    <div className="container py-5">

      <h1 className="text-center text-primary fw-bold mb-5">
        📋 My Bookings
      </h1>

      <h3 className="mb-4">
        🚗 Active Bookings
      </h3>

      <div className="row">

        {
          activeBookings.length === 0
            ?
            <div className="text-center">
              <h5>No active bookings available.</h5>
            </div>
            :
            activeBookings.map(
              booking =>
                <BookingCard
                  key={booking.id}
                  booking={booking}
                />
            )
        }

      </div>

      <h3 className="mt-5 mb-4 text-success">
        ✅ Completed Services
      </h3>

      <div className="row">

        {
          completedBookings.length === 0
            ?
            <div className="text-center">
              <h5>No completed services yet.</h5>
            </div>
            :
            completedBookings.map(
              booking =>
                <BookingCard
                  key={booking.id}
                  booking={booking}
                />
            )
        }

      </div>

    </div>
  );
}

export default MyBookings;