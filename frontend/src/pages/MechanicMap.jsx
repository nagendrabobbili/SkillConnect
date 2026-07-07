import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "../services/api";


// Fix leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});


function MechanicMap() {

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

      <h1>🗺️ SkillConnect Mechanics Map</h1>


      <MapContainer
        center={[16.5449, 81.5212]}
        zoom={13}
        style={{
          height: "500px",
          width: "100%"
        }}
      >


        <TileLayer

          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

          attribution='&copy; OpenStreetMap contributors'

        />


        {mechanics.map((mechanic) => (

          <Marker
            key={mechanic.id}
            position={[
              mechanic.latitude,
              mechanic.longitude
            ]}
          >

            <Popup>

              <h3>
                🚗 {mechanic.fullName}
              </h3>

              <p>
                🛠 {mechanic.specialization}
              </p>

              <p>
                ⭐ {mechanic.rating}
              </p>


              <Link to={`/mechanics/${mechanic.id}`}>
                View Details
              </Link>


            </Popup>


          </Marker>

        ))}


      </MapContainer>


    </div>

  );

}


export default MechanicMap;