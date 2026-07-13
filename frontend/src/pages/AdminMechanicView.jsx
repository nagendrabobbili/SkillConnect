import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function AdminMechanicView() {

  const { id } = useParams();

  const [mechanic, setMechanic] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadMechanic();
    loadBookings();
    loadReviews();
  }, []);

  const loadMechanic = async () => {
  try {

    const response = await api.get(
      `/api/mechanics/${id}`
    );

    console.log(
      "Mechanic details API:",
      response.data
    );

    setMechanic(
      response.data
    );

  } catch (error) {

    console.log(error);

  }
};

  const loadBookings = async () => {
    try {

      const response = await api.get(
        `/api/bookings/mechanic/${id}`
      );

      setBookings(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const loadReviews = async () => {

    try {

      const response = await api.get(
        `/api/reviews/mechanic/${id}`
      );

      setReviews(response.data);

    } catch (error) {

      console.log(
        "Review module not available yet"
      );

    }

  };

  const pending = bookings.filter(
    b => b.status === "PENDING"
  ).length;

  const accepted = bookings.filter(
    b => b.status === "ACCEPTED"
  ).length;

  const rejected = bookings.filter(
    b => b.status === "REJECTED"
  ).length;

  const completed = bookings.filter(
    b => b.status === "COMPLETED"
  ).length;

  if (!mechanic) {
    return (
      <div className="container py-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (

    <div className="container py-5">

      <h1 className="text-center text-primary fw-bold mb-5">
        👨‍🔧 Mechanic Performance Dashboard
      </h1>

      {/* Mechanic Profile */}
<div className="card shadow-lg border-0 p-4 mb-5">

  <div className="d-flex justify-content-between align-items-center">

    <h3 className="text-primary">
      {mechanic.fullName}
    </h3>

    {
      mechanic.availabilityStatus === "AVAILABLE" ? (

        <span className="badge bg-success fs-6">
          🟢 Available
        </span>

      ) : mechanic.availabilityStatus === "BUSY" ? (

        <span className="badge bg-warning text-dark fs-6">
          🟡 Busy
        </span>

      ) : (

        <span className="badge bg-danger fs-6">
          🔴 Offline
        </span>

      )
    }

  </div>

  <hr />

  <div className="row">

    <div className="col-md-6">

      <p>
        <strong>📧 Email:</strong>
        {" "}
        {mechanic.email}
      </p>

      <p>
        <strong>📞 Phone:</strong>
        {" "}
        {mechanic.phone}
      </p>

      <p>
        <strong>🔧 Specialization:</strong>
        {" "}
        {mechanic.specialization}
      </p>

      <p>
        <strong>⭐ Experience:</strong>
        {" "}
        {mechanic.experience} Years
      </p>

    </div>

    <div className="col-md-6">

      <p>
        <strong>🏙 City:</strong>
        {" "}
        {mechanic.city}
      </p>

      <p>
        <strong>🏠 Address:</strong>
        {" "}
        {mechanic.address}
      </p>

      <p>
        <strong>⭐ Average Rating:</strong>
        {" "}
        {mechanic.rating || 0}/5
      </p>

      {
        mechanic.latitude &&
        mechanic.longitude &&

        <a
          href={`https://www.google.com/maps?q=${mechanic.latitude},${mechanic.longitude}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary mt-2"
        >
          📍 View Service Location
        </a>
      }

    </div>

  </div>

</div>

      {/* Statistics */}
      <div className="row mb-5">

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center p-4">
            <h1>{pending}</h1>
            <h5>🕒 Incoming</h5>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center p-4">
            <h1>{accepted}</h1>
            <h5>✅ Accepted</h5>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center p-4">
            <h1>{rejected}</h1>
            <h5>❌ Rejected</h5>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow text-center p-4">
            <h1>{completed}</h1>
            <h5>🏁 Completed</h5>
          </div>
        </div>

      </div>

      {/* Customer Booking History */}
      <div className="card shadow p-4 mb-5">

        <h3 className="mb-4">
          📋 Customer Booking History
        </h3>

        {
          bookings.length === 0
          ?
          <p>
            No customer bookings found.
          </p>
          :
          <div className="table-responsive">

            <table className="table table-bordered table-hover">

              <thead className="table-dark">

                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {
                  bookings.map((booking) => (

                    <tr key={booking.id}>

                      <td>
                        {booking.customerName}
                      </td>

                      <td>
                        {booking.customerEmail}
                      </td>

                      <td>
                        {booking.customerPhone}
                      </td>

                      <td>
                        {booking.serviceType}
                      </td>

                      <td>
                        {booking.bookingDate}
                      </td>

                      <td>

                        <span
                          className={
                            booking.status === "ACCEPTED"
                            ? "badge bg-success"
                            : booking.status === "REJECTED"
                            ? "badge bg-danger"
                            : booking.status === "COMPLETED"
                            ? "badge bg-primary"
                            : "badge bg-warning text-dark"
                          }
                        >
                          {booking.status}
                        </span>

                      </td>

                    </tr>

                  ))
                }

              </tbody>

            </table>

          </div>
        }

      </div>

      {/* Reviews */}
      <div className="card shadow p-4">

        <h3 className="mb-4">
          ⭐ Customer Reviews
        </h3>

        {
          reviews.length === 0
          ?
          <p>
            No reviews available yet.
          </p>
          :
          reviews.map((review) => (

            <div
              key={review.id}
              className="border rounded p-3 mb-3"
            >

              <h5>
                {review.customerName}
              </h5>

              <p>
                ⭐ {review.rating}/5
              </p>

              <p>
                {review.comment}
              </p>

            </div>

          ))
        }

      </div>

    </div>

  );
}

export default AdminMechanicView;