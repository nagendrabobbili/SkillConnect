import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🚗 SkillConnect</h1>

      <br />

      <Link to="/mechanics">
        <button>View Mechanics</button>
      </Link>
    </div>
  );
}

export default Home;