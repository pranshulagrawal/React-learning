import React from "react";
import "./styles.css";
import Table from "../../components/Table";
import DataTree from "../../components/search-header/tree";

const HomeScreen: React.FC = () => {
  return (
    <div>
      {/* <HierarchyDropdown /> */}
      <DataTree />
      <Table />
    </div>
  );
};

export default HomeScreen;
