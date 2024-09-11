export interface CareerHistory {
  role: string;
  company: string;
  years: number;
}

export interface OrgNodeDetails {
  id: number;
  nodeId: number;
  name: string; // Name of the node
  level: number; // Hierarchical level of the node
  roleTitle: string; // Role title of the node
  department: string; // Department the node belongs to
  location: string; // Location of the node
  hireDate: string; // Date of hiring (formatted as a string)
  email: string; // Email of the node
  phoneNumber: string; // Phone number of the node
  status: string; // Status of the node (e.g., Active, On Leave)
  budget: number; // Budget associated with the node
  performanceRating: string | null; // Performance rating (optional)
  skills: string[]; // Array of skills
  projectAssigned: string[]; // Array of assigned projects
  biography: string; // Short biography of the node
  careerHistory: CareerHistory[]; // Array containing the career history of the node
  additionalProjects: string[]; // Array of additional projects
  notes: string; // Any additional notes
}
