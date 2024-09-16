import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TreeTable from "../components/TreeTable";
import AuthPage from "../screens/AuthPage";
import PrivateRoutes from "../utils/ProtectedRoutes";
import AdminRoutes from "../utils/AdminRoutes"; // Import AdminRoutes
import AccountActivationPage from "../screens/AccountActivation";
import PasswordResetPage from "../screens/ResetPassword";
// import Dashboard from "../screens/Dashboard";
import TreeWithSearch from "../components/TreeComponent";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/activate/:token" element={<AccountActivationPage />} />
        <Route path="/reset-password/:token" element={<PasswordResetPage />} />

        {/* Protected routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/data" element={<TreeTable />} />
          <Route path="/" element={<TreeTable />} />
          <Route path="/table" element={<TreeTable />} />

          {/* Admin-only routes */}
          <Route element={<AdminRoutes />}>
            <Route path="/admin/dashboard" element={<TreeWithSearch />} />
          </Route>

          {/* Fallback for non-existent routes */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
