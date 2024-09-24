import React, { useState } from "react";
import {
  Column,
  MasterDetail,
  HeaderFilter,
  Export,
} from "devextreme-react/data-grid";
import PagingDataGrid from "../../components/PagingDataGrid";
import CardWrapper from "../../components/CardWrapper";
import ALL_API from "../../constants/All.api";
import Dictionary from "../../helpers/Dictionary";
import { useSelector } from "react-redux";
import AlertLevelType from "../../helpers/AlertLevelType";
import { headerFilterDataAlert } from "../Alert/data";
import onExporting from "../../helpers/exportExcelFunction";
import { columns } from "./data";
import "./detailViolent.css";
import ReactJson from "react-json-view";
import changeKeys from "../../helpers/changeKeysObject";
function DetailViolent() {
  let dateGlobal = useSelector((state) => state.changeDateReducer);
  let unitGlobal = useSelector((state) => state.unitCodeReducer);
  let { startDate, endDate } = dateGlobal;
  let [filter, setFilter] = useState(""); // data for filter in search box
  let [url, setUrl] = useState(ALL_API.DETAIL_VIOLENT); // change url for search api to paging page
  return (
    <div className="row">
      <div className="col-md-12 col-xl-12">
        <div id="paging">
          <CardWrapper
            header={{
              name: "Danh sách cảnh báo",
              detail: "Thống kê danh sách cảnh báo vi phạm quy định",
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
                // calculateCellValue={(data) => {
                //   let info = data?.ident_info
                //   if (info) {
                //     return info?.manager_name
                //   } else {
                //     return 'Chưa định danh'
                //   }
                // }}
                allowHeaderFiltering={false}
                dataField="manager_name"
                alignment={"center"}
              />
              <Column
                caption="Tên đơn vị"
                // calculateCellValue={(data) => {
                //   let info = data?.ident_info
                //   if (info) {
                //     return info?.unit_name
                //   } else {
                //     return ''
                //   }
                // }}
                allowHeaderFiltering={false}
                dataField="unit_full_name"
              />
              <Column
                caption="Mô tả"
                calculateCellValue={(data) => {
                  let info = data?.alert_info;
                  return info ? info.description : "";
                }}
                allowHeaderFiltering={false}
                dataField="alert_info.description"
                width={500}
              />

              <Column
                dataField="time_receive"
                caption="Thời gian cảnh báo(tại máy chủ)"
                allowHeaderFiltering={false}
              />
              <MasterDetail
                enabled={true}
                component={(e) => {
                  let info = e.data.data;
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
        </div>
      </div>
    </div>
  );
}

export default DetailViolent;
