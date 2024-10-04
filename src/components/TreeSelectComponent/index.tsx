import React, { useState, useEffect } from "react";
import { TreeSelect } from "antd";
import type { TreeSelectProps } from "antd/es/tree-select";

const treeData = [
  {
    title: "Parent 1",
    value: "0-0",
    children: [
      {
        title: "Child 1-1",
        value: "0-0-0",
        children: [
          {
            title: "Child 1-1-1",
            value: "0-0-0-1",
            children: [
              {
                title: "Child 1-1-1-1",
                value: "0-0-0-1-1",
                children: [
                  { title: "Child 1-1-1-1-1", value: "0-0-0-1-1-1" },
                  { title: "Child 1-1-1-1-2", value: "0-0-0-1-1-2" },
                ],
              },
              {
                title: "Child 1-1-1-2",
                value: "0-0-0-1-2",
                children: [
                  { title: "Child 1-1-1-2-1", value: "0-0-0-1-2-1" },
                  { title: "Child 1-1-1-2-2", value: "0-0-0-1-2-2" },
                ],
              },
            ],
          },
          {
            title: "Child 1-1-2",
            value: "0-0-0-2",
            children: [
              {
                title: "Child 1-1-2-1",
                value: "0-0-0-2-1",
                children: [
                  { title: "Child 1-1-2-1-1", value: "0-0-0-2-1-1" },
                  { title: "Child 1-1-2-1-2", value: "0-0-0-2-1-2" },
                ],
              },
              {
                title: "Child 1-1-2-2",
                value: "0-0-0-2-2",
                children: [
                  { title: "Child 1-1-2-2-1", value: "0-0-0-2-2-1" },
                  { title: "Child 1-1-2-2-2", value: "0-0-0-2-2-2" },
                ],
              },
            ],
          },
        ],
      },
      { title: "Child 1-2", value: "0-0-1" },
    ],
  },
  {
    title: "Parent 2",
    value: "0-1",
    children: [
      {
        title: "Child 2-1",
        value: "0-1-0",
        children: [
          {
            title: "Child 2-1-1",
            value: "0-1-0-1",
            children: [
              { title: "Child 2-1-1-1", value: "0-1-0-1-1" },
              { title: "Child 2-1-1-2", value: "0-1-0-1-2" },
            ],
          },
          {
            title: "Child 2-1-2",
            value: "0-1-0-2",
            children: [
              { title: "Child 2-1-2-1", value: "0-1-0-2-1" },
              { title: "Child 2-1-2-2", value: "0-1-0-2-2" },
            ],
          },
        ],
      },
      {
        title: "Child 2-2",
        value: "0-1-1",
        children: [
          {
            title: "Child 2-2-1",
            value: "0-1-1-1",
            children: [
              { title: "Child 2-2-1-1", value: "0-1-1-1-1" },
              { title: "Child 2-2-1-2", value: "0-1-1-1-2" },
            ],
          },
          {
            title: "Child 2-2-2",
            value: "0-1-1-2",
            children: [
              { title: "Child 2-2-2-1", value: "0-1-1-2-1" },
              { title: "Child 2-2-2-2", value: "0-1-1-2-2" },
            ],
          },
        ],
      },
    ],
  },
];

interface TreeWithTreeSelectProps {
  onChange: (value: string | undefined) => void;
  value?: string; // Add value prop to receive selected value
}

const TreeWithTreeSelect: React.FC<TreeWithTreeSelectProps> = ({
  onChange,
  value,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    value
  ); // Initialize with passed value

  useEffect(() => {
    setSelectedValue(value); // Update the value when props change
  }, [value]);

  const handleChange: TreeSelectProps["onChange"] = (newValue) => {
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const filterTreeNode = (inputValue: string, treeNode: any) => {
    const title = treeNode.title?.toLowerCase() || "";
    const nodeValue = treeNode.value?.toLowerCase() || "";
    const searchValue = inputValue.toLowerCase();
    return title.includes(searchValue) || nodeValue.includes(searchValue);
  };

  return (
    <TreeSelect
      className="tree-select"
      showSearch
      value={selectedValue} // Use controlled value
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      treeData={treeData}
      placeholder="Please select"
      allowClear
      onChange={handleChange}
      filterTreeNode={filterTreeNode}
    />
  );
};

export default TreeWithTreeSelect;
