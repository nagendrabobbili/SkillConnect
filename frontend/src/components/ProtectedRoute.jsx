import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRole
}) {

  const token = localStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(
      localStorage.getItem("user")
    );
  } catch (error) {
    console.log("Invalid user data");
  }


  // User not logged in
  if (!token || !user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  // Role based protection
  if (
    allowedRole &&
    user.role !== allowedRole
  ) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }


  return children;
}

export default ProtectedRoute;