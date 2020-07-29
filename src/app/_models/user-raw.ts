export interface UserRaw {
  userId: number;
  created?: string;
  modified?: string;
  username: string;
  password: string;
  loginActive: string;
  roleCode: number;
  roleText?: string;
  languageCode: number;
  languageText?: string;
  xBox?: string;
  discord?: string;
  lastSeen?: string;
  token?: string;
  profilePictureUrl: string;
}
