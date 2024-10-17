import { ICommentDisplay, IPostDisplay } from "../Models/Interaction";
import PostView from "../Constants/Objects/PostView";
import { PostList } from "../Components/PostList";
import PostCard from "../Constants/Objects/PostCard";
import UserTab, { UserTabProps } from "../Constants/Objects/UserTab";
import { IAppUserDisplay } from "../Models/UserModels";
import { dialogs } from "../Constants/AlertsConstant";
import SendPostComponent from "../Components/SendPostComponent";
import CommentView from "../Constants/Objects/CommentView";
import ProfileUserSection from "../Constants/Objects/ProfileUserSection";
import EditUserComponent from "../Components/EditUserComponent";
import ResizableFrame from "../Constants/Objects/ResizableFrame";
import { colors } from "../Constants/Patterns";
import UserLane from "../Constants/Objects/UserLane";
import { MessageComponent } from "../Constants/Objects/MessageComponent";
import { IMessage } from "../Models/ChatModels";
import { PostFrame } from "../Constants/Objects/PostFrame";
import { AccessabilityPanel } from "../Constants/Objects/AccessabilityPanel";
import {
  ISendMessageComponent,
  SendMessageComponent,
} from "../Components/SendMessageComponent";
import { ChatFrame, IChatFrameParams } from "../Constants/Objects/ChatFrame";

const commentsArray3: ICommentDisplay[] = [
  {
    id: "1",
    link: "https://example.com/1",
    imageURL: "https://via.placeholder.com/150",
    text: "This is a comment a1",
    authorName: "Author 1",
    authorId: "author1",
    totalVotes: 5,
    parentPostId: "post1",
    parentCommentId: "",
    hasVoted: false,
    datetime: "2024-10-01T10:00:00Z",
    comments: null,
  },
  {
    id: "2",
    link: "https://example.com/2",
    imageURL: "https://via.placeholder.com/150",
    text: "This is a comment a2",
    authorName: "Author 2",
    authorId: "author2",
    totalVotes: 3,
    parentPostId: "post1",
    parentCommentId: "",
    hasVoted: true,
    datetime: "2024-10-01T10:05:00Z",
    comments: null,
  },
  {
    id: "3",
    link: "https://example.com/3",
    imageURL: "https://via.placeholder.com/150",
    text: "This is a comment a3a",
    authorName: "Author 3",
    authorId: "author3",
    totalVotes: 0,
    parentPostId: "post1",
    parentCommentId: "",
    hasVoted: false,
    datetime: "2024-10-01T10:10:00Z",
    comments: null,
  },
  {
    id: "4",
    link: "https://example.com/4",
    imageURL: "https://via.placeholder.com/150",
    text: "This is a comment a4",
    authorName: "Author 4",
    authorId: "author4",
    totalVotes: 2,
    parentPostId: "post1",
    parentCommentId: "",
    hasVoted: true,
    datetime: "2024-10-01T10:15:00Z",
    comments: null,
  },
];

const commentsArray2: ICommentDisplay[] = [
  {
    id: "1",
    link: "https://example.com/1",
    imageURL: "https://via.placeholder.com/150",
    text: "This is a comment a1",
    authorName: "Author 1",
    authorId: "author1",
    totalVotes: 5,
    parentPostId: "post1",
    parentCommentId: "",
    hasVoted: false,
    datetime: "2024-10-01T10:00:00Z",
    comments: commentsArray3,
  },
  {
    id: "2",
    link: "https://example.com/2",
    imageURL: "https://via.placeholder.com/150",
    text: "This is a comment a2",
    authorName: "Author 2",
    authorId: "author2",
    totalVotes: 3,
    parentPostId: "post1",
    parentCommentId: "",
    hasVoted: true,
    datetime: "2024-10-01T10:05:00Z",
    comments: null,
  },
  {
    id: "3",
    link: "https://example.com/3",
    imageURL: "https://via.placeholder.com/150",
    text: "This is a comment a3a",
    authorName: "Author 3",
    authorId: "author3",
    totalVotes: 0,
    parentPostId: "post1",
    parentCommentId: "",
    hasVoted: false,
    datetime: "2024-10-01T10:10:00Z",
    comments: commentsArray3,
  },
  {
    id: "4",
    link: "https://example.com/4",
    imageURL: "https://via.placeholder.com/150",
    text: "This is a comment a4",
    authorName: "Author 4",
    authorId: "author4",
    totalVotes: 2,
    parentPostId: "post1",
    parentCommentId: "",
    hasVoted: true,
    datetime: "2024-10-01T10:15:00Z",
    comments: null,
  },
];

