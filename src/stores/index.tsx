// src/stores/RootStore.ts
import { NodeStore } from "./node-store";

export class RootStore {
  nodeStore: NodeStore;

  constructor() {
    this.nodeStore = new NodeStore();
  }
}
