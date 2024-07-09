import React from "react";

const ConditionalComponent = () => {
  const display = true;
  if (display) {
    return <div>Code EveryDay!</div>;
  }
  return (
    <div>
      <h3>This is a conditional Component</h3>
    </div>
  );
};

export default ConditionalComponent;
