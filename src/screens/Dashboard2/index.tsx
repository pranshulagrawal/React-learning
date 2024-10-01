import React, { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  Breadcrumb,
  Layout,
  Menu,
  DatePicker,
  TreeSelect,
  Select,
  Button,
  MenuProps,
} from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./styles.scss"; // Import the styles

const { Header, Footer, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const sidebaroptions: MenuItem[] = [
  getItem("Dashboard", "/admin/dashb", <PieChartOutlined />),
  getItem("Node Details", "/admin/nodedetail", <DesktopOutlined />),
  getItem("VarTrack", "/admin/vartrack", <UserOutlined />),
];

const items = new Array(3).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

// Custom Breadcrumb Component
const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return { title: pathSnippets[index], url };
  });

  return (
    <Breadcrumb style={{ margin: "10px 0" }}>
      {breadcrumbItems.map((item, index) => (
        <Breadcrumb.Item key={index}>{item.title}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

const Dashboard2: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // useNavigate hook to handle navigation

  return (
    <Layout className="layout-container">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="sider-container"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={["/dashb"]}
          mode="inline"
          items={sidebaroptions}
          onClick={({ key }) => navigate(key)}
          className="sidebar"
        />
      </Sider>
      <Layout>
        <Header className="header-container">
          <Menu
            theme="light"
            mode="horizontal"
            items={items}
            className="navbar" // Apply the class to handle right-to-left ordering
          />
        </Header>
        <Content className="content-container">
          <Breadcrumbs />

          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard2;
