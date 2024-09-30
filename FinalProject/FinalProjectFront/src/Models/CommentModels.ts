interface ICommentDisplay {
  Id: string;
  Link: string | null;
  ImageURL: string | null;
  Text: string | null;
  AuthorName: string;
  AuthorId: string;
  UpVotes: number;
  DownVotes: number;
  TotalVotes: number;
  ParentPostId: string;
  ParentCommentId: string;
  Datetime: string;
  Comments: Array<ICommentDisplay> | null;
}

export type { ICommentDisplay };
