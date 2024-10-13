import React, { useEffect, useState } from "react";
import { IAppUserDisplay } from "../../Models/UserModels";
import { auth } from "../../Services/auth-service";
import { useUser } from "../../CustomHooks/useUser";
import ClimbBoxSpinner from "../../Spinners/ClimbBoxSpinner";
import { FaUserGear } from "react-icons/fa6";
import { colors } from "../Patterns";
import { useNavigate } from "react-router-dom";
interface ProfileUserSectionProps {
  userId: string | null;
}

//const UserLane: React.FC<ProfileUserSectionProps> = ({ userId }) => {
const UserLane = () => {
  const [user, setUser] = useState<IAppUserDisplay | null>(null);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const user1: IAppUserDisplay = {
    id: "12345",
    prefix: "Dr",
    first_Name: "Tomer",
    last_Name: "Levi",
    userName: "tomerlevi87",
    email: "tomer.levi@artbioscience.com",
    imageURL:
      "https://res.cloudinary.com/dhle9hj3n/image/upload/v1728074215/ucdbrgjng0fssqqot8ue.jpg",
    following: true,
    blocked: false,
    blockedYou: false,
    pronouns: "he/him",
    bio:
      "https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg?t=st=1728568993~exp=1728572593~hmac=2908d0da32e0a3b6215998c0ccb4d581a9af827c194f714586d302efb63015ac&w=1380",
    banerImageURL:
      "https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg?t=st=1728568993~exp=1728572593~hmac=2908d0da32e0a3b6215998c0ccb4d581a9af827c194f714586d302efb63015ac&w=1380",
    hideEmail: false,
    hideName: false,
    hideBlocked: false,
  };
useEffect(()=>{setUser(user1)},[])
  ;
//   const userdata = useUser();
//   const [yours, setYours] = useState(false);
//   useEffect(() => {
//     if (userId) {
//       getUser(userId);
//     } else if (userdata.userInfo.UserId) {
//       getUser(userdata.userInfo.UserId);
//       setYours(true);
//     }
//   }, [userId, userdata.userInfo.UserId]);

//   const getUser = async (id: string) => {
//     console.log(id);
//     await auth
//       .getUser(id)
//       .then((response) => {
//         console.log(response);
//         setUser(response.data);
//       })
//       .finally(() => setLoading(false));
//   };

  return (
    <>
      <div className="p-1">
        {loading && <ClimbBoxSpinner />}
        {!loading && user && !user.blockedYou && (
          <>
            <div
              className={`${colors.ElementFrame} shadow-lg rounded-lg overflow-hidden w-full`}
            >
              <div className="relative">
                <img
                  src={user.banerImageURL}
                  alt="User banner"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute -bottom-12 left-16 flex items-center space-x-4">
                  <img
                    src={user.imageURL}
                    alt="User profile"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                  />

                </div>
             
              </div>
              <div className={`pt-6 px-6 flex justify-center items-center pb-6 ${colors.ButtonFont}`}>
  <div className="text-center">
    <p className={`text-2xl font-bold mt-5 ${colors.ButtonFont}`}>
      {user.userName}
    </p>
    {!user.hideName && (
      <h2 className="text-xl font-bold">
        {`${user.prefix}. ${user.first_Name} ${user.last_Name}`}
      </h2>
    )}
  </div>


              </div>
            </div>
          </>
        )}
        ;
      </div>
    </>
  );
};

export default UserLane;
