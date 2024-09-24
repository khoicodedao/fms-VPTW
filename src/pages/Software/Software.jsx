import CardWrapper from "../../components/CardWrapper";
import PagingDataGrid from "../../components/PagingDataGrid";
import ALL_API from "../../constants/All.api";
import { useState, useEffect } from "react";
import {
  Column,
  Pager,
  MasterDetail,
  Export,
} from "devextreme-react/data-grid";
import Dictionary from "../../helpers/Dictionary";
import ReactJson from "react-json-view";
import changeKeys from "../../helpers/changeKeysObject";
import { useSelector } from "react-redux";
import onExporting from "../../helpers/exportExcelFunction";

const allowedPageSizes = [5, 10, "all"];
const renderGridCell = (data) => {
  return data?.value === "Hoạt động" ? (
    <div style={{ backgroundColor: "green", color: "white" }}>Hoạt động</div>
  ) : (
    <div style={{ backgroundColor: "red", color: "white" }}>Mất kết nối</div>
  );
};
const renderGridCellRegion = (data) => {
  switch (data.value) {
    case "1":
      return "Miền Bắc";
    case "2":
      return "Miền Nam";
    case "3":
      return "Miền Trung";

    default:
      break;
  }
};
const renderGridCellTypeSoftware = (data) => {
  switch (data.value) {
    case "FMS1":
      return "FMS Tổng";
    case "FMS2":
      return "FMS Vùng";
    case "FMS3":
      return "FMS Chiến Lược";

    default:
      return data.value;
  }
};
const columns = [
  { header: "Tên phần mềm", key: "name_software" },
  { header: "IP", key: "ip" },
  {
    header: "Đơn vị chủ quản",
    key: "unit_name",
  },
  { header: "Vùng miền", key: "region" },
  {
    header: "Loại phần mềm",
    key: "type_software",
  },
  {
    header: "Phiên bản",
    key: "software_version",
  },
  {
    header: "Thời gian",
    key: "last_time_fomat",
  },
  {
    header: "Thời gian tạo",
    key: "created_at",
  },
];
export default function Fms() {
  let url = ALL_API.SOFTWARE_LIST_PAGING; // change url for search api to paging page
  let [filterTypeValue, setFilterTypeValue] = useState("");
  let unitGlobal = useSelector((state) => state.unitCodeReducer);
  const onOptionChanged = (e) => {
    if (e.fullName === "columns[4].filterValue") {
      let filter = e.value;
      switch (filter) {
        case "FMS Chiến Lược":
          filter = "FMS3";
          break;
        case "FMS Vùng":
          filter = "FMS2";
          break;
        case "FMS Tổng":
          filter = "FMS1";
          break;
        default:
          break;
      }
      setFilterTypeValue(filter);
    }
  };
  console.log(filterTypeValue);
  let filter = `&unit_code=${unitGlobal}`;
  return (
    <div id="page-software">
      <CardWrapper
        header={{
          name: "Danh sách quản lý FMS-FMC",
        }}
      >
        <PagingDataGrid
          onOptionChanged={onOptionChanged}
          url={url}
          data={filter}
          dataKey="software"
          // onExporting={onExporting}
          onExporting={(e) => {
            onExporting(
              e,
              url,
              "startDate",
              "endDate",
              unitGlobal,
              columns,
              "software"
            );
          }}
          // insert={insert}
          // update={update}
          // remove={remove}
        >
          {/* <Column
            dataField="name_software"
            width={100}
            caption="Tên phần mềm"
          /> */}
          <Export enabled={true} />
          {/* <Column dataField="mac" caption="MAC" /> */}
          <Column dataField="name_software" caption="Tên phần mềm" />
          <Column dataField="unit_name" caption="Đơn vị chủ quản" />
          <Column
            dataField="region"
            alignment={"center"}
            caption="Vùng miền"
            cellRender={renderGridCellRegion}
          />

          <Column
            dataField="type_software"
            caption="Loại phần mềm"
            filterValue={filterTypeValue}
            cellRender={renderGridCellTypeSoftware}
          />
          <Column
            dataField="software_version"
            width={100}
            caption="Phiên bản"
          />

          <Column
            dataField="last_time"
            caption="Thời gian"
            alignment={"center"}
          />

          {/* <Column dataField="ip" caption="Địa chỉ IP" /> */}
          {/* <Column dataField="id_software" caption="Mã phần mềm" /> */}
          {/* <Column dataField="serial_number" caption="Serial Number" />

        <Column dataField="unit_code" caption="Mã đơn vị" /> */}
          <Column
            dataField="status"
            caption="Trạng thái"
            formItem={{ visible: false }}
            cellRender={renderGridCell} // customize render cell
            alignment="center"
          />
          <Pager
            visible={true}
            allowedPageSizes={allowedPageSizes}
            displayMode="full"
            showPageSizeSelector={true}
            showNavigationButtons={true}
            showInfo={true}
          />
          {/* <Editing
              mode="form"
              allowUpdating={true}
              allowAdding={true}
              allowDeleting={true}
              useIcons={true}
            /> */}

          <MasterDetail
            enabled={true}
            component={(e) => {
              let info = e.data.data ?? e.data.data;
              info = changeKeys(info, Dictionary);
              return (
                <ReactJson
                  iconStyle="circle"
                  collapsed={1}
                  name="Thông tin"
                  displayDataTypes={false}
                  src={info}
                  quotesOnKeys={false}
                />
              );
            }}
          />
        </PagingDataGrid>
      </CardWrapper>
    </div>
  );
}
