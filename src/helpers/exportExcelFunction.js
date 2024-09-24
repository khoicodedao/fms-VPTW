import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";
import LocalStorage from "../helpers/LocalStorage";
import flattenObject from "../helpers/flattenObject";
function onExporting(e, url, startDate, endDate, unitGlobal, columns, dataKey) {
  let filter = e.component.getCombinedFilter()
    ? `&filter=${encodeURI(JSON.stringify(e.component.getCombinedFilter()))}`
    : "";

  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("Main sheet");
  const worksheet1 = workbook.addWorksheet("temple"); //temple work sheet
  worksheet.columns = columns;
  exportDataGrid({
    component: e.component,
    worksheet: worksheet1,
    autoFilterEnabled: true,
  }).then(() => {
    let token = LocalStorage.get("user").token;
    fetch(
      `${url}?skip=0&take=10000&start_date=${startDate}&end_date=${endDate}&unit_code=${unitGlobal}&requireTotalCount=true${filter}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.data[dataKey]) {
          let dataFlatten = response.data[dataKey].map((item) =>
            flattenObject(item)
          );
          console.log(dataFlatten);
          worksheet.addRows(dataFlatten);
        } else {
          let dataFlatten = response.data.map((item) => flattenObject(item));
          worksheet.addRows(dataFlatten);
        }

        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "DataGrid.xlsx"
          );
        });
      });
  });
  e.cancel = true;
}
export default onExporting;
