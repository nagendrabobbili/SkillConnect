import { Link } from "react-router-dom";

import {
  FaTools,
  FaCar,
  FaBolt,
  FaWrench,
  FaSnowflake,
  FaUsers,
  FaCheckCircle,
  FaStar,
  FaClock,
  FaSearch,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaHandshake,
  FaUserTie,
  FaQuoteLeft
} from "react-icons/fa";

function Home() {

  return (

    <div>

      {/* HERO SECTION */}

      <section
        className="text-white text-center d-flex align-items-center"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#0d6efd,#198754)"
        }}
      >

        <div className="container">

          <h1
            className="fw-bold mb-4"
            style={{
              fontSize: "4rem"
            }}
          >
            🚗 SkillConnect
          </h1>

          <h2 className="mb-4">
            Find Trusted Mechanics Near You
          </h2>

          <p
            className="lead mb-5"
            style={{
              maxWidth: "700px",
              margin: "auto"
            }}
          >
            Book verified mechanics and local
            professionals in minutes.
            Track requests, compare ratings,
            and get assistance whenever you need.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">

            <Link to="/mechanics">
              <button className="btn btn-light btn-lg px-4">
                <FaSearch className="me-2"/>
                Browse Mechanics
              </button>
            </Link>

            <Link to="/join-mechanic">
              <button className="btn btn-warning btn-lg px-4">
                <FaUserTie className="me-2"/>
                Become a Partner
              </button>
            </Link>

          </div>

          <div className="mt-5">
            ⭐⭐⭐⭐⭐ Trusted by 1000+ Customers
          </div>

        </div>

      </section>

      {/* SERVICES */}

      <section className="py-5 bg-light">

        <div className="container">

          <h2 className="text-center mb-5 fw-bold">
            Our Services
          </h2>

          <div className="row text-center">

            <div className="col-md-2 col-6 mb-4">
              <div className="card shadow border-0 p-4">
                <FaCar size={40} className="text-primary mb-3"/>
                <h6>Car Mechanic</h6>
              </div>
            </div>

            <div className="col-md-2 col-6 mb-4">
              <div className="card shadow border-0 p-4">
                <FaBolt size={40} className="text-warning mb-3"/>
                <h6>Electrician</h6>
              </div>
            </div>

            <div className="col-md-2 col-6 mb-4">
              <div className="card shadow border-0 p-4">
                <FaTools size={40} className="text-success mb-3"/>
                <h6>Plumber</h6>
              </div>
            </div>

            <div className="col-md-2 col-6 mb-4">
              <div className="card shadow border-0 p-4">
                <FaWrench size={40} className="text-danger mb-3"/>
                <h6>Carpenter</h6>
              </div>
            </div>

            <div className="col-md-2 col-6 mb-4">
              <div className="card shadow border-0 p-4">
                <FaSnowflake size={40} className="text-info mb-3"/>
                <h6>AC Technician</h6>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="py-5">

        <div className="container">

          <div className="row text-center">

            <div className="col-md-3 mb-4">
              <div className="card shadow border-0 p-4">
                <FaUsers size={45} className="text-primary mb-3"/>
                <h2>500+</h2>
                <p>Registered Mechanics</p>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card shadow border-0 p-4">
                <FaCheckCircle size={45} className="text-success mb-3"/>
                <h2>1000+</h2>
                <p>Completed Services</p>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card shadow border-0 p-4">
                <FaStar size={45} className="text-warning mb-3"/>
                <h2>4.8</h2>
                <p>Average Rating</p>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card shadow border-0 p-4">
                <FaClock size={45} className="text-danger mb-3"/>
                <h2>24/7</h2>
                <p>Availability</p>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section className="py-5 bg-light">

        <div className="container">

          <h2 className="text-center fw-bold mb-5">
            How SkillConnect Works
          </h2>

          <div className="row text-center">

            <div className="col-md-2 mb-4">
              <FaSearch size={45}/>
              <h5 className="mt-3">Search</h5>
            </div>

            <div className="col-md-2 mb-4">
              <FaStar size={45}/>
              <h5 className="mt-3">Compare</h5>
            </div>

            <div className="col-md-2 mb-4">
              <FaCalendarCheck size={45}/>
              <h5 className="mt-3">Book</h5>
            </div>

            <div className="col-md-2 mb-4">
              <FaHandshake size={45}/>
              <h5 className="mt-3">Accept</h5>
            </div>

            <div className="col-md-2 mb-4">
              <FaMapMarkerAlt size={45}/>
              <h5 className="mt-3">Track</h5>
            </div>

            <div className="col-md-2 mb-4">
              <FaCheckCircle size={45}/>
              <h5 className="mt-3">Complete</h5>
            </div>

          </div>

        </div>

      </section>

      {/* WHY CHOOSE */}

      <section className="py-5">

        <div className="container">

          <h2 className="text-center fw-bold mb-5">
            Why Choose SkillConnect?
          </h2>

          <div className="row text-center">

            <div className="col-md-4 mb-4">
              <div className="card shadow border-0 p-4">
                <h4>✔ Verified Mechanics</h4>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card shadow border-0 p-4">
                <h4>✔ Transparent Pricing</h4>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card shadow border-0 p-4">
                <h4>✔ Nearby Search</h4>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* TESTIMONIALS */}

      <section className="bg-light py-5">

        <div className="container">

          <h2 className="text-center fw-bold mb-5">
            Customer Testimonials
          </h2>

          <div className="row">

            <div className="col-md-6 mb-4">
              <div className="card shadow border-0 p-4">
                <FaQuoteLeft size={30}/>
                <p className="mt-3">
                  Got roadside assistance in
                  less than 20 minutes.
                </p>
                <strong>- Rahul, Vijayawada</strong>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card shadow border-0 p-4">
                <FaQuoteLeft size={30}/>
                <p className="mt-3">
                  Received 3 bookings on my first day
                  after joining SkillConnect.
                </p>
                <strong>- Ramesh, Mechanic Partner</strong>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* PARTNER */}

      <section
        className="py-5 text-center text-white"
        style={{
          background:
            "linear-gradient(135deg,#ff9800,#ff5722)"
        }}
      >

        <div className="container">

          <h2 className="fw-bold">
            Become a SkillConnect Partner
          </h2>

          <p className="lead">
            Earn more by serving customers in
            your local area.
          </p>

          <Link to="/join-mechanic">
            <button className="btn btn-light btn-lg">
              Join as Mechanic
            </button>
          </Link>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-dark text-white py-4">

        <div className="container text-center">

          <h4>🚗 SkillConnect</h4>

          <p>
            Connecting Customers with Trusted
            Mechanics Anytime, Anywhere.
          </p>

          <small>
            © 2026 SkillConnect. All rights reserved.
          </small>

        </div>

      </footer>

    </div>

  );
}

export default Home;