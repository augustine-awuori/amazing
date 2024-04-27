export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i)
    outputArray[i] = rawData.charCodeAt(i);

  return outputArray;
}

export async function registerServiceWorker() {
  if ("serviceWorker" in navigator)
    await navigator.serviceWorker.register("/serviceWorker.js");
}

export async function getReadyServiceWorker() {
  if ("serviceWorker" in navigator) return navigator.serviceWorker.ready;
}
