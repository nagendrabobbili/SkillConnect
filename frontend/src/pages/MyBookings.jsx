import { useEffect, useState } from "react";
import api from "../services/api";
import {
  FaCalendarAlt,
  FaPhone,
  FaTools,
  FaMapMarkerAlt,
} from "react-icons/fa";

function MyBookings() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {

    api.get(
      `/api/bookings/customer/email/${user.email}`
    )
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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

  return (
    <div className="container py-5">

      <h1 className="text-center text-primary fw-bold mb-5">
        📋 My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center">
          <h4>No bookings found.</h4>
        </div>
      ) : (
        <div className="row">

          {bookings.map((booking) => (
            <div
              className="col-lg-4 col-md-6 mb-4"
              key={booking.id}
            >
              <div
                className="card shadow-lg border-0 h-100"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body">

                  <h4 className="fw-bold text-primary">
                    🚗 {booking.mechanic.fullName}
                  </h4>

                  <p>
                    <FaPhone className="me-2 text-success" />
                    {booking.mechanic.phone}
                  </p>

                  <p>
                    <FaMapMarkerAlt className="me-2 text-danger" />
                    {booking.mechanic.city}
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

                  <div className="mt-3">
                    <span
                      className={`badge ${getStatusBadge(
                        booking.status
                      )} fs-6`}
                    >
                      {booking.status}
                    </span>
                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default MyBookings;