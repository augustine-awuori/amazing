self.addEventListener("push", (event) => {
  if (!event.data) return;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { title, body, image: icon } = event.data.json();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  event?.waitUntil(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    self.registration.showNotification(title, { body, icon })
  );
});