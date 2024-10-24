import React, { useEffect, useState } from "react";
import { Timeline, Card, Collapse, Typography } from "antd";
import {
  CheckCircleOutlined,
  BugOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import "./styles.scss";

const { Paragraph, Text } = Typography;
const { Panel } = Collapse;

// Define the types for TypeScript
interface Change {
  type: "feature" | "improvement" | "bug";
  description: string;
}

interface ChangeLogEntry {
  version: string;
  date: string;
  icon: "check-circle" | "bug" | "rocket";
  color: string;
  changes: Change[];
}

const ChangeLog: React.FC = () => {
  const [data, setData] = useState<ChangeLogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the public folder
    fetch(`http://localhost:3000/data.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data: ChangeLogEntry[]) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card title="CHANGE LOG" bordered={false} className="changelog-card">
      <Timeline mode="alternate">
        {data.map((entry, index) => (
          <Timeline.Item
            key={index}
            color={entry.color}
            dot={
              <div
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: `${entry.color}`,
                  borderRadius: "50%",
                }}
              />
            }
          >
            <Collapse>
              <Panel
                header={
                  <Text
                    strong
                    className="right-aligned-content"
                    style={{ flex: "none" }}
                  >
                    Version {entry.version} -{" "}
                    <Text type="secondary">{entry.date}</Text>
                  </Text>
                }
                key={index}
              >
                <div className="right-aligned-content">
                  {/* Group changes by type */}
                  {(["feature", "improvement", "bug"] as const).map((type) => {
                    const changes = entry.changes.filter(
                      (change) => change.type === type
                    );

                    if (changes.length === 0) return null;

                    // Define different styles for each type of change
                    const colorMap: {
                      feature: string;
                      improvement: string;
                      bug: string;
                    } = {
                      feature: "green",
                      improvement: "blue",
                      bug: "red",
                    };

                    const titleMap: {
                      feature: string;
                      improvement: string;
                      bug: string;
                    } = {
                      feature: "Features",
                      improvement: "Improvements",
                      bug: "Bug Fixes",
                    };

                    return (
                      <div key={type}>
                        <Text strong style={{ color: colorMap[type] }}>
                          {titleMap[type]}
                        </Text>
                        {changes.map((change, changeIndex) => (
                          <Paragraph key={changeIndex}>
                            {type === "feature" && (
                              <CheckCircleOutlined
                                style={{ color: colorMap[type] }}
                              />
                            )}
                            {type === "improvement" && (
                              <RocketOutlined
                                style={{ color: colorMap[type] }}
                              />
                            )}
                            {type === "bug" && (
                              <BugOutlined style={{ color: colorMap[type] }} />
                            )}{" "}
                            {change.description}
                          </Paragraph>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </Panel>
            </Collapse>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
};

export default ChangeLog;
