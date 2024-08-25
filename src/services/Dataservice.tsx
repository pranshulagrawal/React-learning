import { flattenData } from "../helpers/filterdata";
import dataStore from "../stores/Datastore";

class DataService {
  async fetchData(): Promise<void> {
    const response = await fetch("nested_organizational_data_india.json");
    const data = await response.json();
    const flattenedData = flattenData(data.nodes);
    console.log(data.nodes);
    dataStore.setData(data.nodes);
  }
}

const dataService = new DataService();
export default dataService;
