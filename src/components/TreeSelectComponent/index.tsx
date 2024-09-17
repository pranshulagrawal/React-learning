import React, { useState } from "react";
import { TreeSelect } from "antd";
import type { TreeSelectProps } from "antd/es/tree-select";
import type { DataNode } from "antd/es/tree";

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
              { title: "Child 2-2-2-1", value: "0-1-1-2-1", children: [] },
              { title: "Child 2-2-2-2", value: "0-1-1-2-2" },
            ],
          },
        ],
      },
    ],
  },
];

const TreeWithTreeSelect: React.FC = () => {
  const [value, setValue] = useState<string | undefined>(undefined);

  const onChange: TreeSelectProps["onChange"] = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: "30%" }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      treeData={treeData}
      placeholder="Please select"
      allowClear
      onChange={onChange}
    />
  );
};

export default TreeWithTreeSelect;
