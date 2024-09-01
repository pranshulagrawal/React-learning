// src/components/Table.tsx
import React, { useState, useEffect, useRef } from "react";
import TableRow from "./TableRow";
import { observer } from "mobx-react-lite";
import { RootStore } from "../stores";
import "./table.css";
import { OrgNode } from "../model/node-model";

const rootStore = new RootStore();

const Table: React.FC = observer(() => {
  const { nodeStore } = rootStore;
  const tableRef = useRef<HTMLDivElement>(null); // Add type to ref
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null); // Type state with Node or null

  useEffect(() => {
    if (nodeStore.nodes.length === 0) {
      nodeStore.loadNodes();
    }
  }, [nodeStore]);

  const data = nodeStore.nodes;
  console.log("data", data);

  const handleRowClick = (node: OrgNode) => {
    setSelectedNode(node); // Update the selected node state
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
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
});

export default Table;
