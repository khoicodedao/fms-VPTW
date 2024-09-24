import { Button, message, Steps, theme } from "antd";
import { useState } from "react";
import UploadFile from "./uploadFile";
import ALL_API from "../../constants/All.api";
import onExporting from "../../helpers/exportExcelFunction";
import DataGrid, { Export } from "devextreme-react/data-grid";
import "./identify.css";
const columns = [
  { header: "Tên đơn vị", key: "full_name" },
  { header: "Mã đơn vị", key: "unit_code" },
];

const StepIdentifier = ({ unitCode }) => {
  let url = ALL_API.UNIT_ALL_CHILD;
  let handleUnitCodeDownload = (e) => {
    onExporting(e, url, "2023-01-01", "2023-01-01", unitCode, columns, "data");
  };
  const steps = [
    {
      title: "Bước 1",
      content: (
        <>
          Tải mẫu file{" "}
          <a
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() =>
              window.open(
                `${process.env.REACT_APP_LINK_DOWNLOAD_TEMPLATE}`,
                "_blank"
              )
            }
          >
            File mẫu
          </a>
          <div
            id="dataUnit"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>Tải thông tin mã đơn vị</div>
            <DataGrid onExporting={handleUnitCodeDownload}>
              <Export enabled={true} />
            </DataGrid>
          </div>
        </>
      ),
    },

    {
      title: "Bước 2",
      content: (
        <>
          <UploadFile />
        </>
      ),
    },
  ];
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "80px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Tiếp theo
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              message.success("Processing complete!");
            }}
          >
            Hoàn thành
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Trở lại
          </Button>
        )}
      </div>
    </>
  );
};
export default StepIdentifier;
