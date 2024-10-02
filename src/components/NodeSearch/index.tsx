import React, { useState, useEffect } from "react";
import { TreeSelect, Button, DatePicker, Table, Spin, Empty } from "antd";
import dayjs, { Dayjs } from "dayjs";
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

// Setting the minimum and maximum date constraints
const minDate = dayjs("2019-08-01");
const maxDate = dayjs("2020-10-31");

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
  Table.EXPAND_COLUMN,
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

const NodeSearch = () => {
  const [loading, setLoading] = useState(true); // Loading state for spinner
  const [submitted, setSubmitted] = useState(false); // Tracks if Submit has been clicked

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); // To store selected date
  const [selectedNode, setSelectedNode] = useState(null); // To store selected TreeSelect node
  const [hierarchyLevel, setHierarchyLevel] = useState<number | null>(1); // To store HierarchyDropdown selection with default value

  // Simulate loading with a useEffect
  useEffect(() => {
    // Simulate data fetching/loading process
    setTimeout(() => {
      setLoading(false); // After loading is complete, set loading to false
    }, 1000); // Adjust timeout as per the loading duration
  }, []);

  // Handle Submit Click
  const handleSubmit = () => {
    setSubmitted(true); // When Submit is clicked, set submitted to true

    // Log the values to the console
    console.log("Selected Date:", selectedDate);
    console.log("Selected Node:", selectedNode);

    // Check if hierarchyLevel is null, and set it to default value if so
    const hierarchy = hierarchyLevel ?? 1;
    console.log("Hierarchy Level:", hierarchy);
  };

  // Disable dates outside of the minDate and maxDate range
  const disabledDate = (current: Dayjs) => {
    return current && (current < minDate || current > maxDate);
  };

  return (
    <Spin spinning={loading} tip="Loading...">
      <div className="node-search-wrapper">
        <div className="node-search-container">
          <div className="ant-components-row">
            <DatePicker
              onChange={(date) => setSelectedDate(date)} // Capture selected date
              disabledDate={disabledDate} // Set min/max date constraints
              placeholder="Select a date"
            />
            <TreeSelect
              treeData={treeData}
              placeholder="Please select"
              className="tree-select"
              onChange={(value) => setSelectedNode(value)} // Capture selected node
            />
            <HierarchyDropdown
              onChange={(value) => setHierarchyLevel(value)} // Capture hierarchy level, can be null
            />
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>

        {/* Second Container: Conditional rendering between Empty and Table */}
        <div className="node-search-table-container">
          {submitted ? (
            <Table
              className="node-search-table"
              bordered
              loading={false}
              size="small"
              title={() => <div>Node Details</div>}
              columns={columns}
              dataSource={nestedData}
              scroll={{ y: "calc(100vh - 350px)" }} // Dynamic height based on available space
              indentSize={50}
            />
          ) : (
            <div className="empty-container">
              <Empty
                description={
                  <span>
                    No data available. <br />
                    Please submit to load the table.
                  </span>
                }
              />
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default NodeSearch;
