import { flattenData } from "../helpers/filterdata";
import { OrgNode } from "../model/node-model";

export class DataService {
  async fetchNodes(): Promise<OrgNode[]> {
    const response = await fetch("nested_organizational_data_india.json");
    const data = await response.json();
    // const flattenedData = flattenData(data.nodes);
    // console.log(data.nodes);
    // dataStore.setData(data.nodes);
    return data.nodes;
  }
}
