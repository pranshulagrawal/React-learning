import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TreeTable from "../components/TreeTable";
import HomeScreen from "../screens/HomeScreen";
import Dashboard from "../screens/Dashboard";
import AuthPage from "../screens/AuthPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashbaord" element={<TreeTable />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/" element={<AuthPage />} />
        <Route path="/table" element={<TreeTable />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
