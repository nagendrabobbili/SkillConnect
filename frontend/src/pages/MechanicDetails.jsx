import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";

function MechanicDetails() {

  const { id } = useParams();

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
    return <h2>Loading...</h2>;
  }


  return (
    <div style={{ padding: "20px" }}>

      <h1>🚗 {mechanic.fullName}</h1>

      <p>
        <strong>Phone:</strong> {mechanic.phone}
      </p>

      <p>
        <strong>Email:</strong> {mechanic.email}
      </p>

      <p>
        <strong>Specialization:</strong> {mechanic.specialization}
      </p>

      <p>
        <strong>Experience:</strong> {mechanic.experience} Years
      </p>

      <p>
        <strong>City:</strong> {mechanic.city}
      </p>

      <p>
        <strong>Address:</strong> {mechanic.address}
      </p>

      <p>
        ⭐ Rating: {mechanic.rating}
      </p>

      <p>
        Status:
        {mechanic.available ? " 🟢 Available" : " 🔴 Not Available"}
      </p>


      <Link to={`/book-mechanic/${mechanic.id}`}>
  <button>
    📅 Book Mechanic
  </button>
</Link>


    </div>
  );
}

export default MechanicDetails;