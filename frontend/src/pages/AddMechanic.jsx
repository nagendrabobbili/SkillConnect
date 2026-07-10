import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaTools,
  FaCity,
  FaMapMarkerAlt,
  FaGlobe,
  FaBriefcase,
  FaLocationArrow
} from "react-icons/fa";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

function AddMechanic() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [mechanic, setMechanic] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    available: true,
    rating: 0
  });

  useEffect(() => {
    if (id) {
      loadMechanic();
    }
  }, [id]);

  const loadMechanic = async () => {

    try {

      const response = await api.get(
        `/api/mechanics/${id}`
      );

      setMechanic(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setMechanic({
      ...mechanic,
      [name]: value
    });
  };

  const detectLocation = async () => {

    try {

      if (
        !mechanic.city ||
        !mechanic.address
      ) {

        alert(
          "Please enter city and address first"
        );

        return;
      }

      const query =
        `${mechanic.address}, ${mechanic.city}, India`;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );

      const data = await response.json();

      if (data.length > 0) {

        setMechanic({
          ...mechanic,
          latitude: data[0].lat,
          longitude: data[0].lon
        });

        alert(
          "Location detected successfully"
        );

      } else {

        alert(
          "Location not found"
        );

      }

    } catch (error) {

      console.log(error);

      alert(
        "Location detection failed"
      );

    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (id) {

        await api.put(
          `/api/mechanics/${id}`,
          mechanic
        );

        alert(
          "Mechanic updated successfully"
        );

      } else {

        await api.post(
          "/api/mechanics",
          mechanic
        );

        alert(
          "Mechanic registered successfully"
        );
      }

      navigate("/mechanics");

    } catch (error) {

      console.log(error);

      alert(
        "Operation failed"
      );
    }
  };

  return (

    <div
      className="container py-5"
      style={{
        minHeight: "100vh",
        background: "#f5f8ff"
      }}
    >

      <div className="card shadow-lg border-0 rounded-4">

        <div
          className="card-header text-center text-white py-4 rounded-top-4"
          style={{
            background:
              "linear-gradient(135deg,#198754,#0d6efd)"
          }}
        >

          <h2>
            🚗 {id
              ? "Update Mechanic"
              : "Join as Mechanic"}
          </h2>

          <p className="mb-0">
            Grow your service business with SkillConnect
          </p>

        </div>

        <div className="card-body p-5">

          <form onSubmit={handleSubmit}>

            <h5 className="text-success mb-3">
              👤 Personal Information
            </h5>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>
                  <FaUser /> Full Name
                </label>

                <input
                  className="form-control"
                  name="fullName"
                  value={mechanic.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>
                  <FaPhone /> Phone
                </label>

                <input
                  className="form-control"
                  name="phone"
                  value={mechanic.phone}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <h5 className="text-success mt-4 mb-3">
              🔐 Account Details
            </h5>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label>
                  <FaEnvelope /> Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={mechanic.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>
                  <FaLock /> Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={mechanic.password}
                  onChange={handleChange}
                  placeholder={
                    id
                      ? "Password cannot be edited"
                      : "Create password"
                  }
                  required={!id}
                  disabled={id}
                />

              </div>

            </div>

            <h5 className="text-success mt-4 mb-3">
              🔧 Professional Details
            </h5>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label>
                  <FaTools /> Specialization
                </label>

                <select
                  className="form-select"
                  name="specialization"
                  value={mechanic.specialization}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Service
                  </option>

                  <option>
                    Bike Mechanic
                  </option>

                  <option>
                    Car Mechanic
                  </option>

                  <option>
                    Electrical Repair
                  </option>

                  <option>
                    AC Repair
                  </option>

                </select>

              </div>

              <div className="col-md-6 mb-3">

                <label>
                  <FaBriefcase /> Experience
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="experience"
                  value={mechanic.experience}
                  onChange={handleChange}
                />

              </div>

            </div>

            <h5 className="text-success mt-4 mb-3">
              📍 Service Location
            </h5>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label>
                  <FaCity /> City
                </label>

                <input
                  className="form-control"
                  name="city"
                  value={mechanic.city}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>
                  <FaMapMarkerAlt /> Address
                </label>

                <input
                  className="form-control"
                  name="address"
                  value={mechanic.address}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="text-center mb-4">

              <button
                type="button"
                className="btn btn-primary"
                onClick={detectLocation}
              >
                <FaLocationArrow />
                {" "}Detect Location
              </button>

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label>
                  <FaGlobe /> Latitude
                </label>

                <input
                  className="form-control"
                  value={mechanic.latitude}
                  readOnly
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>
                  <FaGlobe /> Longitude
                </label>

                <input
                  className="form-control"
                  value={mechanic.longitude}
                  readOnly
                />

              </div>

            </div>

            <div className="mb-4">

              <label>
                Availability Status
              </label>

              <select
                className="form-select"
                value={mechanic.available}
                onChange={(e) =>
                  setMechanic({
                    ...mechanic,
                    available:
                      e.target.value === "true"
                  })
                }
              >
                <option value="true">
                  Available
                </option>

                <option value="false">
                  Busy / Offline
                </option>

              </select>

            </div>

            {
              mechanic.latitude &&
              mechanic.longitude && (

                <div className="mt-4">

                  <h5 className="text-success mb-3">
                    🗺️ Workshop Location Preview
                  </h5>

                  <MapContainer
                    center={[
                      Number(mechanic.latitude),
                      Number(mechanic.longitude)
                    ]}
                    zoom={15}
                    style={{
                      height: "350px",
                      width: "100%",
                      borderRadius: "15px"
                    }}
                  >

                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker
                      position={[
                        Number(mechanic.latitude),
                        Number(mechanic.longitude)
                      ]}
                    >

                      <Popup>

                        🚗 {mechanic.fullName}

                        <br />

                        🔧 {mechanic.specialization}

                        <br />

                        {
                          mechanic.available
                            ? "🟢 Available"
                            : "🔴 Busy"
                        }

                        <br />

                        📍 {mechanic.city}

                      </Popup>

                    </Marker>

                  </MapContainer>

                </div>

              )
            }

            <button
              className="btn btn-success w-100 py-3 mt-4 fw-bold"
              type="submit"
            >
              {
                id
                  ? "Update Mechanic"
                  : "Register as Mechanic"
              }
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddMechanic;