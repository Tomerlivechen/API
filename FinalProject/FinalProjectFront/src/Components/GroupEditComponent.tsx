import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ISocialGroupDisplay, ISocialGroupEdit } from "../Models/SocialGroup";
import { Groups } from "../Services/group-service";
import { useCloudinary } from "../CustomHooks/useCloudinary";

const groupService: ISocialGroupEdit = {
  id: "",
  name: "",
  description: "",
  banerImageURL: "",
  imageURL: "",
  newAdminEmail: "",
};

const GroupEditComponent = () => {
  const { groupId } = useParams();
  const [newGroupData, setNewGroupdata] = useState<ISocialGroupEdit | null>(
    null
  );
  const [
    initialGroupData,
    setInitialGroupData,
  ] = useState<ISocialGroupDisplay | null>(null);

  const getGroupDisplay = async (groupId: string) => {
    const response = await Groups.GetGroupbyId(groupId);
    setInitialGroupData(response.data);
  };

  const InitializeNewData = () => {
    if (initialGroupData) {
      setNewGroupdata({
        id: initialGroupData.id,
        name: initialGroupData.name,
        description: initialGroupData.description,
        banerImageURL: initialGroupData.banerImageURL,
        imageURL: initialGroupData.imageURL,
        newAdminEmail: "",
      });
    }
  };

  const toggleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    element: keyof ISocialGroupEdit
  ) => {
    setNewGroupdata((prev) => ({ ...prev, [element]: e.target.value }));
  };
  const [imageUrl, file, setImageURL, clear] = useCloudinary();
  const [
    bannerImageUrl,
    bannerfile,
    setbannerImageURL,
    clearbanner,
  ] = useCloudinary();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (groupId) {
      getGroupDisplay(groupId);
    }
  }, [groupId]);
};
