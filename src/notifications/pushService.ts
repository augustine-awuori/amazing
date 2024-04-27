import {
  getReadyServiceWorker,
  urlBase64ToUint8Array,
} from "../utils/serviceWorker";
import service from "../services/notifications";

// TODO: Find secret place to put this
const publicKey =
  "BBiTUEPkrczMpv6IjonzmXQ6WoCTl3CpSr8XGSITCehTHrJgx4opv4UNfDybZcqbMUjBdn_3thF8N8SaPmMyBWA";

export async function getCurrentPushSubscription() {
  return (await getReadyServiceWorker())?.pushManager.getSubscription();
}

export async function registerPushNotification() {
  if (!("PushManager" in window)) return;

  let subscription = await getCurrentPushSubscription();
  if (subscription) return;

  const sw = await getReadyServiceWorker();
  subscription = await sw?.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });

  if (subscription) await sendPushSubscriptionToServer(subscription);
}

async function sendPushSubscriptionToServer(subscription: PushSubscription) {
  return await service.subscribe(subscription);
}

export async function unregisterPushNotification() {
  const subscription = await getCurrentPushSubscription();

  if (subscription) {
    await deletePushNotificationFromServer(subscription);
    await subscription.unsubscribe();
  }
}

async function deletePushNotificationFromServer(
  subscription: PushSubscription
) {
  await service.unsubscribe(subscription);
}
