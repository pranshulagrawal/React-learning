import React, { useState } from "react";
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
  onChange: (value: string | undefined) => void; // Prop for passing selected value back to the parent
}

const TreeWithTreeSelect: React.FC<TreeWithTreeSelectProps> = ({
  onChange,
}) => {
  const [value, setValue] = useState<string | undefined>(undefined);

  const handleChange: TreeSelectProps["onChange"] = (newValue) => {
    setValue(newValue);
    onChange(newValue); // Pass the selected value back to the parent component
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
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      treeData={treeData}
      placeholder="Please select"
      allowClear
      onChange={handleChange} // Use the new handleChange function
      filterTreeNode={filterTreeNode}
    />
  );
};

export default TreeWithTreeSelect;
