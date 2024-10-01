import React, { useState } from "react";
import { TreeSelect, Button, DatePicker, Table } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "./styles.scss"; // Import the styles
import HierarchyDropdown from "../search-header/selective-dropdown";

dayjs.extend(customParseFormat);

const treeData = [
  {
    title: "Node1",
    value: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-0",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
    children: [
      {
        title: "Child Node2",
        value: "0-1-0",
      },
      {
        title: "Child Node3",
        value: "0-1-1",
      },
    ],
  },
];
const { RangePicker } = DatePicker;

// Recursive data generation for n-level nested table
const generateNestedData: any = (depth: number, prefix = "") => {
  return Array.from({ length: 3 }).map((_, i) => {
    const currentDepth = depth + 1;
    const key = `${prefix}${i}`;
    const hasChildren = currentDepth < 4; // Adjust depth level here
    return {
      key,
      name: `John Brown ${key}`,
      age: i + 20 + depth * 10,
      address: `New York No. ${key} Lake Park`,
      description: `This is level ${depth} row ${i}`,
      children: hasChildren ? generateNestedData(currentDepth, `${key}-`) : [],
    };
  });
};

// Generate nested data
const nestedData = generateNestedData(0);

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    key: "action",
    render: () => <Button type="link">More</Button>,
  },
];

const dateFormat = "YYYY-MM-DD";

const NodeSearch = () => {
  const [expandable, setExpandable] = useState(true);

  const expandableProps = expandable
    ? {
        expandedRowRender: (record: {
          description:
            | string
            | number
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | null
            | undefined;
        }) => <p>{record.description}</p>,
      }
    : undefined;

  return (
    <div className="node-search-wrapper">
      <div className="node-search-container">
        <div className="ant-components-row">
          <DatePicker
            defaultValue={dayjs("2019-09-03", dateFormat)}
            minDate={dayjs("2019-08-01", dateFormat)}
            maxDate={dayjs("2020-10-31", dateFormat)}
          />
          <TreeSelect
            treeData={treeData}
            placeholder="Please select"
            className="tree-select"
          />
          <HierarchyDropdown />
          <Button type="primary">Submit</Button>
        </div>
      </div>

      {/* Second Container: N-Level Nested Table */}
      <div className="node-search-table-container">
        <Table
          className="node-search-table"
          bordered
          loading={false}
          size="small"
          title={() => <div>Node Details</div>}
          columns={columns}
          dataSource={nestedData}
          expandable={expandableProps}
          scroll={{ y: "400px" }} // Ensure the table scrolls when necessary
        />
      </div>
    </div>
  );
};

export default NodeSearch;
