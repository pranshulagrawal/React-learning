import React from "react";
import { Drawer, Descriptions, List } from "antd";
import { OrgNodeDetails } from "../../model/node-details-model";

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  nodeDetails: OrgNodeDetails | null; // The selected node details
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  nodeDetails,
}) => {
  return (
    <Drawer
      title={`Details for ${nodeDetails?.name}`}
      placement="bottom"
      onClose={onClose}
      open={visible}
      height={300} // Height of the bottom sheet
      bodyStyle={{ paddingBottom: 80 }}
    >
      {nodeDetails ? (
        <Descriptions column={1}>
          <Descriptions.Item label="ID">{nodeDetails.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{nodeDetails.name}</Descriptions.Item>
          <Descriptions.Item label="Role Title">
            {nodeDetails.roleTitle}
          </Descriptions.Item>
          <Descriptions.Item label="Department">
            {nodeDetails.department}
          </Descriptions.Item>
          <Descriptions.Item label="Location">
            {nodeDetails.location}
          </Descriptions.Item>
          <Descriptions.Item label="Hire Date">
            {nodeDetails.hireDate}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {nodeDetails.email}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {nodeDetails.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {nodeDetails.status}
          </Descriptions.Item>
          <Descriptions.Item label="Budget">
            {nodeDetails.budget}
          </Descriptions.Item>
          <Descriptions.Item label="Performance Rating">
            {nodeDetails.performanceRating}
          </Descriptions.Item>
          <Descriptions.Item label="Skills">
            {nodeDetails.skills.join(", ")}
          </Descriptions.Item>
          <Descriptions.Item label="Project Assigned">
            {nodeDetails.projectAssigned.join(", ")}
          </Descriptions.Item>
          <Descriptions.Item label="Biography">
            {nodeDetails.biography}
          </Descriptions.Item>
          <Descriptions.Item label="Career History">
            <List
              dataSource={nodeDetails.careerHistory}
              renderItem={(item) => (
                <List.Item>
                  <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Role">
                      {item.role}
                    </Descriptions.Item>
                    <Descriptions.Item label="Company">
                      {item.company}
                    </Descriptions.Item>
                    <Descriptions.Item label="Years">
                      {item.years}
                    </Descriptions.Item>
                  </Descriptions>
                </List.Item>
              )}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Notes">
            {nodeDetails.notes}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <p>No details available.</p>
      )}
    </Drawer>
  );
};

export default BottomSheet;
