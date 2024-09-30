import React, { useEffect, useState } from "react";
import { useLogin } from "../CustomHooks/useLogin";
import { auth } from "../Services/auth-service";
import { useUser } from "../CustomHooks/useUser";
import { IAppUserDisplay } from "../Models/UserModels";
import { dialogs } from "../Constants/AlertsConstant";
import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";
import UserCard from "../Constants/Objects/UserCard";
import { stringToAppUserDisplay } from "../Constants/Patterns";

function TestSpace() {
  const loggedInContext = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState<IAppUserDisplay[]>([]);
  useEffect(() => {
    console.log(loggedInContext.token);
    if (!userList?.length) {
      setIsLoading(true);
      auth
        .getUsers(loggedInContext.token ?? "")
        .then((response) => {
          console.log("respons", response);
          const parsedUsers = stringToAppUserDisplay(response);
          setUserList(Array.isArray(parsedUsers) ? parsedUsers : [parsedUsers]);
        })
        .catch((error) => {
          console.log("error", error);
          if (error && error.response && error.response.data) {
            const errorMessages = error.response.data["Getting users failed"];
            if (Array.isArray(errorMessages)) {
              const message = errorMessages.join(" & ");
              dialogs.error(message);
            } else {
              dialogs.error("An unknown error occurred.");
            }
          } else {
            dialogs.error("An error occurred. Please try again.");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <>
      <div>Test Space Elemens</div>
      <div>---------------------------</div>
      {isLoading && (
        <>
          <div className=" flex flex-col items-center">
            <ClimbBoxSpinner /> <br />
          </div>
        </>
      )}
      {userList.map((user) => (
        <UserCard key={user.id} UserDisplay={user} />
      ))}
      <div>---------------------------</div>
      <div>Test Space Elemens</div>
    </>
  );
}

export default TestSpace;
