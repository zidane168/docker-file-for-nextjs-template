import { envConfig } from "@/utils/config";
import { broadcastChannelNameConstants } from "@/utils/constants";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const scriptTextt = `importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
  importScripts(
    "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
  );
  
  const getNotificationRouterLocation = (data) => {
    const {} = data || {};
  
    return {
      baseUrl: "${envConfig.BASE_URL}".replace(/\\/*$/, ""),
      pathname: "/appointments",
      search: "",
      query: {},
      referenceLink: "",
    };
  };
  
  self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    const eventData = event.notification.data.FCM_MSG.data;
    const routerLocation = getNotificationRouterLocation(eventData);
  
    event.waitUntil(
      clients
        .matchAll({
          includeUncontrolled: true,
          type: "window",
        })
        .then((windowClients) => {
          const channel = new BroadcastChannel(
            "${broadcastChannelNameConstants.FIREBASE_NOTIFICATION_BACKGROUND_MESSAGE_CLICK}"
          );
          if (!routerLocation.referenceLink) {
            for (const client of windowClients) {
              const linkUrl = new URL(client.url);
              if (
                linkUrl.origin === routerLocation.baseUrl &&
                linkUrl.pathname === routerLocation.pathname &&
                "focus" in client
              ) {
                channel.postMessage({
                  payload: event.notification.data?.FCM_MSG,
                  routerLocation,
                });
                return client.focus();
              }
            }
          }
          if (clients.openWindow) {
            channel.postMessage({
              payload: event.notification.data?.FCM_MSG,
              routerLocation,
            });
            const routerLocationFullUrl = \`\${routerLocation.baseUrl ?? ""}\${
              routerLocation.pathname ?? ""
            }\${routerLocation.search ?? ""}\`;
            return clients.openWindow(
              routerLocation.referenceLink || routerLocationFullUrl
            );
          }
        })
        .catch(() => {})
    );
  });
  
  const defaultFirebaseConfig = {
    apiKey: "***",
    authDomain: "***.firebaseapp.com",
    databaseURL: "https://***.firebaseio.com",
    projectId: "***",
    storageBucket: "***.appspot.com",
    messagingSenderId: "***",
    appId: "***",
  };
  
  firebase.initializeApp(defaultFirebaseConfig);
  let messaging;
  try {
    messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;
  } catch (err) {
    console.error("Failed to initialize Firebase Messaging", err);
  }
  if (messaging) {
    try {
      const messaging = firebase.messaging();
      const channel = new BroadcastChannel(
        "${broadcastChannelNameConstants.FIREBASE_NOTIFICATION_BACKGROUND_MESSAGE}"
      );
      messaging.onBackgroundMessage((payload) => {
        channel.postMessage(payload);
      });
    } catch (error) {
      console.error("Failed to push Firebase Messaging", error);
    }
  }`;

  res.writeHead(200, {
    "Content-Type": "application/javascript",
  });
  res.end(scriptTextt);
};

export default handler;
