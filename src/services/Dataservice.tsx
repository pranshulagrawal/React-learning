import { OrgNodeDetails } from "../model/node-details-model";
import { OrgNode } from "../model/node-model";

export class DataService {
  async fetchNodes(): Promise<OrgNode[]> {
    try {
      // Replace the URL below with your actual API endpoint
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/org-nodes/hierarchy`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json();
      return data; // Adjust based on the structure of your API response
    } catch (error) {
      console.error("Error fetching nodes:", error);
      throw error; // Re-throw the error so it can be handled by the caller
    }
  }

  async fetchNodesDetail(): Promise<OrgNodeDetails[]> {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/nodesInfo`);
    const data = await response.json();
    return data;
  }
}
