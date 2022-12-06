import React from "react";

const Alien = ({
  style = {},
  fill = "#000",
  width = "100%",
  className = "",
  viewBox = "0 0 32 32"
}) => (
  <svg width={width} height={width}>

    <path d="M 100 350 q 150 -300 300 0" stroke="blue" stroke-width="5" fill="none" />

  </svg>
);

export default Alien;
