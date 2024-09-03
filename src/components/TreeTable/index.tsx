import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { OrgNode } from "../../model/node-model";
import { RootStore } from "../../stores";
import "./styles.css";
import { OrgNodeDetails } from "../../model/node-details-model";
import BottomSheet from "../BottomSheet";

const rootStore = new RootStore();

const columns: TableColumnsType<OrgNode> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Role Title",
    dataIndex: "roleTitle",
    key: "roleTitle",
  },
];

// Row selection configuration
// const rowSelection: TableProps<OrgNode>["rowSelection"] = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(
//       `selectedRowKeys: ${selectedRowKeys}`,
//       "selectedRows: ",
//       selectedRows
//     );
//   },
//   onSelect: (record, selected, selectedRows) => {
//     console.log(record, selected, selectedRows);
//   },
//   onSelectAll: (selected, selectedRows, changeRows) => {
//     console.log(selected, selectedRows, changeRows);
//   },
// };

const addKeysToNodes = (nodes: OrgNode[]): OrgNode[] => {
  return nodes.map((node) => ({
    ...node,
    key: node.id,
    children: node.children ? addKeysToNodes(node.children) : [],
  }));
};

const TreeTable: React.FC = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [nodeDetails, setNodeDetails] = useState<OrgNodeDetails | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const checkStrictly = true;
  const { nodeStore } = rootStore;
  const { nodeDetailsStore } = rootStore;
  useEffect(() => {
    nodeStore.loadNodes();
    nodeDetailsStore.loadNodes();
  }, [nodeStore, nodeDetailsStore]);

  const nodedata = nodeStore.nodes;
  const data = addKeysToNodes(nodedata);

  const fetchNodeDetails = (id: number) => {
    const details = nodeDetailsStore.getNodeDetailsById(id);
    setNodeDetails(details || null); // Set node details or null if not found
  };

  const rowSelection: TableProps<OrgNode>["rowSelection"] = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: OrgNode[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      if (selected) {
        // Check if the row is selected
        console.log(record, selected, selectedRows);
        fetchNodeDetails(record.id); // Fetch additional details for the selected node
        console.log("nodeDetails", nodeDetails);
        setDrawerVisible(true); // Show the bottom sheet
      } else {
        // Handle unselecting if needed (optional)
        // For now, we do nothing
      }
    },
  };

  return (
    <>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection, checkStrictly }}
        dataSource={data.map((item) => ({ ...item, key: item.id }))}
        pagination={false}
        sticky={true}
        size="small"
      />
      <BottomSheet
        visible={isDrawerVisible}
        onClose={() => {
          setDrawerVisible(false);
          setSelectedRowKeys([]);
        }}
        nodeDetails={nodeDetails}
      />
    </>
  );
};

export default TreeTable;
