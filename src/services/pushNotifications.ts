import client from "./client";

const endpoint = "/notifications/push";

interface PushNotification {
  body: string;
  image: string;
  title: string;
}

const subscribe = (subscription: PushSubscription) =>
  client.post(`${endpoint}/subscribe`, JSON.stringify(subscription), {
    headers: { "Content-Type": "application/json" },
  });

const unsubscribe = (subscription: PushSubscription) =>
  client.post(`${endpoint}/unsubscribe`, subscription);

const notifyAll = (notification: PushNotification) =>
  client.post(`${endpoint}/notify`, notification);

const notifyUser = (userId: string, notification: PushNotification) =>
  client.post(`${endpoint}/notify/${userId}`, notification);

export default { notifyUser, notifyAll, subscribe, unsubscribe };
