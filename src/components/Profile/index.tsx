import React from "react";
import {
  Layout,
  Tabs,
  Avatar,
  Descriptions,
  Table,
  Badge,
  Card,
  Divider,
  Progress,
  Space,
  Tooltip,
  Button,
  Typography,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import "./styles.scss";

const { Text, Title } = Typography;
const { TabPane } = Tabs;
const { Content } = Layout;

const Profile: React.FC = () => {
  // Permissions table columns
  const columns = [
    {
      title: "Application",
      dataIndex: "application",
      key: "application",
      render: (text: string) => <b>{text}</b>,
    },
    {
      title: "Permission",
      dataIndex: "permission",
      key: "permission",
      render: (permission: string) => (
        <Badge status="processing" text={permission} />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge
          status={status === "Active" ? "success" : "default"}
          text={status}
        />
      ),
    },
  ];

  // Permissions data
  const data = [
    {
      key: "1",
      application: "Admin Dashboard",
      permission: "Full Access",
      status: "Active",
    },
    {
      key: "2",
      application: "User Management",
      permission: "View Only",
      status: "Active",
    },
    {
      key: "3",
      application: "Reports",
      permission: "Restricted",
      status: "Inactive",
    },
  ];

  return (
    <Layout className="profile-container">
      <Content className="profile-content">
        {/* Profile Header */}
        <Card className="profile-header" bordered={false}>
          <Space direction="horizontal" size={24}>
            <Avatar size={120} icon={<UserOutlined />} />
            <div className="user-info">
              <Title level={3} className="user-name">
                John Doe
              </Title>
              <Text type="secondary">Senior Software Engineer</Text>
              <div className="user-details">
                <Text>
                  <MailOutlined /> john.doe@example.com
                </Text>
                <Text>
                  <PhoneOutlined /> +1 123 456 789
                </Text>
                <Text>
                  <GlobalOutlined /> San Francisco, USA
                </Text>
              </div>
            </div>
          </Space>
        </Card>

        <Divider />

        {/* Tabs Section */}
        <Tabs defaultActiveKey="1" className="profile-tabs">
          {/* Basic Information Tab */}
          <TabPane
            tab={
              <span>
                <UserOutlined /> Basic Information
              </span>
            }
            key="1"
          >
            <Card bordered={false}>
              <Descriptions title="Personal Information" bordered column={2}>
                <Descriptions.Item label="Username">John Doe</Descriptions.Item>
                <Descriptions.Item label="Email">
                  john.doe@example.com
                </Descriptions.Item>
                <Descriptions.Item label="Phone Number">
                  +1 123 456 789
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  San Francisco, USA
                </Descriptions.Item>
                <Descriptions.Item label="Date of Birth">
                  1st Jan, 1985
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Badge status="success" text="Active" />
                </Descriptions.Item>
                <Descriptions.Item label="Position">
                  Senior Software Engineer
                </Descriptions.Item>
                <Descriptions.Item label="Employee ID">
                  EMP123456
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </TabPane>

          {/* Permissions Tab */}
          <TabPane
            tab={
              <span>
                <LockOutlined /> App Permissions
              </span>
            }
            key="2"
          >
            <Card bordered={false}>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                title={() => "User Permissions"}
              />
            </Card>
          </TabPane>

          {/* Performance Tab */}
          <TabPane
            tab={
              <span>
                <SafetyCertificateOutlined /> Performance
              </span>
            }
            key="3"
          >
            <Card bordered={false}>
              <Descriptions title="Performance Metrics" bordered column={2}>
                <Descriptions.Item label="Task Completion">
                  <Progress percent={85} status="active" />
                </Descriptions.Item>
                <Descriptions.Item label="On-time Delivery">
                  <Progress percent={90} status="active" />
                </Descriptions.Item>
                <Descriptions.Item label="Client Feedback">
                  <Progress percent={95} status="active" />
                </Descriptions.Item>
                <Descriptions.Item label="Team Collaboration">
                  <Progress percent={88} status="active" />
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default Profile;
