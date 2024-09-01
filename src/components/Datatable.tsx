import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RootStore } from "../stores";
import { OrgNode } from "../model/node-model";

const rootStore = new RootStore();

const DataTable: React.FC = observer(() => {
  const { nodeStore } = rootStore;
  useEffect(() => {
    if (nodeStore.nodes.length === 0) {
      nodeStore.loadNodes();
    }
  }, [nodeStore]);

  const data = nodeStore.nodes;

  const renderRows = (nodes: OrgNode[], level: number = 0): JSX.Element[] => {
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
