import React, { useState, useEffect } from "react";
import { Button, DatePicker, Table, Spin, Empty, Dropdown, Menu } from "antd";
import { useSearchParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Papa from "papaparse"; // For CSV export
import * as XLSX from "xlsx"; // For Excel export
import "./styles.scss"; // Import the styles
import HierarchyDropdown from "../search-header/selective-dropdown";
import TreeWithTreeSelect from "../TreeSelectComponent";
import { DownloadOutlined } from "@ant-design/icons";

dayjs.extend(customParseFormat);

// Setting the minimum and maximum date constraints
const minDate = dayjs("2019-08-01");
const maxDate = dayjs("2020-10-31");

const generateNestedData: any = (depth: number, prefix = "") => {
  return Array.from({ length: 3 }).map((_, i) => {
    const currentDepth = depth + 1;
    const key = `${prefix}${i}`;
    const hasChildren = currentDepth < 4;
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
  const [selectedNode, setSelectedNode] = useState<string | undefined>(
    undefined
  ); // To store selected TreeSelect node value
  const [hierarchyLevel, setHierarchyLevel] = useState<number | null>(1); // To store HierarchyDropdown selection with default value

  const [searchParams] = useSearchParams(); // Extract search parameters from the URL

  // Simulate loading with a useEffect
  useEffect(() => {
    // Get params from URL
    const businessDate = searchParams.get("businessDate");
    const nodeId = searchParams.get("nodeId");
    const hierarchyLevelParam = searchParams.get("hierarchyLevel");

    if (businessDate && nodeId && hierarchyLevelParam) {
      // Convert date format and set state from URL params
      setSelectedDate(dayjs(businessDate));
      setSelectedNode(nodeId);
      setHierarchyLevel(Number(hierarchyLevelParam));

      // Simulate API call when params are present
      console.log("API call with URL parameters...");
      // Dummy API call
      fetchDummyData();
    } else {
      // If no URL params, don't call the API
      setLoading(false); // Stop spinner
    }
  }, [searchParams]);

  // Dummy API call function
  const fetchDummyData = async () => {
    setLoading(true);
    // Simulate API call
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      const data = await response.json();
      console.log("Dummy API Data:", data);
      setLoading(false);
    } catch (error) {
      console.error("API call failed:", error);
      setLoading(false);
    }
  };

  // Handle Submit Click
  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Selected Date:", selectedDate);
    console.log("Selected Node:", selectedNode);
    console.log("Hierarchy Level:", hierarchyLevel);
  };

  // Export CSV
  const exportCSV = () => {
    const csv = Papa.unparse(nestedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(nestedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "export.xlsx");
  };

  // Dropdown Menu for export options
  const exportMenu = (
    <Menu>
      <Menu.Item key="1" onClick={exportCSV}>
        Export as CSV
      </Menu.Item>
      <Menu.Item key="2" onClick={exportExcel}>
        Export as Excel
      </Menu.Item>
    </Menu>
  );

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
              defaultValue={selectedDate} // Default value from URL or user input
              value={selectedDate} // Default value from URL or user input
              placeholder="Select a date"
            />
            <TreeWithTreeSelect
              onChange={(value: React.SetStateAction<string | undefined>) =>
                setSelectedNode(value)
              }
              value={selectedNode} // Default value from URL or user input
            />
            <HierarchyDropdown
              onChange={(value) => setHierarchyLevel(value)}
              value={hierarchyLevel} // Default value from URL or user input
            />
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>

        {/* Export Button with Dropdown */}
        <div className="node-search-table-container">
          {submitted ? (
            <Table
              className="node-search-table"
              bordered
              loading={false}
              size="small"
              title={() => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  Business Date is: {selectedDate?.format("DD/MM/YYYY")}
                  {submitted && (
                    <div className="export-dropdown-container">
                      <Dropdown overlay={exportMenu} placement="bottomCenter">
                        <Button icon={<DownloadOutlined />} />
                      </Dropdown>
                    </div>
                  )}
                </div>
              )}
              columns={columns}
              dataSource={nestedData}
              scroll={{ y: "calc(100vh - 400px)" }} // Dynamic height based on available space
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
