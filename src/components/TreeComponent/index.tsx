import React, { useState } from "react";
import { Tree, Input } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";

const { Search } = Input;
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

  const searchNodes = (node: DataNode, searchTerm: string): DataNode[] => {
    const matched =
      node.title?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.key.toString().includes(searchTerm);

    if (matched) return [node];

    if (node.children) {
      return node.children.flatMap((child) => searchNodes(child, searchTerm));
    }

    return [];
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);

    if (!value) {
      setExpandedKeys([]);
      setAutoExpandParent(false);
      return;
    }

    const expandedKeys = treeData
      .flatMap((item) =>
        searchNodes(item, value).map((node) => node.key.toString())
      )
      .flatMap((key) => [...getParentKeys(key, treeData), key])
      .filter((key, index, self) => self.indexOf(key) === index);

    setExpandedKeys(expandedKeys);
    setAutoExpandParent(true);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeysValue, info) => {
    const selectedKey = info.node.key as string;
    let newCheckedKeys = checkedKeysValue as React.Key[];
    let newDisabledKeys = [...disabledKeys];

    if (info.checked) {
      console.log(`Checked node key: ${selectedKey}`);
      newCheckedKeys = [info.node.key];
      if (info.node.children) {
        const childKeys = getAllChildKeys(info.node.children);
        newDisabledKeys = [...childKeys];
      }
    } else {
      if (info.node.children) {
        const childKeys = getAllChildKeys(info.node.children);
        newDisabledKeys = newDisabledKeys.filter(
          (key) => !childKeys.includes(key)
        );
        newCheckedKeys = newCheckedKeys.filter(
          (key) => !childKeys.includes(key)
        );
      }
    }

    setCheckedKeys(newCheckedKeys);
    setDisabledKeys(newDisabledKeys);
  };

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

  const getHighlightedTitle = (
    title: string,
    key: string,
    searchValue: string
  ): React.ReactNode => {
    const displayTitle = `[${key}] ${title}`;
    const searchValueLower = searchValue.toLowerCase();
    const displayTitleLower = displayTitle.toLowerCase();
    const index = displayTitleLower.indexOf(searchValueLower);
    if (index === -1) return displayTitle;

    const beforeStr = displayTitle.substr(0, index);
    const highlightedStr = displayTitle.substr(index, searchValue.length);
    const afterStr = displayTitle.substr(index + searchValue.length);
    return (
      <span>
        {beforeStr}
        <span style={{ color: "red" }}>{highlightedStr}</span>
        {afterStr}
      </span>
    );
  };

  const loop = (data: DataNode[]): DataNode[] =>
    data.map((item) => {
      const title = getHighlightedTitle(
        item.title!.toString(),
        item.key.toString(),
        searchValue
      );

      return {
        ...item,
        title,
        disabled: disabledKeys.includes(item.key),
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
