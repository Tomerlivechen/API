import { IChat } from "./ChatModels";
import { IPost } from "./Interaction";
import { ISocialGroup } from "./SocialGroup";

interface IAppUserDisplay {
  id: string;
  prefix: string;
  first_Name: string;
  last_Name: string;
  userName: string;
  email: string;
  imageURL: string;
  following: boolean;
  blocked: boolean;
  blockedYou: boolean;
  pronouns: string;
}

const AppUserDisplay = {
  id: "",
  prefix: "",
  first_Name: "",
  last_Name: "",
  userName: "",
  email: "",
  imageURL: "",
  following: false,
  blocked: false,
  blockedYou: false,
  pronouns: "",
};

interface IAppUserFull {
  prefix: string;
  firstName: string;
  lastName: string;
  pronouns: string;
  imageUrl: string;
  imageAlt: string;
  permissionLevel: string;
  following: IAppUserDisplay[];
  blocked: IAppUserDisplay[];
  posts: IPost[];
  socialGroups: ISocialGroup[];
  voteScore: number;
  chats: IChat[];
  notifications: Notification[];
}

export type { IAppUserDisplay, IAppUserFull };
export { AppUserDisplay };
