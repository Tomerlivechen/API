import { useEffect, useState } from "react";
import { ISocialGroupCard } from "../../Models/SocialGroup";
import { Groups } from "../../Services/group-service";
import { GroupCard } from "./GroupCard";

const GroupCardList : React.FC<{
    GroupFilter: String;
  }> = ({ GroupFilter }) => {
const [loading, setLoading] = useState(true);
const [groupCardData, setGroupCardData] = useState<ISocialGroupCard[]|null>(null)
const [filteredGroupCardData, setFilteredGroupCardData] = useState<ISocialGroupCard[]|null>(null)


const GetGroupCards =async () => {
const response = await Groups.GetGroups();
setGroupCardData(response);
}

useEffect(()=>{
    GetGroupCards();
},[]);

useEffect(()=>{
if (groupCardData){
    if(GroupFilter.length>0){
        const filtered = groupCardData.filter((card) => card.name.toLowerCase().includes(GroupFilter.toLowerCase()))
        setFilteredGroupCardData(filtered)
        setLoading(false)
    }
    else if(GroupFilter.length==0 || !GroupFilter){
        setFilteredGroupCardData(groupCardData)
        setLoading(false)
    }
}
},[groupCardData, GroupFilter]);


return (
    <>
    {(!loading && filteredGroupCardData) &&
    <div className="flex flex-wrap w-3/4">
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