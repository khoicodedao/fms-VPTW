import DataGrid from "devextreme-react/data-grid";
import { Column } from "devextreme-react/data-grid";
import TextArea from "devextreme-react/text-area";
import { TextBox } from "devextreme-react/text-box";
import { Button } from "devextreme-react/button";
import SelectBox from "devextreme-react/select-box";
import { RequiredRule, Validator } from "devextreme-react/validator";
import ReactJson from "react-json-view";
import { addIdentify } from "../../apis/Identify.api";
const renderContent = (dataRow, listAlert, unitLookup, togglePopup) => {
  let onFormSubmit = (e) => {
    e.preventDefault();
    const group = document.querySelector('input[aria-label="group"]').value;
    const mac = document.querySelector('input[aria-label="mac"]').value;
    const device_name = document.querySelector(
      'input[aria-label="device_name"]'
    ).value;
    const manager_name = document.querySelector(
      'input[aria-label="manager_name"]'
    ).value;
    const serial_number = document.querySelector(
      'input[aria-label="serial_number"]'
    ).value;
    const ip = document.querySelector('input[aria-label="ip"]').value;
    const type = document.querySelector('input[aria-label="type"]').value;
    const network_type = document.querySelector(
      'input[aria-label="network_type"]'
    ).value;
    const unit_code = document.querySelector(
      "#nav-ident > form > div:nth-child(3) > div:nth-child(1) > div > div.dx-dropdowneditor-input-wrapper.dx-selectbox-container > input[type=hidden]"
    ).value;
    const note = document.querySelector('textarea[aria-label="note"]').value;
    addIdentify({
      serial_number,
      group,
      mac,
      device_name,
      manager_name,
      ip,
      type,
      network_type,
      unit_code,
      note,
    }).then((data) => {
      var alertElement = document.getElementById("myAlert");
      if (data.code === 200) {
        alertElement.style.display = "block";
        // Sử dụng setTimeout để ẩn thông báo sau 1 giây
        setTimeout(function () {
          alertElement.style.display = "none"; // Ẩn thông báo
          togglePopup();
        }, 1000);
      } else {
        alertElement.style.display = "block";
        alertElement.classList.add("alert-danger");
        // Sử dụng setTimeout để ẩn thông báo sau 1 giây
        setTimeout(function () {
          alertElement.style.display = "none"; // Ẩn thông báo
          togglePopup();
        }, 1000);
      }
    });
  };
  let listAutoRun = dataRow?.system_info?.list_auto_run;
  let listSoftWare = [];
  let listHardWare = [
    { name: "Card mạng", value: dataRow?.system_info?.network },
    { name: "RAM", value: dataRow?.system_info?.ram },

    { name: "CPU", value: dataRow?.system_info?.cpu },
    { name: "Ổ cứng", value: dataRow?.system_info?.free_drive },
    { name: "OS", value: dataRow?.system_info?.OS },
  ];
  if (typeof dataRow?.system_info?.list_softwares == "object") {
    listSoftWare = dataRow?.system_info?.list_softwares.map((item, index) => {
      return {
        index,
        item,
      };
    });
  } else {
    listSoftWare = [];
  }
  if (Array.isArray(listAutoRun)) {
    listAutoRun = listAutoRun.map((item, index) => {
      return {
        index,
        item,
      };
    });
  }
  console.log(listAutoRun);
  let listProcess = dataRow?.system_info?.list_process;
  if (Array.isArray(listProcess)) {
    listProcess = listProcess.map((item, index) => {
      return {
        index,
        item,
      };
    });
  }
  return (
    <>
      <div
        class="alert alert-success"
        style={{ display: "none" }}
        id="myAlert"
        role="alert"
      >
        Thêm thành công!
      </div>

      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <a
            className="nav-item nav-link active"
            id="nav-home-tab"
            data-toggle="tab"
            href="#nav-home"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Thông tin phần cứng
          </a>
          <a
            className="nav-item nav-link"
            id="nav-profile-tab"
            data-toggle="tab"
            href="#nav-profile"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            Danh sách AutoRun
          </a>
          <a
            className="nav-item nav-link"
            id="nav-contact-tab"
            data-toggle="tab"
            href="#nav-contact"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            Danh sách tiến trình
          </a>
          <a
            className="nav-item nav-link"
            id="nav-software-tab"
            data-toggle="tab"
            href="#nav-software"
            role="tab"
            aria-controls="nav-alert"
            aria-selected="false"
          >
            {" "}
            Danh sách phần mềm
          </a>
          <a
            className="nav-item nav-link"
            id="nav-connection-tab"
            data-toggle="tab"
            href="#nav-connection"
            role="tab"
            aria-controls="nav-alert"
            aria-selected="false"
          >
            {" "}
            Danh sách kết nối
          </a>
          <a
            className="nav-item nav-link"
            id="nav-alert-tab"
            data-toggle="tab"
            href="#nav-alert"
            role="tab"
            aria-controls="nav-alert"
            aria-selected="false"
          >
            Danh sách cảnh báo
          </a>
          {dataRow?.status_ident !== "Đã định danh" && (
            <a
              className="nav-item nav-link"
              id="nav-ident-tab"
              data-toggle="tab"
              href="#nav-ident"
              role="tab"
              aria-controls="nav-alert"
              aria-selected="false"
            >
              Định danh
            </a>
          )}
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <DataGrid
            dataSource={listHardWare}
            keyExpr="name"
            showBorders={true}
            height={"90%"}
            showColumnLines={true}
            showRowLines={true}
          >
            <Column
              dataField="name"
              caption="Tên"
              formItem={{ visible: false }}
              allowFiltering={false}
            />
            <Column
              alignment="left"
              dataField="value"
              caption="Giá trị"
              formItem={{ visible: false }}
              allowFiltering={false}
            />
          </DataGrid>
        </div>
        <div
          className="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <DataGrid
            dataSource={listAutoRun}
            keyExpr="index"
            showBorders={true}
            height={"90%"}
            showColumnLines={true}
            showRowLines={true}
          >
            <Column
              width={50}
              alignment="center"
              dataField="index"
              caption="STT"
              formItem={{ visible: false }}
              allowFiltering={false}
            />
            <Column
              alignment="left"
              cellRender={(value) => {
                return (
                  <ReactJson
                    iconStyle="circle"
                    collapsed={1}
                    name="Thông tin"
                    src={value.data.item}
                    displayDataTypes={false}
                    quotesOnKeys={false}
                  />
                );
              }}
              dataField={"item"}
              caption="Đường dẫn"
              formItem={{ visible: false }}
              allowFiltering={false}
            />
          </DataGrid>
        </div>
        <div
          className="tab-pane fade"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
        >
          <DataGrid
            dataSource={listProcess}
            keyExpr="index"
            showBorders={true}
            height={"90%"}
            showColumnLines={true}
            showRowLines={true}
          >
            <Column
              width={50}
              alignment="center"
              dataField="index"
              caption="STT"
              formItem={{ visible: false }}
              allowFiltering={false}
            />
            <Column
              alignment="left"
              dataField="item"
              caption="Đường dẫn"
              cellRender={(value) => {
                return (
                  <ReactJson
                    iconStyle="circle"
                    collapsed={1}
                    name="Thông tin"
                    src={value.data.item}
                    displayDataTypes={false}
                    quotesOnKeys={false}
                  />
                );
              }}
              formItem={{ visible: false }}
              allowFiltering={false}
            />
          </DataGrid>
        </div>
        <div
          className="tab-pane fade"
          id="nav-alert"
          role="tabpanel"
          aria-labelledby="nav-alert-tab"
        >
          {/* data */}

          <DataGrid
            dataSource={listAlert}
            keyExpr="mac"
            showBorders={true}
            height={"90%"}
            showColumnLines={true}
            showRowLines={true}
          >
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
              dataField="alert_level_id"
              // cellRender={(data) => AlertLevelType(data.displayValue)}
              caption="Mức cảnh báo"
              alignment={"center"}
              width={"100px"}
            >
              //! Fix lookup doesn't show data
            </Column>
            <Column
              dataField="time_receive"
              allowHeaderFiltering={false}
              caption="Thời gian cảnh báo"
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
            />
          </DataGrid>
        </div>
        <div
          className="tab-pane fade"
          id="nav-software"
          role="tabpanel"
          aria-labelledby="nav-software-tab"
        >
          {/* data */}

          <DataGrid
            dataSource={listSoftWare}
            keyExpr="index"
            showBorders={true}
            height={"90%"}
            showColumnLines={true}
            showRowLines={true}
          >
            <Column
              width={50}
              alignment="center"
              dataField="index"
              caption="STT"
              formItem={{ visible: false }}
              allowFiltering={false}
            />
            <Column
              alignment="left"
              dataField="item"
              cellRender={(value) => {
                return (
                  <ReactJson
                    iconStyle="circle"
                    collapsed={1}
                    name="Thông tin"
                    src={value.data.item}
                    displayDataTypes={false}
                    quotesOnKeys={false}
                  />
                );
              }}
              caption="Đường dẫn"
              formItem={{ visible: false }}
              allowFiltering={false}
            />
          </DataGrid>
        </div>
        <div
          className="tab-pane fade"
          id="nav-connection"
          role="tabpanel"
          aria-labelledby="nav-connection-tab"
        >
          {/* data */}

          <TextArea
            height={"70%"}
            value={dataRow?.system_info?.connections}
          ></TextArea>
        </div>
        {dataRow?.status_ident !== "Đã định danh" && (
          <div
            className="tab-pane fade"
            id="nav-ident"
            role="tabpanel"
            aria-labelledby="nav-ident-tab"
          >
            {/* data */}
            <form action="your-action" onSubmit={onFormSubmit}>
              <div className="row mt-2  ml-2">
                <div className=" col ml-2">
                  <p>MAC:</p>
                  <TextBox
                    value={dataRow?.mac}
                    readOnly={true}
                    inputAttr={{ "aria-label": "mac" }}
                  />
                </div>
                <div className=" col ml-2">
                  <p>IP:</p>
                  <TextBox
                    value={dataRow?.ip}
                    readOnly={true}
                    inputAttr={{ "aria-label": "ip" }}
                  />
                </div>
                <div className=" col ml-2">
                  <p>Device Name:</p>
                  <TextBox
                    // value={dataRow?.device_name}
                    inputAttr={{ "aria-label": "device_name" }}
                  >
                    <Validator>
                      <RequiredRule message="Phải điền trường này!" />
                    </Validator>
                  </TextBox>
                </div>
                <div className=" col ml-2">
                  <p>Người sử dụng:</p>
                  <TextBox inputAttr={{ "aria-label": "manager_name" }}>
                    <Validator>
                      <RequiredRule message="Phải điền trường này!" />
                    </Validator>
                  </TextBox>
                </div>
              </div>
              <div className="row mt-4 pt-4 ml-2">
                <div className=" col ml-2">
                  <p>Phân cấp chất lượng:</p>
                  <SelectBox
                    inputAttr={{ "aria-label": "group" }}
                    items={[
                      "Chưa xác định",
                      "Cấp 1",
                      "Cấp 2",
                      "Cấp 3",
                      "Cấp 4",
                      "Cấp 5",
                    ]}
                  >
                    <Validator>
                      <RequiredRule message="Phải điền trường này!" />
                    </Validator>
                  </SelectBox>
                </div>
                <div className=" col ml-2">
                  <p>Serial Number:</p>
                  <TextBox inputAttr={{ "aria-label": "serial_number" }} />
                </div>
                <div className=" col ml-2">
                  <p>Loại thiết bị:</p>
                  <SelectBox
                    inputAttr={{ "aria-label": "type" }}
                    items={[
                      "Máy Tính",
                      "Máy Chủ",
                      "Máy In/Photo",
                      "Thiết bị mạng",
                      "Khác",
                    ]}
                  >
                    <Validator>
                      <RequiredRule message="Phải điền trường này!" />
                    </Validator>
                  </SelectBox>
                </div>
                <div className=" col ml-2">
                  <p>Loại Mạng:</p>
                  <SelectBox
                    inputAttr={{ "aria-label": "network_type" }}
                    items={["TSLqs", "Internet", "Không kết nối mạng"]}
                  >
                    <Validator>
                      <RequiredRule message="Phải điền trường này!" />
                    </Validator>
                  </SelectBox>
                </div>
              </div>
              <div className="row mt-4 pt-4 ml-2">
                <div className=" col ml-2">
                  <p>Tên Đơn vị:</p>
                  <SelectBox
                    inputAttr={{ "aria-label": "unit_code" }}
                    searchEnabled={true}
                    valueExpr="unit_code"
                    displayExpr="full_name"
                    dataSource={unitLookup}
                  >
                    <Validator>
                      <RequiredRule message="Phải điền trường này!" />
                    </Validator>
                  </SelectBox>
                </div>
                <div className=" col ml-2">
                  <p>Ghi chú:</p>
                  <TextArea inputAttr={{ "aria-label": "note" }} />
                </div>
              </div>
              <div className="row mt-4 pt-4 ml-4 mr-4 mb-2">
                <Button
                  width="50%"
                  id="button"
                  text="Định danh"
                  type="success"
                  useSubmitBehavior={true}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default renderContent;
