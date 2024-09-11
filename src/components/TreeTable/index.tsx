import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { OrgNode } from "../../model/node-model";
import { RootStore } from "../../stores";
import "./styles.css";
import { OrgNodeDetails } from "../../model/node-details-model";
import BottomSheet from "../BottomSheet";
import { observer } from "mobx-react";

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
  return nodes?.map((node) => ({
    ...node,
    key: node.id,
    children: node.children ? addKeysToNodes(node.children) : [],
  }));
};

const TreeTable: React.FC = observer(() => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [nodeDetails, setNodeDetails] = useState<OrgNodeDetails | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const checkStrictly = true;
  const { nodeStore } = rootStore;
  const { nodeDetailsStore } = rootStore;
  useEffect(() => {
    if (nodeStore.nodes.length === 0) {
      nodeStore.loadNodes();
    }
    if (nodeDetailsStore.nodesDetails.length === 0) {
      nodeDetailsStore.loadNodes();
    }
  }, [nodeStore, nodeDetailsStore]);

  const nodedata = nodeStore.nodes;
  const data = addKeysToNodes(nodedata);

  const fetchNodeDetails = async (id: number) => {
    try {
      // Make an API call to fetch node details
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/nodesInfo/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        // Handle non-200 HTTP responses
        console.error(`Error fetching node details: ${response.statusText}`);
        setNodeDetails(null);
        return;
      }

      // Parse the response
      const details = await response.json();

      // Set node details or null if not found
      setNodeDetails(details || null);
    } catch (error) {
      console.error("Error fetching node details:", error);
      setNodeDetails(null); // Handle any errors by setting node details to null
    }
  };

  const rowSelection: TableProps<OrgNode>["rowSelection"] = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: OrgNode[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      if (selected) {
        // Check if the row is selected
        fetchNodeDetails(record.id);
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
        dataSource={data?.map((item) => ({ ...item, key: item.id }))}
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
});

export default TreeTable;
