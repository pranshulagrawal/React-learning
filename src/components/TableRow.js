import React, { useState } from "react";

const TableRow = ({ node, level = 0, onRowClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRowClick = () => {
    onRowClick(node);
  };

  return (
    <>
      <tr
        style={{
          cursor: hasChildren ? "pointer" : "default",
          paddingLeft: `${level * 20}px`,
        }}
      >
        <td>
          {hasChildren && (
            <button
              onClick={toggleExpand}
              style={{ marginLeft: `${level * 20}px` }}
            >
              {isExpanded ? "-" : "+"}
            </button>
          )}
        </td>
        <td onClick={handleRowClick}>{node.id}</td>
        <td>{node.name}</td>
        <td>{node.parentId}</td>
        <td>{node.level}</td>
        <td>{node.roleTitle}</td>
        <td>{node.department}</td>
        <td>{node.location}</td>
        <td>{node.hireDate}</td>
        <td>{node.email}</td>
        <td>{node.phoneNumber}</td>
        <td>{node.status}</td>
        <td>{node.budget}</td>
        <td>{node.headCount}</td>
        <td>{node.projectAssigned.join(", ")}</td>
        <td>{node.performanceRating || "N/A"}</td>
        <td>{node.skills.join(", ")}</td>
      </tr>
      {hasChildren &&
        isExpanded &&
        node.children?.map((child) => (
          <TableRow
            key={child.id}
            node={child}
            level={level + 1}
            onRowClick={onRowClick}
          />
        ))}
    </>
  );
};

export default TableRow;
