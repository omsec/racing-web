import { ContentRaw } from './content-raw';
import { Content, ItemType } from './content';

export class ContentFactory {
  static fromRaw(content: ContentRaw): Content {
    return {
      ...content,
      itemType: content.itemType as ItemType, // type cast is okay since we can trust the api :-)
      lastAccess: new Date(content.lastAccess)
    };
  }

  static empty(): Content {
    return {
      id: 0,
      itemType: 'track',
      itemName: '',
      itemInfo1: '',
      itemInfo2: '',
      lastAccess: new Date(),
      rating: 0,
      seriesCode: null,
      carClassCode: null
    };
  }
}
