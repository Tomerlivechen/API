import React, { useEffect, useState } from "react";
import { IAppUserDisplay } from "../../Models/UserModels";
import { auth } from "../../Services/auth-service";
import { useUser } from "../../CustomHooks/useUser";
import ClimbBoxSpinner from "../../Spinners/ClimbBoxSpinner";
import { FaUserGear } from "react-icons/fa6";
import { colors } from "../Patterns";
import { useNavigate } from "react-router-dom";
import { FaHandshakeSlash } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaHandHolding } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";

interface ProfileUserSectionProps {
  userId: string | null;
}

const ProfileUserSection: React.FC<ProfileUserSectionProps> = ({ userId }) => {
  const userContex = useUser();
  const [user, setUser] = useState<IAppUserDisplay | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userdata = useUser();
  const [yours, setYours] = useState(false);
  useEffect(() => {
    if (userId) {
      getUser(userId);
    } else if (userdata.userInfo.UserId) {
      getUser(userdata.userInfo.UserId);
      setYours(true);
    }
  }, [userId, userdata.userInfo.UserId]);

  const getUser = async (id: string) => {
    console.log(id);
    await auth
      .getUser(id)
      .then((response) => {
        console.log(response);
        setUser(response.data);
      })
      .finally(() => setLoading(false));
  };

  const toggleFollow = async () => {
    if (user) {
      if (user.following) {
        const success = await auth.unfollow(user.id);
        if (success.status == 200) {
          setUser((prev) => {
            if (!prev) return prev;
            return { ...prev, following: false };
          });
        }
      }
      if (!user.following) {
        const success = await auth.follow(user.id);
        if (success.status == 200) {
          setUser((prev) => {
            if (!prev) return prev;
            return { ...prev, following: true };
          });
        }
      }
    }
  };
  const toggleBlock = async () => {
    if (user) {
      if (user.blocked) {
        const success = await auth.unBlock(user.id);
        if (success.status == 200) {
          setUser((prev) => {
            if (!prev) return prev;
            return { ...prev, blocked: false };
          });
        }
      }
      if (!user.blocked) {
        const success = await auth.block(user.id);
        if (success.status == 200) {
          setUser((prev) => {
            if (!prev) return prev;
            return { ...prev, blocked: true };
          });
        }
      }
    }
  };

  return (
    <>
      <div className="p-1">
        {loading && <ClimbBoxSpinner />}
        {!loading && user && !user.blockedYou && (
          <>
            <div
              className={`${colors.ElementFrame} shadow-lg rounded-lg overflow-hidden w-2/3`}
            >
              <div className="relative">
                <img
                  src={user.banerImageURL}
                  alt="User banner"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute -bottom-12 left-6 flex items-center space-x-4">
                  <img
                    src={user.imageURL}
                    alt="User profile"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                  />
                  <p
                    className={`text-2xl font-bold text-left mt-5 ${colors.ButtonFont}`}
                  >
                    {user.userName}
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
                  {!user.hideName && (
                    <h2 className="text-xl font-bold text-left">{`${user.prefix}. ${user.first_Name} ${user.last_Name}`}</h2>
                  )}
                  {!user.hideEmail && (
                    <p className=" text-left">{user.email}</p>
                  )}

                  <div
                    className={`flex justify-between items-center ${
                      userId && "-mt-10"
                    }`}
                  >
                    <div className=" ml-auto flex gap-3">
                      {!user.blockedYou &&
                        userContex.userInfo.UserId !== user.id && (
                          <>
                            {user.following ? (
                              <button
                                className={`${colors.ElementFrame}  p-2 rounded-xl flex items-center gap-2`}
                                onClick={toggleFollow}
                              >
                                <FaHandHolding size={25} />
                                <span> Unfollow</span>
                              </button>
                            ) : (
                              <button
                                className={`${colors.ElementFrame} ${colors.ActiveText} p-2 rounded-xl flex items-center gap-2 hover:animate-bounce`}
                                onClick={toggleFollow}
                              >
                                <FaHandHoldingHeart size={25} />
                                <span> Follow</span>
                              </button>
                            )}
                            {user.blocked ? (
                              <button
                                onClick={toggleBlock}
                                className={`${colors.ElementFrame}  p-2 rounded-xl flex items-center gap-2`}
                              >
                                <FaHandshake size={25} />
                                <span>Unblock</span>
                              </button>
                            ) : (
                              <button
                                onClick={toggleBlock}
                                className={`${colors.ElementFrame}  p-2 rounded-xl flex items-center gap-2`}
                              >
                                <FaHandshakeSlash size={25} />
                                <span>Block</span>
                              </button>
                            )}
                          </>
                        )}
                      {user.blockedYou && (
                        <div className="text-sm text-zinc-600">
                          You Have been blocked
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="mt-4">
                      <h1 className="text-2xl font-bold">About</h1>
                    </div>
                  </div>
                  <p className=" text-left ">{user.bio}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileUserSection;
