import { DataObjectType } from './generic';

export interface UserComment {
  id: number;
  objectType: DataObjectType;
  objectId: number;
  createdDT: Date;
  createdId: number;
  createdName: string;
  createdPic: string;
  modifiedDT?: Date;
  modifiedId?: number;
  modifiedName?: string;
  parentId?: number;
  statusCode: number;
  statusText: string;
  commentText: string;
  upVotes: number;
  downVotes: number;
  userVote: number;
  answers?: UserComment[];
}
