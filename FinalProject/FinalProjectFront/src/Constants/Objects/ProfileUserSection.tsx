import React from "react";
import { IAppUserDisplay } from "../../Models/UserModels";

function ProfileUserSection({ UserDisplay }: { UserDisplay: string }) {
  const decodedObject = JSON.parse(
    JSON.stringify(UserDisplay)
  ) as IAppUserDisplay;
  return (
    <>
      <div>
        <img
          className="rounded-3xl border-2 shadow-2xl"
          src={decodedObject.imageURL}
          aria-description={`Profile picture on ${decodedObject.first_Name} ${decodedObject.last_Name}`}
        />
        <div className=" font-extrabold p-3">
          {`${decodedObject.prefix}. ${decodedObject.first_Name} 
          ${decodedObject.last_Name} (${decodedObject.pronouns})`}
        </div>
      </div>
    </>
  );
}

export default ProfileUserSection;
