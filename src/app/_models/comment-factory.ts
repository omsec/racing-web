import { UserCommentRaw } from './comment-raw';
import { UserComment } from './comment';
import { CommentStatus } from './domain-codes';
import { environment } from '../../environments/environment';
import { DataObjectType, GenericFactory } from './generic';

export class CommentFactory {
  static fromRaw(commentRaw: UserCommentRaw): UserComment {

    let url: string;
    if (commentRaw.createdPic) {
      url = `${environment.appUrl}${commentRaw.createdPic}`; } else {
        url = 'assets/images/default-user.png';
      }

    return {
      ...commentRaw,
      objectType: GenericFactory.fromRaw(commentRaw.objectType),
      createdDT: new Date(),
      createdPic: url, // commentRaw.createdPic || 'test',
      modifiedDT: new Date(),
      answers: commentRaw?.answers?.map(answer => this.fromRaw(answer))
    };
  }

  // ToDo: alle empty's mit current User intialisieren
  static empty(ownerType: DataObjectType, ownerId: number): UserComment {
    return {
      id: -1,
      objectType: ownerType,
      objectId: ownerId,
      createdDT: new Date(),
      createdId: -1,
      createdName: '',
      createdPic: '', // ToDo: Default no USer Pic URL
      modifiedDT: null,
      modifiedId: null,
      modifiedName: null,
      parentId: null,
      statusCode: CommentStatus.pending,
      statusText: '',
      commentText: '',
      upVotes: 0,
      downVotes: 0,
      userVote: 0,
      answers: null
    };
  }

}
