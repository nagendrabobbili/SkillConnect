import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

import {
  FaCalendarAlt,
  FaPhone,
  FaTools,
  FaMapMarkerAlt,
  FaStar
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

    }
    catch (error) {

      console.error(error);

      if (error.response?.status === 401) {

        alert("Please login again.");

        localStorage.clear();

        window.location.href = "/login";
      }
    }
  };

  const getStatusBadge = (status) => {

    switch (status) {

      case "PENDING":
        return "bg-warning";

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

  const activeBookings = bookings.filter(
    booking => booking.status !== "COMPLETED"
  );

  const completedBookings = bookings.filter(
    booking => booking.status === "COMPLETED"
  );

  const BookingCard = ({ booking }) => (

    <div
      className="col-lg-4 col-md-6 mb-4"
      key={booking.id}
    >
      <div
        className="card shadow-lg border-0 h-100"
        style={{
          borderRadius: "20px"
        }}
      >

        <div className="card-body">

          <h4 className="fw-bold text-primary">
            🚗 {booking.mechanic?.fullName}
          </h4>

          <p>
            <FaPhone className="me-2 text-success" />
            {booking.mechanic?.phone}
          </p>

          <p>
            <FaMapMarkerAlt className="me-2 text-danger" />
            {booking.mechanic?.city}
          </p>

          <hr />

          <p>
            <FaTools className="me-2 text-warning" />
            {booking.serviceType}
          </p>

          <p>
            <FaCalendarAlt className="me-2 text-info" />
            {booking.bookingDate}
          </p>

          <div className="mt-3 mb-3">

            <span
              className={`badge ${getStatusBadge(
                booking.status
              )} fs-6`}
            >
              {booking.status}
            </span>

          </div>

          {
            booking.status === "COMPLETED" &&

            <Link
              to={`/review/${booking.id}`}
            >
              <button className="btn btn-warning w-100">
                <FaStar className="me-2" />
                Rate Mechanic
              </button>
            </Link>
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
            <h5>No active bookings</h5>
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
            <h5>No completed services yet</h5>
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