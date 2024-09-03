import React, { useState } from "react";
import { Button } from "antd";
import "./styles.css"; // Import the CSS module
import HierarchyDropdown from "../../components/search-header/selective-dropdown";
import DataTree from "../../components/search-header/tree";
import TreeTable from "../../components/TreeTable";

const Dashboard: React.FC = () => {
  const [tableVisible, setTableVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleRenderTable = () => {
    setTableVisible(true);
    setDisabled(true);
  };

  const handleClear = () => {
    setTableVisible(false);
    setDisabled(false);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="formContainer">
          <HierarchyDropdown />
          <DataTree />
        </div>
        <div className="button-group">
          <Button
            type="primary"
            onClick={handleRenderTable}
            disabled={disabled}
          >
            Render Table
          </Button>
          <Button onClick={handleClear}>Clear Table</Button>
        </div>
      </div>
      {tableVisible && (
        <div className="tableContainer">
          <TreeTable />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
