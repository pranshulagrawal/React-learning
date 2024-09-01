import React, { useEffect } from "react";
import "./App.css";
import { RootStore } from "./stores";
// import Table from "./components/Table";
// import SearchHeader from "./components/search-header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataTable from "./components/Datatable";
import Table from "./components/Table";
import HomeScreen from "./screens/HomeScreen";

const rootStore = new RootStore();
function App() {
  useEffect(() => {
    rootStore.nodeStore.loadNodes(); // Load nodes at app load time
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
