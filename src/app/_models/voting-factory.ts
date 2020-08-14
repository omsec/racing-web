import { VotingRaw } from './voting-raw';
import { Voting } from './voting';
import { DataObjectType, GenericFactory } from './generic';
import { VoteAction } from './vote';

export class VotingFactory {
  static fromRaw(votingRaw: VotingRaw): Voting {
    return {
      ...votingRaw,
      objectType: GenericFactory.fromRaw(votingRaw.objectType)
    };
  }

  static empty(ownerType: DataObjectType, ownerId: number): Voting {
    return {
      objectType: ownerType,
      objectId: ownerId,
      upVotes: 0,
      downVotes: 0,
      userVote: VoteAction.notVoted
    };
  }
}
