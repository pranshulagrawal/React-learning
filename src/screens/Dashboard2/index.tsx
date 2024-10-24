import React, { useState } from "react";
import { useNavigate, useLocation, Outlet, Link } from "react-router-dom";
import {
  Layout,
  Menu,
  MenuProps,
  Dropdown,
  Avatar,
  Button,
  Breadcrumb,
  List,
  Badge,
  Checkbox,
  Tooltip,
  Modal,
} from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  BellOutlined,
  LockOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  ForkOutlined,
  FileOutlined,
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
  getItem("Dashboard", "/admin/dashboard", <PieChartOutlined />),

  getItem("Node Management", "/admin/node-management", <DesktopOutlined />, [
    getItem("Node Details", "/admin/nodedetail", <DesktopOutlined />),
    getItem("Node Analytics", "/admin/nodeanalytics", <DesktopOutlined />),
    getItem("Node Comparison", "/admin/nodecomparison", <DesktopOutlined />),
    getItem(
      "Interactive Node Editor",
      "/admin/nodeeditor",
      <DesktopOutlined />
    ),
    getItem("Historical Timeline", "/admin/nodetimeline", <DesktopOutlined />),
    getItem("Batch Node Operations", "/admin/nodebatch", <DesktopOutlined />),
  ]),

  getItem("Tree Visualization", "/admin/tree-visualization", <ForkOutlined />, [
    getItem("Hierarchy Map", "/admin/treechart"),
    getItem("Tree Map with Heatmaps", "/admin/treemapheatmaps"),
    getItem("Interactive Drill-down", "/admin/nodedrilldown"),
    getItem("Collapsible Tree View", "/admin/collapsibletree"),
    getItem("Node Clustering", "/admin/nodeclustering"),
    getItem("Node Dependency Mapping", "/admin/nodedependencymap"),
  ]),

  getItem("Reports & Export", "/admin/reports", <FileOutlined />, [
    getItem("Custom Node Reports", "/admin/customnodereports"),
    getItem("Data Export & Download", "/admin/nodehierarchy"),
  ]),

  getItem("Settings", "/admin/settings", <SettingOutlined />, [
    getItem("Notifications & Alerts", "/admin/notifications"),
    getItem("User Permissions & Roles", "/admin/userpermissions"),
    getItem("Customizable Widgets", "/admin/dashboardwidgets"),
    getItem("Predictive Node Analysis", "/admin/predictivenodeanalysis"),
    getItem("Node Search & Filter", "/admin/nodesearchfilter"),
    getItem("Node Activity Log", "/admin/nodeactivitylog"),
  ]),
];

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    if (snippet === "admin" && index === 0) {
      return {
        key: "home",
        title: (
          <Link to="/admin/dashboard">
            <HomeOutlined />
          </Link>
        ),
      };
    }

    const title = snippet.charAt(0).toUpperCase() + snippet.slice(1);

    return {
      key: index,
      title: (
        <Link to={`/${pathSnippets.slice(0, index + 1).join("/")}`}>
          {title}
        </Link>
      ),
    };
  });
  const lastTitle =
    pathSnippets[pathSnippets.length - 1]?.charAt(0).toUpperCase() +
      pathSnippets[pathSnippets.length - 1]?.slice(1) || "Dashboard";

  return (
    <>
      <h1
        style={{
          color: "#5a287d",
          margin: "10px 20px 0px 20px",
          fontSize: "20px",
          fontWeight: 500,
        }}
      >
        {lastTitle}
      </h1>
      <Breadcrumb
        items={breadcrumbItems}
        style={{ margin: "2px 20px 5px 20px" }}
      />
    </>
  );
};

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

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const unreadCount = Object.values(notifications)
    .flat()
    .filter((notification) => !notification.read).length;

  const handleMarkAsRead = (id: number, type: NotificationType) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: prev[type].map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => {
      const updatedNotifications = { ...prev };
      Object.keys(updatedNotifications).forEach((type) => {
        updatedNotifications[type as NotificationType] = updatedNotifications[
          type as NotificationType
        ].map((n) => ({ ...n, read: true }));
      });
      return updatedNotifications;
    });
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

  const navigate = useNavigate();

  const badgeCount = unreadCount === 0 ? 0 : unreadCount;

  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const handleLogout = async () => {
    setLogoutModalVisible(false);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include", // Ensure cookies are sent
        }
      );

      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleLogoutCancel = () => {
    setLogoutModalVisible(false);
  };

  const profileMenu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<UserOutlined />}
        onClick={() => navigate("/admin/profile")}
      >
        John Doe
      </Menu.Item>
      <Menu.Item key="2" icon={<LockOutlined />} disabled>
        V1.0.0
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="changelog"
        icon={<SettingOutlined />}
        onClick={() => navigate("/admin/changelog")}
      >
        Changelog
      </Menu.Item>

      {/* Using Modal for Logout Confirmation */}
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={showLogoutModal}>
        Logout
      </Menu.Item>
    </Menu>
  );

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

        <div className="action-btns">
          <Button
            type="primary"
            onClick={handleMarkAllAsRead}
            style={{ marginLeft: "10px" }}
          >
            Mark All as Read
          </Button>

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
      <Header className="header-container">
        <div className="notification-section">
          <div className="logo-collapse-container">
            {collapsed ? (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3nMEaIf_7RBcfi_DkNJON4a-qo0ITdtP-mg&s"
                alt="Collapsed Logo"
                className="collapsed-logo"
              />
            ) : (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEk_fS_pAait5KGmnCtnk7X-74kVa6nrRnWQ&s"
                alt="Expanded Logo"
                className="logo"
              />
            )}

            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="hamburger-menu"
            />
          </div>

          <Dropdown
            overlay={NotificationMenu}
            open={dropdownOpen}
            onOpenChange={(open) => setDropdownOpen(open)}
            trigger={["click"]}
          >
            <Badge count={badgeCount} offset={[10, 0]}>
              <Button
                className="notification-icon"
                type="text"
                icon={<BellOutlined />}
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
        </div>
      </Header>
      <Layout>
        <Sider
          theme="light"
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          className="sider-container"
        >
          <Menu
            theme="light"
            defaultSelectedKeys={["/dashb"]}
            mode="inline"
            items={sidebaroptions}
            onClick={({ key }) => navigate(key)}
            className="sidebar"
          />
        </Sider>
        <Content>
          <Breadcrumbs />
          <Content className="content-container">
            <Outlet />
          </Content>
        </Content>
      </Layout>

      {/* Modal for Logout Confirmation */}
      <Modal
        title="Confirm Logout"
        open={logoutModalVisible}
        onOk={handleLogout}
        onCancel={handleLogoutCancel}
        okText="Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </Layout>
  );
};

export default Dashboard2;
