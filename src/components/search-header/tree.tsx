import React, { useMemo, useState, useEffect } from "react";
import { Input, Tree } from "antd";
import type { TreeDataNode } from "antd";
import { observer } from "mobx-react-lite";
import { RootStore } from "../../stores";
import { OrgNode } from "../../model/node-model";
import { DataNode, EventDataNode } from "antd/es/tree";
import { CustomTreeDataNode } from "../../model/treenode-model";
import { getNode } from "../../helpers/getnode";

const rootStore = new RootStore();

const { Search } = Input;

const DataTree: React.FC = observer(() => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [disabledKeys, setDisabledKeys] = useState<Set<React.Key>>(new Set());
  const { nodeStore } = rootStore;

  useEffect(() => {
    if (nodeStore.nodes.length === 0) {
      nodeStore.loadNodes();
    }
  }, [nodeStore]);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = (
    checked: React.Key[] | { checked: React.Key[]; halfChecked: React.Key[] },
    info: {
      event: "check";
      node: CustomTreeDataNode; // Updated to CustomTreeDataNode to include level
      checked: boolean;
      nativeEvent: MouseEvent;
    }
  ) => {
    const clickedNodeKey = info.node.key;

    if (info.checked) {
      setCheckedKeys([clickedNodeKey]);
      setSelectedKeys([clickedNodeKey]);

      // Disable all child nodes of the clicked node
      if (info.node.children) {
        setDisabledKeys((prev) => {
          const newDisabledKeys = new Set(prev);
          info.node.children?.forEach((child) => {
            newDisabledKeys.add(child.key);
          });
          return newDisabledKeys;
        });
      }
    } else {
      // Uncheck and enable all child nodes if unchecked
      setCheckedKeys([]);
      setSelectedKeys([]);
      setDisabledKeys((prev) => {
        const newDisabledKeys = new Set(prev);
        if (info.node.children) {
          info.node.children.forEach((child) => {
            newDisabledKeys.delete(child.key);
          });
        }
        return newDisabledKeys;
      });
    }

    console.log("Checked nodes:", checked);
    console.log("Selected node key:", info.node.key);
    const nodeLevel = info.node.level ?? 0;
    console.log(
      "Get node level:",
      getNode([info.node], info.node.key, nodeLevel)
    );
    console.log("Selected node level:", info.node.level); // Log node level
    console.log("Selected node:", info.node);
  };

  const onSelect = (
    selectedKeys: React.Key[],
    info: {
      event: "select";
      selected: boolean;
      node: EventDataNode<CustomTreeDataNode>; // Updated to CustomTreeDataNode to include level
      selectedNodes: DataNode[];
      nativeEvent: MouseEvent;
    }
  ) => {
    setSelectedKeys(selectedKeys);
    setCheckedKeys(selectedKeys);
    console.log("Selected keys:", selectedKeys);
    console.log("Selected node:", info.node);
    console.log("Selected node level:", info.node.level); // Log node level
    console.log("Selected nodes:", info.selectedNodes);
  };

  const disableChildNodes = (
    nodes: CustomTreeDataNode[]
  ): CustomTreeDataNode[] => {
    return nodes.map((node) => ({
      ...node,
      disableCheckbox: disabledKeys.has(node.key), // Disable checkbox based on state
      children: node.children ? disableChildNodes(node.children) : [],
    }));
  };

  // Convert to CustomTreeDataNode to include level data
  const convertToTreeData = (nodes: OrgNode[]): CustomTreeDataNode[] => {
    return nodes.map((node) => ({
      title: `${node.name} ${node.id} [${node.level}]`,
      key: node.id,
      disableCheckbox: false, // Enable checkbox for root nodes initially
      level: node.level, // Add level property to the node
      children: node.children
        ? disableChildNodes(convertToTreeData(node.children))
        : [],
    }));
  };

  const generateDataList = (
    data: CustomTreeDataNode[]
  ): { key: React.Key; title: string }[] => {
    let dataList: { key: React.Key; title: string }[] = [];

    const loop = (nodes: CustomTreeDataNode[]) => {
      nodes.forEach((node) => {
        dataList.push({ key: node.key, title: node.title as string });
        if (node.children) {
          loop(node.children);
        }
      });
    };

    loop(data);
    return dataList;
  };

  const getParentKey = (
    key: React.Key,
    tree: CustomTreeDataNode[]
  ): React.Key | null => {
    let parentKey: React.Key | null = null;
    for (const node of tree) {
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else {
          parentKey = getParentKey(key, node.children);
        }
      }
      if (parentKey) break;
    }
    return parentKey;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const dataList = generateDataList(treeData); // Generate dataList from treeData

    const newExpandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData);
        }
        return null;
      })
      .filter(
        (item, i, self): item is React.Key =>
          !!(item && self.indexOf(item) === i)
      );

    setExpandedKeys(newExpandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const treeData = useMemo(
    () => convertToTreeData(nodeStore.nodes),
    [nodeStore.nodes, disabledKeys] // Dependency added to re-render when disabledKeys change
  );

  return (
    <div>
      <Search
        style={{ marginBottom: 8 }}
        placeholder="Search"
        onChange={onChange}
      />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        checkable
        multiple={false}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        onCheck={onCheck}
        showLine
        treeData={treeData}
      />
    </div>
  );
});

export default DataTree;
