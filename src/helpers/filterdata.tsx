import { Node } from "../stores/Datastore";

export function flattenData(nodes: Node[]): Node[] {
    const flatData: Node[] = [];

    function recurse(children: Node[]) {
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
