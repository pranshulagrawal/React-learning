import React, { useEffect, useState, useCallback, useRef } from "react";
import * as XLSX from "xlsx";
import Spreadsheet from "react-spreadsheet";
import { Spin } from "antd";

// Define the chunk size for lazy loading
const CHUNK_SIZE = 50;

// Define a type for the spreadsheet data
type SpreadsheetRow = { value: string | number }[]; // Each cell can be a string or a number

const NodeHierarchy: React.FC = () => {
  const [spreadsheetData, setSpreadsheetData] = useState<SpreadsheetRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [csvData, setCsvData] = useState<any[]>([]); // Store complete CSV data
  const [filters, setFilters] = useState<string[]>([]); // Store filters for each column

  // Function to fetch CSV data from the server
  const fetchCsvData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/nodesInfo/csv`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob(); // Get the response as a blob
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target?.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const worksheet = workbook.Sheets[sheetName];

        // Get JSON data and set the initial filters
        const jsonData: (string | number)[][] = XLSX.utils.sheet_to_json(
          worksheet,
          { header: 1 }
        );
        setCsvData(jsonData); // Store complete CSV data
        setFilters(new Array(jsonData[0].length).fill("")); // Initialize filters
      };
      reader.readAsBinaryString(blob); // Read the blob as binary string
    } catch (error) {
      console.error("Error fetching CSV:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to load a chunk of data
  const loadChunk = useCallback(() => {
    if (csvData.length === 0) return;

    // Filter the data based on the current filters
    const filteredData = csvData
      .slice(1)
      .filter((row) =>
        row.every(
          (cell: string | number, index: number) =>
            filters[index] === "" ||
            String(cell).toLowerCase().includes(filters[index].toLowerCase())
        )
      );

    // Create spreadsheet format data from filtered data
    const chunk = filteredData
      .slice(offset, offset + CHUNK_SIZE)
      .map((row) => row.map((cell: string | number) => ({ value: cell })));

    // Append new chunk to existing data if chunk is valid
    if (chunk.length > 0) {
      setSpreadsheetData((prevData) => [...prevData, ...chunk]);
    }
  }, [csvData, offset, filters]);

  // Load the initial chunk when component mounts
  useEffect(() => {
    fetchCsvData(); // Fetch CSV data when the component mounts
  }, [fetchCsvData]);

  // Load the first chunk of data after CSV is fetched
  useEffect(() => {
    loadChunk(); // Load initial chunk after fetching CSV data
  }, [loadChunk]);

  // Handle scroll event to load more rows
  const handleScroll = () => {
    const container = containerRef.current;
    if (container && !loading) {
      const { scrollTop, clientHeight, scrollHeight } = container;
      if (
        scrollTop + clientHeight >= scrollHeight - 10 &&
        offset + CHUNK_SIZE < csvData.length
      ) {
        setOffset((prevOffset) => prevOffset + CHUNK_SIZE); // Load the next chunk
        loadChunk(); // Load next chunk
      }
    }
  };

  // Handle filter change in column labels
  const handleFilterChange = (index: number, value: string) => {
    const newFilters = [...filters];
    newFilters[index] = value; // Update the filter for the specific column
    setFilters(newFilters);
    setOffset(0); // Reset offset to load from the top
    setSpreadsheetData([]); // Clear existing data to load filtered data
    loadChunk(); // Load data based on the new filter
  };

  // Create column labels with filter inputs
  const columnLabels =
    csvData.length > 0
      ? csvData[0].map((header: string, index: number) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span>{header.toUpperCase()}</span>
            {/* <input
              type="text"
              placeholder={`Filter ${header}`}
              value={filters[index]}
              onChange={(e) => handleFilterChange(index, e.target.value)}
              style={{ marginTop: "5px", width: "100%" }}
            /> */}
          </div>
        ))
      : [];

  return (
    <div ref={containerRef} onScroll={handleScroll}>
      {loading && <Spin size="large" />}
      <Spreadsheet data={spreadsheetData} columnLabels={columnLabels} />
    </div>
  );
};

export default NodeHierarchy;
