import { IPost } from "./Interaction";
import { IAppUserDisplay } from "./UserModels";

interface ISocialGroup {
  id: string;
  name: string;
  description: string;
  groupCreatorId: string;
  groupCreator: IAppUserDisplay;
  adminId: string;
  groupAdmin: IAppUserDisplay;
  members: IAppUserDisplay[];
  posts: IPost[];
}

export type { ISocialGroup };
