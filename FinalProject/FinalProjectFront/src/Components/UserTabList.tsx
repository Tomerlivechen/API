import { useEffect, useState } from "react";
import { IPostDisplay } from "../Models/Interaction";
import { sortByProperty } from "../Constants/Patterns";
import PostView from "../Constants/Objects/PostView";
import { IAppUserDisplay } from "../Models/UserModels";
import UserTab from "../Constants/Objects/UserTab";
import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";

interface UserTabListValues {
  sortElement?: keyof IAppUserDisplay;
  orderBy?: "asc" | "desc";
  users: IAppUserDisplay[];
  filter?: keyof IAppUserDisplay;
  Action?: (id: string) => void;
}

const UserTabList: React.FC<UserTabListValues> = (
  UserListValue: UserTabListValues
) => {
  const [users, setUsers] = useState<IAppUserDisplay[]>(UserListValue.users);
  const [order, setOrder] = useState(UserListValue.orderBy);
  const [sortBy, setSortBy] = useState(UserListValue.sortElement);
  const [filterBy, setFilterBy] = useState(UserListValue.filter);
  const [sortedUsers, setSortedUsers] = useState<IAppUserDisplay[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUsers(UserListValue.users);
    if (order && sortBy) {
      setSortedUsers(users.sort(sortByProperty(sortBy, order)));
    } else if (filterBy) {
      const filtered = users.filter((u) => u[filterBy] === true);
      setSortedUsers(filtered);
    } else {
      setSortedUsers(users);
    }
  }, []);
  useEffect(() => {
    setOrder(UserListValue.orderBy);
    setSortBy(UserListValue.sortElement);
    setFilterBy(UserListValue.filter);
  }, []);

  useEffect(() => {
    if (sortedUsers) {
      setLoading(false);
    }
  }, [sortedUsers]);

  return (
    <>
      {!loading ? (
        <div>
          {sortedUsers.map((user) => (
            <div className="p-2">
              <UserTab
                UserDisplay={user}
                buttonAction={UserListValue.Action || (() => {})}
                key={user.id}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <ClimbBoxSpinner />
        </div>
      )}
    </>
  );
};

export { UserTabList };
