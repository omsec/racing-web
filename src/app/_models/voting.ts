import { DataObjectType } from './generic';

export interface Voting {
  objectType: DataObjectType;
  objectId: number;
  upVotes: number;
  downVotes: number;
  userVote: number;
}
