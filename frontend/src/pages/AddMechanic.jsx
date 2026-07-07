import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function AddMechanic() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [mechanic, setMechanic] = useState({
    fullName: "",
    phone: "",
    email: "",
    specialization: "",
    experience: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    rating: "",
    available: true,
  });

  useEffect(() => {
    if (id) {
      loadMechanic();
    }
  }, [id]);

  const loadMechanic = async () => {
    try {
      const response = await api.get("/api/mechanics");

      const selectedMechanic = response.data.find(
        (m) => m.id === Number(id)
      );

      if (selectedMechanic) {
        setMechanic(selectedMechanic);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setMechanic({
      ...mechanic,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (id) {

        await api.put(`/api/mechanics/${id}`, mechanic);

        alert("Mechanic Updated Successfully!");

      } else {

        await api.post("/api/mechanics", mechanic);

        alert("Mechanic Added Successfully!");

      }

      navigate("/mechanics");

    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{id ? "Edit Mechanic" : "Add Mechanic"}</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={mechanic.fullName}
          onChange={handleChange}
        /><br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={mechanic.phone}
          onChange={handleChange}
        /><br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={mechanic.email}
          onChange={handleChange}
        /><br /><br />

        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={mechanic.specialization}
          onChange={handleChange}
        /><br /><br />

        <input
          type="number"
          name="experience"
          placeholder="Experience"
          value={mechanic.experience}
          onChange={handleChange}
        /><br /><br />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={mechanic.city}
          onChange={handleChange}
        /><br /><br />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={mechanic.address}
          onChange={handleChange}
        /><br /><br />

        <input
          type="number"
          step="0.000001"
          name="latitude"
          placeholder="Latitude"
          value={mechanic.latitude}
          onChange={handleChange}
        /><br /><br />

        <input
          type="number"
          step="0.000001"
          name="longitude"
          placeholder="Longitude"
          value={mechanic.longitude}
          onChange={handleChange}
        /><br /><br />

        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating"
          value={mechanic.rating}
          onChange={handleChange}
        /><br /><br />

        <button type="submit">
          {id ? "Update Mechanic" : "Add Mechanic"}
        </button>

      </form>
    </div>
  );
}

export default AddMechanic;