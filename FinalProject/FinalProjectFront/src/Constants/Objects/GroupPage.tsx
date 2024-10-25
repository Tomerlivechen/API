import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import GroupProfileSection from "./GroupProfileSection";
import { Groups } from "../../Services/group-service";
import ResizableFrame from "./ResizableFrame";
import { UserTabList } from "../../Components/UserTabList";
import { PostFrame } from "./PostFrame";
import { IAppUserDisplay } from "../../Models/UserModels";
import { ISocialGroupDisplay } from "../../Models/SocialGroup";

const GroupPage = () => {
  const { groupId } = useParams();
  const [groupIdState, setGroupIdState] = useState<string | null>(null);
  const [groupState, setGroupState] = useState<ISocialGroupDisplay | null>(
    null
  );
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [MemberList, setMemberList] = useState<IAppUserDisplay[] | null>(null);

  const GetMembers = async (groupId: string) => {
    const response = await Groups.GetGroupMembers(groupId);
    setMemberList(response.data);
  };

  const GetGroupInfo = async (groupId: string) => {
    const response = await Groups.GetGroupbyId(groupId);
    setGroupState(response.data);
  };
  useEffect(() => {
    if (groupId) {
      GetMembers(groupId);
      setGroupIdState(groupId);
      GetGroupInfo(groupId);
    }
  }, [groupId]);

  useEffect(() => {
    if (MemberList) {
      setLoadingUsers(false);
    }
  }, [MemberList]);

  return (
    <>
      <div className="flex flex-wrap ">
        <div className="w-16 pl-2 pr-2"></div>
        <div className="w-11/12 lg:block lg:w-11/12 pl-2 pr-2">
          <div className="w-full min-w-[40rem] pr-2 pl-2">
            <GroupProfileSection groupId={groupId} />
          </div>

          <div className="flex  justify-between w-8/12 ">
            <div className="hidden lg:block lg:w-fit pl-2 pr-2 h-1/2">
              {!loadingUsers && MemberList && (
                <ResizableFrame
                  title={"Members"}
                  show={true}
                  tailwindProps=" w-fit h-full"
                >
                  <UserTabList users={MemberList} />
                </ResizableFrame>
              )}
            </div>
            <div className="w-fit lg:w-fit pl-2 pr-2">
              <PostFrame UserList={[]} />
            </div>
            <div className="hidden xl:block lg:w-2/12 pl-2 ">
              <ResizableFrame
                title={"Rules"}
                show={true}
                tailwindProps="w-fit h-full"
              >
                {groupState?.groupRules}
              </ResizableFrame>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupPage;
