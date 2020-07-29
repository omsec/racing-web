import { TagRaw } from './tag-raw';
import { Tag } from './tag';

export class TagFactory {
  static fromRaw(tagRaw: TagRaw[]): Tag[] {
    if (!tagRaw) { return null; }
    return tagRaw.map(raw => {
      return {
        valueCode: raw.valueCode,
        valueText: raw.valueText
      };
    });
  }

  // sinnvoll?
  /*
  static empty(): Tag[] {
    return { }
  }
  */
}
