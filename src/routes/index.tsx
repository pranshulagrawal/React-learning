import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TreeTable from "../components/TreeTable";
import HomeScreen from "../screens/HomeScreen";
import AuthPage from "../screens/AuthPage";
import PrivateRoutes from "../utils/ProtectedRoutes";
import Cookies from "js-cookie";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<TreeTable />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/table" element={<TreeTable />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
