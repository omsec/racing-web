import { DataObjectType } from './generic';

export interface Vote {
  itemType: DataObjectType;
  itemId: number;
  userId: number;
  vote: number;
}

export enum VoteAction {
  notVoted = 0,
  negative = -1,
  positive = 1
}
