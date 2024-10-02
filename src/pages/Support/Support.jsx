import CardWrapper from "../../components/CardWrapper";
import DataGrid from "../../components/Grid";
import { useState, useEffect } from "react";
import {
  Column,
  Summary,
  TotalItem,
  Selection,
  MasterDetail,
} from "devextreme-react/data-grid";
export default function Support() {
  const [listFileSupport, setListFileSupport] = useState([]);
  let loadData = async () => {
    setListFileSupport([
      {
        STT: 1,
        name: "Hướng dẫn cài đặt Agent",
        link: "http://fms.bqp/MiAV/Huong_dan/HDSD%20t%C3%ADnh%20n%C4%83ng%20%C4%91%E1%BB%8Bnh%20danh%20tr%C3%AAn%20h%E1%BB%87%20th%E1%BB%91ng%20FMS.docx",
      },
      {
        STT: 2,
        name: "Hướng dẫn cài đặt Server",
        link: "http://update.fms.bqp/caidat_fms_fmc_miav/HuongDanCaiDatFMS_FMC_MiAV.docx",
      },

      {
        STT: 3,
        name: "Hướng dẫn sử dụng hệ thống",
        link: "http://update.fms.bqp/caidat_fms_fmc_miav/HDSD_FMS_4CAP.docx",
      },
    ]);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="row" style={{ paddingBottom: "2rem" }}>
      <div className="col-md-8">
        <CardWrapper
          header={{
            name: "Danh sách tài liệu",
            detail: "Danh sách tài liệu thông về hệ thống",
          }}
        >
          <DataGrid data={listFileSupport} id={"STT"}>
            <Selection mode="single" />
            <Column
              dataField="STT"
              width={90}
              caption="STT"
              formItem={{ visible: false }}
              alignment={"center"}
            />

            <Column dataField="name" caption="Thông tin hỗ trợ" />
            <Column
              caption=""
              cellRender={(data) => {
                let link = data?.data?.link || "";
                return (
                  <a href={link} target="_blank" rel="noreferrer">
                    Tải xuống
                  </a>
                );
              }}
              width={150}
              alignment={"center"}
            />
            <Summary>
              <TotalItem column="_id" summaryType="count" />
            </Summary>
          </DataGrid>
        </CardWrapper>
      </div>

      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <CardWrapper
          header={{
            name: "Địa chỉ liên hệ:",
          }}
        >
          <div className="row align-item-center">
            <span
              className="icon ion-android-contact"
              style={{ fontSize: "20px" }}
            ></span>
            Địa chỉ: Bộ Tư Lệnh 86
          </div>
          <div className="row align-item-center">
            {" "}
            <i className="icon ion-email" style={{ fontSize: "20px" }}></i>
            Email: btl86.bqp
          </div>
        </CardWrapper>
      </div>
    </div>
  );
}
