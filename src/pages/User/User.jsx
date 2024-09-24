import CardWrapper from "../../components/CardWrapper";
import DataGrid from "../../components/Grid";
import {
  getListUser,
  addUser,
  editUser,
  deleteUser,
} from "../../apis/User.api";
import { useState, useEffect } from "react";
import { Column, Editing, Selection, Lookup } from "devextreme-react/data-grid";
import AddIdToArray from "../../helpers/AddIdToArray";
import { notification } from "antd";
import ReactJson from "react-json-view";
import TextArea from "devextreme-react/text-area";
import { TextBox } from "devextreme-react/text-box";
import {
  Validator,
  RequiredRule,
  CompareRule,
  CustomRule,
} from "devextreme-react/validator";

export default function User() {
  const [api, contextHolder] = notification.useNotification();

  const editCellConditionRole = (data) => {
    let dataField =
      typeof data.data.value == "object"
        ? JSON.stringify(data.data.value)
        : data.data.value;
    return (
      <div>
        <TextArea
          height={200}
          defaultValue={dataField}
          onValueChanged={(e) => data.data.setValue(e.value)}
        ></TextArea>
      </div>
    );
  };
  const editCellConditions = (data) => {
    let dataField =
      typeof data.data.value == "object"
        ? JSON.stringify(data.data.value)
        : data.data.value;
    return (
      <div>
        <TextArea
          height={200}
          defaultValue={dataField}
          onValueChanged={(e) => data.data.setValue(e.value)}
        ></TextArea>
      </div>
    );
  };
  const editCellPassWord = (data) => {
    let pass = "";
    return (
      <div>
        <TextBox
          className="mb-1"
          mode={"password"}
          onValueChanged={(e) => {
            data.data.setValue(e.value);
            pass = e.value;
          }}
          placeholder="Thêm mật khẩu"
          height={40}
        >
          <Validator>
            <RequiredRule message="Bạn cần nhập trường này" />
            <CustomRule
              message="Mật khẩu cần các ký tự đặc biệt"
              validationCallback={(e) => {
                pass = e.value;
                const passwordRegex =
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
                return passwordRegex.test(e.value);
              }}
            />
          </Validator>
        </TextBox>
        <TextBox
          placeholder="Xác nhận mật khẩu"
          mode={"password"}
          height={40}
          onValueChanged={(e) => data.data.setValue(e.value)}
        >
          <Validator>
            <RequiredRule message="Bạn cần nhập trường này" />
            <CompareRule
              message="Mật khẩu không khớp"
              comparisonTarget={() => {
                return pass;
              }}
            />
          </Validator>
        </TextBox>
      </div>
    );
  };
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
  let roleTypes = [
    { ID: "superAdmin", Name: "superAdmin" },
    { ID: "admin", Name: "Admin" },
  ];
  const [listUser, setListUser] = useState([]);
  let loadData = async () => {
    let { data } = await getListUser();
    data = AddIdToArray(data);
    setListUser([...data]);
  };
  const onRowInserted = (e) => {
    let { _id, index, ...dataOnSave } = e?.data;
    // ==Check exist field in form add new user==
    function checkStringLength(obj) {
      const values = Object.values(obj);
      const allFieldsPass = values.every(
        (value) => typeof value === "string" && value.length > 0
      );
      return allFieldsPass;
    }
    if (!checkStringLength(dataOnSave)) {
      openNotificationWithIcon({
        type: "error",
        message: "Cần thêm đủ các trường bắt buộc!",
      });
    }
    // == End==
    else {
      addUser({ ...dataOnSave }).then((data) => {
        let type = data.code == 200 ? "success" : "error";
        openNotificationWithIcon({ type: type, message: data.message });
        loadData();
      });
    }
  };

  const onRowUpdated = (e) => {
    let {
      created_at,
      updated_at,
      is_deleted,
      conditions_role,
      index,
      ...dataOnSave
    } = e?.data;
    conditions_role = JSON.stringify(conditions_role);
    editUser({ ...dataOnSave, conditions_role }).then((data) => {
      let type = data.code == 200 ? "success" : "error";
      openNotificationWithIcon({ type: type, message: data.message });
      loadData();
    });
  };

  const onRowRemoved = (e) => {
    let { id } = e?.data;
    deleteUser({ id }).then((data) => {
      let type = data.code == 200 ? "success" : "error";
      openNotificationWithIcon({ type: type, message: data.message });
      loadData();
    });
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <CardWrapper
      header={{
        name: "Danh sách tài khoản",
        detail: "Hiển thị danh sách tài khoản",
      }}
    >
      {contextHolder}
      <DataGrid
        data={listUser}
        id={"index"}
        formItem={{ visible: false }}
        showColumnLines={true}
        showRowLines={true}
        rowAlternationEnabled={true}
        showBorders={true}
        onRowUpdated={onRowUpdated}
        onRowInserted={onRowInserted}
        onRowRemoved={onRowRemoved}
        onInitNewRow={function (e) {
          let conditionsDefault = {
            unit_code: "",
            unit_list_child: [""],
          };
          e.data.conditions = JSON.stringify(conditionsDefault);

          e.data.conditions_role =
            '{"$or":[{"idParent.unit_code":""},{"idParent.unit_code":""}]}';
        }}
      >
        <Selection mode="single" />
        <Column
          dataField="index"
          width={50}
          alignment={"center"}
          caption="STT"
          formItem={{ visible: false }}
        />
        <Column dataField="_id" visible={false} formItem={{ visible: false }} />
        <Column dataField="username" caption="Tên đăng nhập">
          <RequiredRule message="Phải điền trường này!" />
        </Column>
        <Column dataField="full_name" caption="Tên đầy đủ" />

        <Column
          dataField="password"
          caption="Mật khẩu"
          dataType="password"
          editorOptions={{ mode: "password" }}
          customizeText={function (e) {
            return "**************";
          }}
          editCellComponent={editCellPassWord}
        >
          <RequiredRule message="Phải điền trường này!" />
        </Column>
        <Column dataField="role" caption="Quyền">
          <RequiredRule message="Phải điền trường này!" />
          <Lookup dataSource={roleTypes} valueExpr="ID" displayExpr="Name" />
        </Column>
        <Column
          cellRender={(data) => {
            return data ? (
              <ReactJson
                collapsed={1}
                iconStyle="circle"
                name="Thông tin"
                src={
                  typeof data?.data?.conditions_role == "object"
                    ? data?.data?.conditions_role
                    : JSON.parse(data?.data?.conditions_role)
                }
                displayDataTypes={false}
                quotesOnKeys={false}
              />
            ) : (
              ""
            );
          }}
          dataField="conditions_role"
          caption="Lọc dữ liệu"
          editCellComponent={editCellConditionRole}
          width={"300px"}
        >
          <RequiredRule message="Phải điền trường này!" />
        </Column>
        <Column
          cellRender={(data) => {
            return data ? (
              <ReactJson
                collapsed={1}
                iconStyle="circle"
                name="Thông tin"
                src={
                  typeof data.data.conditions == "object"
                    ? data.data.conditions
                    : JSON.parse(data.data.conditions)
                }
                displayDataTypes={false}
                quotesOnKeys={false}
              />
            ) : (
              ""
            );
          }}
          dataField="conditions"
          caption="Điều kiện đơn vị"
          editCellComponent={editCellConditions}
          width={"300px"}
        >
          <RequiredRule message="Phải điền trường này!" />
        </Column>
        {/* <Column
          dataField="created_at"
          caption="Ngày tạo"
          formItem={{ visible: false }}
        /> */}
        <Column
          dataField="updated_at"
          caption="Ngày cập nhật"
          formItem={{ visible: false }}
        />

        <Editing
          mode="popup"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          useIcons={true}
        />
      </DataGrid>
    </CardWrapper>
  );
}
