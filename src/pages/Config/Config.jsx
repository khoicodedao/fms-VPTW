import CardWrapper from "../../components/CardWrapper";
import { getListConfig, editConfig } from "../../apis/Config.api";
import { useState, useEffect } from "react";
import { EditOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Button, Alert } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { InputNumber } from "antd";
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined";
import LocalStorage from "../../helpers/LocalStorage";
export default function ConfigView() {
  const { role } = LocalStorage?.get("user") || "user";
  let isSupperAdmin = role == "superAdmin";
  const [config, setConfig] = useState([]);
  const [alert, setAlert] = useState(0);
  const [timeDisconnected, setTimeDisconnected] = useState(0);
  const [timeSendData, setTimeSendData] = useState("0");
  const [timeMiAVConnect, setTimeMiAVConnect] = useState(0);
  let [unitCode, setUnitCode] = useState("");
  let [urlSend, setUrlSend] = useState("");
  let [urlShareService, setUrlShareService] = useState("");
  let [saveStatus, setSaveStatus] = useState(true);
  let loadData = async () => {
    let { data } = await getListConfig();
    setConfig({ ...data });
    setTimeDisconnected(data?.check_day_online);
    setTimeSendData(data?.time_send_schedule[2]);
    setUnitCode(data?.unit_code || "");
    setUrlSend(data?.url_send || "");
    setUrlShareService(data?.url_share_service || "");
    setTimeMiAVConnect(data?.check_miav_connect || "");
  };
  let sendEdit = () => {
    editConfig({
      ...config,
      time_send_schedule: `*/${timeSendData} * * * *`,
      check_day_online: timeDisconnected,
      unit_code: unitCode,
      url_send: urlSend,
      url_share_service: urlShareService,
      check_miav_connect: timeMiAVConnect,
    })
      .then(() => {
        setAlert(1);
        setSaveStatus(true);
      })
      .catch(() => setAlert(2));
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <CardWrapper
      header={{
        name: "Danh sách cấu hình",
      }}
    >
      {alert != 0 && (
        <Alert
          message={alert == 1 ? "Thành công" : "Thất bại"}
          type={alert == 1 ? "success" : "error"}
          showIcon
          closable
          description={`Thay đổi dữ liệu ${
            alert == 1 ? "Thành công" : "Thất bại"
          }`}
        />
      )}
      <div className="row">
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="j-unit">
            <fieldset
              id="basic-forms-p-0"
              role="tabpanel"
              aria-labelledby="basic-forms-h-0"
              className="body current"
              aria-hidden="false"
            >
              <div className="form-group row">
                <div className="col-sm-6">
                  <label htmlFor="userName-2" className="block">
                    Mã phần mềm:
                  </label>
                  <Input
                    addonAfter={<LockOutlined style={{ cursor: "pointer" }} />}
                    value={config?.id_software || ""}
                    disabled
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="userName-2" className="block">
                    Tên phần mềm:
                  </label>
                  <Input
                    addonAfter={<LockOutlined style={{ cursor: "pointer" }} />}
                    value={config?.name_software || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6">
                  <label htmlFor="userName-2" className="block">
                    Mã đơn vị:
                  </label>
                  <Input
                    addonAfter={<EditOutlined style={{ cursor: "pointer" }} />}
                    value={unitCode}
                    onChange={(e) => {
                      setUnitCode(e.target.value);
                      setSaveStatus(false);
                    }}
                    disabled={!isSupperAdmin}
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="userName-2" className="block">
                    Ngày cài đặt:
                  </label>
                  <Input
                    addonAfter={<LockOutlined style={{ cursor: "pointer" }} />}
                    value={config?.created_at || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6">
                  <label htmlFor="userName-2" className="block">
                    <b>Địa chỉ đơn vị cấp trên:</b>
                  </label>
                  <Input
                    addonAfter={<EditOutlined style={{ cursor: "pointer" }} />}
                    value={urlSend}
                    onChange={(e) => {
                      setUrlSend(e.target.value);
                      setSaveStatus(false);
                    }}
                    disabled={!isSupperAdmin}
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="userName-2" className="block">
                    <b>Địa chỉ dịch vụ dùng chung :</b>
                  </label>
                  <Input
                    addonAfter={<EditOutlined style={{ cursor: "pointer" }} />}
                    value={urlShareService}
                    onChange={(e) => {
                      setUrlShareService(e.target.value);
                      setSaveStatus(false);
                    }}
                    disabled={!isSupperAdmin}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6">
                  <Button
                    type="primary"
                    disabled={saveStatus}
                    shape="round"
                    icon={<SaveOutlined />}
                    onClick={sendEdit}
                  >
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="form-group row">
            <div className="col-sm-6">
              <label htmlFor="userName-2" className="block">
                Chu kỳ gửi dữ liệu tới đơn vị cấp trên:
              </label>
              <InputNumber
                min={1}
                value={timeSendData}
                style={{ width: "100%" }}
                addonAfter={<ClockCircleOutlined />}
                formatter={(value) => `${value} Phút`}
                onChange={(value) => {
                  setTimeSendData(value);
                  setSaveStatus(false);
                }}
                disabled={!isSupperAdmin}
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="userName-2" className="block">
                Thời gian cảnh báo mất kết nối FMC :
              </label>

              <InputNumber
                min={1}
                value={timeDisconnected}
                style={{ width: "100%" }}
                addonAfter={<ClockCircleOutlined />}
                formatter={(value) => `${value} Ngày`}
                onChange={(value) => {
                  setTimeDisconnected(value);
                  setSaveStatus(false);
                }}
                disabled={!isSupperAdmin}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-6">
              <label htmlFor="userName-2" className="block">
                Thời gian MiAV kết nối:
              </label>
              <InputNumber
                min={1}
                value={timeMiAVConnect}
                style={{ width: "100%" }}
                addonAfter={<ClockCircleOutlined />}
                formatter={(value) => `${value} Ngày`}
                onChange={(value) => {
                  setTimeMiAVConnect(value);
                  setSaveStatus(false);
                }}
                disabled={!isSupperAdmin}
              />
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}
