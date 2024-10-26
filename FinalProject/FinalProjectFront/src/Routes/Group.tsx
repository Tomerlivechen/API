import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GroupSearch } from "../Constants/Objects/GroupSearch";
import GroupPage from "../Constants/Objects/GroupPage";

const Group = () => {
  const { groupId } = useParams();

  const [listOrGroup, setListOrGroup] = useState<"list" | "group">("list");

  useEffect(() => {
    if (groupId) {
      setListOrGroup("group");
    }
  }, [groupId]);

  return (
    <>
      {listOrGroup == "list" && <GroupSearch />}
      {listOrGroup == "group" && <GroupPage />}
    </>
  );
};
export { Group };
