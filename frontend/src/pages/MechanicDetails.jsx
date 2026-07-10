import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../services/api";

function MechanicDetails() {

  const { id } = useParams();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [mechanic, setMechanic] = useState(null);

  useEffect(() => {

    api.get(`/api/mechanics/${id}`)
      .then((response) => {
        setMechanic(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, [id]);

  if (!mechanic) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="container py-5">

      <div className="card shadow-lg border-0 p-5">

        <h1 className="text-primary fw-bold mb-4">
          🚗 {mechanic.fullName}
        </h1>

        <p>
          <strong>📞 Phone:</strong> {mechanic.phone}
        </p>

        <p>
          <strong>📧 Email:</strong> {mechanic.email}
        </p>

        <p>
          <strong>🔧 Specialization:</strong>{" "}
          {mechanic.specialization}
        </p>

        <p>
          <strong>🛠 Experience:</strong>{" "}
          {mechanic.experience} Years
        </p>

        <p>
          <strong>🏙 City:</strong> {mechanic.city}
        </p>

        <p>
          <strong>📍 Address:</strong> {mechanic.address}
        </p>

        <p>
          <strong>⭐ Rating:</strong> {mechanic.rating}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {mechanic.available
            ? "🟢 Available"
            : "🔴 Not Available"}
        </p>

        {/* CUSTOMER ONLY */}
        {user?.role === "CUSTOMER" && (
          <div className="mt-4">
            <Link
              to={`/book-mechanic/${mechanic.id}`}
            >
              <button className="btn btn-success btn-lg">
                📅 Book Mechanic
              </button>
            </Link>
          </div>
        )}

      </div>

    </div>
  );
}

export default MechanicDetails;