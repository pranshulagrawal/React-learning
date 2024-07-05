import React from "react";

const Hello = (props) => {
  return (
    <div>
      {props.message} {props.name}
    </div>
  );
};

export default Hello;
