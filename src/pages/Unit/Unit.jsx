import CardWrapper from "../../components/CardWrapper";
import { Column } from "devextreme-react/tree-list";
import TreeListCustom from "../../components/TreeListCustom";
import { useState, useEffect } from "react";
import { getListUnit } from "../../apis/Unit.api";
import { useSelector } from "react-redux";
import constValues from "../../helpers/constValues";
import LocalStorage from "./../../helpers/LocalStorage";

export default function Unit(props) {
  const unitGlobal = useSelector((state) => state.unitCodeReducer);
  const userCondition = LocalStorage.get("user");
  let { onFocusedRowChanged } = props;
  const [listUnit, setListUnit] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to save reduced data to local storage
  const saveToLocalStorage = (key, value) => {
    try {
      // Reduce the data: store only necessary fields
      const reducedData = value.map((item) => ({
        name: item.name,
        unit_code: item.unit_code,
        parent_unit_code: item.parent_unit_code,
      }));

      localStorage.setItem(key, JSON.stringify(reducedData));
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        console.error("LocalStorage quota exceeded:", error);
        // Optionally clear local storage or remove old cache
        localStorage.clear(); // Warning: Clears all localStorage
      } else {
        console.error("Error saving to localStorage:", error);
      }
    }
  };

  let loadData = async () => {
    setLoading(true);
    try {
      // Check if the data is already cached
      let cachedUnitData = localStorage.getItem("unitListCache");
      if (cachedUnitData) {
        setListUnit(JSON.parse(cachedUnitData));
      } else {
        // Fetch data from the API if not cached
        let { data } = await getListUnit();

        if (unitGlobal !== "all") {
          let unit_list_child = userCondition?.conditions?.unit_list_child;
          let dataChild = [];

          if (unit_list_child) {
            dataChild = data.filter((item) => {
              return (
                item.parent_unit_code === unitGlobal ||
                unit_list_child.includes(item.parent_unit_code) ||
                unit_list_child.includes(item.unit_code)
              );
            });
          } else {
            dataChild = data.filter((item) => {
              return (
                item.parent_unit_code === unitGlobal ||
                item.unit_code === unitGlobal
              );
            });
          }

          // Set filtered unit data
          setListUnit([
            ...dataChild,
            {
              _id: "1",
              name: "Tất cả",
              full_name: "Tất cả",
              unit_code: unitGlobal,
              parent_unit_code: "-1",
            },
          ]);
        } else {
          // Filter units for global case
          let unitLV2List = data.filter(
            (child) => child.parent_unit_code == constValues.BQP_UNIT_CODE
          );
          unitLV2List.length == 1
            ? setListUnit([...data])
            : setListUnit([...data]);
        }

        // Cache the reduced data to localStorage
        saveToLocalStorage("unitListCache", data);
      }
    } catch (error) {
      console.error("Error loading unit data:", error);
      setListUnit([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [unitGlobal]);

  return (
    <CardWrapper>
      <div id="tree-list">
        {loading ? (
          <p>Loading unit data...</p>
        ) : listUnit.length > 0 ? (
          <TreeListCustom
            id="tree-list-unit"
            parentIdExpr="parent_unit_code"
            keyExpr="unit_code"
            data={listUnit}
            onFocusedRowChanged={onFocusedRowChanged}
          >
            <Column dataField="name" caption="Tên đơn vị"></Column>
            <Column
              dataField="unit_code"
              name
              caption="Tên đơn vị"
              visible={false}
            ></Column>
          </TreeListCustom>
        ) : (
          <p>No unit data available.</p>
        )}
      </div>
    </CardWrapper>
  );
}
