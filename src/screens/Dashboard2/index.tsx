import React, { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  Layout,
  Menu,
  MenuProps,
  Dropdown,
  Avatar,
  Button,
  Space,
  Breadcrumb,
  List,
  Badge,
  Checkbox,
  Tooltip,
} from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  MailOutlined,
  CloseOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "./styles.scss";
const { Header, Sider, Content } = Layout;

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

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbItems = pathSnippets.map((snippet, index) => ({
    key: index,
    title: snippet.charAt(0).toUpperCase() + snippet.slice(1),
    href: `/${pathSnippets.slice(0, index + 1).join("/")}`,
  }));

  return <Breadcrumb items={breadcrumbItems} style={{ margin: "10px 0" }} />;
};

const profileMenu = (
  <Menu>
    <Menu.Item key="1" icon={<SettingOutlined />}>
      Profile Settings
    </Menu.Item>
    <Menu.Item key="2" disabled>
      Username: John Doe
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" icon={<LogoutOutlined />}>
      Logout
    </Menu.Item>
  </Menu>
);

type NotificationType = "error" | "warning" | "success";
const notificationsData: Record<
  NotificationType,
  {
    id: number;
    type: NotificationType;
    message: string;
    description: string;
    read: boolean;
  }[]
> = {
  error: Array.from({ length: 20 }, (_, i) => ({
    id: i,
    type: "error",
    message: `Error Notification ${i + 1}`,
    description: `Error details ${i + 1}`,
    read: false,
  })),
  warning: Array.from({ length: 20 }, (_, i) => ({
    id: i,
    type: "warning",
    message: `Warning Notification ${i + 1}`,
    description: `Warning details ${i + 1}`,
    read: false,
  })),
  success: Array.from({ length: 20 }, (_, i) => ({
    id: i,
    type: "success",
    message: `Success Notification ${i + 1}`,
    description: `Success details ${i + 1}`,
    read: false,
  })),
};

const Dashboard2: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filter, setFilter] = useState<NotificationType[]>([
    "error",
    "warning",
    "success",
  ]);

  const navigate = useNavigate();

  const unreadCount = Object.values(notifications)
    .flat()
    .filter((notification) => !notification.read).length;

  const handleMarkAsRead = (id: number, type: NotificationType) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: prev[type].map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  };

  const handleMarkAsUnread = (id: number, type: NotificationType) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: prev[type].map((n) => (n.id === id ? { ...n, read: false } : n)),
    }));
  };

  const handleRemoveNotification = (id: number, type: NotificationType) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: prev[type].filter((n) => n.id !== id),
    }));
  };

  const handleFilterChange = (type: NotificationType) => {
    setFilter((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredNotifications = Object.values(notifications)
    .flat()
    .filter((n) => filter.includes(n.type));

  const NotificationMenu = (
    <div className="notification-dropdown">
      <div className="filter-section">
        <div className="filter-dropdown">
          <Checkbox
            checked={filter.includes("error")}
            onChange={() => handleFilterChange("error")}
          >
            Error
          </Checkbox>
          <Checkbox
            checked={filter.includes("warning")}
            onChange={() => handleFilterChange("warning")}
          >
            Warning
          </Checkbox>
          <Checkbox
            checked={filter.includes("success")}
            onChange={() => handleFilterChange("success")}
          >
            Success
          </Checkbox>
        </div>

        <div className="close-btn">
          <Button
            type="primary"
            onClick={() => setDropdownOpen(false)}
            icon={<CloseOutlined />}
            style={{ marginLeft: "10px" }}
          >
            Close
          </Button>
        </div>
      </div>

      <List
        dataSource={filteredNotifications}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            className={`notification-item ${item.type}`}
            style={{
              backgroundColor:
                item.type === "error"
                  ? "#ffebeb"
                  : item.type === "warning"
                  ? "#fff7e6"
                  : "#f6ffed",
              borderLeft:
                item.type === "error"
                  ? "5px solid #ff4d4f"
                  : item.type === "warning"
                  ? "5px solid #faad14"
                  : "5px solid #52c41a",
            }}
            actions={[
              <Tooltip
                title={item.read ? "Mark as Unread" : "Mark as Read"}
                key="status"
              >
                <CheckCircleOutlined
                  style={{
                    fontSize: "18px",
                    color: item.read ? "#52c41a" : "#d9d9d9",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    item.read
                      ? handleMarkAsUnread(item.id, item.type)
                      : handleMarkAsRead(item.id, item.type)
                  }
                />
              </Tooltip>,
              <CloseOutlined
                key="remove"
                style={{
                  fontSize: "18px",
                  color: "#ff4d4f",
                  cursor: "pointer",
                }}
                onClick={() => handleRemoveNotification(item.id, item.type)}
              />,
            ]}
          >
            <List.Item.Meta
              title={item.message}
              description={item.description}
            />
          </List.Item>
        )}
        className="notification-list"
        style={{ maxHeight: "300px", overflow: "auto" }}
      />
    </div>
  );

  return (
    <Layout className="layout-container">
      <Sider
        theme="light"
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
          <Space style={{ marginLeft: "auto", alignItems: "center" }}>
            <div className="app-version">Version 1.0.0</div>
            <Dropdown
              overlay={NotificationMenu}
              open={dropdownOpen}
              onOpenChange={(open) => setDropdownOpen(open)}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Badge count={unreadCount} offset={[10, 0]}>
                <Button
                  type="text"
                  icon={<MailOutlined className="notification-icon" />}
                />
              </Badge>
            </Dropdown>

            <Dropdown overlay={profileMenu} trigger={["click"]}>
              <Avatar
                className="avatar-container"
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </Space>
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
