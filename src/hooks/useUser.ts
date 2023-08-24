export interface User {
  _id: string;
  avatar: string;
  isAdmin: boolean;
  isVerified: boolean;
  name: string;
  otherAccounts: {
    instagram?: string;
    twitter?: string;
    whatsapp?: string;
    youtube?: string;
  };
  timestamp: number;
  username: string;
}
