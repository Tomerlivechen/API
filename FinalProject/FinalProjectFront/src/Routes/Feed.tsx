import React from "react";
import SendPostComponent from "../Components/SendPostComponent";

function Feed() {
  return (
    <>
      <div className="flex flex-wrap justify-between">
        <div className="w-1/3 pr-2 pl-2"></div>
        <div className="w-1/3 pl-2 pr-2">
          <SendPostComponent />
        </div>
        <div className="w-1/3 pl-2 pr-2"></div>
      </div>
    </>
  );
}

export default Feed;
