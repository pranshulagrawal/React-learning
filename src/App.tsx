import React, { useEffect } from "react";
import "./App.css";
import { RootStore } from "./stores";
// import Table from "./components/Table";
// import SearchHeader from "./components/search-header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Dashboard from "./screens/Dashboard";
import TreeTable from "./components/TreeTable";

const rootStore = new RootStore();
function App() {
  useEffect(() => {
    rootStore.nodeStore.loadNodes(); // Load nodes at app load time
    rootStore.nodeDetailsStore.loadNodes(); // Load node details at app load time
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashbaord" element={<TreeTable />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/table" element={<TreeTable />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
