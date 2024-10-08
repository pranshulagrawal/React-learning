import React, { useState, useEffect } from "react";
import { ReactGrid, Column, Row } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { Tabs, Spin } from "antd";
import Papa from "papaparse";
import "./styles.scss";

// Helper function to create columns based on headers
const getColumns = (headers: string[]): Column[] => {
  return headers.map((header, index) => ({
    columnId: index.toString(),
    width: 150, // Set a valid width
    title: header,
  }));
};

const headerRow: Row = {
  rowId: "header",
  cells: [
    { type: "header", text: "id" },
    { type: "header", text: "name" },
    { type: "header", text: "level" },
    { type: "header", text: "roleTitle" },
    { type: "header", text: "department" },
    { type: "header", text: "location" },
    { type: "header", text: "hireDate" },
    { type: "header", text: "email" },
    { type: "header", text: "phoneNumber" },
    { type: "header", text: "status" },
    { type: "header", text: "budget" },
    { type: "header", text: "performanceRating" },
    { type: "header", text: "skills" },
    { type: "header", text: "projectAssigned" },
    { type: "header", text: "biography" },
    { type: "header", text: "careerHistory" },
    { type: "header", text: "additionalProjects" },
    { type: "header", text: "notes" },
  ],
};

// Helper function to create rows based on the object-based CSV data
const getRows = (csvData: Array<Record<string, string>>): Row[] => [
  headerRow,
  ...csvData.map<Row>((node, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: node.id },
      { type: "text", text: node.name },
      {
        type: "text",
        text: node.level,
        style:
          node.level === "11" ? { backgroundColor: "red", color: "white" } : {},
      },
      { type: "text", text: node.roleTitle },
      { type: "text", text: node.department },
      { type: "text", text: node.location },
      { type: "text", text: node.hireDate },
      { type: "text", text: node.email },
      { type: "text", text: node.phoneNumber },
      { type: "text", text: node.status },
      { type: "text", text: node.budget },
      { type: "text", text: node.performanceRating },
      { type: "text", text: node.skills },
      { type: "text", text: node.projectAssigned },
      { type: "text", text: node.biography },
      { type: "text", text: node.careerHistory },
      { type: "text", text: node.additionalProjects },
      { type: "text", text: node.notes },
    ],
  })),
];

const CsvGrid: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false); // State for loading spinner

  useEffect(() => {
    // Fetch data based on the active tab
    fetchDataForTab(activeTab);
  }, [activeTab]);

  const fetchDataForTab = (tabKey: string) => {
    setLoading(true); // Start loading
    fetch(`${process.env.REACT_APP_API_URL}/nodesInfo/csv`)
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: false, // Manually convert the first row to headers
          skipEmptyLines: true,
          complete: (results) => {
            const csvArray = results.data as string[][];
            formatDataForGrid(csvArray);
            setLoading(false); // Stop loading after data is processed
          },
          error: (error: any) => {
            console.error("Error parsing CSV:", error);
            setLoading(false); // Stop loading on error
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching CSV:", error);
        setLoading(false); // Stop loading on fetch error
      });
  };

  const formatDataForGrid = (csvArray: string[][]) => {
    if (csvArray.length === 0) return;

    const csvHeaders = csvArray[0]; // First row is used as headers
    const csvRows = csvArray.slice(1); // The rest are data rows

    const csvDataAsObjects = csvRows.map((row) => {
      const rowObject: Record<string, string> = {};
      csvHeaders.forEach((header, index) => {
        rowObject[header] = row[index] || "";
      });
      return rowObject;
    });

    const columns = getColumns(csvHeaders);
    const rows = getRows(csvDataAsObjects);

    setColumns(columns);
    setRows(rows);
  };

  return (
    <div className="spreadsheet-container">
      <Tabs
        defaultActiveKey="1"
        onChange={(key) => setActiveTab(key)}
        className="spreadsheet-container"
      >
        <Tabs.TabPane tab="Tab 1" key="1" className="spreadsheet">
          <Spin spinning={loading}>
            <div>
              <ReactGrid
                rows={rows}
                columns={columns}
                stickyTopRows={1}
                stickyLeftColumns={3}
                enableRowSelection
              />
            </div>
          </Spin>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 2" key="2" className="spreadsheet">
          <Spin spinning={loading}>
            <div>
              <ReactGrid
                rows={rows}
                columns={columns}
                stickyTopRows={1}
                stickyLeftColumns={3}
                enableRowSelection
              />
            </div>
          </Spin>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 3" key="3" className="spreadsheet">
          <Spin spinning={loading}>
            <div>
              <ReactGrid
                rows={rows}
                columns={columns}
                stickyTopRows={1}
                stickyLeftColumns={3}
                enableRowSelection
              />
            </div>
          </Spin>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default CsvGrid;
