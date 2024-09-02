import { ReactNode } from "react";

export type Key = string | number;
export interface DataNode {
  key: Key;
  title: ReactNode;
  children?: DataNode[];
  disabled?: boolean;
  selectable?: boolean;
  // ... other properties
}

export interface CustomTreeDataNode extends DataNode {
  level?: number;
}
