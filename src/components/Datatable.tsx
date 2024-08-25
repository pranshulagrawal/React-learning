import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import dataStore, { Node } from "../stores/Datastore";
import dataService from "../services/Dataservice";

const DataTable: React.FC = observer(() => {
  useEffect(() => {
    dataService.fetchData(); // Fetch the data when the component mounts
  }, []);

  const nodedata = dataStore.getData;

  const data = dataStore.getData;

  // Recursive function to render rows
  const renderRows = (nodes: Node[], level: number = 0): JSX.Element[] => {
    return nodes.map((node) => (
      <React.Fragment key={node.id}>
        <tr>
          <td>{node.id}</td>
          <td>{node.name}</td>
          <td>{node.roleTitle}</td>
          <td>{node.department}</td>
          <td>{node.location}</td>
          <td>{node.status}</td>
        </tr>
        {node.children &&
          node.children.length > 0 &&
          renderRows(node.children, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <>
      <h1>{data.length}</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Department</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{renderRows(data)}</tbody>
      </table>
    </>
  );
});

export default DataTable;
