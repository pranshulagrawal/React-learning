// src/stores/RootStore.ts
import { NodeDetailsStore } from "./node-details-store";
import { NodeStore } from "./node-store";

export class RootStore {
  nodeStore: NodeStore;
  nodeDetailsStore: NodeDetailsStore;

  constructor() {
    this.nodeStore = new NodeStore();
    this.nodeDetailsStore = new NodeDetailsStore();
  }
}
