import React from "react";

/* Destructuring props as 
1. const { name, message } = props;
2. const Hello = ({name,message}) => {};

*/

// const Hello = (props) => {
//   const { name, message } = props;
//   return (
//     <div>
//       {message} {name}
//     </div>
//   );
// };

const Hello = ({ name, message, emoji }) => {
  //   const { name, message } = props;
  return (
    <div>
      {message} {emoji} {name}
    </div>
  );
};

export default Hello;
