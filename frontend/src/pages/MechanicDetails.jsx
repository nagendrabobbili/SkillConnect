import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

import {
  FaPhone,
  FaEnvelope,
  FaTools,
  FaBriefcase,
  FaMapMarkerAlt,
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaMapMarkedAlt
} from "react-icons/fa";

function MechanicDetails() {

  const { id } = useParams();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [mechanic, setMechanic] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {

    loadMechanic();
    loadReviews();

  }, [id]);

  const loadMechanic = async () => {

    try {

      const response = await api.get(
        `/api/mechanics/${id}`
      );

      setMechanic(response.data);

    }
    catch (error) {

      console.error(error);

    }

  };

  const loadReviews = async () => {

    try {

      const response = await api.get(
        `/api/reviews/mechanic/${id}`
      );

      setReviews(response.data);

    }
    catch (error) {

      console.log(
        "Reviews not available yet"
      );

    }

  };

  if (!mechanic) {

    return (
      <h2 className="text-center mt-5">
        Loading...
      </h2>
    );

  }

  return (

    <div className="container py-5">

      <div
        className="card shadow-lg border-0"
        style={{
          borderRadius: "20px"
        }}
      >

        <div className="card-body p-5">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <h1 className="text-primary fw-bold">
                🚗 {mechanic.fullName}
              </h1>

              <h5 className="text-muted">
                {mechanic.specialization}
              </h5>

            </div>

            <div>

              {
                mechanic.availabilityStatus === "AVAILABLE" && (

                  <span className="badge bg-success fs-6">
                    <FaCheckCircle className="me-2" />
                    Available
                  </span>

                )
              }

              {
                mechanic.availabilityStatus === "BUSY" && (

                  <span className="badge bg-warning text-dark fs-6">
                    <FaTools className="me-2" />
                    Busy
                  </span>

                )
              }

              {
                mechanic.availabilityStatus === "OFFLINE" && (

                  <span className="badge bg-danger fs-6">
                    <FaTimesCircle className="me-2" />
                    Offline
                  </span>

                )
              }

            </div>

          </div>

          <hr />

          <div className="row">

            <div className="col-md-6">

              <p>
                <FaPhone className="text-success me-2" />
                <strong>Phone:</strong>{" "}
                {mechanic.phone}
              </p>

              <p>
                <FaEnvelope className="text-primary me-2" />
                <strong>Email:</strong>{" "}
                {mechanic.email}
              </p>

              <p>
                <FaTools className="text-warning me-2" />
                <strong>Specialization:</strong>{" "}
                {mechanic.specialization}
              </p>

            </div>

            <div className="col-md-6">

              <p>
                <FaBriefcase className="text-info me-2" />
                <strong>Experience:</strong>{" "}
                {mechanic.experience} Years
              </p>

              <p>
                <FaMapMarkerAlt className="text-danger me-2" />
                <strong>City:</strong>{" "}
                {mechanic.city}
              </p>

              <p>
                <FaMapMarkerAlt className="text-danger me-2" />
                <strong>Address:</strong>{" "}
                {mechanic.address}
              </p>

            </div>

          </div>

          <hr />

          <div className="d-flex align-items-center mb-4">

            <FaStar
              className="text-warning me-2"
              size={25}
            />

            <h4 className="mb-0">
              {mechanic.rating || 0}/5
            </h4>

          </div>

          <div className="d-flex gap-3">

            {
              user?.role === "CUSTOMER" &&
              mechanic.availabilityStatus !== "OFFLINE" && (

                <Link
                  to={`/book-mechanic/${mechanic.id}`}
                >
                  <button className="btn btn-success btn-lg">

                    <FaCalendarAlt className="me-2" />

                    Book Mechanic

                  </button>
                </Link>

              )
            }

            {
              mechanic.availabilityStatus === "OFFLINE" && (

                <button
                  className="btn btn-secondary btn-lg"
                  disabled
                >
                  Mechanic is Offline
                </button>

              )
            }

            {
              mechanic.latitude &&
              mechanic.longitude && (

                <a
                  href={`https://www.google.com/maps?q=${mechanic.latitude},${mechanic.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="btn btn-primary btn-lg">

                    <FaMapMarkedAlt className="me-2" />

                    View Location

                  </button>
                </a>

              )
            }

          </div>

        </div>

      </div>

      <div
        className="card shadow mt-5 border-0"
        style={{
          borderRadius: "20px"
        }}
      >

        <div className="card-body">

          <h3 className="text-warning mb-4">
            ⭐ Customer Reviews
          </h3>

          {
            reviews.length === 0
              ?
              <p>
                No reviews yet.
              </p>
              :
              reviews.map(review => (

                <div
                  key={review.id}
                  className="border rounded p-3 mb-3"
                >

                  <h5>
                    {review.customerName}
                  </h5>

                  <p>
                    Rating: ⭐ {review.rating}/5
                  </p>

                  <p>
                    {review.comment}
                  </p>

                </div>

              ))
          }

        </div>

      </div>

    </div>

  );

}

export default MechanicDetails;