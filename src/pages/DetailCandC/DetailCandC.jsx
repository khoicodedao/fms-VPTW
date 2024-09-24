import {
  Column,
  Export,
  HeaderFilter,
  MasterDetail,
} from "devextreme-react/data-grid";
import React, { useState } from "react";
import ReactJson from "react-json-view";
import { useSelector } from "react-redux";
import CardWrapper from "../../components/CardWrapper";
import PagingDataGrid from "../../components/PagingDataGrid";
import ALL_API from "../../constants/All.api";
import AlertLevelType from "../../helpers/AlertLevelType";
import changeKeys from "../../helpers/changeKeysObject";
import Dictionary from "../../helpers/Dictionary";
import onExporting from "../../helpers/exportExcelFunction";
import { headerFilterDataAlert } from "../Alert/data";
import { columns } from "./data";
import { useLocation } from "react-router-dom";
import DetailUnit from "./DetailUnit";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
function DetailCandC() {
  let dateGlobal = useSelector((state) => state.changeDateReducer);
  let unitGlobal = useSelector((state) => state.unitCodeReducer);
  let { startDate, endDate } = dateGlobal;
  let [filter, setFilter] = useState(""); // data for filter in search box
  let [url, setUrl] = useState(ALL_API.DETAIL_CANDC); // change url for search api to paging page
  let page = useQuery().get("page");

  return (
    <div className="row">
      <div className="col-md-12 col-xl-12">
        <div id="paging">
          {page !== "detail-unit" ? (
            <CardWrapper
              header={{
                name: "Danh sách cảnh báo",
                detail: "Thống kê danh sách cảnh báo",
              }}
            >
              <PagingDataGrid
                url={url}
                data={`&start_date=${startDate}&end_date=${endDate}${filter}&unit_code=${unitGlobal}`}
                dataKey="alert"
                onExporting={(e) => {
                  let filter = e.component.getCombinedFilter();
                  onExporting(
                    e,
                    url,
                    startDate,
                    endDate,
                    unitGlobal,
                    columns,
                    "alert",
                    filter
                  );
                }}
              >
                <Export enabled={true} />
                <HeaderFilter visible={true} />
                <Column
                  calculateCellValue={(data) => {
                    let info = data?.mac.toUpperCase();
                    if (info) {
                      return info;
                    } else {
                      return "Chưa định danh";
                    }
                  }}
                  dataField="mac"
                  caption="Địa chỉ MAC"
                  allowHeaderFiltering={false}
                />
                <Column
                  dataField="ip"
                  caption="Địa chỉ IP"
                  allowHeaderFiltering={false}
                />
                <Column
                  calculateCellValue={(data) => data.alert_type}
                  caption="Loại cảnh báo"
                  dataField="alert_type"
                  allowHeaderFiltering={false}
                />
                <Column
                  dataField="alert_level_id"
                  cellRender={(data) => AlertLevelType(data.displayValue)}
                  caption="Mức cảnh báo"
                  alignment={"center"}
                >
                  <HeaderFilter dataSource={headerFilterDataAlert} />
                </Column>
                <Column
                  dataField="alert_source"
                  caption="Nguồn cảnh báo"
                  alignment={"center"}
                  allowHeaderFiltering={false}
                />
                <Column
                  caption="Tên người quản lý"
                  dataField="manager_name"
                  alignment={"center"}
                  allowHeaderFiltering={false}
                />
                <Column
                  caption="Tên đơn vị"
                  dataField="unit_full_name"
                  allowHeaderFiltering={false}
                />
                <Column
                  caption="Mô tả"
                  calculateCellValue={(data) => {
                    let info = data?.alert_info;
                    if (info) {
                      return info.description;
                    } else {
                      return "";
                    }
                  }}
                  dataField="alert_info.description"
                  allowHeaderFiltering={false}
                  width={500}
                />

                <Column dataField="time_receive" caption="Thời gian cảnh báo" />
                <MasterDetail
                  enabled={true}
                  component={(e) => {
                    let info = e.data.data.alert_info;
                    info = changeKeys(info, Dictionary);
                    return (
                      <ReactJson
                        collapsed={1}
                        iconStyle="circle"
                        name="Thông tin"
                        src={info}
                        displayDataTypes={false}
                        quotesOnKeys={false}
                      />
                    );
                  }}
                />
              </PagingDataGrid>
            </CardWrapper>
          ) : (
            <DetailUnit></DetailUnit>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailCandC;
