import { ReactNode } from "react";

interface basicElements {
  children: ReactNode;
  height: string;
  width: string;
}

const ElementFrame = (props: basicElements) => {
  return (
    <>
      <div
        className={`bg-white p-6 shadow-lg rounded-lg m-3`}
        style={{ height: `${props.height}px`, width: `${props.width}px` }}
      >
        {props.children}
      </div>
    </>
  );
};
export default ElementFrame;
