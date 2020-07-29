import { VoteRaw } from '../_models/vote-raw';
import { Vote, VoteAction } from '../_models/vote';

export class VoteFactory {
  static fromRaw(voteRaw: VoteRaw): Vote {
    return {
      ...voteRaw
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
