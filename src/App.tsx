import React, { useEffect } from "react";
import "./App.css";
import DataTable from "./components/Datatable";
import Table from "./components/Table";
import dataService from "./services/Dataservice";

function App() {
  useEffect(() => {
    dataService.fetchData(); // Fetch the data when the component mounts
  }, []);
  return (
    <div className="App">
      {/* <DataTable /> */}
      <Table />
    </div>
  );
}

export default App;
