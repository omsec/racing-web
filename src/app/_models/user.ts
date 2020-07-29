// Struktur ist leicht reduziert auf Grund "unnötiger" Standard-Infos wie "created by" etc.
export interface User {
  userId: number;
  created?: Date;
  modified?: Date;
  username: string;
  password: string;
  loginActive: boolean;
  roleCode: Role;
  roleText?: string;
  languageCode: Language;
  languageText?: string;
  xBox?: string;
  discord?: string;
  lastSeen?: Date;
  token?: string;
  profilePictureUrl: string;
}

export enum Role {
  Guest,
  Member,
  Administrator
}

export enum Language {
  English,
  German
}
