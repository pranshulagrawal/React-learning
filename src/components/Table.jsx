import React, { useState, useEffect, useRef } from "react";
import TableRow from "./TableRow";
import dataService from "../services/Dataservice";
import dataStore from "../stores/Datastore";
import "./table.css";

const Table = () => {
  const data = dataStore.getData;
  const [selectedNode, setSelectedNode] = useState(null);
  const tableRef = useRef(null);

  const handleRowClick = (node) => {
    setSelectedNode(node); // Update the selected node state
  };

  const handleClickOutside = (event) => {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setSelectedNode(null); // Hide the bottom bar
    }
  };

  const handleCloseBar = () => {
    setSelectedNode(null); // Manually close the bottom bar
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={tableRef}>
      <table>
        <thead>
          <tr>
            <th>Expand</th>
            <th>ID</th>
            <th>Name</th>
            <th>Parent ID</th>
            <th>Level</th>
            <th>Role Title</th>
            <th>Department</th>
            <th>Location</th>
            <th>Hire Date</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Budget</th>
            <th>Head Count</th>
            <th>Projects Assigned</th>
            <th>Performance Rating</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {data.map((node) => (
            <TableRow key={node.id} node={node} onRowClick={handleRowClick} />
          ))}
        </tbody>
      </table>
      {selectedNode && (
        <div className="bottom-bar">
          <button className="close-button" onClick={handleCloseBar}>
            X
          </button>
          <h3>Details for {selectedNode.name}</h3>
          <p>
            <strong>Role:</strong> {selectedNode.roleTitle}
          </p>
          <p>
            <strong>Department:</strong> {selectedNode.department}
          </p>
          <p>
            <strong>Location:</strong> {selectedNode.location}
          </p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default Table;
