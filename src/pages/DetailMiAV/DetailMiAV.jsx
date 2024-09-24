import React, { useState } from "react";
import { Column, MasterDetail } from "devextreme-react/data-grid";
import PagingDataGrid from "../../components/PagingDataGrid";
import CardWrapper from "../../components/CardWrapper";
import Unit from "../Unit/Unit";
import ALL_API from "../../constants/All.api";
import { Input } from "antd";
import Dictionary from "../../helpers/Dictionary";
import { useSelector } from "react-redux";
import AlertLevelType from "../../helpers/AlertLevelType";
function DetailMiAV() {
  let dateGlobal = useSelector((state) => state.changeDateReducer);
  let { startDate, endDate } = dateGlobal;
  let [filter, setFilter] = useState(""); // data for filter in search box
  let [url, setUrl] = useState(ALL_API.ALERT_LIST_PAGING); // change url for search api to paging page
  let [unitCode, setUnitCode] = useState("");
  let onFocusedRowChanged = (e) => {
    setUnitCode(`&unit_code=${e.row.data.unit_code}`);
  };
  const onSearch = (value) => console.log(value);
  const onChange = (value) => {
    let dataSearch = value.target.value;
    setFilter(`&filter=${dataSearch}`);
    dataSearch.length > 0
      ? setUrl(ALL_API.ALERT_LIST_SEARCH)
      : setUrl(ALL_API.ALERT_LIST_PAGING);
  };

  return (
    <div className="row">
      <div className="col-md-3 col-xl-3">
        <Unit onFocusedRowChanged={onFocusedRowChanged}></Unit>
      </div>
      <div className="col-md-9 col-xl-9">
        <div id="paging">
          <CardWrapper
            header={{
              name: "Danh sách cảnh báo",
              detail: "Thống kê danh sách cảnh báo",
            }}
          >
            <div className="mb-2">
              <Input.Search
                size="large"
                placeholder="Tìm kiếm thông tin"
                enterButton
                onSearch={onSearch}
                onChange={onChange}
                allowClear
                // value={input}
              />
            </div>
            <PagingDataGrid
              url={url}
              data={`&start_date=${startDate}&end_date=${endDate}${filter}${unitCode}`}
              dataKey="alert"
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
              />
              <Column dataField="ip" caption="Địa chỉ IP" />
              <Column
                calculateCellValue={(data) => data.alert_type}
                caption="Loại cảnh báo"
                dataField="alert_type"
              />
              <Column
                dataField="alert_level_id"
                cellRender={(data) => AlertLevelType(data.displayValue)}
                caption="Mức cảnh báo"
                alignment={"center"}
              />
              <Column
                dataField="alert_source"
                caption="Nguồn cảnh báo"
                alignment={"center"}
              />
              <Column
                caption="Tên người quản lý"
                calculateCellValue={(data) => {
                  let info = data?.ident_info;
                  if (info) {
                    return info?.manager_name;
                  } else {
                    return "Chưa định danh";
                  }
                }}
                dataField="manager"
                alignment={"center"}
              />
              <Column
                caption="Tên đơn vị"
                calculateCellValue={(data) => {
                  let info = data?.ident_info;
                  if (info) {
                    return info?.unit_name;
                  } else {
                    return "";
                  }
                }}
                dataField="unit_name"
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
                dataField="alert_info.description"
              />

              <Column
                dataField="time_receive"
                caption="Thời gian cảnh báo(tại máy chủ)"
              />
              <MasterDetail
                enabled={true}
                component={(e) => {
                  let info = e.data.data.alert_info;
                  if (info) {
                    if (typeof info == "object") {
                      let arrKeys = Object.keys(info);
                      return arrKeys.map((item) => {
                        if (typeof info[item] !== "object") {
                          return (
                            <div>
                              <p>
                                <b>- {Dictionary[item] ?? item}</b>:{" "}
                                {info[item]}
                              </p>
                            </div>
                          );
                        } else {
                          let keys = Object.keys(info[item]);
                          let temp = info[item];
                          return (
                            <div>
                              <p>
                                <a
                                  data-toggle="collapse"
                                  href={`#${e.data.key}${item}`}
                                  aria-expanded="false"
                                  aria-controls="collapseExample"
                                  onClick={() => {
                                    let detail = document.getElementById(
                                      `${e.data.key}${item}plus`
                                    );
                                    let minus = document.getElementById(
                                      `${e.data.key}${item}minus`
                                    );
                                    detail.classList.toggle("hidden");
                                    minus.classList.toggle("hidden");
                                  }}
                                >
                                  - <span>{Dictionary[item] ?? item}</span>{" "}
                                  <i
                                    className="ion-ios-plus"
                                    id={`${e.data.key}${item}plus`}
                                  ></i>
                                  <i
                                    className="ion-minus-round hidden "
                                    id={`${e.data.key}${item}minus`}
                                  ></i>
                                </a>
                              </p>
                              <div
                                className="collapse"
                                id={`${e.data.key}${item}`}
                              >
                                <div className="card card-body">
                                  {keys.map((i) => {
                                    return (
                                      <div>
                                        -{i}: {temp[i].toString()}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      });
                    } else {
                      return <div>''</div>;
                    }
                  } else {
                    return "";
                  }
                }}
              />
            </PagingDataGrid>
          </CardWrapper>
        </div>
      </div>
    </div>
  );
}

export default DetailMiAV;
