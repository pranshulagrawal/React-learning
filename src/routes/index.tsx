import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TreeTable from "../components/TreeTable";
import AuthPage from "../screens/AuthPage";
import PrivateRoutes from "../utils/ProtectedRoutes";
import AdminRoutes from "../utils/AdminRoutes"; // Import AdminRoutes
import AccountActivationPage from "../screens/AccountActivation";
import PasswordResetPage from "../screens/ResetPassword";
import Dashboard2 from "../screens/Dashboard2";
import NodeSearch from "../components/NodeSearch";
import ErrorPage from "../screens/ErrorPage";
import ChangeLog from "../components/ChangeLog";
import Profile from "../components/Profile";
import DashboardHome from "../components/DashBaordHome";
import CsvGrid from "../components/ExcelNodeHierarchy/reactgrid";

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
              <Route path="/admin/dashboard" element={<DashboardHome />} />{" "}
              {/* Dashboard route */}
              <Route path="/admin/nodedetail" element={<NodeSearch />} />{" "}
              {/* NodeDetails route */}
              <Route path="/admin/vartrack" element={<VarTrack />} />{" "}
              <Route path="/admin/changelog" element={<ChangeLog />} />{" "}
              <Route path="/admin/profile" element={<Profile />} />{" "}
              <Route
                path="/admin/nodedetail/nodesearch"
                element={<NodeSearch />}
              />
              <Route path="/admin/nodehierarchy" element={<CsvGrid />} />{" "}
              {/* New Route */}
              {/* VarTrack route */}
            </Route>
            <Route path="/admin/dashboard" element={<Dashboard2 />} />
            <Route path="/admin/dashboard2" element={<Dashboard2 />} />
          </Route>
          {/* Fallback for non-existent routes */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
