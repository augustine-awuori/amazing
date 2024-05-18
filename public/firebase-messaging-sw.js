// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

try {
  // eslint-disable-next-line no-undef
  firebase.initializeApp({
    apiKey: "AIzaSyCAtitgurCoK8LIYRWfo2i95Q6otoTmXSA",
    authDomain: "kisii-campus-mart-site.firebaseapp.com",
    projectId: "kisii-campus-mart-site",
    storageBucket: "kisii-campus-mart-site.appspot.com",
    messagingSenderId: "66759292374",
    appId: "1:66759292374:web:2a09e7ad0919c6a056e077",
    measurementId: "G-C2MJ2XQDCQ",
  });

  // eslint-disable-next-line no-undef
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification(payload?.notification?.title, {
      body: payload?.notification?.body,
      icon: payload?.notification?.icon,
    });
  });
} catch (error) {
  console.error(error);
}
