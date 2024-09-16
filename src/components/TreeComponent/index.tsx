import React, { useState } from "react";
import { Tree, Input } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";

const { Search } = Input;

// Sample tree data
const treeData: DataNode[] = [
  {
    title: "Parent 1",
    key: "0-0",
    children: [
      {
        title: "Child 1-1",
        key: "0-0-0",
        children: [
          { title: "Child 1-1-1", key: "0-0-0-1" },
          { title: "Child 1-1-2", key: "0-0-0-2" },
        ],
      },
      { title: "Child 1-2", key: "0-0-1" },
    ],
  },
  {
    title: "Parent 2",
    key: "0-1",
    children: [
      { title: "Child 2-1", key: "0-1-0" },
      { title: "Child 2-2", key: "0-1-1" },
    ],
  },
];

const TreeWithSearch: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [disabledKeys, setDisabledKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  // Helper function to get all parent keys for a given key
  const getParentKeys = (
    key: string,
    nodes: DataNode[],
    parents: string[] = []
  ): string[] => {
    for (const node of nodes) {
      if (node.key === key) return parents;
      if (node.children) {
        const parentKeys = getParentKeys(key, node.children, [
          ...parents,
          node.key as string,
        ]);
        if (parentKeys.length > 0) return parentKeys;
      }
    }
    return [];
  };

  // Function to recursively search nodes by title or key and gather matching nodes
  const searchNodes = (node: DataNode, searchTerm: string): DataNode[] => {
    const matched =
      node.title?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.key.toString().includes(searchTerm); // Convert key to string

    if (matched) return [node]; // If node matches, return it

    if (node.children) {
      // Recursively check its children
      return node.children.flatMap((child) => searchNodes(child, searchTerm));
    }

    return [];
  };

  // Handle search input change (search both key and title)
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);

    if (!value) {
      setExpandedKeys([]);
      setAutoExpandParent(false);
      return;
    }

    // Find all matching nodes and their parent keys
    const expandedKeys = treeData
      .flatMap(
        (item) => searchNodes(item, value).map((node) => node.key.toString()) // Search nodes recursively
      )
      .flatMap((key) => [...getParentKeys(key, treeData), key]) // Include parent keys for each matching node
      .filter((key, index, self) => self.indexOf(key) === index); // Remove duplicates

    setExpandedKeys(expandedKeys);
    setAutoExpandParent(true);
  };

  // Tree select logic (check/uncheck)
  const onCheck: TreeProps["onCheck"] = (checkedKeysValue, info) => {
    const selectedKey = info.node.key as string;
    let newCheckedKeys = checkedKeysValue as React.Key[];
    let newDisabledKeys = [...disabledKeys];

    if (info.checked) {
      console.log(`Checked node key: ${selectedKey}`);
      if (info.node.children) {
        const childKeys = getAllChildKeys(info.node.children);
        newDisabledKeys = [...newDisabledKeys, ...childKeys];
      }
    } else {
      // If a node is unchecked, uncheck and re-enable its child nodes
      if (info.node.children) {
        const childKeys = getAllChildKeys(info.node.children);
        newDisabledKeys = newDisabledKeys.filter(
          (key) => !childKeys.includes(key)
        );
        newCheckedKeys = newCheckedKeys.filter(
          (key) => !childKeys.includes(key)
        ); // Uncheck all children
      }
    }

    setCheckedKeys(newCheckedKeys);
    setDisabledKeys(newDisabledKeys);
  };

  // Get all keys of child nodes recursively
  const getAllChildKeys = (children: DataNode[]): React.Key[] => {
    let keys: React.Key[] = [];
    children.forEach((child) => {
      keys.push(child.key);
      if (child.children) {
        keys = [...keys, ...getAllChildKeys(child.children)];
      }
    });
    return keys;
  };

  // Helper function to highlight search term in node titles
  const getHighlightedTitle = (
    title: string,
    searchValue: string
  ): React.ReactNode => {
    const searchValueLower = searchValue.toLowerCase();
    const titleLower = title.toLowerCase();
    const index = titleLower.indexOf(searchValueLower);
    if (index === -1) return title;

    const beforeStr = title.substr(0, index);
    const highlightedStr = title.substr(index, searchValue.length);
    const afterStr = title.substr(index + searchValue.length);
    return (
      <span>
        {beforeStr}
        <span style={{ color: "red" }}>{highlightedStr}</span>
        {afterStr}
      </span>
    );
  };

  // Loop through the tree data and highlight matching nodes
  const loop = (data: DataNode[]): DataNode[] =>
    data.map((item) => {
      const title = getHighlightedTitle(item.title!.toString(), searchValue);

      return {
        ...item,
        title,
        disabled: disabledKeys.includes(item.key), // Disable based on the disabledKeys state
        children: item.children ? loop(item.children) : [],
      };
    });

  return (
    <div>
      <Search
        placeholder="Search by title or key"
        onChange={onSearch}
        style={{ marginBottom: 8 }}
        value={searchValue}
      />
      <Tree
        checkable
        showLine
        onExpand={setExpandedKeys}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        treeData={loop(treeData)}
      />
    </div>
  );
};

export default TreeWithSearch;
