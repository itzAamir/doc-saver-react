import React from "react";

const BsAlert = (props) => {
   return (
      <div
         className={`alert alert-${props.type}`}
         style={{ textAlign: "center" }}
         role="alert"
      >
         {props.children}
      </div>
   );
};

export default BsAlert;
