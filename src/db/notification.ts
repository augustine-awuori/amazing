// import axios from "axios";
// import { getToken } from "firebase/messaging";

// import { appBaseUrl } from "../services/client";
// import { User } from "../hooks/useUser";
// import auth from "../services/auth";
// import config from "./config";
// import logger from "../utils/logger";
// import usersService from "../services/users";

// const fcmUrl = "https://fcm.googleapis.com/fcm/send";

// export const saveMessagingToken = async (): Promise<void> => {
//   const permission = await Notification.requestPermission();

//   if (permission === "granted") {
//     const token = await getToken(config.messaging, {
//       vapidKey:
//         "BActzwsdvPCFTiR19nZ_iUZh-ggNs4QLP_g7LZZGsQwpPilc786KEsTHQkHwxKlLHlLetYB67uYl3FkvJUyWdfI",
//     });

//     if (token) await saveUserPushNotificationToken(token);
//   }
// };

// async function saveUserPushNotificationToken(token: string): Promise<void> {
//   const userId = auth.getCurrentUser()?._id;
//   if (!userId) return;

//   const user = await auth.getUserFullDetails(userId);
//   if (!user) return;

//   if (!(user as unknown as User)?.pushTokens?.[token])
//     await usersService.updateUserInfo({ pushTokens: { [token]: token } });
// }

// const sendNotification = async ({
//   body,
//   title,
//   token,
// }: {
//   token: string;
//   title: string;
//   body: string;
// }) => {
//   const message = {
//     to: token,
//     notification: { title, body },
//     webpush: { fcm_options: { link: appBaseUrl } },
//   };

//   try {
//     await axios.post(fcmUrl, message, {
//       headers: {
//         Authorization: `key=AAAAD4sp9dY:APA91bEYjPSSkbcSM9J9P_9epVp9vRDXfxjKN67V3GvkOAqdh5iKEkWrH16cvP4eau4zfIGfd4FA8RMsdfKtlBSTExyqNK2UyXrK-kVL3HurRlxVbWj2E0_2nez9R8F4FLp-ZCRz2Hor`, // Replace with your server key
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     logger.log("Error sending notification:");
//   }
// };

// export const sendNotifications = async ({
//   body,
//   title,
//   tokens,
// }: {
//   tokens: { [token: string]: string } | undefined;
//   title: string;
//   body: string;
// }): Promise<void> => {
//    if (tokens && typeof tokens === "object")
//       Object.keys(tokens).forEach(
//        async (token) => await sendNotification({ token, body, title })
//      );
// };
