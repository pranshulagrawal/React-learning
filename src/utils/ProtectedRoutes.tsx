import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRoutes = () => {
  const [tokenExists, setTokenExists] = useState<boolean>(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setTokenExists(!!token); // Set the state based on whether the token exists
  }, []); // Only run this once on component mount

  if (!tokenExists) {
    // If token doesn't exist, navigate to the login page
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected routes
  return <Outlet />;
};

export default PrivateRoutes;
