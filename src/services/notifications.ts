import client from "./client";

const endpoint = "/notifications";

interface Notification {
  body: string;
  title: string;
}

const subscribe = (subscription: PushSubscription) =>
  client.post(`${endpoint}/subscribe`, JSON.stringify(subscription), {
    headers: { "Content-Type": "application/json" },
  });

const unsubscribe = (subscription: PushSubscription) =>
  client.post(`${endpoint}/unsubscribe`, subscription);

const notifyAll = (notification: Notification) =>
  client.post(`${endpoint}/notify`, notification);

const notifyUser = (userId: string, notification: Notification) =>
  client.post(`${endpoint}/notify/${userId}`, notification);

export default { notifyUser, notifyAll, subscribe, unsubscribe };
