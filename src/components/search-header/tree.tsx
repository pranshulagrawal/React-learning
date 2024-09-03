import React, { useMemo, useState, useEffect } from "react";
import { Tree } from "antd";
import { observer } from "mobx-react-lite";
import { RootStore } from "../../stores";
import { OrgNode } from "../../model/node-model";
import { CustomTreeDataNode } from "../../model/treenode-model";

const rootStore = new RootStore();

const DataTree: React.FC = observer(() => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
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
  console.log("selectedKeys", selectedKeys);

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
    console.log("Selected node level:", info.node.level); // Log node level
    console.log("Selected node:", info.node);
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

  //   const generateDataList = (
  //     data: CustomTreeDataNode[]
  //   ): { key: React.Key; title: string }[] => {
  //     let dataList: { key: React.Key; title: string }[] = [];

  //     const loop = (nodes: CustomTreeDataNode[]) => {
  //       nodes.forEach((node) => {
  //         dataList.push({ key: node.key, title: node.title as string });
  //         if (node.children) {
  //           loop(node.children);
  //         }
  //       });
  //     };

  //     loop(data);
  //     return dataList;
  //   };

  //   const getParentKey = (
  //     key: React.Key,
  //     tree: CustomTreeDataNode[]
  //   ): React.Key | null => {
  //     let parentKey: React.Key | null = null;
  //     for (const node of tree) {
  //       if (node.children) {
  //         if (node.children.some((item) => item.key === key)) {
  //           parentKey = node.key;
  //         } else {
  //           parentKey = getParentKey(key, node.children);
  //         }
  //       }
  //       if (parentKey) break;
  //     }
  //     return parentKey;
  //   };

  const treeData = useMemo(
    () => convertToTreeData(nodeStore.nodes),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodeStore.nodes, disabledKeys] // Dependency added to re-render when disabledKeys change
  );

  return (
    <Tree
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      checkable
      multiple={false}
      checkedKeys={checkedKeys}
      onCheck={onCheck}
      showLine
      treeData={treeData}
    />
  );
});

export default DataTree;
