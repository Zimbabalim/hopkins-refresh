import React from "react";

const DesignButton = (props) => {
  return (
      <div
        onClick={() => props.clickFn(props.data)}
      >
        <h4>{props.data.friendly_name}</h4>
      </div>
  );
};

export default DesignButton;