const commentsArray: ICommentDisplay[] = [
  {
    id: "1",
    link: "https://example.com/1",
    imageURL: "https://via.placeholder.com/150",
    text: "This is a comment 1",
    authorName: "Author 1",
    authorId: "author1",
    totalVotes: 5,
    parentPostId: "post1",
    parentCommentId: "",
    hasVoted: false,
    datetime: "2024-10-01T10:00:00Z",
    comments: null,
  },
  {
    id: "2",
    link: "https://example.com/2",
    imageURL: "https://via.placeholder.com/150",
    text: "This is a comment 2",
    authorName: "Author 2",
    authorId: "author2",
    totalVotes: 3,
    parentPostId: "post1",
    parentCommentId: "",
    hasVoted: true,
    datetime: "2024-10-01T10:05:00Z",
    comments: commentsArray2,
  },
  {
    id: "3",
    link: "https://example.com/3",
    imageURL: "https://via.placeholder.com/150",
    text: "This is a comment 3",
    authorName: "Author 3",
    authorId: "author3",
    totalVotes: 0,
    parentPostId: "post1",
    parentCommentId: "",
    hasVoted: false,
    datetime: "2024-10-01T10:10:00Z",
    comments: null,
  },
  {
    id: "4",
    link: "https://example.com/4",
    imageURL: "https://via.placeholder.com/150",
    text: "This is a comment 4",
    authorName: "Author 4",
    authorId: "author4",
    totalVotes: 2,
    parentPostId: "post1",
    parentCommentId: "",
    hasVoted: true,
    datetime: "2024-10-01T10:15:00Z",
    comments: null,
  },
  {
    id: "5",
    link: "https://example.com/5",
    imageURL: "https://via.placeholder.com/150",
    text: "This is a comment 5",
    authorName: "Author 5",
    authorId: "author5",
    totalVotes: 1,
    parentPostId: "post1",
    parentCommentId: "",
    hasVoted: false,
    datetime: "2024-10-01T10:20:00Z",
    comments: null,
  },
  {
    id: "6",
    link: "https://example.com/6",
    imageURL: "https://via.placeholder.com/150",
    text: "This is a comment 6",
    authorName: "Author 6",
    authorId: "author6",
    totalVotes: 4,
    parentPostId: "post1",
    parentCommentId: "",
    hasVoted: false,
    datetime: "2024-10-01T10:25:00Z",
    comments: null,
  },
  {
    id: "7",
    link: "https://example.com/7",
    imageURL: "https://via.placeholder.com/150",
    text: "This is a comment 7",
    authorName: "Author 7",
    authorId: "author7",
    totalVotes: 5,
    parentPostId: "post1",
    parentCommentId: "",
    hasVoted: false,
    datetime: "2024-10-01T10:30:00Z",
    comments: null,
  },
  {
    id: "8",
    link: "https://example.com/8",
    imageURL: "https://via.placeholder.com/150",
    text: "This is a comment 8",
    authorName: "Author 8",
    authorId: "author8",
    totalVotes: 3,
    parentPostId: "post1",
    parentCommentId: "",
    hasVoted: true,
    datetime: "2024-10-01T10:35:00Z",
    comments: null,
  },
  {
    id: "9",
    link: "https://example.com/9",
    imageURL: "https://via.placeholder.com/150",
    text: "This is a comment 9",
    authorName: "Author 9",
    authorId: "author9",
    totalVotes: 2,
    parentPostId: "post1",
    parentCommentId: "",
    hasVoted: false,
    datetime: "2024-10-01T10:40:00Z",
    comments: null,
  },
  {
    id: "10",
    link: "https://example.com/10",
    imageURL: "https://via.placeholder.com/150",
    text: "This is a comment 10",
    authorName: "Author 10",
    authorId: "author10",
    totalVotes: 0,
    parentPostId: "post1",
    parentCommentId: "",
    hasVoted: true,
    datetime: "2024-10-01T10:45:00Z",
    comments: null,
  },
];

