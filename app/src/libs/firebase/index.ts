import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

import { envConfig } from "@/utils/config";

export const firebaseConfig = {
  apiKey: envConfig.FIREBASE_API_KEY,
  authDomain: envConfig.FIREBASE_AUTH_DOMAIN,
  projectId: envConfig.FIREBASE_PROJECT_ID,
  storageBucket: envConfig.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envConfig.FIREBASE_MESSAGING_SENDER_ID,
  appId: envConfig.FIREBASE_APP_ID,
  measurementId: envConfig.FIREBASE_MEASUREMENT_ID,
};

export const app =
  typeof window !== "undefined" ? initializeApp(firebaseConfig) : undefined;

let messaging;
if (typeof window !== "undefined") {
  const initMessaging = async () => {
    const messagingSupported = await isSupported();
    if (messagingSupported) {
      messaging = getMessaging(app);
    }
  };
  initMessaging();
}
export { messaging };
