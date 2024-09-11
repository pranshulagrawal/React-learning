import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add a loading state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/check-token`,
          {
            method: "GET",
            credentials: "include", // Include cookies in request
          }
        );

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verifying token", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Set loading to false after API call finishes
      }
    };

    checkAuth();
  }, []);

  // Show loading indicator while authentication is being checked
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or other loading indicator
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
