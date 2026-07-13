import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {

  const loggedUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    try {

      console.log(
        "Loading profile for:",
        loggedUser?.email
      );

      const response = await api.get(
        `/api/customer/profile/${loggedUser.email}`
      );

      console.log(
        "Profile loaded:",
        response.data
      );

      setUser(response.data);

    } catch (error) {

      console.log(
        "Load profile error:",
        error
      );

    }

  };

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  };

  const updateProfile = async () => {

    alert(
      "Update button clicked"
    );

    console.log(
      "Logged User:",
      loggedUser
    );

    console.log(
      "User Data:",
      user
    );

    try {

      const response = await api.put(
        `/api/customer/profile/${loggedUser.email}`,
        user
      );

      console.log(
        "Update Response:",
        response.data
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      alert(
        "Profile updated successfully"
      );

    } catch (error) {

      console.log(
        "Update Error:",
        error
      );

      if (error.response) {

        console.log(
          "Status:",
          error.response.status
        );

        console.log(
          "Response:",
          error.response.data
        );

      }

      alert(
        "Profile update failed"
      );

    }

  };

  return (

    <div className="container py-5">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          👤 My Profile
        </h2>

        <div className="mb-3">

          <label className="form-label">
            Name
          </label>

          <input
            type="text"
            className="form-control"
            name="name"
            value={user.name}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Email
          </label>

          <input
            type="email"
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Phone
          </label>

          <input
            type="text"
            className="form-control"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />

        </div>

        <button
          className="btn btn-primary w-100"
          onClick={updateProfile}
        >
          Update Profile
        </button>

      </div>

    </div>

  );
}

export default Profile;