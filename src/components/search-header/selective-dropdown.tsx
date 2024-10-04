import React, { useState, useEffect } from "react";
import { Select } from "antd";

const dataList = [
  { key: 1, value: "CEO" },
  { key: 2, value: "General Manager" },
  { key: 3, value: "Operations Manager" },
  { key: 4, value: "Senior Project Manager" },
  { key: 5, value: "Project Manager" },
  { key: 6, value: "Team Lead" },
  { key: 7, value: "Software Architect" },
  { key: 8, value: "Senior Software Engineer" },
  { key: 9, value: "Software Engineer" },
  { key: 10, value: "Junior Software Engineer" },
  { key: 11, value: "Intern" },
  { key: 12, value: "Data Analyst" },
  { key: 13, value: "Quality Assurance Specialist" },
  { key: 14, value: "Customer Support Lead" },
  { key: 15, value: "Customer Support Specialist" },
  { key: 16, value: "Trainee" },
];

interface HierarchyDropdownProps {
  onChange: (value: number | null) => void;
  value?: number | null; // Accept value prop
}

const HierarchyDropdown: React.FC<HierarchyDropdownProps> = ({
  onChange,
  value,
}) => {
  // Set default value to null if value is undefined
  const [dropdownValue, setDropdownValue] = useState<number | null>(
    value ?? null
  );

  useEffect(() => {
    setDropdownValue(value ?? null); // Update dropdown value when the prop changes, default to null
  }, [value]);

  const options = dataList?.map((item) => ({
    value: item.key,
    label: item.value,
  }));

  return (
    <Select
      value={dropdownValue} // Use controlled value
      style={{ width: 200 }}
      allowClear
      showSearch
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      onChange={(newValue) => {
        setDropdownValue(newValue);
        onChange(newValue);
      }}
      options={options}
      placeholder="Select an option"
    />
  );
};

export default HierarchyDropdown;
