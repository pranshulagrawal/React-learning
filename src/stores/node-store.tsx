// src/stores/NodeStore.ts
import { makeAutoObservable, action } from "mobx";
import { OrgNode } from "../model/node-model";
import { DataService } from "../services/Dataservice";

export class NodeStore {
  nodes: OrgNode[] = [];
  dataService: DataService;

  constructor() {
    this.dataService = new DataService();
    makeAutoObservable(this, {
      loadNodes: action,
    });
  }

  async loadNodes() {
    try {
      this.nodes = await this.dataService.fetchNodes();
    } catch (error) {
      console.error("Failed to fetch nodes", error);
    }
  }

  get getNodes(): OrgNode[] {
    return this.nodes;
  }
}
