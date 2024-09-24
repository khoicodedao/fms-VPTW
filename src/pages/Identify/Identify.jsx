import CardWrapper from "../../components/CardWrapper";
import PagingDataGrid from "../../components/PagingDataGrid";
import ALL_API from "../../constants/All.api";
import {
  RequiredRule,
  PatternRule,
  HeaderFilter,
} from "devextreme-react/data-grid";
import {
  addIdentify,
  editIdentify,
  deleteIdentify,
} from "../../apis/Identify.api";
import { useState, useEffect } from "react";
import {
  Column,
  Editing,
  Pager,
  Lookup,
  Button,
  Export,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";
import { Popup } from "devextreme-react/popup";
// import Unit from '../Unit/Unit'
import LookupDataSource from "../../components/LookupDataSource";
import { useSelector } from "react-redux";
import constValues from "../../helpers/constValues";
import {
  deviceTypes,
  deviceLevel,
  headerFilterDeviceLevel,
  headerFilterDeviceTypes,
  headerFilterNetWorkTypes,
  columns,
} from "./data";
import "./identify.css";
import { notification } from "antd";
import onExporting from "../../helpers/exportExcelFunction";
import StepIdentifier from "./StepIdentifier";
import UnitDrawer from "../../components/UnitDrawer";
import { Button as ButtonAnt } from "antd";
export default function Identify() {
  let [unitFullName, setUnitFullName] = useState("");
  //================Identify with File=======================
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };
  //!=======================END================================
  let { startDate, endDate } = useSelector((state) => state.changeDateReducer);
  let unitGlobal = useSelector((state) => state.unitCodeReducer);
  const [isEdit, setIsEdit] = useState(false);
  let [unitCode, setUnitCode] = useState(unitGlobal);
  let url = ALL_API.IDENTIFY_LIST_PAGING; // change url for search api to paging page
  let [unitLookup, SetUnitLookup] = useState(LookupDataSource(unitGlobal));
  //=====================Notification=====================
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (data) => {
    if (data.type == "error") {
      api["error"]({
        message: "Thông báo",
        description: data.message,
        placement: "bottomRight",
      });
    } else {
      api["success"]({
        message: "Thông báo",
        description: data.message,
        placement: "bottomRight",
      });
    }
  };
  //!=======================END===============================

  //========================CRUD=============================
  let insert = async (e) => {
    let { __KEY__, ...data } = e;
    addIdentify(data).then((data) => {
      openNotificationWithIcon(
        data.code == 200
          ? { type: "success", message: data.message }
          : { type: "error", message: data.message }
      );
    });
  };
  let update = async (e, values) => {
    let { STT, _id, unit, idParent, ...data } = e;
    editIdentify({ ...data, ...values }).then((data) => {
      openNotificationWithIcon(
        data.code == 200
          ? { type: "success", message: data.message }
          : { type: "error", message: data.message }
      );
    });
  };
  let remove = async (e) => {
    let { _id: id } = e;
    deleteIdentify({ id }).then((data) => {
      openNotificationWithIcon(
        data.code == 200
          ? { type: "success", message: data.message }
          : { type: "error", message: data.message }
      );
    });
  };
  //!====================END============================

  //====================Select Unit in Drawer==========
  let onFocusedRowChanged = (e) => {
    //select to BQP change unit_code to aLL
    if (e.row.key == constValues.BQP_UNIT_CODE) {
      setUnitCode("all");
      setUnitFullName("Bộ Quốc Phòng");
    } else {
      setUnitCode(e.row.key);
      SetUnitLookup(LookupDataSource(e.row.key));
      setUnitFullName(e.row.data.full_name);
      setIsEdit(true);
    }
  };
  //======================Indentify with file excel ============================
  const renderContent = () => {
    return (
      <>
        <p>Các bước thực hiện định danh qua file</p>
        <StepIdentifier unitCode={unitCode}></StepIdentifier>
      </>
    );
  };
  //!==============================END==============================

  useEffect(() => {
    setUnitCode(unitGlobal);
  }, [unitGlobal]);
  return (
    <div className="row" id="identify-page">
      {contextHolder}
      <Popup
        visible={isPopupVisible}
        hideOnOutsideClick={true}
        onHiding={togglePopup}
        contentRender={renderContent}
      />
      <div className="col-md-12 col-xl-12 col-xxl-12 dropdownInput"></div>
      <div className="col-md-12 col-xl-12">
        <CardWrapper
          header={{
            name: "Quản lý thiết bị định danh",
          }}
        >
          <UnitDrawer onFocusedRowChanged={onFocusedRowChanged}></UnitDrawer>
          {unitFullName !== "" && (
            <ButtonAnt className="ml-2">{unitFullName}</ButtonAnt>
          )}
          <PagingDataGrid
            url={url}
            data={`&unit_code=${unitCode}`}
            dataKey="identDevice"
            insert={insert}
            update={update}
            remove={remove}
            onInitNewRow={function (e) {
              e.data.group = "Chưa xác định";
            }}
            onExporting={(e) => {
              let filter = e.component.getCombinedFilter();
              onExporting(
                e,
                url,
                startDate,
                endDate,
                unitGlobal,
                columns,
                "identDevice",
                filter
              );
            }}
            onToolbarPreparing={function (e) {
              if (!isEdit) {
                e.toolbarOptions.items.unshift({
                  location: "after",
                  widget: "dxButton",
                  options: {
                    icon: "add",
                    onClick: function () {
                      alert("Bạn cần chọn đơn vị trước khi định danh");
                    },
                  },
                });
              }
              e.toolbarOptions.items.unshift({
                location: "after",
                widget: "dxButton",
                options: {
                  icon: "textdocument",
                  onClick: function () {
                    togglePopup();
                  },
                },
              });
            }}
          >
            <Export enabled={true} />
            <HeaderFilter visible={true} />
            <Column type="buttons">
              <Button name="save" />
              <Button name="edit" />
              <Button name="delete" />
            </Column>
            <Column
              dataField="mac"
              placeholder="XX-XX-XX-XX-XX-XX"
              caption="MAC"
              allowHeaderFiltering={false}
            >
              <PatternRule
                message={'MAC phải có định dạng như sau "XX-XX-XX-XX-XX-XX"!'}
                pattern={/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/i}
              />
              <RequiredRule></RequiredRule>
            </Column>
            <Column
              dataField="device_name"
              allowHeaderFiltering={false}
              caption="Tên thiết bị"
            ></Column>
            <Column
              dataField="manager_name"
              allowHeaderFiltering={false}
              caption="Người sử dụng"
            >
              <RequiredRule></RequiredRule>
            </Column>
            <Column
              dataField="ip"
              allowHeaderFiltering={false}
              caption="Địa chỉ IP"
              placeholder="xx.xx.xx.xx"
            >
              <PatternRule
                message={'IP phải có định dạng như sau! "192.168.xx.xx"'}
                pattern={
                  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i
                }
              />
            </Column>
            <Column
              placeholder="Lựa chọn..."
              dataField="group"
              caption="Phân cấp chất lượng"
              alignment={"center"}
              width="100"
            >
              <HeaderFilter dataSource={headerFilterDeviceLevel} />
              <Lookup
                dataSource={deviceLevel}
                valueExpr="ID"
                displayExpr="Name"
              />
            </Column>
            <Column
              dataField="serial_number"
              allowHeaderFiltering={false}
              caption="Serial Number"
            />
            <Column
              dataField="type"
              placeholder="Lựa chọn..."
              caption="Loại thiết bị"
            >
              <RequiredRule></RequiredRule>
              <HeaderFilter dataSource={headerFilterDeviceTypes} />
              <Lookup
                dataSource={deviceTypes}
                valueExpr="ID"
                displayExpr="Name"
              />
            </Column>
            <Column
              placeholder="Lựa chọn..."
              dataField="network_type"
              caption="Loại mạng"
            >
              <RequiredRule></RequiredRule>
              <HeaderFilter dataSource={headerFilterNetWorkTypes} />
              <Lookup
                dataSource={["TSLqs", "Internet", "Không kết nối mạng"]}
              />
            </Column>
            <Column
              dataField="unit_code"
              allowHeaderFiltering={false}
              caption="Tên đơn vị"
              placeholder="Lựa chọn..."
            >
              <RequiredRule></RequiredRule>
              <Lookup
                dataSource={unitLookup}
                displayExpr="full_name"
                valueExpr="unit_code"
              />
            </Column>
            {/* <Column
              dataField="unit_name"
              caption="Tên đơn vị"
              formItem={{ visible: false }}
            ></Column> */}
            <Column
              dataField="note"
              allowHeaderFiltering={false}
              caption="Ghi chú"
            ></Column>
            <Column
              dataField="created_at"
              caption="Ngày tạo"
              formItem={{ visible: false }}
              allowHeaderFiltering={false}
            />
            <Column
              dataField="updated_at"
              caption="Ngày cập nhật"
              formItem={{ visible: false }}
              allowHeaderFiltering={false}
            />
            <Pager
              visible={true}
              showPageSizeSelector={true}
              showNavigationButtons={true}
              showInfo={true}
            />
            <Editing
              mode="popup"
              allowUpdating={true}
              allowAdding={isEdit}
              allowDeleting={true}
              useIcons={true}
              texts={{
                saveRowChanges: "Lưu",
                cancelRowChanges: "Hủy",
                confirmDeleteMessage: "Bạn muốn xóa không?",
              }}
            />
            )
            <Toolbar>
              <Item name="addRowButton" />
              <Item name="exportButton" />
            </Toolbar>
          </PagingDataGrid>
        </CardWrapper>
      </div>
    </div>
  );
}
