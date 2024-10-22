import React, { useEffect, useState } from "react";
import { useUser } from "../../CustomHooks/useUser";
import ClimbBoxSpinner from "../../Spinners/ClimbBoxSpinner";
import { FaUserGear } from "react-icons/fa6";
import { colors } from "../Patterns";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaHandHolding } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";
import { ISocialGroup } from "../../Models/SocialGroup";
import { Groups } from "../../Services/group-service";
import { BsPersonFillAdd } from "react-icons/bs";
import { BsPersonFillDash } from "react-icons/bs";



const GroupProfileSection = () => {
const {params} = useParams()
const [groupInfo , SetGroupInfo]= useState<ISocialGroup | null>()
const [loading , setLoading] = useState(true)
const userContext = useUser()
const navigate = useNavigate();
const location = useLocation();

const getGroupInfo = async(GroupId:string) =>{
const response = await Groups.GetGroupbyId(GroupId)
SetGroupInfo(response.data)
}

useEffect(()=>{
if(params){
  getGroupInfo(params)
}
},[params])

useEffect(()=>{
  if(groupInfo){
    setLoading(false)
  }
  },[groupInfo])

const toggleFollow = async ()=>{
if(groupInfo && groupInfo.isMemember == false){
  const response = await Groups.JoinGroup(groupInfo.id);
  if (response.status === 'success' ){
    SetGroupInfo((prev) => {
      if (!prev) return prev; return {...prev, isMemember: true  };
    });
  }
  }
else if (groupInfo && groupInfo.isMemember == false && userContext.userInfo.UserId) {
  const response = await Groups.RemoveMember(groupInfo.id, userContext.userInfo.UserId);
  if (response.status === 'success' ){
    SetGroupInfo((prev) => {
      if (!prev) return prev; return {...prev, isMemember: false  };
    });
  }
}
}



  return (
    <>
      <div className="p-1">
        {loading && <ClimbBoxSpinner />}
        {!loading && groupInfo && !groupInfo.groupAdmin.blockedYou && (
          <>
            <div
              className={`${colors.ElementFrame} shadow-lg rounded-lg overflow-hidden w-2/3`}
            >
              <div className="relative">
                <img
                  src={groupInfo.banerImageURL}
                  alt="User banner"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute -bottom-12 left-6 flex items-center space-x-4">
                  <img
                    src={groupInfo.imageURL}
                    alt="User profile"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                  />
                  <p
                    className={`text-2xl font-bold text-left mt-5 ${colors.ButtonFont}`}
                  >
                    {groupInfo.name}
                  </p>
                </div>
                <div className="absolute right-0 p-2">
                  <button onClick={() => navigate("/settings")}>
                    <FaUserGear className={`${colors.ButtonFont}`} size={25} />
                  </button>
                </div>
              </div>
              <div className={` pt-16 px-6 pb-6 ${colors.ButtonFont}`}>
                <div className="text-center">
                  <div
                    className={`flex justify-between items-center ${
                      groupInfo && "-mt-10"
                    }`}
                  >
                    <div className=" ml-auto flex gap-3">
                      {!groupInfo.groupAdmin.blockedYou &&
                        userContext.userInfo.UserId !== groupInfo.groupAdmin.id && (
                          <>
                            {groupInfo.isMemember ? (
                              <button
                                className={`${colors.ElementFrame}  p-2 rounded-xl flex items-center gap-2`}
                                onClick={toggleFollow}
                              >
                                <BsPersonFillDash size={25} />
                                <span> Leave</span>
                              </button>
                            ) : (
                              <button
                                className={`${colors.ElementFrame} ${colors.ActiveText} p-2 rounded-xl flex items-center gap-2 hover:animate-bounce`}
                                onClick={toggleFollow}
                              >
                                <BsPersonFillAdd size={25} />
                                <span> Join Group</span>
                              </button>
                            )}
                          </>
                        )}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="mt-4">
                      <h1 className="text-2xl font-bold">Description</h1>
                    </div>
                  </div>
                  <p className=" text-left ">{groupInfo.description}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GroupProfileSection;
function useProps(): { props: any; } {
    throw new Error("Function not implemented.");
}

