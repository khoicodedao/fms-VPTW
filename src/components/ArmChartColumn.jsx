/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import { useNavigate } from "react-router-dom";
export default function ArmChart(props) {
  let navigate = useNavigate();
  let { id, data, color, url } = props;
  // Apply chart themes
  am4core.useTheme(am4themes_animated);
  am4core.useTheme(am4themes_kelly);

  // Create chart instance
  var chart = am4core.create(id, am4charts.XYChart);
  chart.scrollbarX = new am4core.Scrollbar();
  chart.scrollbarX.start = 0; // Bắt đầu từ 20% của trục X
  chart.scrollbarX.end = 0.2; // Kết thúc ở 80% của trục X
  chart.colors.list = [am4core.color(color || "#845EC2")];
  // Add data
  chart.data = data;
  chart.numberFormatter.numberFormat = "#.";
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  // categoryAxis.maxZoomFactor = 10;
  // Create axes
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "_id";
  categoryAxis.maxZoomFactor = 10; // Prevent zoom out beyond initial 10 columns
  categoryAxis.renderer.minGridDistance = 30;
  categoryAxis.start = 0;
  categoryAxis.end = 0.1; // Adjust this to show 10 columns
  categoryAxis.maxZoomFactor = 10; // Prevent zoom out beyond initial 10 columns
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.title.text = "Số lượng";
  valueAxis.integersOnly = true;
  // Create series
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = "count";
  //series.columns.template.width = am4core.PX(100);  Thay đổi width column
  series.dataFields.categoryX = "_id";
  series.name = "Số lượng";
  series.tooltipText = "[bold]{valueY}[/]";
  // This has no effect
  // series.stacked = true;
  series.columns.template.events.on(
    "hit",
    function (ev) {
      var series = ev.target;
      var dataItem = series.tooltipDataItem;
      let filter = url + dataItem.categories.categoryX;
      navigate(filter);
      // console.log(dataItem.categories.categoryX)
    },
    this
  );
  // Add cursor
  chart.cursor = new am4charts.XYCursor();

  // Add legend
  chart.legend = new am4charts.Legend();

  // on hover, make corne
  return <div id={id} style={{ width: "100%", height: "42vh" }}></div>;
}
