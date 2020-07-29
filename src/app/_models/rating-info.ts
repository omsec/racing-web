export interface RatingInfo {
  rating: number; // pipe as decimal
  upVotes: number;
  downVotes: number;
    // returned by Rating-Serve:
    // Vote of requested user/object
  userVote?: number;
}
