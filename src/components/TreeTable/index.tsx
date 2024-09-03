import React, { useEffect, useState } from "react";
import { Space, Switch, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { OrgNode } from "../../model/node-model";
import { RootStore } from "../../stores";
import "./styles.css";

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
const rowSelection: TableProps<OrgNode>["rowSelection"] = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
const addKeysToNodes = (nodes: OrgNode[]): OrgNode[] => {
  return nodes.map((node) => ({
    ...node,
    key: node.id,
    children: node.children ? addKeysToNodes(node.children) : [],
  }));
};

const TreeTable: React.FC = () => {
  const checkStrictly = true;
  const { nodeStore } = rootStore;
  useEffect(() => {
    nodeStore.loadNodes();
  }, [nodeStore]);

  const nodedata = nodeStore.nodes;
  const data = addKeysToNodes(nodedata);
  console.log(data);

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
    </>
  );
};

export default TreeTable;
