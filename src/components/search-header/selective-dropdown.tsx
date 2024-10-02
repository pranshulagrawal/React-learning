import React from "react";
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
  onChange: (value: number | null) => void; // Pass the selected value to the parent component
}

const HierarchyDropdown: React.FC<HierarchyDropdownProps> = ({ onChange }) => {
  const options = dataList?.map((item) => ({
    value: item.key,
    label: item.value,
  }));

  return (
    <Select
      defaultValue={1} // Default value should match the type of value in options
      style={{ width: 200 }}
      allowClear
      showSearch
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      onChange={onChange} // Call the parent's onChange function
      options={options}
      placeholder="Select an option"
    />
  );
};

export default HierarchyDropdown;
