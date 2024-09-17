import React, { useState } from "react";
import { Tree, Input, Popover } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";
import { DownOutlined } from "@ant-design/icons";

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
          {
            title: "Child 1-1-1",
            key: "0-0-0-1",
            children: [
              {
                title: "Child 1-1-1-1",
                key: "0-0-0-1-1",
                children: [
                  {
                    title: "Child 1-1-1-1-1",
                    key: "0-0-0-1-1-1",
                    children: [],
                  },
                  {
                    title: "Child 1-1-1-1-2",
                    key: "0-0-0-1-1-2",
                    children: [],
                  },
                ],
              },
              {
                title: "Child 1-1-1-2",
                key: "0-0-0-1-2",
                children: [
                  {
                    title: "Child 1-1-1-2-1",
                    key: "0-0-0-1-2-1",
                    children: [],
                  },
                  {
                    title: "Child 1-1-1-2-2",
                    key: "0-0-0-1-2-2",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            title: "Child 1-1-2",
            key: "0-0-0-2",
            children: [
              {
                title: "Child 1-1-2-1",
                key: "0-0-0-2-1",
                children: [
                  {
                    title: "Child 1-1-2-1-1",
                    key: "0-0-0-2-1-1",
                    children: [],
                  },
                  {
                    title: "Child 1-1-2-1-2",
                    key: "0-0-0-2-1-2",
                    children: [],
                  },
                ],
              },
              {
                title: "Child 1-1-2-2",
                key: "0-0-0-2-2",
                children: [
                  {
                    title: "Child 1-1-2-2-1",
                    key: "0-0-0-2-2-1",
                    children: [],
                  },
                  {
                    title: "Child 1-1-2-2-2",
                    key: "0-0-0-2-2-2",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Child 1-2",
        key: "0-0-1",
        children: [
          {
            title: "Child 1-2-1",
            key: "0-0-1-1",
            children: [
              {
                title: "Child 1-2-1-1",
                key: "0-0-1-1-1",
                children: [
                  {
                    title: "Child 1-2-1-1-1",
                    key: "0-0-1-1-1-1",
                    children: [],
                  },
                  {
                    title: "Child 1-2-1-1-2",
                    key: "0-0-1-1-1-2",
                    children: [],
                  },
                ],
              },
              {
                title: "Child 1-2-1-2",
                key: "0-0-1-1-2",
                children: [
                  {
                    title: "Child 1-2-1-2-1",
                    key: "0-0-1-1-2-1",
                    children: [],
                  },
                  {
                    title: "Child 1-2-1-2-2",
                    key: "0-0-1-1-2-2",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            title: "Child 1-2-2",
            key: "0-0-1-2",
            children: [
              {
                title: "Child 1-2-2-1",
                key: "0-0-1-2-1",
                children: [
                  {
                    title: "Child 1-2-2-1-1",
                    key: "0-0-1-2-1-1",
                    children: [],
                  },
                  {
                    title: "Child 1-2-2-1-2",
                    key: "0-0-1-2-1-2",
                    children: [],
                  },
                ],
              },
              {
                title: "Child 1-2-2-2",
                key: "0-0-1-2-2",
                children: [
                  {
                    title: "Child 1-2-2-2-1",
                    key: "0-0-1-2-2-1",
                    children: [],
                  },
                  {
                    title: "Child 1-2-2-2-2",
                    key: "0-0-1-2-2-2",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Parent 2",
    key: "0-1",
    children: [
      {
        title: "Child 2-1",
        key: "0-1-0",
        children: [
          {
            title: "Child 2-1-1",
            key: "0-1-0-1",
            children: [
              {
                title: "Child 2-1-1-1",
                key: "0-1-0-1-1",
                children: [
                  {
                    title: "Child 2-1-1-1-1",
                    key: "0-1-0-1-1-1",
                    children: [],
                  },
                  {
                    title: "Child 2-1-1-1-2",
                    key: "0-1-0-1-1-2",
                    children: [],
                  },
                ],
              },
              {
                title: "Child 2-1-1-2",
                key: "0-1-0-1-2",
                children: [
                  {
                    title: "Child 2-1-1-2-1",
                    key: "0-1-0-1-2-1",
                    children: [],
                  },
                  {
                    title: "Child 2-1-1-2-2",
                    key: "0-1-0-1-2-2",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            title: "Child 2-1-2",
            key: "0-1-0-2",
            children: [
              {
                title: "Child 2-1-2-1",
                key: "0-1-0-2-1",
                children: [
                  {
                    title: "Child 2-1-2-1-1",
                    key: "0-1-0-2-1-1",
                    children: [],
                  },
                  {
                    title: "Child 2-1-2-1-2",
                    key: "0-1-0-2-1-2",
                    children: [],
                  },
                ],
              },
              {
                title: "Child 2-1-2-2",
                key: "0-1-0-2-2",
                children: [
                  {
                    title: "Child 2-1-2-2-1",
                    key: "0-1-0-2-2-1",
                    children: [],
                  },
                  {
                    title: "Child 2-1-2-2-2",
                    key: "0-1-0-2-2-2",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Child 2-2",
        key: "0-1-1",
        children: [
          {
            title: "Child 2-2-1",
            key: "0-1-1-1",
            children: [
              {
                title: "Child 2-2-1-1",
                key: "0-1-1-1-1",
                children: [
                  {
                    title: "Child 2-2-1-1-1",
                    key: "0-1-1-1-1-1",
                    children: [],
                  },
                  {
                    title: "Child 2-2-1-1-2",
                    key: "0-1-1-1-1-2",
                    children: [],
                  },
                ],
              },
              {
                title: "Child 2-2-1-2",
                key: "0-1-1-1-2",
                children: [
                  {
                    title: "Child 2-2-1-2-1",
                    key: "0-1-1-1-2-1",
                    children: [],
                  },
                  {
                    title: "Child 2-2-1-2-2",
                    key: "0-1-1-1-2-2",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            title: "Child 2-2-2",
            key: "0-1-1-2",
            children: [
              {
                title: "Child 2-2-2-1",
                key: "0-1-1-2-1",
                children: [
                  {
                    title: "Child 2-2-2-1-1",
                    key: "0-1-1-2-1-1",
                    children: [],
                  },
                  {
                    title: "Child 2-2-2-1-2",
                    key: "0-1-1-2-1-2",
                    children: [],
                  },
                ],
              },
              {
                title: "Child 2-2-2-2",
                key: "0-1-1-2-2",
                children: [
                  {
                    title: "Child 2-2-2-2-1",
                    key: "0-1-1-2-2-1",
                    children: [],
                  },
                  {
                    title: "Child 2-2-2-2-2",
                    key: "0-1-1-2-2-2",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const TreeWithSearch: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [disabledKeys, setDisabledKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [popoverVisible, setPopoverVisible] = useState<boolean>(true);

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
    setSearchValue(newCheckedKeys[0] ? `${newCheckedKeys[0]}` : "");
    console.log(newCheckedKeys);
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

  const onSearchClick = () => {
    // Only show popover if it's not already visible
    if (!popoverVisible) {
      setPopoverVisible(true);
    }
  };

  return (
    <Popover
      content={
        <div
          style={{
            height: 300,
            overflow: "auto",
            width: "100%",
          }}
        >
          <Tree
            checkable
            showLine
            switcherIcon={<DownOutlined />}
            onExpand={setExpandedKeys}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={loop(treeData)}
          />
        </div>
      }
      trigger="click"
      open={popoverVisible}
      placement="bottom"
      overlayStyle={{ width: "30%" }}
    >
      <>
        <Search
          allowClear
          placeholder="Search by title or key"
          onChange={onSearch}
          onClick={onSearchClick}
          style={{ width: "30%" }}
          value={searchValue ? searchValue : ""}
        />
      </>
    </Popover>
  );
};
export default TreeWithSearch;
