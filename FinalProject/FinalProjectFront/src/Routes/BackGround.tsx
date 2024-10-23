import React from "react";
import { colors } from "../Constants/Patterns";

const BackGround = ({ children }) => {
  return <div className={`h-dvh ${colors.ElementFrame} `}>{children}</div>;
};

export default BackGround;
