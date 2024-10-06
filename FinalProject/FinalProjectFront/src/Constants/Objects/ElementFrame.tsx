import { ReactNode } from "react";
import { colors } from "../Patterns";

type Position =
  | "absolute"
  | "relative"
  | "fixed"
  | "sticky"
  | "initial"
  | "inherit";

type overflowYtype = "visible" | "hidden" | "scroll" | "auto" | "clip";

interface basicElements {
  children: ReactNode;
  height: string;
  width: string;
  padding: string;
  position?: Position;
  top?: string;
  left?: string;
  right?: string;
  overflowY?: overflowYtype;
  zindex?: number;
  margin?: string;
}

const ElementFrame = (props: basicElements) => {
  return (
    <>
      <div
        className={` p-${props.padding} shadow-lg  rounded-lg m${props.margin || "-3"} ${colors.ElementFrame}`}
        style={{
          left: props.left,
          zIndex: props.zindex || 0,
          right: props.right || "auto",
          top: props.top,
          position: props.position || "relative",
          height: props.height,
          width: props.width,
          overflowY: props.overflowY,
          resize: "none",
        }}
      >
        {props.children}
      </div>
    </>
  );
};
export default ElementFrame;
