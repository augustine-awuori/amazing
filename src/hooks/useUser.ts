export interface OtherAccounts {
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
  youtube?: string;
}

export interface User {
  _id: string;
  aboutMe: string;
  avatar: string;
  isAdmin: boolean;
  isVerified: boolean;
  name: string;
  otherAccounts: OtherAccounts;
  timestamp: number;
  username: string;
}

export interface UpdatableUserInfo extends OtherAccounts {
  name?: string;
  username?: string;
}
