export interface OrgNode {
  id: number;
  name: string;
  parentId: number | null;
  level: number;
  roleTitle: string;
  department: string;
  location: string;
  hireDate: string;
  email: string;
  phoneNumber: string;
  status: string;
  budget: number;
  headCount: number;
  projectAssigned: string[];
  performanceRating: string | null;
  skills: string[];
  children?: OrgNode[];
}
