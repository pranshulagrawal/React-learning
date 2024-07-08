import React from "react";

const Passing_Array_props = ({ person }) => {
  return (
    <div>
      {person.name} {person.message} {person.emoji} {person.seatNumbers}
    </div>
  );
};

export default Passing_Array_props;
