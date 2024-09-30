import React, { useState, useEffect } from "react";
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
import ReactJson from "react-json-view";
import { Button } from "antd";
import changeKeys from "../../helpers/changeKeysObject";
import "./event.css";
import constValues from "../../helpers/constValues";
import onExporting from "../../helpers/exportExcelFunction";
import { columns } from "../Alert/data";
import UnitDrawer from "../../components/UnitDrawer";

function Event() {
  let [unitFullName, setUnitFullName] = useState("");
  let dateGlobal = useSelector((state) => state.changeDateReducer);
  let unitGlobal = useSelector((state) => state.unitCodeReducer);
  let { startDate, endDate } = dateGlobal;
  let [filter, setFilter] = useState(""); // data for filter in search box
  let [url, setUrl] = useState(ALL_API.EVENT_LIST_PAGING); // change url for search api to paging page
  let [unitCode, setUnitCode] = useState(unitGlobal);
  let onFocusedRowChanged = (e) => {
    //select to BQP change unit_code to aLL
    if (e.row.key == constValues.BQP_UNIT_CODE) {
      setUnitCode("all");
      setUnitFullName("Bộ Quốc Phòng");
    } else {
      setUnitCode(e.row.key);
      setUnitFullName(e.row.data.full_name);
    }
  };

  useEffect(() => {
    setUnitCode(unitGlobal);
  }, [unitGlobal]);
  return (
    <div className="row" page="event">
      <div className="col-md-9 col-lg-9  col-xl-9">
        <div id="paging">
          <CardWrapper
            header={{
              name: "Danh sách sự kiện",
            }}
          >
            {unitFullName !== "" && (
              <Button className="ml-2">{unitFullName}</Button>
            )}
            <PagingDataGrid
              url={url}
              data={`&start_date=${startDate}&end_date=${endDate}${filter}&unit_code=${unitCode}`}
              dataKey="event"
              onExporting={(e) => {
                onExporting(
                  e,
                  url,
                  startDate,
                  endDate,
                  unitGlobal,
                  columns,
                  "event"
                );
              }}
            >
              <HeaderFilter visible={true} />
              <Column
                dataField="mac"
                caption="Địa chỉ MAC"
                allowHeaderFiltering={false}
              />
              {/* <Column dataField="ip" caption="Địa chỉ IP" /> */}
              <Column
                dataField="ip"
                caption="Địa chỉ IP"
                width={"120px"}
                allowHeaderFiltering={false}
              />
              <Column
                allowHeaderFiltering={false}
                caption="Nguồn"
                dataField="source_name"
                alignment={"center"}
                width={"120px"}
              />
              {/* <Column dataField="event_description" caption="Mô tả" /> */}
              <Column
                caption="Tên người quản lý"
                calculateCellValue={(data) => {
                  let info = data?.ident_info?.manager_name;
                  if (info) {
                    return info;
                  } else {
                    return "Chưa định danh";
                  }
                }}
                allowHeaderFiltering={false}
                dataField="ident_info.manager_name"
              />
              <Column
                allowHeaderFiltering={false}
                caption="Tên đơn vị"
                dataField="unit_full_name"
              />
              <Column
                dataField="name_fmc"
                width={150}
                caption="Tên FMC"
                allowHeaderFiltering={false}
              />
              <Column
                allowHeaderFiltering={false}
                caption="Loại cảnh báo"
                calculateCellValue={(data) => data.alert_type}
                dataField="alert_type"
                alignment={"center"}
                width={"120px"}
              />

              <Column
                dataField="alert_level_id"
                caption="Mức cảnh báo"
                cellRender={(data) => AlertLevelType(data.displayValue)}
                alignment={"center"}
                width={"100px"}
              >
                <HeaderFilter dataSource={headerFilterDataAlert} />
              </Column>
              <Column
                allowHeaderFiltering={false}
                dataField="time_receive"
                caption="Thời gian cảnh báo(tại máy chủ)"
              />
              <Column
                allowHeaderFiltering={false}
                caption="Mô tả"
                calculateCellValue={(data) => {
                  let info = data?.alert_info || "";
                  return info.description ?? "";
                }}
                width={"500px"}
                dataField="alert_info.description"
              />

              {/* <Column
                calculateCellValue={(data) => data.alert_source}
                caption="Nguồn cảnh báo"
                dataField="alert_source"
                alignment={'center'}
                width={'120px'}
              /> */}
              <Export enabled={true} />

              <MasterDetail
                enabled={true}
                component={(e) => {
                  let info = e?.data?.data;
                  info = changeKeys(info, Dictionary);
                  return (
                    <ReactJson
                      iconStyle="circle"
                      collapsed={1}
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
      <div className="col-md-3 col-xl-3 col-xxl-3">
        {" "}
        <UnitDrawer onFocusedRowChanged={onFocusedRowChanged}></UnitDrawer>
      </div>
    </div>
  );
}

export default Event;
