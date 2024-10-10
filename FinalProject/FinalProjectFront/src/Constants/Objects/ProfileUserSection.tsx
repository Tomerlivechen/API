import React, { useEffect, useState } from "react";
import { IAppUserDisplay } from "../../Models/UserModels";
import { auth } from "../../Services/auth-service";
import { useUser } from "../../CustomHooks/useUser";
import ClimbBoxSpinner from "../../Spinners/ClimbBoxSpinner";




const ProfileUserSection: React.FC<string | null> = ( Userid : string | null ) => {
const [user, setUser] = useState<IAppUserDisplay | null>(null);
const [loading, setLoading] = useState(true);
const userdata = useUser()
useEffect(() => {
  if (Userid){
    getUser (Userid)
  }
    else if (userdata.userInfo.UserId)
    {
      getUser (userdata.userInfo.UserId)
    }
},[]);

const getUser = async (id:string) => {
    await auth.getUser(id).then((response) => {setUser(response.data)}).finally(()=>setLoading(false));
}

  return (

    <>
    {loading && <ClimbBoxSpinner/>}
    {!loading && user && !user.blockedYou && (<>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <img src={user.BanerImageURL} alt="User banner" className="w-full h-32 object-cover" />
        <div className="absolute -bottom-12 left-6">
          <img
            src={user.imageURL}
            alt="User profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
        </div>
      </div>

      <div className="pt-16 px-6 pb-6">
        <div className="text-center">
          {!user.HideName &&
          <h2 className="text-xl font-bold">{`${user.prefix} ${user.first_Name} ${user.last_Name}`}</h2>}
          {!user.HideEmail &&
          <p className="text-gray-500">{user.email}</p> }
        </div>
        <div className="mt-4">
          <p className="text-gray-700 text-center">{user.Bio}</p>
        </div>
      </div>
    </div>
      </>)};
    </>
  );
}

export default ProfileUserSection;
