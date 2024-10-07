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
  chart.scrollbarX.start = 0;
  chart.scrollbarX.end = 0.2;

  // Add data
  chart.data = data;
  chart.numberFormatter.numberFormat = "#.";

  // Create X and Y axes
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "_id";
  categoryAxis.maxZoomFactor = 10;
  categoryAxis.renderer.minGridDistance = 30;
  categoryAxis.start = 0;
  categoryAxis.end = 0.1;

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.title.text = "Số lượng";
  valueAxis.integersOnly = true;

  // Create series (LineSeries instead of ColumnSeries)
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "count";
  series.dataFields.categoryX = "_id";
  series.name = "Số lượng";
  series.tooltipText = "[bold]{valueY}[/]";

  // Add circle bullets to the line
  var bullet = series.bullets.push(new am4charts.CircleBullet());
  bullet.circle.strokeWidth = 2;
  bullet.circle.radius = 4;

  // Line stroke
  series.strokeWidth = 3;
  series.stroke = am4core.color(color || "#845EC2"); // Line color

  // Handle click events on the line points
  // series.columns.template.events.on(
  //   "hit",
  //   function (ev) {
  //     var series = ev.target;
  //     var dataItem = series.tooltipDataItem;
  //     let filter = url + dataItem.categories.categoryX;
  //     navigate(filter);
  //   },
  //   this
  // );

  // Add cursor
  chart.cursor = new am4charts.XYCursor();

  // Add legend
  chart.legend = new am4charts.Legend();

  return <div id={id} style={{ width: "100%", height: "270px" }}></div>;
}
