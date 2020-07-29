export interface Content {
  id: number;
  itemType: ItemType;
  itemName: string;
  itemInfo1: string;
  itemInfo2: string;
  lastAccess: Date;
  rating: number;
  seriesCode?: number;
  carClassCode?: number;
}

export type ItemType = 'track' | 'championship';
