import React, { useState } from "react";
import { ReactGrid, Column, Row, Cell } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { Tabs, Spin, DatePicker, Button, Drawer } from "antd";
import Papa from "papaparse";
import moment from "moment";
import "./styles.scss";

// Helper function to create columns based on headers
const getColumns = (headers: string[]): Column[] => {
  return headers.map((header, index) => ({
    columnId: index.toString(),
    width: 150,
    title: header,
  }));
};

// Helper function to create rows based on the object-based CSV data
const getRows = (
  csvData: Array<Record<string, string>>,
  headers: string[]
): Row[] => {
  const headerRow: Row = {
    rowId: "header",
    cells: headers.map((header) => ({
      type: "header",
      text: header.charAt(0).toUpperCase() + header.slice(1).toLowerCase(),
    })),
  };

  return [
    headerRow,
    ...csvData.map<Row>((node, idx) => ({
      rowId: idx,
      cells: headers.map((header) => ({
        type: "text",
        text: node[header] || "",
      })),
    })),
  ];
};

const CsvGrid: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);
  const [businessDate, setBusinessDate] = useState<moment.Moment | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchDataForDate = (date: moment.Moment) => {
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_API_URL}/nodesInfo/csv?date=${date.format(
        "YYYY-MM-DD"
      )}`
    )
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: false,
          skipEmptyLines: true,
          complete: (results) => {
            const csvArray = results.data as string[][];
            formatDataForGrid(csvArray);
            setLoading(false);
            setDataLoaded(true);
          },
          error: (error: any) => {
            console.error("Error parsing CSV:", error);
            setLoading(false);
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching CSV:", error);
        setLoading(false);
      });
  };

  const formatDataForGrid = (csvArray: string[][]) => {
    if (csvArray.length === 0) return;

    const csvHeaders = csvArray[0];
    const csvRows = csvArray.slice(1);

    const csvDataAsObjects = csvRows.map((row) => {
      const rowObject: Record<string, string> = {};
      csvHeaders.forEach((header, index) => {
        rowObject[header] = row[index] || "";
      });
      return rowObject;
    });

    const columns = getColumns(csvHeaders);
    const rows = getRows(csvDataAsObjects, csvHeaders);

    setColumns(columns);
    setRows(rows);
  };

  const handleSubmit = () => {
    if (businessDate) {
      fetchDataForDate(businessDate);
    }
  };

  const handleClearDate = () => {
    setBusinessDate(null);
    setDataLoaded(false);
    setRows([]);
    setColumns([]);
  };

  return (
    <div className="spreadsheet-container">
      <div className="date-picker-container">
        <DatePicker
          value={businessDate}
          onChange={(date) => setBusinessDate(date)}
          disabled={dataLoaded}
        />
        <Button onClick={handleSubmit} disabled={dataLoaded}>
          Submit
        </Button>
        <Button
          onClick={handleClearDate}
          style={{ marginLeft: "10px" }}
          disabled={!dataLoaded}
        >
          Clear Date
        </Button>
      </div>

      {dataLoaded && (
        <Tabs
          defaultActiveKey="1"
          onChange={(key) => setActiveTab(key)}
          activeKey={activeTab}
        >
          <Tabs.TabPane tab="Tab 1" key="1" className="spreadsheet">
            <Spin spinning={loading}>
              <ReactGrid
                rows={rows}
                columns={columns}
                stickyTopRows={1}
                stickyLeftColumns={3}
                enableRowSelection
                enableColumnSelection
              />
            </Spin>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tab 2" key="2" className="spreadsheet">
            <Spin spinning={loading}>
              <ReactGrid
                rows={rows}
                columns={columns}
                stickyTopRows={1}
                stickyLeftColumns={3}
                enableRowSelection
                enableColumnSelection
              />
            </Spin>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tab 3" key="3" className="spreadsheet">
            <Spin spinning={loading}>
              <ReactGrid
                rows={rows}
                columns={columns}
                stickyTopRows={1}
                stickyLeftColumns={3}
                enableRowSelection
                enableColumnSelection
              />
            </Spin>
          </Tabs.TabPane>
          {/* Repeat for other tabs if necessary */}
        </Tabs>
      )}
    </div>
  );
};

export default CsvGrid;
