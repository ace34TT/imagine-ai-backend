import * as admin from "firebase-admin";
import path from "path";
const tempDirectory = path.resolve(__dirname, "../tmp/");
import fs from "fs";

const { privateKey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY || "");
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey,
  }),
  storageBucket: process.env.FIREBSE_STORAGE_BACKET,
});

export const uploadFileToFirebase = async (file: any, filename: string) => {
  const bucket = admin.storage().bucket();
  await bucket.upload(path.resolve(tempDirectory + "/" + filename), {
    destination: "images/" + filename,
  });
  const fileRef = bucket.file("images/" + filename);
  await fileRef.makePublic();
  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;
  await saveFileUrl(publicUrl);
  return publicUrl;
};
export const saveFileUrl = async (fileUrl: string) => {
  const db = admin.firestore();
  const docRef = db.collection("images").doc();
  await docRef.set({
    image: fileUrl,
    timestamp: new Date(),
  });
};
export const saveFileFromFirebase = async (filename: string) => {
  if (!fs.existsSync(tempDirectory)) {
    fs.mkdirSync(tempDirectory, { recursive: true });
  }
  const bucket = admin.storage().bucket();
  const file = bucket.file("images/" + filename);
  const destination = path.resolve(tempDirectory + "/" + filename);
  await file.download({ destination });
};
