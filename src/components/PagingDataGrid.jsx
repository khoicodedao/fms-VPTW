import React, { useState, useRef, useEffect } from "react";
import LocalStorage from "../helpers/LocalStorage";
import "devextreme/data/odata/store";
import DataGrid, { FilterRow, Paging, Pager } from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";
import { Column, Summary, TotalItem } from "devextreme-react/data-grid";
import FilterOutlined from "@ant-design/icons/FilterOutlined";

function AddIDToDataGridPaging(data, skip) {
  return data.map((item, index) => {
    let STT = skip + index + 1;
    return { ...item, STT };
  });
}
function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}
const PagingDataGrid = function ({
  data,
  url,
  dataKey,
  insert,
  update,
  remove,
  key,
  children,
  onExporting,
  onToolbarPreparing,
  onInitNewRow,
  onOptionChanged,
}) {
  const [group, setGroup] = useState("Lọc theo");
  const queryString = window.location.search;

  let total = 0; //total result in bottom table
  const tagData = useRef(null); //list tag of filter header and filter row
  const dataGridRef = useRef(null);
  const filterText = useRef(null);
  let token = LocalStorage.get("user").token;
  const onValueChanged = (e) => {
    setGroup(e.value);
  };
  const store = new CustomStore({
    key: key && "id",
    load(loadOptions) {
      let params = "?";
      [
        "skip",
        "take",
        "requireTotalCount",
        "requireGroupCount",
        "sort",
        "filter",
        "totalSummary",
        "group",
        "groupSummary",
      ].forEach((i) => {
        if (i in loadOptions && isNotEmpty(loadOptions[i])) {
          params += `${i}=${JSON.stringify(loadOptions[i])}&`;
        }
      });

      //============add filter tag on header==========
      if (loadOptions.filter) {
        let data = loadOptions.filter.toString();
        while (data.includes(",")) {
          data = data.replace(",", " ");
        }
        data = data.replace(
          "and",
          '<span class="font-weight-bold"> and </span>'
        );
        data = data.replace("or", '<span class="font-weight-bold"> or </span>');
        data = data.replace(
          "contains ",
          '<span class="font-weight-bold"> contains </span>'
        );

        tagData.current.innerHTML = `<div class="custom-tag mb-2 p-1" style="width: fit-content">${data}</div>`;
      } else {
        tagData.current.innerHTML = "";
      }
      if (tagData.current.innerHTML === "") {
        filterText.current.innerText = "Lọc";
      } else {
        filterText.current.innerText = "Xóa Lọc";
      }
      //==================end=========================
      params = params.slice(0, -1);
      params += "&requireTotalCount=true";
      if (queryString.includes("group_field")) {
        params += `&group_field=mac`;
      } else {
        if (group.length > 0 && (group === "mac" || group === "ip")) {
          params += `&group_field=${group}`;
        }
      }

      // const getData = (url, params, data) => {
      //   return fetch(`${url}${params}${data}`, {
      //     headers: { Authorization: `Bearer ${token}` },
      //   })
      //     .then((response) => {
      //       return response.json();
      //     })
      //     .then((data) => {
      //       total = data.data.totalCount;
      //       return {
      //         data:
      //           AddIDToDataGridPaging(data.data[dataKey], loadOptions.skip) ||
      //           [],
      //         totalCount: data.data.totalCount,
      //         // summary: data.data.totalCount,
      //         // groupCount: data.groupCount,
      //       };
      //     })
      //     .catch((e) => {
      //       LocalStorage.remove("user");
      //       LocalStorage.remove("expandRowKeys");

      //       throw new Error("Không thể tải dữ liệu, refresh trang và thử lại!");
      //     });
      // };

      const getData = (url, params, data) => {
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(
              new Error("Yêu cầu đã hết thời gian chờ. Vui lòng thử lại.")
            );
          }, 30000); // Đặt thời gian chờ 30 giây

          fetch(`${url}${params}${data}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((response) => {
              clearTimeout(timeout);
              if (!response.ok) {
                if (response.status === 401) {
                  LocalStorage.remove("user");
                  LocalStorage.remove("expandRowKeys");
                  throw new Error(
                    "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."
                  );
                }
                throw new Error("Lỗi kết nối đến máy chủ.");
              }
              return response.json();
            })
            .then((data) => {
              total = data.data.totalCount;
              resolve({
                data:
                  AddIDToDataGridPaging(data.data[dataKey], loadOptions.skip) ||
                  [],
                totalCount: data.data.totalCount,
              });
            })
            .catch((e) => {
              clearTimeout(timeout);
              console.error("Lỗi khi tải dữ liệu:", e);
              reject(
                new Error(
                  "Không thể tải dữ liệu. Vui lòng làm mới trang và thử lại."
                )
              );
            });
        });
      };
      // return getData(url, params, data);
      let result = getData(url, params, data);
      return result;
    },
    insert,
    update,
    remove,
  });
  //=================Send dataGrid Ref to parent component===========
  const refreshGrid = () => {
    const dataGridInstance = dataGridRef.current.instance;
    if (dataGridInstance) {
      dataGridInstance.refresh();
    }
  };

  //==============================END=================================
  const clearFilters = () => {
    const dataGridInstance = dataGridRef.current.instance;
    if (dataGridInstance) {
      dataGridInstance.clearFilter();
    }
  };

  //filter for detail in pie chart
  useEffect(() => {
    const url = window.location.href;
    const params = {};
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (match, key, value) {
      params[key] = value;
    });
    if (params.filter) {
      let filter = decodeURI(params.filter);
      const dataGridInstance = dataGridRef.current.instance;
      if (dataGridInstance) {
        dataGridInstance.filter(filter.split(","));
      }
    }
  });
  //=============================
  return (
    <div>
      <div className="d-inline-flex  justify-content-center align-items-center">
        <div style={{ display: "inline-block" }} ref={tagData}></div>
        <div className="d-inline-flex">
          <FilterOutlined
            className="mb-2"
            style={{ fontSize: "20" }}
            onClick={clearFilters}
          ></FilterOutlined>
          <span ref={filterText}>Lọc</span>
        </div>
      </div>

      <DataGrid
        ref={dataGridRef}
        onOptionChanged={onOptionChanged}
        dataSource={store}
        showBorders={true}
        remoteOperations={true}
        showColumnLines={true}
        showRowLines={true}
        rowAlternationEnabled={true}
        allowColumnResizing={true}
        columnResizingMode={"widget"}
        columnAutoWidth={true}
        onExporting={onExporting}
        onInitNewRow={onInitNewRow}
        onToolbarPreparing={(e) => {
          if (onToolbarPreparing) {
            onToolbarPreparing(e);
          }
          e.toolbarOptions.items.unshift({
            location: "after",
            widget: "dxButton",
            options: {
              icon: "refresh",
              onClick: function () {
                refreshGrid();
              },
            },
          });

          e.toolbarOptions.items.unshift({
            location: "after",
            widget: "dxSelectBox",
            options: {
              width: 180,
              items: [
                {
                  value: "mac",
                  text: "Nhóm theo MAC",
                },
                {
                  value: "ip",
                  text: "Nhóm theo IP",
                },
              ],
              displayExpr: "text",
              valueExpr: "value",
              value: "Nhóm",
              placeholder: "Nhóm dữ liệu",
              onValueChanged(e) {
                onValueChanged(e);
              },
            },
          });
        }}
      >
        <FilterRow visible={true} />

        {/* Add column for DataGrid */}
        <Column
          width={50}
          alignment="center"
          dataField="STT"
          caption="STT"
          formItem={{ visible: false }}
          allowFiltering={false}
        />

        {children}
        <Paging defaultPageSize={40} />
        <Pager showInfo={true} />
        <Summary>
          <TotalItem
            column="mac"
            summaryType="count"
            customizeText={() => `Tổng: ${total}`}
          />
        </Summary>
      </DataGrid>
    </div>
  );
};

const ChildComponent = React.memo(PagingDataGrid, (prevProps, nextProps) => {
  return prevProps.data === nextProps.data;
});
export default ChildComponent;
