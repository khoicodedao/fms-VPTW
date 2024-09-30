import CardWrapper from "../../components/CardWrapper";
import { useState, useEffect } from "react";
import DataGrid, {
  Export,
  GroupPanel,
  Selection,
  FilterRow,
} from "devextreme-react/data-grid";
import { Column, Summary, TotalItem } from "devextreme-react/data-grid";
import {
  staticsExportDevice,
  staticsExportComputer,
  staticsExportMiAV,
  staticsExportIdent,
  staticsExportMiAVActive,
  getStatisticMiAV,
} from "../../apis/Statistic.api";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSelector } from "react-redux";
import BugOutlined from "@ant-design/icons/BugOutlined";
import { Input } from "antd";

const mixAllArrayByUnitCode = (...arg) => {
  const mergedArray = (array1, array2, label2) =>
    array1.map((item1) => {
      const item2 = array2.find((item2) => item2.tendv === item1.tendv);
      if (item2) {
        let newItem = {};
        newItem[label2] = item2.count;
        return { ...item1, ...newItem };
      }
      return item1;
    });
  let result = mergedArray(
    arg[0][arg[0].type],
    arg[1][arg[1].type],
    "computer"
  );
  result = mergedArray(result, arg[2][arg[2].type], "miAVs");
  result = mergedArray(result, arg[3][arg[3].type], "idents");
  result = mergedArray(result, arg[4][arg[4].type], "miAVActive");
  result = mergedArray(result, arg[5][arg[5].type], "miAVVersion");

  return result;
};
export default function ExportByUnit() {
  let { startDate, endDate } = useSelector((state) => state.changeDateReducer);
  let unitGlobal = useSelector((state) => state.unitCodeReducer);
  const [data, setData] = useState([]);
  const [verMiAV, setVerMiAV] = useState("");
  const [isFind, setIsFind] = useState(false);

  const showTotal = (function () {
    return (e, columnName) => {
      let dataColumn = data.map((item) => item[columnName] || 0);
      let total = dataColumn.reduce((a, b) => a + b, 0);
      return `Tổng: ${total}`;
    };
  })();
  const loadData = async () => {
    let body = {
      start_date: startDate,
      end_date: endDate,
      unit_code: unitGlobal,
      version: verMiAV,
    };
    let { data: devices } = await staticsExportDevice(body);
    let { data: computers } = await staticsExportComputer(body);
    let { data: miAVs } = await staticsExportMiAV(body);
    let { data: idents } = await staticsExportIdent(body);
    let { data: miAVActive } = await staticsExportMiAVActive(body);
    let { data: miAVVersion } = await getStatisticMiAV(body);

    let mixData = mixAllArrayByUnitCode(
      { devices, type: "devices" },
      { computers, type: "computers" },
      { miAVs, type: "miAVs" },
      { idents, type: "idents" },
      { miAVActive, type: "miAVActive" },
      { miAVVersion, type: "miAVVersion" }
    );
    mixData = mixData.filter((item) => item.tendv !== undefined);
    mixData = mixData.map((item) => {
      return { ...item, region: item.region.toString() };
    });
    // console.log(mixData)
    setData(mixData);
  };
  useEffect(() => {
    loadData();
  }, [isFind, startDate, endDate]);
  return (
    <div className="row" id="paging">
      <div className="col-md-12 col-xl-12">
        <CardWrapper
          header={{
            name: "Số liệu theo đơn vị",
            detail: "",
          }}
        >
          <Input
            placeholder="Phiên bản Agent"
            className="mb-2"
            value={verMiAV}
            style={{ width: "20%" }}
            addonAfter={<BugOutlined />}
            onChange={(e) => {
              setVerMiAV(e.target.value);
            }}
          />
          <Button
            className="ml-2"
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => {
              setIsFind(!isFind);
            }}
          ></Button>
          <GroupPanel visible={true} />
          <DataGrid
            keyExpr="tendv"
            dataSource={data}
            showBorders={true}
            remoteOperations={true}
            showColumnLines={true}
            showRowLines={true}
            rowAlternationEnabled={true}
            allowColumnResizing={true}
            columnResizingMode={"widget"}
            columnAutoWidth={true}
          >
            <FilterRow visible={true} />

            <Selection mode="multiple" />
            <Column dataField="tendv" caption="Tên đơn vị" />
            <Column dataField="count" caption="Số lượng thiết bị" />
            <Column dataField="computer" caption="Số lượng Máy tính" />
            <Column dataField="miAVs" caption="Số lượng Agent" />
            <Column
              dataField="miAVVersion"
              caption={`Số lượng Agent phiên bản ${verMiAV}`}
            />

            <Column dataField="idents" caption="Số lượng định danh" />
            <Column
              dataField="miAVActive"
              caption="Số lượng Agent  hoạt động"
            />

            <Column
              dataField="region"
              caption="Vùng miền"
              alignment={"center"}
            />
            <Summary>
              <TotalItem
                column="count"
                summaryType="sum"
                customizeText={(e) => showTotal(e, "count")}
              />
              <TotalItem
                column="computer"
                summaryType="sum"
                customizeText={(e) => showTotal(e, "computer")}
              />
              <TotalItem
                column="miAVs"
                summaryType="sum"
                customizeText={(e) => showTotal(e, "miAVs")}
              />
              <TotalItem
                column="miAVVersion"
                summaryType="sum"
                customizeText={(e) => showTotal(e, "miAVVersion")}
              />
              <TotalItem
                column="idents"
                summaryType="sum"
                customizeText={(e) => showTotal(e, "idents")}
              />
              <TotalItem
                column="miAVActive"
                summaryType="sum"
                customizeText={(e) => showTotal(e, "miAVActive")}
              />
            </Summary>
            <Export enabled={true} allowExportSelectedData={true} />
          </DataGrid>
          <Export enabled={true} allowExportSelectedData={true} />
        </CardWrapper>
      </div>
    </div>
  );
}
