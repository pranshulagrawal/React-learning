import React from "react";
import { Card, Row, Col, Layout } from "antd";
import { Line, Bar, Pie, Area, Radar, Scatter } from "@ant-design/charts";
import "./styles.scss";

const { Content } = Layout;

const DashboardHome: React.FC = () => {
  const lineConfig = {
    data: [
      { year: "1991", value: 3 },
      { year: "1992", value: 4 },
      { year: "1993", value: 3.5 },
      { year: "1994", value: 5 },
      { year: "1995", value: 4.9 },
      { year: "1996", value: 6 },
      { year: "1997", value: 7 },
      { year: "1998", value: 9 },
      { year: "1999", value: 13 },
    ],
    xField: "year",
    yField: "value",
    smooth: true,
    height: 250,
  };

  const barConfig = {
    data: [
      { name: "London", value: 38 },
      { name: "Berlin", value: 52 },
      { name: "New York", value: 61 },
      { name: "Tokyo", value: 145 },
    ],
    xField: "value",
    yField: "name",
    height: 250,
    seriesField: "name",
    legend: false,
  };

  const pieConfig = {
    appendPadding: 10,
    data: [
      { type: "Category A", value: 27 },
      { type: "Category B", value: 25 },
      { type: "Category C", value: 18 },
      { type: "Category D", value: 15 },
      { type: "Category E", value: 10 },
    ],
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      offset: "-30%",
      content: "{percentage}",
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-active" }],
  };

  const areaConfig = {
    data: [
      { year: "2010", value: 500 },
      { year: "2011", value: 700 },
      { year: "2012", value: 800 },
      { year: "2013", value: 950 },
      { year: "2014", value: 1200 },
      { year: "2015", value: 1500 },
      { year: "2016", value: 1800 },
      { year: "2017", value: 2000 },
    ],
    xField: "year",
    yField: "value",
    smooth: true,
    color: "#5B8FF9",
    height: 250,
  };

  const radarConfig = {
    data: [
      { item: "Quality", score: 70 },
      { item: "User Experience", score: 60 },
      { item: "Speed", score: 85 },
      { item: "Reliability", score: 75 },
      { item: "Maintainability", score: 95 },
    ],
    xField: "item",
    yField: "score",
    height: 250,
    seriesField: "item",
    point: { size: 4, shape: "circle" },
  };

  const scatterConfig = {
    data: [
      { x: 5, y: 10 },
      { x: 10, y: 20 },
      { x: 15, y: 10 },
      { x: 20, y: 40 },
      { x: 25, y: 30 },
    ],
    xField: "x",
    yField: "y",
    height: 250,
    point: { size: 5, shape: "diamond" },
    colorField: "x",
  };

  return (
    <Layout className="dashboard-layout">
      <Content className="dashboard-content">
        <Row gutter={24}>
          <Col span={12}>
            <Card title="Sales Over Time" bordered={false}>
              <Line {...lineConfig} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="City-wise Population" bordered={false}>
              <Bar {...barConfig} />
            </Card>
          </Col>
        </Row>

        <Row gutter={24} style={{ marginTop: 24 }}>
          <Col span={8}>
            <Card title="Category Distribution" bordered={false}>
              <Pie {...pieConfig} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Radar Analysis" bordered={false}>
              <Radar {...radarConfig} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Revenue Growth" bordered={false}>
              <Area {...areaConfig} />
            </Card>
          </Col>
        </Row>

        <Row gutter={24} style={{ marginTop: 24 }}>
          <Col span={12}>
            <Card title="Scatter Plot" bordered={false}>
              <Scatter {...scatterConfig} />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default DashboardHome;
