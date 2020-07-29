export interface Image {
  id: number; // file handle
  createdById: number;
  userName: string;
  xBoxName: string;
  discordName: string;
  uploadedDT: Date;
  imageURL: string;
  originalFileName: string;
  description: string;
}
