export interface RatingInfoRaw {
    rating: string;
    upVotes: string;
    downVotes: string;
    // returned by getRating:
    // Vote of requested user/object
    userVote?: string;
}
