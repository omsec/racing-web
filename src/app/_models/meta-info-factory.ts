import { MetaInfoRaw } from './meta-info-raw';
import { MetaInfo } from './meta-info';
import { SharingMode } from './domain-codes';

export class MetaInfoFactory {
  static fromRaw(metaInfoRaw: MetaInfoRaw): MetaInfo {
    return {
      ...metaInfoRaw,
      createdDT: new Date(metaInfoRaw.createdDT),
      modifiedDT: new Date(metaInfoRaw.modifiedDT)
    };
  }

  // void template => assigned by DB's SP
  static empty(): MetaInfo {
    return  {
      id: -1,
      createdDT: null,
      createdId: null,
      createdName: null,
      modifiedDT: null,
      modifiedId: null,
      modifiedName: null,
      sharingModeCode: SharingMode.notShared,
      sharingModeText: null
    };
  }

}
