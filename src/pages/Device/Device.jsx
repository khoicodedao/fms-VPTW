import CardWrapper from "../../components/CardWrapper";
import { useState, useEffect } from "react";
import { getListAlertByMAC } from "../../apis/Alert.api";
import ALL_API from "../../constants/All.api";
import { getListUnitChild } from "../../apis/Unit.api";
import {
  Column,
  Selection,
  MasterDetail,
  Pager,
  HeaderFilter,
  Export,
} from "devextreme-react/data-grid";
import { useSelector } from "react-redux";
// import AddIdToArray from '../../helpers/AddIdToArray'
import Dictionary from "../../helpers/Dictionary";
import PagingDataGrid from "../../components/PagingDataGrid";
import {
  headerFilterDeviceType,
  headerFilterIdentify,
  headerFilterMiAVStatus,
  columns,
} from "./data";
import "./device.css";
import ReactJson from "react-json-view";
import { Button } from "antd";
import changeKeys from "../../helpers/changeKeysObject";
import constValues from "../../helpers/constValues";
import onExporting from "../../helpers/exportExcelFunction";
import { Button as ButtonDevEx } from "devextreme-react/data-grid";
import { Popup } from "devextreme-react/popup";
import UnitDrawer from "../../components/UnitDrawer";
import renderContent from "./render";

export default function Device() {
  let [dataRow, setDataRow] = useState({});
  let [listAlert, setListAlert] = useState([]);
  let [listUnitChild, setListUnitChild] = useState([]);
  //====================Show Detail device==================================
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };
  //========================END=============================
  let unitGlobal = useSelector((state) => state.unitCodeReducer);
  let dateGlobal = useSelector((state) => state.changeDateReducer);
  let { startDate, endDate } = dateGlobal;
  let [unitCode, setUnitCode] = useState(unitGlobal);
  let [unitFullName, setUnitFullName] = useState("");
  let url = ALL_API.DEVICE_LIST_PAGING;
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
    getListUnitChild(unitGlobal)
      .then((res) => {
        setListUnitChild(res.data);
      })
      .catch((e) => console.warn(e));
    setUnitCode(unitGlobal);
  }, [unitGlobal]);

  return (
    <div className="row" id="page-device" page="device">
      <Popup
        visible={isPopupVisible}
        hideOnOutsideClick={true}
        onHiding={togglePopup}
        contentRender={function () {
          return renderContent(dataRow, listAlert, listUnitChild, togglePopup);
        }}
        title="Hồ sơ thiết bị"
      />

      <div className="col-md-9 col-xl-9">
        <CardWrapper
          header={{
            name: "Quản lý thiết bị tham gia mạng",
          }}
        >
          {unitFullName && <Button className="ml-2">{unitFullName}</Button>}
          <PagingDataGrid
            url={url}
            data={`&start_date=${startDate}&end_date=${endDate}&unit_code=${unitCode}`}
            dataKey="activeDevice"
            onExporting={(e) => {
              let filter = e.component.getCombinedFilter();
              onExporting(
                e,
                url,
                startDate,
                endDate,
                unitGlobal,
                columns,
                "activeDevice",
                filter
              );
            }}
          >
            <Selection mode="single" />
            <HeaderFilter visible={true} />
            <Column type="buttons" width={40}>
              <ButtonDevEx
                hint="Chi tiết"
                icon="increaseindent"
                onClick={(e) => {
                  if (e.row.data) {
                    getListAlertByMAC(e.row.data.mac).then((data) =>
                      setListAlert(data.data.event)
                    );
                  }
                  setDataRow(e.row.data);
                  togglePopup();
                }}
              />
            </Column>
            <Column
              calculateCellValue={(data) => {
                let info = data?.mac.toUpperCase();
                if (info) {
                  return info;
                }
              }}
              caption="Địa chỉ MAC"
              dataField="mac"
              allowHeaderFiltering={false}
            />
            <Column
              dataField="ip"
              width={150}
              caption="Địa chỉ IP"
              // calculateCellValue={(data) => {
              //   return data?.ident_info?.ip || data.ip
              // }}
              allowHeaderFiltering={false}
            />

            <Column
              dataField="device_name"
              width={150}
              caption="Tên thiết bị"
              allowHeaderFiltering={false}
            />

            <Column
              dataField="manager_name"
              width={150}
              caption="Người quản lý"
              allowHeaderFiltering={false}
            />
            <Column
              dataField="name_fmc"
              width={150}
              caption="Tên FMC"
              allowHeaderFiltering={false}
            />
            <Column
              dataField="serial_number"
              width={150}
              caption="Serial Number"
              visible={false}
            />
            <Column
              caption="Tên đơn vị"
              // calculateCellValue={(data) => {
              //   let info = data?.ident_info
              //   if (info) {
              //     return info?.unit?.full_name
              //   } else {
              //     return data.unit_name
              //   }
              // }}
              allowHeaderFiltering={false}
              dataField="unit_full_name"
            />
            <Column dataField="type_device" caption="Loại thiết bị">
              <HeaderFilter dataSource={headerFilterDeviceType} />
            </Column>
            <Column dataField="status_ident" caption="Định danh">
              <HeaderFilter dataSource={headerFilterIdentify} />
            </Column>
            <Column dataField="status_install_miav" caption="Trạng thái MiAV">
              <HeaderFilter dataSource={headerFilterMiAVStatus} />
            </Column>
            {/* <Column dataField="unit_name" caption="Tên đơn vị" /> */}
            {/* <Column dataField="unit_name" width={150} caption="Tên đơn vị" /> */}

            <Column
              dataField="miav_version"
              width={150}
              caption="Phiên bản Agent"
              allowHeaderFiltering={false}
            />
            <Column
              width={150}
              dataField="last_seen_miav"
              caption="Thời gian Agent"
              allowHeaderFiltering={false}
              formItem={{ visible: false }}
            />
            <Column
              width={150}
              dataField="last_time_receive"
              caption="Thời gian Online(tại máy chủ)"
              formItem={{ visible: false }}
              allowHeaderFiltering={false}
            />
            {/* <Column
              width={150}
              dataField="created_at"
              caption="Ngày tạo"
              formItem={{ visible: false }}
            /> */}

            <Pager
              visible={true}
              showPageSizeSelector={true}
              showNavigationButtons={true}
              showInfo={true}
            />
            <Export enabled={true} />

            <MasterDetail
              enabled={true}
              component={(e) => {
                let info =
                  typeof e?.data?.data?.hardware_info == "string"
                    ? JSON.parse(e?.data?.data?.hardware_info) // trường hợp có ident_info
                    : { ...e?.data?.data, ident_info: "" }; //trường hợp không có ident_info
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
      <div className="col-md-3 col-xl-3 col-xxl-3">
        {" "}
        <UnitDrawer onFocusedRowChanged={onFocusedRowChanged}></UnitDrawer>
      </div>
    </div>
  );
}
