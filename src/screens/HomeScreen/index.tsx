import React from "react";
import "./styles.css";
import Table from "../../components/Table";
import SearchHeader from "../../components/search-header";

const HomeScreen: React.FC = () => {
  return (
    <div>
      <SearchHeader />
      <Table />
    </div>
  );
};

export default HomeScreen;
