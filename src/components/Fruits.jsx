import React from "react";

const Fruits = () => {
  const fruits = ["Apple", "Mango", "Banana", "Orange", "Papaya"];
  return (
    <div>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </div>
  );
};

export default Fruits;
