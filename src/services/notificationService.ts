import { env } from "../config/env";

let firebaseReady = false;

export async function initFirebase(): Promise<void> {
  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_PRIVATE_KEY
  ) {
    console.log("Firebase FCM not configured; notifications disabled.");
    return;
  }

  try {
    const admin = await import("firebase-admin");

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
        })
      });
    }

    firebaseReady = true;
    console.log("Firebase FCM ready");
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
}

export async function sendPush(
  token: string,
  title: string,
  body: string
): Promise<void> {
  if (!firebaseReady) return;

  const admin = await import("firebase-admin");

  await admin.messaging().send({
    token,
    notification: { title, body }
  });
}
