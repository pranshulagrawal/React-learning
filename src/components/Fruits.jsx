import React from "react";

const Fruits = () => {
  //   const fruits = ["Apple", "Mango", "Banana", "Orange", "Papaya"];
  const fruits = [
    {
      name: "Apple",
      price: 20,
      emoji: "🍎",
    },
    {
      name: "Banana",
      price: 40,
      emoji: "🍌",
    },
    {
      name: "Orange",
      price: 50,
      emoji: "🍊",
    },
    {
      name: "Mango",
      price: 70,
      emoji: "🥭",
    },
    {
      name: "Grapes",
      price: 100,
      emoji: "🍇",
    },
  ];
  return (
    <div>
      {fruits.map((fruit) => (
        <li key={fruit}>
          {fruit.emoji} {fruit.name} {fruit.price}
        </li>
      ))}
    </div>
  );
};

export default Fruits;
