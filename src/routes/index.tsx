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
import Dashboard2 from "../screens/Dashboard2";
import NodeSearch from "../components/NodeSearch";

const VarTrack = () => <div>VarTrack Content</div>;

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Dashboard2 />} /> */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/activate/:token" element={<AccountActivationPage />} />
        <Route path="/reset-password/:token" element={<PasswordResetPage />} />

        {/* Protected routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/data" element={<TreeTable />} />
          <Route path="/" element={<Dashboard2 />} />
          <Route path="/table" element={<TreeTable />} />
          {/* Admin-only routes */}
          <Route element={<AdminRoutes />}>
            <Route element={<Dashboard2 />}>
              <Route path="/admin/dashb" element={<Dashboard2 />} />{" "}
              {/* Dashboard route */}
              <Route path="/admin/nodedetail" element={<NodeSearch />} />{" "}
              {/* NodeDetails route */}
              <Route path="/admin/vartrack" element={<VarTrack />} />{" "}
              {/* VarTrack route */}
            </Route>
            <Route path="/admin/dashboard" element={<Dashboard2 />} />
            <Route path="/admin/dashboard2" element={<Dashboard2 />} />
          </Route>
          {/* Fallback for non-existent routes */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
