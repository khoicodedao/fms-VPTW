import CustomStore from "devextreme/data/custom_store";
import { getListUnitChild } from "../apis/Unit.api";
import constValues from "../helpers/constValues";

function LookupDataSource(unitCode) {
  unitCode = unitCode == constValues.BQP_UNIT_CODE ? "all" : unitCode;
  let api = getListUnitChild;
  const lookupDataSource = {
    store: new CustomStore({
      key: "unit_code",
      loadMode: "raw",
      load: async () => {
        let data = await api(unitCode);
        return data.data;
      },
    }),
    sort: "name",
  };
  return lookupDataSource;
}
export default LookupDataSource;
