import { useEffect, useState } from "react";
import { auth } from "../Services/auth-service";
import { useUser } from "../CustomHooks/useUser";
import EditUserComponent from "../Components/EditUserComponent";
import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";
import { IAppUserDisplay } from "../Models/UserModels";
import { GroupEditComponent } from "../Components/GroupEditComponent";
import { useParams } from "react-router-dom";

const GroupSettings = () => {
  const { groupId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (groupId) {
      setLoading(false);
    }
  }, [groupId]);

  return <>{loading ? <ClimbBoxSpinner /> : <GroupEditComponent />}</>;
};

export default GroupSettings;