const post1: IPostDisplay = {
  id: "post1",
  link: "https://react-icons.github.io/react-icons/",
  imageURL:
    "https://res.cloudinary.com/dhle9hj3n/image/upload/v1728074215/ucdbrgjng0fssqqot8ue.jpg",
  text:
    "This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.",
  authorName: "John Doe",
  authorId: "auth1",
  totalVotes: 8,
  datetime: "2024-10-04T10:30:00Z",
  comments: commentsArray,
  hasVoted: false,
  title: "This is the first post",
  category: null,
  keyWords: [],
};

const coment1: ICommentDisplay = {
  id: "post1",
  link: "https://react-icons.github.io/react-icons/",
  imageURL:
    "https://res.cloudinary.com/dhle9hj3n/image/upload/v1728074215/ucdbrgjng0fssqqot8ue.jpg",
  text:
    "This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.This is the first comment.",
  authorName: "John Doe",
  authorId: "auth1",
  totalVotes: 8,
  datetime: "2024-10-04T10:30:00Z",
  comments: commentsArray,
  hasVoted: false,
  parentPostId: "post1",
  parentCommentId: "",
};

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

const message1: IMessage = {
  id: "sghsfsghf",
  chatId: "fghfghgfh",
  userId: "eaf77a97-5fd8-4a48-81a5-b3edfaaf6ab4",
  userName: "SysAdmin",
  message: "this is a test message",
  Datetime: "2024-10-12-10-12-06",
};

const message2: IMessage = {
  id: "6710e34a-6828-8008-91a2-e60ab4dfb656",
  chatId: "6710e34a-328y-8008-91a2-e60ab4dfb656",
  userId: "eaf77a97-5fd8-4a48-81a5-b3edfaaf6ab4",
  userName: "Diana",
  message: "Hey, how are you?",
  Datetime: "2024-10-17-08-30-15",
};

const message3: IMessage = {
  id: "5728b27c-8823-4009-12b5-f47ef59d3f1d",
  chatId: "5728b27c-328y-8008-91a2-f47ef59d3f1d",
  userId: "5728b27c-6828-6789-91a2-f47ef59d3f1d",
  userName: "Diana",
  message: "Sure, let's meet at 2 PM tomorrow for the review session.",
  Datetime: "2024-10-17-09-15-45",
};

const message4: IMessage = {
  id: "fd73eb2c-8298-4927-83c4-a54fb69eabc9",
  chatId: "fd73eb2c-328y-8008-91a2-a54fb69eabc9",
  userId: "eaf77a97-5fd8-4a48-81a5-b3edfaaf6ab4",
  userName: "SysAdmin",
  message:
    "Just wanted to let you know the project is on track and we should be able to deliver it by the end of the week. I'll keep you posted if there are any changes.",
  Datetime: "2024-10-17-11-42-08",
};

const message5: IMessage = {
  id: "2e76b38d-8820-4fa3-9199-6d2b2d5fbc88",
  chatId: "2e76b38d-328y-8008-91a2-6d2b2d5fbc88",
  userId: "2e76b38d-6828-6789-91a2-6d2b2d5fbc88",
  userName: "Diana",
  message: "Okay, sounds good. I'll be there!",
  Datetime: "2024-10-17-14-05-22",
};

const message6: IMessage = {
  id: "sghsfsghf",
  chatId: "fghfghgfh",
  userId: "eaf77a97-5fd8-4a48-81a5-b3edfaaf6ab4",
  userName: "SysAdmin",
  message:
    "thiis is a very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long test text message",
  Datetime: "2024-10-12-10-13-16",
};

const messagesend: ISendMessageComponent = {
  chatId: "2e76b38d-328y-8008-91a2-6d2b2d5fbc88",
};

const mesages = [message1, message2, message3, message4, message5, message6];

const tabProps: UserTabProps = {
  UserDisplay: user1,
  buttonAction: () => {
    dialogs.showtext("it works");
  },
};

const chatBoxPorompt: IChatFrameParams = {
  chatId: "eaf77a97-5fd8-4778-81a5-b3edfaaf6ab4",
  user1Id: "eaf44a97-5fd8-4a48-81a5-b3edfaaf6ab4",
  user1name: "serte",
  user2Id: "eaf77a97-5fd8-4a48-81a5-b3edfaaf6ab4",
  user2name: "vvvfgdf",
  messages: mesages,
};

function TestSpace() {
  return (
    <>
      <div>Test Space Elemens</div>
      <div>---------------------------</div>
      <div className="w-96">
        <ChatFrame {...chatBoxPorompt} />
      </div>
      <div>---------------------------</div>
      <div>Test Space Elemens</div>
    </>
  );
}

export default TestSpace;
