import { makeAutoObservable, action } from "mobx";
import { OrgNodeDetails } from "../model/node-details-model";
import { DataService } from "../services/Dataservice";

export class NodeDetailsStore {
  nodesDetails: OrgNodeDetails[] = [];
  dataService: DataService;

  constructor() {
    this.dataService = new DataService();
    makeAutoObservable(this, {
      loadNodes: action,
    });
  }

  async loadNodes() {
    try {
      this.nodesDetails = await this.dataService.fetchNodesDetail();
    } catch (error) {
      console.error("Failed to fetch nodes", error);
    }
  }

  get getNodes(): OrgNodeDetails[] {
    return this.nodesDetails;
  }

  getNodeDetailsById(id: number): OrgNodeDetails | undefined {
    return this.nodesDetails.find((node) => node.id === id);
  }
}
