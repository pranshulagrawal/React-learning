import React from "react";
import { TreeSelect, Select, Button, DatePicker, Table } from "antd";
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

// Dummy data for the Ant Design table
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
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
];

const dateFormat = "YYYY-MM-DD";

const NodeSearch = () => {
  return (
    <div>
      {/* First Container: Components */}
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

      {/* Second Container: Table */}
      <div className="node-search-table">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default NodeSearch;
