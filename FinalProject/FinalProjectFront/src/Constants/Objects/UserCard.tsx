import React from "react";
import { IAppUserDisplay } from "../../Models/UserModels";

import ElementFrame from "./ElementFrame";
import { auth } from "../../Services/auth-service";
import { useLogin } from "../../CustomHooks/useLogin";
import { dialogs } from "../AlertsConstant";
import { catchError } from "../Patterns";
import { useUser } from "../../CustomHooks/useUser";

interface UserCardProps {
  UserDisplay: IAppUserDisplay;
}

const UserCard: React.FC<UserCardProps> = ({ UserDisplay }) => {
  const loginContext = useLogin();
  const userContext = useUser();
  const handleFollow = () => {
    console.log(loginContext.token ?? "", UserDisplay.id);
    auth
      .follow(loginContext.token ?? "", UserDisplay.id.toString())
      .then((response) => {
        if (response.status === 200)
          dialogs.success(`Following ${UserDisplay.userName}`).then(() => {});
      })
      .catch((error) => {
        catchError(error, "Following");
      });
  };
  const handleUnfollow = () => {
    console.log(loginContext.token ?? "", UserDisplay.id);
    auth
      .unfollow(loginContext.token ?? "", UserDisplay.id.toString())
      .then((response) => {
        if (response.status === 200)
          dialogs.success(`Unfollowing ${UserDisplay.userName}`).then(() => {});
      })
      .catch((error) => {
        catchError(error, "Unfollowing");
      });
  };
  return (
    <>
      <ElementFrame height="100" width="550">
        <div className="flex">
          <div className=" col-span-2">
            <img
              height={100}
              width={60}
              className="rounded-full border-2 shadow-2xl"
              src={UserDisplay.imageURL}
              aria-description={`Profile picture on ${UserDisplay.first_Name} ${UserDisplay.last_Name}`}
            />
          </div>
          <div className=" ml-6 col-span-4 font-extrabold text-emerald-800 p-3">
            {UserDisplay.userName}
          </div>
          <div className=" ml-4 col-span-4 font-extrabold p-3">
            {`${UserDisplay.prefix}. ${UserDisplay.first_Name} 
          ${UserDisplay.last_Name} (${UserDisplay.pronouns})`}
          </div>
          <div className=" ml-auto col-span-4 font-extrabold p-3">
            {userContext.userInfo.UserId !== UserDisplay.id ? (
              UserDisplay.following ? (
                <button onClick={handleUnfollow}>Unfollow</button>
              ) : (
                <button onClick={handleFollow}>Follow</button>
              )
            ) : null}
          </div>
        </div>
      </ElementFrame>
    </>
  );
};

export default UserCard;
