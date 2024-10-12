import React, { useState } from "react";
import { IAppUserDisplay } from "../../Models/UserModels";

import ElementFrame from "./ElementFrame";
import { useLogin } from "../../CustomHooks/useLogin";
import { dialogs } from "../AlertsConstant";
import { useUser } from "../../CustomHooks/useUser";
import { colors } from "../Patterns";

export interface UserTabProps {
  UserDisplay: IAppUserDisplay;
  buttonAction: (id: string) => void;
}

const UserTab: React.FC<UserTabProps> = (TabProps: UserTabProps) => {
  const [following, setFollowings] = useState(TabProps.UserDisplay.following);
  const [blocking, setblocking] = useState(TabProps.UserDisplay.blocked);
  const [blockedYou, setblockedYou] = useState(TabProps.UserDisplay.blockedYou);
  const loginContext = useLogin();
  const userContext = useUser();

  const click = () => {
    if (TabProps.buttonAction) {
      TabProps.buttonAction(TabProps.UserDisplay.id);
    }
  };

  return (
    <>
      {!blockedYou ? (
        <ElementFrame height="62px" width="200px" padding="0">
          <div
            className={`flex cursor-pointer ${
              blocking && "bg-stone-500 bg-opacity-15 rounded-full"
            } ${following && "bg-green-400 bg-opacity-15 rounded-full"} `}
            onClick={click}
          >
            <img
              className="rounded-full border-2 h-14 w-14 shadow-2xl p-1 "
              src={TabProps.UserDisplay.imageURL}
              aria-description={`Profile picture of ${TabProps.UserDisplay.first_Name} ${TabProps.UserDisplay.last_Name}`}
            />

            <div
              className={`  col-span-4 font-extrabold  p-4 ${colors.ButtonFont} `}
            >
              {TabProps.UserDisplay.userName}
            </div>
            <div className=" ml-auto col-span-4 font-extrabold p-3 flex gap-3"></div>
          </div>
        </ElementFrame>
      ) : null}
    </>
  );
};

export default UserTab;
