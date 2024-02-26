import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import {
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { v4 } from "uuid";

import auth from "../services/auth";
import config from "./config";

export interface ChatUser extends User {}

export interface ChatUserData {
  displayName: string;
  email: string;
  photoURL?: string;
}

interface NewChatUser extends ChatUserData {
  password: string;
}

export type UserInfo = {
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
  uid: string;
};

export type RawChatDataDate = {
  seconds: number;
  nanoseconds: number;
};

export type RawChatData = {
  date: RawChatDataDate;
  userInfo: UserInfo;
  lastMessage?: { text: string };
};

export type RawChat = {
  [combinedId: string]: RawChatData;
};

const USERS_COLLECTION = "users";
export const CHATS_COLLECTION = "chats";
export const USER_CHATS_COLLECTION = "user.chats";

const usersRef = collection(config.db, USERS_COLLECTION);

const createUser = async (user: NewChatUser) => {
  try {
    const { displayName, email, password, photoURL } = user;

    const res = await createUserWithEmailAndPassword(
      config.auth,
      email,
      password
    );

    await initNewUserChat(res.user, {
      displayName,
      email,
      photoURL,
    });

    return res;
  } catch (error) {
    toast.error((error as string) || "Chat sign up failed!");
  }
};

async function initNewUserChat(user: ChatUser, data?: ChatUserData) {
  const userData = data || (user as ChatUserData);

  await Promise.all([
    updateChatUser(user.uid, userData),
    initChat(user.uid, USER_CHATS_COLLECTION, {}),
  ]);
}

async function initChat(
  id: string,
  collectionName = CHATS_COLLECTION,
  data?: object
) {
  const docData = data || { messages: [] };

  return await setDoc(doc(config.db, collectionName, id), docData);
}

// TODO: add this to google auth
async function updateChatUser(userId: string, data: ChatUserData) {
  const { displayName, email, photoURL } = data;

  return await setDoc(doc(config.db, USERS_COLLECTION, userId), {
    displayName,
    email,
    photoURL,
    uid: userId,
  });
}

const updateUserProfile = (
  user: ChatUser,
  updates: {
    displayName?: string | null;
    photoURL?: string | null;
  }
) => updateProfile(user, updates);

async function updateChat(id: string, collectionName: string, data: object) {
  return await updateDoc(doc(config.db, collectionName, id), data);
}

async function getChat(id: string, collectionName = CHATS_COLLECTION) {
  return await getDoc(doc(config.db, collectionName, id));
}

const signIn = async (email: string, password: string) => {
  try {
    return await signInWithEmailAndPassword(config.auth, email, password);
  } catch (error) {
    toast.error((error as string) || "Chat sign in failed!");
  }
};

const signInWithGoogleRedirect = () =>
  signInWithRedirect(config.auth, new GoogleAuthProvider());

const signOutOfChat = async () => {
  await signOut(config.auth);
  auth.removeChatUser();
};

const getAllUsers = async (): Promise<ChatUser[]> => {
  try {
    const users: ChatUser[] = [];

    (await getDocs(usersRef)).forEach((doc) => {
      if (doc.exists()) users.push(doc.data() as ChatUser);
    });

    return users;
  } catch (error) {
    toast.error("Error getting all users!");
    return [];
  }
};

const findUser = async (name: string) => {
  const searchQuery = query(usersRef, where("displayName", "==", name.trim()));
  const snapshot = await getDocs(searchQuery);

  let found: DocumentData | undefined;
  snapshot.forEach((doc) => {
    found = doc.data();
  });

  return found;
};

const getCombinedUsersId = (userId1: string, userId2: string) =>
  userId1 > userId2 ? userId1 + userId2 : userId2 + userId1;

const getUserChatMessages = async <T>(user1: UserInfo, user2: UserInfo) => {
  const combinedId = getCombinedUsersId(user1.uid, user2.uid);

  const res = await getChat(combinedId);
  if (res.exists()) return res.data() as T;

  await Promise.all([
    initChat(combinedId),
    initUserChat(user1, user2),
    initUserChat(user2, user1),
  ]);
};

async function initUserChat(user1: UserInfo, user2: UserInfo) {
  const { uid, displayName, photoURL } = user2;
  const combinedId = getCombinedUsersId(user1.uid, uid);

  await updateChat(user1.uid, USER_CHATS_COLLECTION, {
    [combinedId + ".userInfo"]: { uid, displayName, photoURL },
    [combinedId + ".date"]: serverTimestamp(),
  });
}

const sendMessage = async (
  chatId: string,
  text: string,
  receiverId: string,
  senderId: string
) => {
  await updateChat(chatId, CHATS_COLLECTION, {
    messages: arrayUnion({
      id: v4(),
      text,
      senderId,
      date: Timestamp.now(),
    }),
  });

  const lastMessage = {
    [chatId + ".lastMessage"]: { text },
    [chatId + ".date"]: serverTimestamp(),
  };

  updateChat(senderId, USER_CHATS_COLLECTION, lastMessage);
  updateChat(receiverId, USER_CHATS_COLLECTION, lastMessage);
};

const getCleanChats = (rawChats?: RawChat): RawChatData[] => {
  const chats: RawChatData[] = [];

  if (!rawChats) return chats;

  Object.entries(rawChats).forEach((item) => chats.push(item[1]));

  return chats;
};

export default {
  getCleanChats,
  createUser,
  findUser,
  getAllUsers,
  getChat,
  getCombinedUsersId,
  getUserChatMessages,
  initChat,
  initNewUserChat,
  sendMessage,
  signIn,
  signInWithGoogleRedirect,
  signOutOfChat,
  updateChatUser,
  updateUserProfile,
};
