import { CustomTreeDataNode } from "../model/treenode-model";

export const getNode = (
  treeData: CustomTreeDataNode[],
  nodeId: React.Key,
  targetLevel: number
): CustomTreeDataNode[] => {
  let result: CustomTreeDataNode[] = [];

  // Function to find the target node and collect its children at the desired level
  const findTargetNodeAndCollectChildren = (
    nodes: CustomTreeDataNode[],
    currentLevel: number
  ): boolean => {
    for (const node of nodes) {
      if (node.key === nodeId) {
        // If the target node is found, collect its children at the desired level
        collectChildrenAtLevel(node.children || [], currentLevel + 1);
        return true; // Stop further searching once the target node is found
      }

      if (node.children && currentLevel < targetLevel) {
        // Continue searching in child nodes if we haven't reached the target level yet
        if (findTargetNodeAndCollectChildren(node.children, currentLevel + 1)) {
          return true; // Stop further searching if the target node is found in the child nodes
        }
      }
    }
    return false; // Continue searching in the next sibling node
  };

  // Helper function to collect nodes at the desired level
  const collectChildrenAtLevel = (
    nodes: CustomTreeDataNode[],
    currentLevel: number
  ) => {
    if (currentLevel === targetLevel) {
      result = nodes; // Directly assign nodes at the desired level to result
    }
  };

  // Start searching from the root nodes at level 0
  findTargetNodeAndCollectChildren(treeData, 0);
  console.log("result", result);
  return result;
};
