import { IPost } from "./Interaction";
import { IAppUserDisplay } from "./UserModels";

interface ISocialGroup {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  banerImageURL : string;
  groupCreatorId: string;
  groupCreator: IAppUserDisplay;
  adminId: string;
  groupAdmin: IAppUserDisplay;
  members: IAppUserDisplay[];
  posts: IPost[];
  isMemember: boolean;
}

interface ISocialGroupDisplay {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  banerImageURL : string;
  groupCreatorId: string;
  adminId: string;
  AdminName: string;
  isMemember: boolean;
}


interface ISocialGroupCard {
  id: string;
  name: string;
  description: string;
  banerImageURL : string;
  admin: IAppUserDisplay;
  isMemember: boolean;
}

interface INewSocialGroup {
  name: string;
  description: string;
}
export type { ISocialGroup,ISocialGroupCard,INewSocialGroup,ISocialGroupDisplay };
