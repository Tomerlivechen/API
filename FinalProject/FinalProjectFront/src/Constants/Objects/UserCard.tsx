import React from "react";
import { IAppUserDisplay } from "../../Models/UserModels";

import ElementFrame from "./ElementFrame";

function UserCard({ UserDisplay }: { UserDisplay: string }) {
  const decodedObject = JSON.parse(
    JSON.stringify(UserDisplay)
  ) as IAppUserDisplay;
  return (
    <>
      <ElementFrame height="100" width="500">
        <div className=" flex">
          <div className=" col-span-2">
            <img
              height={100}
              width={60}
              className="rounded-full border-2 shadow-2xl"
              src={decodedObject.imageURL}
              aria-description={`Profile picture on ${decodedObject.first_Name} ${decodedObject.last_Name}`}
            />
          </div>
          <div className=" ml-6 col-span-4 font-extrabold text-emerald-800 p-3">
            {decodedObject.userName}
          </div>
          <div className=" ml-4 col-span-4 font-extrabold p-3">
            {`${decodedObject.prefix}. ${decodedObject.first_Name} 
          ${decodedObject.last_Name} (${decodedObject.pronouns})`}
          </div>
        </div>
      </ElementFrame>
    </>
  );
}

export default UserCard;
