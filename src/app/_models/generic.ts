// according to table prefixes
export enum DataObjectType {
  course = 'RAT',
  championship = 'CMP',
  user = 'USR',
  comment = 'CMT'
}

// standard response of add-Services
export interface NewItem {
  id: number;
}

export class GenericFactory {
  static fromRaw(typeDef: string): DataObjectType {
    let type: DataObjectType;

    switch (typeDef.toUpperCase()) {
      case 'RAT': type = DataObjectType.course; break;
      case 'CMP': type = DataObjectType.championship; break;
      case 'USR': type = DataObjectType.user; break;
      case 'CMT': type = DataObjectType.comment; break;
    }

    return type;
  }

  static getUrl(ownerType: DataObjectType, ownerId: number): string {
    let url = '/';

    switch (ownerType) {
      case DataObjectType.course: url += 'courses'; break;
      case DataObjectType.championship: url += 'championships'; break;
      case DataObjectType.user: url += 'users'; break;
    }
    url += '/' + ownerId;

    return url;
  }

}
