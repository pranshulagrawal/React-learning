import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AgeFilterHeader from './AgeFilterHeader';

const MyGrid = () => {
  const gridApiRef = useRef(null);
  const [rowData] = useState([
    { name: 'John', age: 22 },
    { name: 'Alice', age: 35 },
    { name: 'Bob', age: 48 },
    { name: 'Sara', age: 19 },
  ]);

  const [ageFilterType, setAgeFilterType] = useState('everyone');

  // Method to tell AG Grid that external filter is active
  const isExternalFilterPresent = () => {
    return ageFilterType !== 'everyone';
  };

  // External filter logic to check if the row passes the selected filter
  const doesExternalFilterPass = (node) => {
    const age = node.data.age;
    switch (ageFilterType) {
      case 'below25':
        return age < 25;
      case 'between25and50':
        return age >= 25 && age <= 50;
      default:
        return true; // 'everyone' case
    }
  };

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };

  const columnDefs = [
    {
      headerName: 'Age Filter',
      headerGroupComponentFramework: AgeFilterHeader,
      children: [
        {
          headerName: 'Name',
          field: 'name',
        },
        {
          headerName: 'Age',
          field: 'age',
        },
      ],
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        onGridReady={onGridReady}
        isExternalFilterPresent={isExternalFilterPresent}
        doesExternalFilterPass={doesExternalFilterPass}
        defaultColDef={{ flex: 1, filter: true }}
        // Set header height to ensure there's space for both headers
        headerHeight={80}
        groupHeaderHeight={40}
      />
    </div>
  );
};

export default MyGrid;