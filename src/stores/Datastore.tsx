import { makeAutoObservable } from "mobx";

export interface Node {
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
    children?: Node[];
}

class DataStore {
    data: Node[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setData(newData: Node[]) {
        this.data = newData;
    }

    get getData(): Node[] {
        return this.data;
    }
}

const dataStore = new DataStore();
export default dataStore;
