import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TreeTable from "../components/TreeTable";
import AuthPage from "../screens/AuthPage";
import PrivateRoutes from "../utils/ProtectedRoutes";
import AccountActivationPage from "../screens/AccountActivation";
import PasswordResetPage from "../screens/ResetPassword";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<TreeTable />} />
          <Route path="/" element={<TreeTable />} />
          <Route path="/table" element={<TreeTable />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Route>
        <Route path="/activate/:token" element={<AccountActivationPage />} />
        <Route path="/reset-password/:token" element={<PasswordResetPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
