import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Mechanics() {
  const [mechanics, setMechanics] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadMechanics();
  }, []);

  const loadMechanics = () => {
    api.get("/api/mechanics")
      .then((response) => {
        setMechanics(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const searchMechanics = () => {

  if (keyword.trim() === "") {
    loadMechanics();
    return;
  }

  api.get(`/api/mechanics/search?keyword=${keyword}`)
    .then((response) => {
      setMechanics(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

  const deleteMechanic = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this mechanic?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/mechanics/${id}`);

      alert("Mechanic Deleted Successfully!");

      loadMechanics();

    } catch (error) {
      console.error(error);
      alert("Failed to Delete Mechanic");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚗 SkillConnect</h1>

      <div style={{ marginBottom: "20px" }}>
        <Link to="/add-mechanic">
          <button>Add Mechanic</button>
        </Link>
        <Link to="/map">
  <button>
    🗺️ View Map
  </button>
</Link>
      </div>

      <h2>Available Mechanics</h2>

<div style={{ marginBottom: "20px" }}>

  <input
    type="text"
    placeholder="Search by name, city or specialization"
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
    style={{
      padding: "10px",
      width: "300px",
      marginRight: "10px"
    }}
  />

  <button onClick={searchMechanics}>
    🔍 Search
  </button>

</div>

      {mechanics.map((mechanic) => (
        <div
          key={mechanic.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
        >
          <h3>{mechanic.fullName}</h3>

          <p><strong>Phone:</strong> {mechanic.phone}</p>

          <p><strong>Specialization:</strong> {mechanic.specialization}</p>

          <p><strong>City:</strong> {mechanic.city}</p>

          <p>⭐ {mechanic.rating}</p>

          <div style={{ marginTop: "10px" }}>

  <Link to={`/mechanics/${mechanic.id}`}>
    <button style={{ marginRight: "10px" }}>
      View Details
    </button>
  </Link>


  <Link to={`/edit-mechanic/${mechanic.id}`}>
    <button style={{ marginRight: "10px" }}>
      Edit
    </button>
  </Link>


  <button
    onClick={() => deleteMechanic(mechanic.id)}
  >
    Delete
  </button>

</div>

        </div>
      ))}
    </div>
  );
}

export default Mechanics;