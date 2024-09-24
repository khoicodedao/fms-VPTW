import React, { useEffect, useState } from "react";
import {
  Column,
  MasterDetail,
  HeaderFilter,
  Export,
  Item,
} from "devextreme-react/data-grid";
import PagingDataGrid from "../../components/PagingDataGrid";
import CardWrapper from "../../components/CardWrapper";
import ALL_API from "../../constants/All.api";
import Dictionary from "../../helpers/Dictionary";
import { useSelector } from "react-redux";
import AlertLevelType from "../../helpers/AlertLevelType";
import "./alert.css";
import { headerFilterDataAlert, columns } from "./data.js";
import { Button } from "antd";
import ReactJson from "react-json-view";
import changeKeys from "../../helpers/changeKeysObject";
import constValues from "../../helpers/constValues";
import onExporting from "../../helpers/exportExcelFunction";
import UnitDrawer from "../../components/UnitDrawer";
function Alert() {
  let [unitFullName, setUnitFullName] = useState("");
  let dateGlobal = useSelector((state) => state.changeDateReducer);
  let unitGlobal = useSelector((state) => state.unitCodeReducer);
  let { startDate, endDate } = dateGlobal;

  let url = ALL_API.ALERT_LIST_PAGING; // change url for search api to paging page
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
  // const reloadGrid = () => {
  //   if (reload.current) {
  //     reload.current.instance.refresh()
  //   }
  // }

  return (
    <div className="row" page="alert">
      <div className="col-md-12 col-xl-12 col-xxl-12 dropdownInput"></div>
      <div className="col-md-12 col-xl-12 col-xxl-12">
        <div id="paging">
          <CardWrapper
            header={{
              name: "Danh sách cảnh báo",
            }}
          >
            <UnitDrawer onFocusedRowChanged={onFocusedRowChanged}></UnitDrawer>

            {unitFullName !== "" && (
              <Button className="ml-2">{unitFullName}</Button>
            )}
            <PagingDataGrid
              url={url}
              data={`&start_date=${startDate}&end_date=${endDate}${`&unit_code=${unitCode}`}`}
              dataKey="alert"
              onExporting={(e) => {
                onExporting(
                  e,
                  url,
                  startDate,
                  endDate,
                  unitGlobal,
                  columns,
                  "alert"
                );
              }}
            >
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
              {/* <Column dataField="ip" caption="Địa chỉ IP" /> */}
              <Column
                allowHeaderFiltering={false}
                dataField="ip"
                caption="Địa chỉ IP"
                width={"120px"}
              />
              <Column
                allowHeaderFiltering={false}
                caption="Nguồn"
                dataField="source_name"
                alignment={"center"}
                width={"120px"}
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
                dataField="manager_name"
                alignment={"center"}
                allowHeaderFiltering={false}
              />
              <Column
                caption="Tên đơn vị"
                // calculateCellValue={(data) => {
                //   let info = data?.ident_info
                //   if (info) {
                //     return info?.unit?.full_name
                //   } else {
                //     return ''
                //   }
                // }}
                dataField="unit_full_name"
                allowHeaderFiltering={false}
              />
              <Column
                calculateCellValue={(data) => data.alert_type}
                caption="Loại cảnh báo"
                dataField="alert_type"
                alignment={"center"}
                allowHeaderFiltering={false}
              />
              <Column
                dataField="name_fmc"
                width={150}
                caption="Tên FMC"
                allowHeaderFiltering={false}
              />
              <Column
                dataField="alert_level_id"
                cellRender={(data) => AlertLevelType(data.displayValue)}
                caption="Mức cảnh báo"
                alignment={"center"}
                width={"100px"}
              >
                //! Fix lookup doesn't show data
                <HeaderFilter dataSource={headerFilterDataAlert} />
              </Column>
              <Column
                dataField="time_receive"
                allowHeaderFiltering={false}
                caption="Thời gian cảnh báo(tại máy chủ)"
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
                allowHeaderFiltering={false}
                dataField="alert_info.description"
                width={"500px"}
              />
              <Export enabled={true} />
              <Item location="before">
                <div className="informer">
                  <div className="count">{1}</div>
                  <span>Total Count</span>
                </div>
              </Item>
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

export default Alert;
