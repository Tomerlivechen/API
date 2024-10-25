import React from "react";
import { colors } from "../Constants/Patterns";

const BackGround = ({ children }) => {
  return (
    <>
      <div
        className={` w-full h-12 bg-cover bg-center overflow-y-auto" ${colors.ElementFrame} `}
      ></div>
      <div className="relative">
        <div
          className={` w-full min-h-screen h-fit bg-cover bg-center overflow-y-auto" ${colors.ElementFrame} `}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default BackGround;
