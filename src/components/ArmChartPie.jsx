import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import HideChart from "../helpers/HideChartIcon";
import { useNavigate } from "react-router-dom";
am4core.useTheme(am4themes_animated);
const ArmChart = (props) => {
  let navigate = useNavigate();
  let { data, field, category, id, total, customShow } = props;
  useEffect(() => {
    let chart = am4core.create(id, am4charts.PieChart);
    chart.innerRadius = am4core.percent(40);

    chart.data = data ?? [];
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = field ?? "count";
    pieSeries.dataFields.category = category ?? "name";
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.labels.template.disabled = false;
    pieSeries.labels.template.text = "[{color}]{name} : {count}[/]";
    pieSeries.ticks.template.disabled = false;
    pieSeries.slices.template.propertyFields.fill = "color";
    // pieSeries.slices.template.propertyFields.url = 'url'
    // pieSeries.slices.template.urlTarget = '_blank'
    // var label = pieSeries.createChild(am4core.Label)
    // label.text = '[bold black] {values.value.sum}[/]'
    // label.horizontalCenter = 'middle'
    // label.verticalCenter = 'middle'
    //redirect to url detail page in pie
    // label.fontSize = 20
    //====online in FMS/FMC server
    if (customShow) {
      let label = chart.chartContainer.createChild(am4core.Label);
      label.text = customShow;
      label.align = "center";
      // label.template.color = 'red'
    }

    pieSeries.slices.template.events.on("hit", function (ev) {
      navigate(ev.target.dataItem._dataContext.url);
    });
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    chart.legend.valueLabels.template.disabled = true;
    chart.legend.labels.template.text =
      "[bold {color}]{name} : {count}" + `/${total}`;

    HideChart();
  }, [props.data]);

  return <div id={id} style={{ width: "100%", height: "270px" }}></div>;
};

export default ArmChart;
