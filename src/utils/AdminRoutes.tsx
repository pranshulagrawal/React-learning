import { Navigate, Outlet, useOutletContext } from "react-router-dom";

const AdminRoutes = () => {
  const { userRole } = useOutletContext<{ userRole: string }>(); // Get user role from Outlet context

  if (userRole !== "admin") {
    return <Navigate to="/" replace />; // Redirect non-admin users to the dashboard
  }

  return <Outlet />; // Allow access if the user is an admin
};

export default AdminRoutes;
