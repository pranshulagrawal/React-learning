import React from "react";
import "./styles.css";
import Table from "../../components/Table";
import SearchHeader from "../../components/search-header";
import DataTree from "../../components/search-header/tree";

const HomeScreen: React.FC = () => {
  return (
    <div>
      <DataTree />
      <Table />
    </div>
  );
};

export default HomeScreen;
