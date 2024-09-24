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
  staticsExportIPByUnit,
  staticsExportDomainByUnit,
} from "../../apis/Statistic.api";
import { useSelector } from "react-redux";
function mergeArrays(array1, array2) {
  // Tạo một đối tượng từ array1
  const result = {};

  array1.forEach((item) => {
    if (item._id) {
      result[item._id] = { _id: item._id, count1: item.count, count2: 0 };
    }
  });

  // Lặp qua array2 để kết hợp count
  array2.forEach((item) => {
    if (item._id) {
      if (result[item._id]) {
        result[item._id].count2 = item.count;
      } else {
        result[item._id] = { _id: item._id, count1: 0, count2: item.count };
      }
    }
  });

  // Chuyển đối tượng kết hợp thành mảng
  return Object.values(result);
}
export default function DetailUnit() {
  let { startDate, endDate } = useSelector((state) => state.changeDateReducer);
  let unitGlobal = useSelector((state) => state.unitCodeReducer);
  const [data, setData] = useState([]);
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
    };
    let { data: ip } = await staticsExportIPByUnit(body);
    let { data: domain } = await staticsExportDomainByUnit(body);
    let mixData = mergeArrays(ip, domain);
    mixData.sort((a, b) => b.count1 - a.count1);
    setData(mixData);
  };
  useEffect(() => {
    loadData();
  }, [startDate, endDate, unitGlobal]);
  return (
    <div className="row" id="paging">
      <div className="col-md-12 col-xl-12">
        <CardWrapper
          header={{
            name: "Số liệu theo đơn vị",
            detail: "Số liệu thống kê theo đơn vị",
          }}
        >
          <GroupPanel visible={true} />
          <DataGrid
            keyExpr="_id"
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
            <Column dataField="_id" caption="Tên đơn vị" />
            <Column dataField="count1" caption="Số lượng IP" />
            <Column dataField="count2" caption="Số lượng Domain" />
            <Summary>
              <TotalItem
                column="count1"
                summaryType="sum"
                customizeText={(e) => showTotal(e, "count1")}
              />
              <TotalItem
                column="count2"
                summaryType="sum"
                customizeText={(e) => showTotal(e, "count2")}
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
