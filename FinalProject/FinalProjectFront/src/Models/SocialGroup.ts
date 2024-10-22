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

interface ISocialGroupCard {
  id: string;
  name: string;
  description: string;
  banerImageURL : string;
  groupAdmin: IAppUserDisplay;
  isMemember: boolean;
}


export type { ISocialGroup,ISocialGroupCard };
