// most attributes will be assigned by server
export interface MetaInfoRaw {
  id?: number;
  createdDT?: string;
  createdId: number; // null for modify/remove
  createdName?: string;
  modifiedDT?: string;
  modifiedId?: number;
  modifiedName?: string;
  sharingModeCode: number;
  sharingModeText?: string;
}
