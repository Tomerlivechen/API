import { useEffect, useState } from "react";
import { IPostDisplay } from "../Models/Interaction";
import { sortByProperty } from "../Constants/Patterns";
import PostView from "../Constants/Objects/PostView";
import { auth } from "../Services/auth-service";
import UserTab from "../Constants/Objects/UserTab";
import { IAppUserDisplay } from "../Models/UserModels";

const FollowingList = () => {
  const [users, setUsers] = useState<IAppUserDisplay[] | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      auth.getUsers().then((response) => {
        console.log("respons", response);
        const parsedUsers = response.data;
        setUsers(Array.isArray(parsedUsers) ? parsedUsers : [parsedUsers]);
      });
    };

    getUsers();
  }, []);

  const handleButtonClick = (id: string) => {};

  return (
    <>
      {users && (
        <div>
          {users.map((user) => (
            <>
              {user.following && (
                <div className="p-2">
                  <UserTab
                    key={user.id}
                    UserDisplay={user}
                    buttonAction={() => handleButtonClick(user.id)}
                  />
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </>
  );
};

export { FollowingList };
