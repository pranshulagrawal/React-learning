import React from "react";
import "./styles.css";
import Table from "../../components/Table";
import SearchHeader from "../../components/search-header";
import DataTree from "../../components/search-header/tree";
import HierarchyDropdown from "../../components/search-header/selective-dropdown";

const HomeScreen: React.FC = () => {
  return (
    <div>
      <HierarchyDropdown />
      <DataTree />
      <Table />
    </div>
  );
};

export default HomeScreen;
