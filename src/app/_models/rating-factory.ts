import { RatingInfoRaw } from './rating-info-raw';
import { RatingInfo } from './rating-info';

export class RatingFactory {
  static fromRaw(ratingInfoRaw: RatingInfoRaw): RatingInfo {
    return {
      // alternative: parseInt
      rating: +ratingInfoRaw.rating,
      upVotes: +ratingInfoRaw.upVotes,
      downVotes: +ratingInfoRaw.downVotes,
      userVote: +ratingInfoRaw.userVote
    };
  }

  static empty(): RatingInfo {
    return {
      rating: 0,
      upVotes: 0,
      downVotes: 0,
      userVote: 0 // VoteAction.notVoted
    };
  }
}
