import React from "react";

const Container = (props) => {
  return (
    <div
      className={`${props.className} container text-center p-2`}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default Container;

// some variables for important class

export const flexUi = "d-flex justify-content-center align-items-center";

export const felexUiBetween =
  "d-flex justify-content-between align-items-center";
