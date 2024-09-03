import { OrgNodeDetails } from "../model/node-details-model";
import { OrgNode } from "../model/node-model";

export class DataService {
  async fetchNodes(): Promise<OrgNode[]> {
    const response = await fetch("nested_organizational_data_india.json");
    const data = await response.json();
    return data.nodes;
  }

  async fetchNodesDetail(): Promise<OrgNodeDetails[]> {
    const response = await fetch("node_details.json");
    const data = await response.json();
    return data;
  }
}
