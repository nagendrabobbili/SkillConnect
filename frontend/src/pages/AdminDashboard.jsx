import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

import {
  FaUsers,
  FaUserCog,
  FaCheckCircle,
  FaEye
} from "react-icons/fa";

function AdminDashboard() {

  const [mechanics, setMechanics] = useState([]);

  useEffect(() => {
    loadMechanics();
  }, []);

  const loadMechanics = () => {
    api.get("/api/mechanics")
      .then((response) => {
        setMechanics(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const availableMechanics = mechanics.filter(
    mechanic => mechanic.available
  );

  return (

    <div className="container py-5">

      <h1 className="text-center text-primary fw-bold mb-5">
        👨‍💼 Admin Dashboard
      </h1>

      {/* Statistics */}

      <div className="row mb-5">

        <div className="col-md-4 mb-3">
          <div className="card shadow border-0 text-center p-4">
            <FaUserCog
              size={45}
              className="mx-auto text-primary mb-3"
            />

            <h2>{mechanics.length}</h2>

            <h5>Total Mechanics</h5>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow border-0 text-center p-4">
            <FaCheckCircle
              size={45}
              className="mx-auto text-success mb-3"
            />

            <h2>{availableMechanics.length}</h2>

            <h5>Available Mechanics</h5>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow border-0 text-center p-4">
            <FaUsers
              size={45}
              className="mx-auto text-warning mb-3"
            />

            <Link to="/admin/customers">
              <button className="btn btn-warning">
                View Customers
              </button>
            </Link>

            <p className="mt-3 mb-0">
              Customer Management
            </p>
          </div>
        </div>

      </div>

      <h3 className="mb-4">
        👨‍🔧 Registered Mechanics
      </h3>

      <div className="row">

        {
          mechanics.length === 0 ?

            <h5>No mechanics registered</h5>

            :

            mechanics.map((mechanic) => (

              <div
                className="col-lg-4 col-md-6 mb-4"
                key={mechanic.id}
              >

                <div className="card shadow-lg border-0 h-100">

                  <div className="card-body">

                    <h4 className="text-primary fw-bold">
                      {mechanic.fullName}
                    </h4>

                    <p>
                      📞 {mechanic.phone}
                    </p>

                    <p>
                      📧 {mechanic.email}
                    </p>

                    <p>
                      🔧 {mechanic.specialization}
                    </p>

                    <p>
                      ⭐ Experience:
                      {" "}
                      {mechanic.experience}
                      {" "}
                      years
                    </p>

                    <p>
                      📍 {mechanic.city}
                    </p>

                    <p>
                      ⭐ Rating:
                      {" "}
                      {mechanic.rating || 0}
                    </p>

                    <p>
                      Status:
                      {" "}
                      {
                        mechanic.available
                          ? "🟢 Available"
                          : "🔴 Not Available"
                      }
                    </p>

                    <div className="mt-3">

                      <Link
                        to={`/admin/mechanic/${mechanic.id}`}
                      >
                        <button className="btn btn-primary w-100">
                          <FaEye />
                          {" "}
                          View Details
                        </button>
                      </Link>

                    </div>

                  </div>

                </div>

              </div>

            ))
        }

      </div>

    </div>

  );
}

export default AdminDashboard;