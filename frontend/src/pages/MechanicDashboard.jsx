import { useEffect, useState } from "react";
import api from "../services/api";
import {
  FaPhone,
  FaCalendarAlt,
  FaTools,
  FaCheckCircle,
  FaTimesCircle,
  FaClock
} from "react-icons/fa";

function MechanicDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    api.get("/api/bookings/mechanic/1")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/api/bookings/${id}/status?status=${status}`);
      loadBookings();
    } catch (error) {
      console.error(error);
    }
  };

  const pendingCount = bookings.filter(
    (b) => b.status === "PENDING"
  ).length;

  const acceptedCount = bookings.filter(
    (b) => b.status === "ACCEPTED"
  ).length;

  const rejectedCount = bookings.filter(
    (b) => b.status === "REJECTED"
  ).length;

  return (
    <div className="container py-5">

      <h1 className="text-center text-primary fw-bold mb-5">
        🚗 Mechanic Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="row mb-5">

        <div className="col-md-4 mb-3">
          <div className="card shadow border-0 text-center p-4">
            <FaClock size={40} className="mx-auto text-warning mb-3" />
            <h2>{pendingCount}</h2>
            <h5>Pending Requests</h5>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow border-0 text-center p-4">
            <FaCheckCircle size={40} className="mx-auto text-success mb-3" />
            <h2>{acceptedCount}</h2>
            <h5>Accepted Jobs</h5>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow border-0 text-center p-4">
            <FaTimesCircle size={40} className="mx-auto text-danger mb-3" />
            <h2>{rejectedCount}</h2>
            <h5>Rejected Requests</h5>
          </div>
        </div>

      </div>

      <h3 className="mb-4">Incoming Requests</h3>

      <div className="row">
        {bookings.map((booking) => (
          <div className="col-lg-4 col-md-6 mb-4" key={booking.id}>

            <div
              className="card shadow-lg border-0 h-100"
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body">

                <h4 className="fw-bold text-primary">
                  👤 {booking.customerName}
                </h4>

                <p>
                  <FaPhone className="me-2 text-success" />
                  {booking.customerPhone}
                </p>

                <p>
                  <FaTools className="me-2 text-warning" />
                  {booking.serviceType}
                </p>

                <p>
                  <FaCalendarAlt className="me-2 text-info" />
                  {booking.bookingDate}
                </p>

                <div className="mb-3">
                  {booking.status === "PENDING" && (
                    <span className="badge bg-warning fs-6">
                      PENDING
                    </span>
                  )}

                  {booking.status === "ACCEPTED" && (
                    <span className="badge bg-success fs-6">
                      ACCEPTED
                    </span>
                  )}

                  {booking.status === "REJECTED" && (
                    <span className="badge bg-danger fs-6">
                      REJECTED
                    </span>
                  )}
                </div>

                {booking.status === "PENDING" && (
                  <>
                    <button
                      className="btn btn-success me-2"
                      onClick={() =>
                        updateStatus(
                          booking.id,
                          "ACCEPTED"
                        )
                      }
                    >
                      Accept
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        updateStatus(
                          booking.id,
                          "REJECTED"
                        )
                      }
                    >
                      Reject
                    </button>
                  </>
                )}

              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default MechanicDashboard;