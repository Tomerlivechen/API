import { ReactNode } from "react";

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
}

const ElementFrame = (props: basicElements) => {
  return (
    <>
      <div
        className={`bg-emerald-200 p-${props.padding} shadow-lg  rounded-lg m-3 dark:bg-teal-950 dark:text-amber-400`}
        style={{
          left: props.left,
          zIndex: props.zindex || 2,
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
