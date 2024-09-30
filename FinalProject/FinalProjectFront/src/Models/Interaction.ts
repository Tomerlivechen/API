import { ISocialGroup } from "./SocialGroup";
import { IAppUserDisplay } from "./UserModels";

interface IInteraction {
  id: string;
  link: string;
  imageUrl: string;
  text: string;
  author: IAppUserDisplay;
  votes: Vote[];
  upVotes: number;
  downVotes: number;
  totalVotes: number;
  datetime: string;
  comments: IComment[];
  calcVotes: () => void;
}

interface Vote {
  id: string;
  voter: IAppUserDisplay;
  voted: number;
}

interface IPost extends IInteraction {
  title: string;
  category?: ICategory;
  group?: ISocialGroup;
  keyWords: string[];
}

interface IComment extends IInteraction {
  parentPost?: IPost;
  parentComment?: IComment;
}

interface ICategory {
  id: number;
  name: string;
}

export type { IInteraction, Vote, IPost, IComment, ICategory };
