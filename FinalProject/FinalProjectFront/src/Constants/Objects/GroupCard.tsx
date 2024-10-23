import { useEffect, useState } from "react";
import { ISocialGroupCard } from "../../Models/SocialGroup";
import ElementFrame from "./ElementFrame";
import ClipSpinner from "../../Spinners/ClipSpinner";
import { Tooltip } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { colors } from "../Patterns";
import { useUser } from "../../CustomHooks/useUser";
import { Groups } from "../../Services/group-service";
import { useNavigate } from "react-router-dom";

const GroupCard: React.FC<{
  GroupCardData: ISocialGroupCard;
}> = ({ GroupCardData }) => {
  const [GroupCard, setGroupCard] = useState<ISocialGroupCard | null>(null);
  const [loading, setLoading] = useState(true);
  const userContext = useUser();
  const navagate = useNavigate();

  useEffect(() => {
    if (GroupCardData) {
      setGroupCard(GroupCardData);
    }
  }, []);

  useEffect(() => {
    if (GroupCard) {
      setLoading(false);
    }
  }, [GroupCard]);

  const deleteGroup = async () => {
    if (GroupCard) {
      await Groups.DeleteGroup(GroupCard.id);
    }
  };

  const goToGroup = () => {
    navagate(`/Group/${GroupCard?.id}`);
  };

  return (
    <>
      {loading && <ClipSpinner />}
      {!loading && GroupCard && (
        <>
          <div className="hover:cursor-pointer" onClick={() => goToGroup()}>
            <ElementFrame
              tailwind={`h-48 w-48 border-2 border-y-amber-700  border-x-teal-500 flex flex-col items-center justify-center `}
            >
              {(userContext.userInfo.IsAdmin == "true" ||
                userContext.userInfo.UserId == GroupCard.admin.id) && (
                <div className="absolute top-1 right-0 hover:cursor-pointer">
                  <button
                    className={`${colors.CommentColors} rounded-xl`}
                    onClick={() => deleteGroup()}
                  >
                    <Tooltip title="delete">
                      <IoClose size={18} />
                    </Tooltip>
                  </button>
                </div>
              )}
              <div>
                <img src={GroupCard.banerImageURL} className={`p-3`} />
              </div>
              <div className="font-bold">{GroupCard.name}</div>
              <div>
                {GroupCard.isMemember && (
                  <div className="text-xs">You are a member</div>
                )}
              </div>
            </ElementFrame>
          </div>
        </>
      )}
    </>
  );
};

export { GroupCard };
