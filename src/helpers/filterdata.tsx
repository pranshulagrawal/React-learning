import { OrgNode } from "../model/node-model";

export function flattenData(nodes: OrgNode[]): OrgNode[] {
  const flatData: OrgNode[] = [];

  function recurse(children: OrgNode[]) {
    children.forEach((node) => {
      flatData.push(node); // Add the current node to the flat array
      if (node.children && node.children.length > 0) {
        recurse(node.children); // Recursively add children
      }
    });
  }

  recurse(nodes);
  return flatData;
}
