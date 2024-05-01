import { NewNotification } from "../components/Notification";
import client from "./client";

const endpoint = "/notifications";

const create = (notification: NewNotification) =>
  client.post(endpoint, notification);

const get = (userId: string) => client.get(`${endpoint}/${userId}`);

const markAsRead = (notificationId: string) =>
  client.patch(`${endpoint}/${notificationId}`, { read: true });

export default { create, get, markAsRead };
