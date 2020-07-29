import { SharingMode } from './domain-codes';

export interface MetaInfo {
  id?: number;
  createdDT?: Date;
  createdId: number;
  createdName?: string;
  modifiedDT?: Date;
  modifiedId?: number;
  modifiedName?: string;
  sharingModeCode: SharingMode;
  sharingModeText?: string;
}

// used by 'count'-methods (pagination)
export interface CountInfo {
  count: number;
}
