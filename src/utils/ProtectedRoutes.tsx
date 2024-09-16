import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<string | null>(null); // To store user role

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
          const data = await response.json();
          setIsAuthenticated(true);
          setUserRole(data.user.role);
          console.log("User role:", data.user.role);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Outlet context={{ userRole }} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoutes;
