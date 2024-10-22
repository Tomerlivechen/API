import { useEffect, useState } from "react";
import { ISocialGroupCard } from "../../Models/SocialGroup";
import { Groups } from "../../Services/group-service";
import { GroupCard } from "./GroupCard";
import { auth } from "../../Services/auth-service";
import { useUser } from "../../CustomHooks/useUser";

interface IGroupCardListProps{
  GroupFilter: string | null;
  usersGroups: boolean;
}


const GroupCardList : React.FC<{
  GroupCardListProps: IGroupCardListProps;
  }> = ({ GroupCardListProps }) => {
const userContext = useUser()
const [loading, setLoading] = useState(true);
const [groupCardData, setGroupCardData] = useState<ISocialGroupCard[]|null>(null)
const [filteredGroupCardData, setFilteredGroupCardData] = useState<ISocialGroupCard[]|null>(null)
const [groupFilter, setGroupFilter] = useState<string|null>(null)
const [userGroup, setuserGroup] = useState(false)


const GetGroupCards =async () => {
const response = await Groups.GetGroups();
setGroupCardData(response.data);
}

const GetUserGroups =async () => {
  if(userContext.userInfo.UserId){
  const response = await auth.GetUsersGroups(userContext.userInfo.UserId)
  setGroupCardData(response.data);
  }
  }
  

useEffect(()=>{
  if (GroupCardListProps.GroupFilter && !GroupCardListProps.usersGroups){
    GetGroupCards();
    setGroupFilter(GroupCardListProps.GroupFilter)
  }
  if (GroupCardListProps.usersGroups){
    GetUserGroups();
    setuserGroup(GroupCardListProps.usersGroups)
  }
},[]);

useEffect(()=>{
  if(!userGroup){
if (groupCardData && groupFilter){
    if(groupFilter.length>0){
        const filtered = groupCardData.filter((card) => card.name.toLowerCase().includes(groupFilter.toLowerCase()))
        setFilteredGroupCardData(filtered)
        setLoading(false)
    }
    else if(groupFilter.length==0 || !groupFilter){
        setFilteredGroupCardData(groupCardData)
        setLoading(false)
    }
  }
  if(groupCardData && userGroup){
    setFilteredGroupCardData(groupCardData)
    setLoading(false)
  }
}
},[groupCardData, groupFilter]);


return (
    <>
    {(!loading && filteredGroupCardData) &&
    <div>
    {filteredGroupCardData.map((group) => (
          <div className="p-2" key={group.id}>
            <GroupCard GroupCardData={group} />
          </div>
        ))}
        </div>}
    </>
)


  };

  export {GroupCardList}