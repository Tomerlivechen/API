import { useEffect, useState } from "react";
import { auth } from "../Services/auth-service";
import { useUser } from "../CustomHooks/useUser";
import EditUserComponent from "../Components/EditUserComponent";
import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";
import { IAppUserDisplay } from "../Models/UserModels";
import { GroupEditComponent } from "../Components/GroupEditComponent";
import { useParams } from "react-router-dom";
import { MemberEditTabList } from "../Constants/Objects/MemberEditTabList";

const GroupSettings = () => {
  const { groupId } = useParams();
  const [loading, setLoading] = useState(true);
  const [GroupId, setGroupId] = useState("");

  useEffect(() => {
    if (groupId) {
      setGroupId(groupId);
    }
    if (GroupId) {
      setLoading(false);
    }
  }, [GroupId, groupId]);

  return (
    <>
      {loading && groupId ? (
        <ClimbBoxSpinner />
      ) : (
        <>
          <div className="flex justify-center items-start space-x-4 mt-8">
            <GroupEditComponent />
            <MemberEditTabList GroupId={GroupId} />
          </div>
        </>
      )}
    </>
  );
};

export default GroupSettings;
