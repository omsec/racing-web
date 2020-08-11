export interface UserCommentRaw {
  id: number;
  objectType: string;
  objectId: number;
  createdDT: string;
  createdId: number;
  createdName: string;
  createdPic?: string;
  modifiedDT?: string;
  modifiedId?: number;
  modifiedName?: string;
  parentId?: number;
  statusCode: number;
  statusText: string;
  commentText: string;
  upVotes: number;
  downVotes: number;
  userVote: number;
  answers?: UserCommentRaw[];
}
