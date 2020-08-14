import { VoteRaw } from '../_models/vote-raw';
import { Vote, VoteAction } from '../_models/vote';
import { GenericFactory } from './generic';

export class VoteFactory {
  static fromRaw(voteRaw: VoteRaw): Vote {
    return {
      ...voteRaw,
      itemType: GenericFactory.fromRaw(voteRaw.itemType)
    };
  }

  static empty(): Vote {
    return {
      itemType: null,
      itemId: -1,
      userId: -1,
      vote: VoteAction.notVoted
    };
  }
}
