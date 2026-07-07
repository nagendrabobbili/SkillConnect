import { useEffect, useState } from "react";
import api from "./services/api";

function App() {

  const [mechanics, setMechanics] = useState([]);

  useEffect(() => {
    api.get("/api/mechanics")
      .then((response) => {
        setMechanics(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚗 SkillConnect</h1>
      <h2>Available Mechanics</h2>

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
          <h3>{mechanic.name}</h3>
          <p><strong>Specialization:</strong> {mechanic.specialization}</p>
          <p><strong>City:</strong> {mechanic.city}</p>
          <p>⭐ {mechanic.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default App;