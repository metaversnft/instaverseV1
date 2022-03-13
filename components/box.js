import React from "react";

export default function Box({ children, border = false, ...props }) {
  const customClass = props.className + " box";
  return (
    <div
      {...props}
      className={customClass}
      style={{
        border: border && "1px solid #7a7d7c",
        borderRadius: border && 15,
        backgroundColor: border && "#044a48",
        
      }}
    >
      {children}
    </div>
  );
}
