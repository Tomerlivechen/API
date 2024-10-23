import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import GroupProfileSection from "./GroupProfileSection";
import { Groups } from "../../Services/group-service";
import ResizableFrame from "./ResizableFrame";
import { UserTabList } from "../../Components/UserTabList";
import { PostFrame } from "./PostFrame";
import { IAppUserDisplay } from "../../Models/UserModels";

const GroupPage = () => {
  const { groupId } = useParams();
  const [groupIdState, setGroupIdState] = useState<string | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [MemberList, setMemberList] = useState<IAppUserDisplay[] | null>(null);

  const GetMembers = async (groupId: string) => {
    const response = await Groups.GetGroupMembers(groupId);
    setMemberList(response.data);
  };

  useEffect(() => {
    if (groupId) {
      GetMembers(groupId);
      setGroupIdState(groupId);
    }
  }, [groupId]);

  useEffect(() => {
    if (MemberList) {
      setLoadingUsers(false);
    }
  }, [MemberList]);

  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-10/12 pr-2 pl-2 mx-auto">
          <GroupProfileSection groupId={groupId} />
        </div>
      </div>

      <div className="flex flex-wrap ">
        <div className="hidden lg:block lg:w-1/12 pl-2 pr-2"></div>
        <div className="hidden lg:block lg:w-2/12 pl-2 pr-2 h-1/2">
          {!loadingUsers && MemberList && (
            <>
              <ResizableFrame
                whidth={"100%"}
                title={"Following"}
                show={true}
                tailwindProps=" h-full"
              >
                <UserTabList users={MemberList} />
              </ResizableFrame>
            </>
          )}
        </div>
        <div className="w-full lg:w-7/12 pl-2 pr-2">
          <PostFrame UserList={[]} />
        </div>
      </div>
    </>
  );
};

export default GroupPage;
