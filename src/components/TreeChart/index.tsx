import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import flareData from "../../assets/flare.json";

// Function to recursively set the collapsed property
const setCollapsed = (data: any, collapsed: boolean) => {
  data.collapsed = collapsed; // Set the collapsed property
  if (data.children) {
    data.children.forEach((child: any) => setCollapsed(child, collapsed)); // Recursively set for children
  }
};

const TreeChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null); // Reference to the DOM element

  useEffect(() => {
    const myChart = echarts.init(chartRef.current!); // Initialize chart

    // Show loading while fetching data
    myChart.showLoading();

    // Set collapsed property for all children
    setCollapsed(flareData, true); // Collapse all nodes initially

    // Define chart options with correct types
    const option: echarts.EChartOption = {
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
      },
      series: [
        {
          type: "tree",
          data: [flareData],
          top: "1%",
          left: "7%",
          bottom: "1%",
          right: "20%",
          symbolSize: 7,
          orient: "vertical",
          layout: "orthogonal",
          seriesLayoutBy: "row",
          label: {
            position: "left",
            verticalAlign: "middle",
            align: "center",
            fontSize: 9,
            formatter: function (params: any) {
              return params.data.name;
            },
          },
          leaves: {
            label: {
              position: "right",
              verticalAlign: "middle",
              align: "left",
            },
          },
          lineStyle: {
            color: "#333", // Set the line color
            width: 1, // Set the line width
            type: "solid", // Ensure straight lines
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    };

    myChart.setOption(option); // Set the chart options
    myChart.hideLoading(); // Hide loading after setting options

    // Cleanup on component unmount
    return () => {
      myChart.dispose(); // Dispose of the chart to free resources
    };
  }, []);

  return (
    <div
      ref={chartRef} // Reference to the div element
      style={{ width: "100%", height: "600px" }} // Set size
    ></div>
  );
};

export default TreeChart;
