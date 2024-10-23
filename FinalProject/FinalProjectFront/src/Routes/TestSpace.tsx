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
import { ChatFrame } from "../Constants/Objects/ChatFrame";
import { INotificationDisplay } from "../Modals/NotificationMedels";

import { GroupCard } from "../Constants/Objects/GroupCard";
import { ISocialGroupCard } from "../Models/SocialGroup";
import { GroupCreation } from "../Constants/Objects/GroupCreation";
import GroupProfileSection from "../Constants/Objects/GroupProfileSection";
import GroupPage from "../Constants/Objects/GroupPage";

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
  categoryId: 0,
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
  lastActive: "",
  chatId: "",
  votedOn: [],
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

const not1: INotificationDisplay = {
  id: "67152ba4-a298-8008-bd9b-32e595943c96",
  type: "Comment",
  date: "2024-10-18-09-25",
  seen: false,
  hidden: false,
  referenceId: "6a02a93a-81b0-44e8-9531-1cac20fb7281",
  notifierId: "58119e4b-b525-4727-9f5e-d58db8110a60",
  notifiedId: "6a02a93a-21b0-44e8-9531-1cac20fb7281",
};

const not2: INotificationDisplay = {
  id: "67152ba4-a298-8008-bd9b-32e595943c96",
  type: "Message",
  date: "2024-10-19-18-10",
  seen: false,
  hidden: false,
  referenceId: "6a02a93a-21b0-44e2-9531-1cac20fb7281",
  notifierId: "6a02a93a-21b0-44e8-9531-1cac20fb7281",
  notifiedId: "58119e4b-b525-4727-9f5e-d58db8110a60",
};

const notes: INotificationDisplay[] = [
  {
    id: "0a0469e6-bed9-46d1-83b0-484bfd2662de",
    type: "Message",
    date: "2024-10-21-07-10",
    seen: false,
    hidden: false,
    referenceId: "d721f202-5757-4af9-933e-34f6ed45db2e",
    notifierId: "0ca34b95-1d9a-44c0-8781-86c95b73f61e",
    notifiedId: "ac1eb5d3-6d65-4408-9246-9e8055b77e1c",
  },
  {
    id: "146849d1-0e79-46ab-a1a2-c558f3535e34",
    type: "Message",
    date: "2024-10-21-07-10",
    seen: false,
    hidden: false,
    referenceId: "254eaf27-ef10-4c2a-a74b-5225853d0b0d",
    notifierId: "683c71e7-6496-4d98-bb80-b3622474816f",
    notifiedId: "08c6fa84-f849-4a2d-bea1-318fe292f807",
  },
  {
    id: "ccdcd489-63d2-43b0-8742-a7703cc7d0a7",
    type: "Message",
    date: "2024-10-21-07-10",
    seen: false,
    hidden: false,
    referenceId: "5c9644eb-9473-4685-a3c0-7a06bc4e783a",
    notifierId: "aa07f1e4-5904-4202-8678-11c22e71d44f",
    notifiedId: "5e779231-3316-48a0-b727-543ab5e7cb54",
  },
  {
    id: "74c98f2e-c32c-4ac2-a438-7cfe5361fc37",
    type: "Message",
    date: "2024-10-21-07-10",
    seen: false,
    hidden: false,
    referenceId: "18d2b2f1-80f1-40e5-9435-6ecf31f85a5c",
    notifierId: "49e9c950-f599-4686-beb1-fb4bffced75c",
    notifiedId: "3c52ec45-9df9-4252-9baf-6cb2f73cd227",
  },
  {
    id: "8fa14aeb-f8d9-4fde-81f4-612c2b31eeea",
    type: "Message",
    date: "2024-10-21-07-10",
    seen: false,
    hidden: false,
    referenceId: "e537481d-3326-4b28-b99a-2fdbd9a9e6f4",
    notifierId: "68e5f4c4-42f3-4a33-a571-149e6a9899b6",
    notifiedId: "95e2d7e6-8149-49ff-87b6-58fc01de6ee7",
  },
  {
    id: "70bc8867-b1ab-41bd-95f4-4a68d71c77d7",
    type: "Message",
    date: "2024-10-21-07-10",
    seen: false,
    hidden: false,
    referenceId: "30399ad8-dc04-46c9-a9ab-40d7a745cd8e",
    notifierId: "e18621c5-582e-41b0-a8fa-3cb94abf20a5",
    notifiedId: "2c2389a5-9df0-4801-bb58-c4c57170f162",
  },
  {
    id: "5bf799b3-42eb-4330-b661-8bfcd4d2cc29",
    type: "Comment",
    date: "2024-10-21-07-10",
    seen: false,
    hidden: false,
    referenceId: "dc04d811-bea3-47b1-b880-74c79ff982e2",
    notifierId: "41af66cc-8f41-40a6-acd7-8b9f123ddacc",
    notifiedId: "f028ec13-555f-4718-9021-cb397f7af536",
  },
  {
    id: "a7668624-8a87-4248-a045-e6448f7e3bdf",
    type: "Comment",
    date: "2024-10-21-07-10",
    seen: false,
    hidden: false,
    referenceId: "dbd8008e-3cd9-4132-808d-7312f640cc0c",
    notifierId: "91c70b76-2427-4108-9b57-e052d5f46cac",
    notifiedId: "756f76a3-4a55-46f3-bd88-19fcdab6898c",
  },
  {
    id: "90a0bb5e-d529-4901-838b-0ec73ce55fc3",
    type: "Message",
    date: "2024-10-21-07-10",
    seen: false,
    hidden: false,
    referenceId: "bcdfe87c-736d-4a76-bd83-2bf5dd3004f2",
    notifierId: "f91ec742-efde-4b5c-ba29-4d172e9f2378",
    notifiedId: "bb22797c-15ce-48ac-bfc6-166942958838",
  },
  {
    id: "b64f5917-c396-4156-8062-240c177c0b2d",
    type: "Comment",
    date: "2024-10-21-07-10",
    seen: false,
    hidden: false,
    referenceId: "a6901cf2-d5d0-4896-aeaa-61e37a141f04",
    notifierId: "e10af8c3-0f05-44ad-9517-ab68f8491f00",
    notifiedId: "a8e75dab-02aa-4826-9351-d6d74f9452bf",
  },
];

const SGC: ISocialGroupCard = {
  id: "a6901cf2-d5d0-4896-aeaa-61e37a141f04",
  name: "The Social Group",
  description: "string",
  banerImageURL:
    "https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg?t=st=1728568993~exp=1728572593~hmac=2908d0da32e0a3b6215998c0ccb4d581a9af827c194f714586d302efb63015ac&w=1380",
  groupAdmin: user1,
  isMemember: false,
};

const gId: string = "82c4605f-8c3e-4326-9e46-034a1b2a0991";

function TestSpace() {
  return (
    <>
      <div>Test Space Elemens</div>
      <div>---------------------------</div>
      <div className="flex"></div>
      <div>---------------------------</div>
      <div>Test Space Elemens</div>
    </>
  );
}

export default TestSpace;
