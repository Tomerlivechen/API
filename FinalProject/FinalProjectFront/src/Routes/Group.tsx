import { useParams } from "react-router-dom";
import { GroupCreation } from "../Constants/Objects/GroupCreation";
import {
  GroupCardList,
  IGroupCardListProps,
} from "../Constants/Objects/GroupCardList";
import { useEffect, useState } from "react";
import { colors } from "../Constants/Patterns";
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
