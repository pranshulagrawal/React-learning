import React from "react";
import { Timeline, Card, Collapse, Typography } from "antd";
import {
  CheckCircleOutlined,
  BugOutlined,
  RocketOutlined,
} from "@ant-design/icons";

import "./styles.scss";

const { Paragraph, Text } = Typography;
const { Panel } = Collapse;

const ChangeLog: React.FC = () => {
  return (
    <Card title="CHANGE LOG" bordered={false} className="changelog-card">
      <Timeline mode="alternate">
        <Timeline.Item
          color="green"
          dot={<RocketOutlined style={{ fontSize: "16px" }} />}
        >
          <Collapse>
            <Panel
              header={
                <Text strong>
                  Version 1.2.0 - <Text type="secondary">2024-10-01</Text>
                </Text>
              }
              key="1"
            >
              <Paragraph>
                <CheckCircleOutlined /> Added new notification filter features
              </Paragraph>
              <Paragraph>
                <BugOutlined /> Improved performance for large data tables
              </Paragraph>
              <Paragraph>
                Other minor bug fixes and performance improvements.
              </Paragraph>
            </Panel>
          </Collapse>
        </Timeline.Item>

        <Timeline.Item
          color="blue"
          dot={<CheckCircleOutlined style={{ fontSize: "16px" }} />}
        >
          <Collapse>
            <Panel
              header={
                <Text strong>
                  Version 1.1.0 - <Text type="secondary">2024-09-15</Text>
                </Text>
              }
              key="2"
            >
              <Paragraph>
                <CheckCircleOutlined /> Introduced user profile settings
              </Paragraph>
              <Paragraph>
                <BugOutlined /> Bug fixes and UI enhancements
              </Paragraph>
            </Panel>
          </Collapse>
        </Timeline.Item>

        <Timeline.Item
          color="red"
          dot={<BugOutlined style={{ fontSize: "16px" }} />}
        >
          <Collapse>
            <Panel
              header={
                <Text strong>
                  Version 1.0.0 - <Text type="secondary">2024-09-01</Text>
                </Text>
              }
              key="3"
            >
              <Paragraph>
                <CheckCircleOutlined /> Initial release with dashboard and user
                management features
              </Paragraph>
            </Panel>
          </Collapse>
        </Timeline.Item>
      </Timeline>
    </Card>
  );
};

export default ChangeLog;
