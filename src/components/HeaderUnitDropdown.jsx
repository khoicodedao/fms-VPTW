// import CardWrapper from './CardWrapper'
import { useState, useEffect } from "react";
import { getListUnit, getListUnitChild } from "../apis/Unit.api";
import { TreeSelect } from "antd";
import LocalStorage from "../helpers/LocalStorage";
import constValues from "../helpers/constValues";
let getDataKeys = (data) => {
  let unitCodeLv2 = data.filter(
    (item) => item.parent_unit_code == constValues.BQP_UNIT_CODE
  );
  return unitCodeLv2.length == 1
    ? [constValues.BQP_UNIT_CODE, unitCodeLv2[0]?.unit_code]
    : constValues.BQP_UNIT_CODE;
};

export default function HeaderUnitDropdown(props) {
  let accountUnitCode = LocalStorage.get("user")?.conditions?.unit_code || "";
  let { onChange } = props;
  const [listUnit, setListUnit] = useState([]);
  let loadData = async () => {
    let { data } = await getListUnit();
    if (data) {
      LocalStorage.set("expandRowKeys", getDataKeys(data));
    }

    if (accountUnitCode !== "all") {
      let unitLv3 = data.filter(
        (item) => item.parent_unit_code == accountUnitCode
      );
      setListUnit([...unitLv3]);
    } else {
      //Truong hop condition == all
      let unitLV2 = data.filter(
        (item) => item.parent_unit_code == constValues.BQP_UNIT_CODE
      );
      if (unitLV2.length == 1) {
        //  truong hop fms thu cap
        let dataUnitChild = data.filter(
          (item) => item.parent_unit_code == unitLV2[0].unit_code
        );
        setListUnit([...dataUnitChild]);
      } else {
        //truong hop fms tong
        setListUnit([...unitLV2]);
      }
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <TreeSelect
      showSearch
      // onSearch={onSearch}
      style={{ width: "100%" }}
      // value={value}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      placeholder="Chọn đơn vị"
      allowClear
      // treeDefaultExpandAll
      fieldNames={{
        label: "name",
        value: "unit_code",
        children: "children",
      }}
      onChange={onChange}
      treeData={listUnit}
      filterTreeNode={(input, treeNode) => {
        return treeNode.name.toLowerCase().includes(input.toLowerCase());
      }}
    />
  );
}
