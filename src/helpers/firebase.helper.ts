import * as admin from "firebase-admin";
import path from "path";
const tempDirectory = path.resolve(__dirname, "../tmp/");
import fs from "fs";
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "imagination-station-a2e19",
    clientEmail:
      "firebase-adminsdk-b7adq@imagination-station-a2e19.iam.gserviceaccount.com",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCj5kQ8++wqr/g/\nU0xgJE8Y7q6QdnCHG8NX37mznImytdZlNEik9/StXxUySyPRkNcP79LHg6jzQ4k5\nmRfXg3MzdzDPA0aqwmdCZ5fDAmr41EIaLFyraMQs+NZXD9RxDN2yN3ct6Xg9R9La\nATTAIBRtuQ2LwzhYUmRHIOBYy+TWCVlwDkmSKAhp9lNC+NQLUMg5hCxRKiaHQNCV\nFJ+dG+gF5bG0l500UuIpe8vlwDZ6Q66D5Jhzt4GED3lDjzbAS0U9vOTIpPbU1YEJ\n6UXb531FU+vEn66ay3TJErdExVIAJtoxnDMOx97lcQTK44M+wizae6yiLV4XuPDD\ny2NgpK/TAgMBAAECggEAOPN37arqHtEjlTmIFfY35+V0Ee2d30y13ZB3ciJoNIl7\n1JHM1kn0otOhxWaXrSfDmx2N49bre5ARnEqGntPl0VHOy3gLc6V2hPwDH3d1HT6A\nM6ELmGIgnLHgpMLy4k+Cr30XdAQmzEBrU2ZM4p+jCZdeThzJNON4RcD2Q9ShkP+C\n5lkupUMX1tUaTmbTMdck47SzQfqMXduZrADUiUlNRq3q64KZrAqpJfF2AAPZOgIq\nUjCn//r9exdC7Julab3V1+BW+UDAGnoqFGu89ZU23AEIhyvrNp4xHmkAYvQfYNrN\nWWZ5jkWztCeGD+Oljc19AGqSYffdZac+dMh6Zzk6cQKBgQDdOSUxIlOvruw/4xyc\nHU3hO5TuIQxtTjaoRoNcGjK2RL7lRnOT2DzYxUo0B4UB3BPFRuJmqd3DNBviq4A0\nGT2aN8CRp086m3qCsk8+X+AMQuAgI0QIENjMrVK6eB1kMPXyStHIqmVKaL82YYz5\nfM5dNLxdglwHZGjQJJIITce1AwKBgQC9qjK4+qqiJonAPKfU1qoOoEBc6MjW+B6g\nzJSYrqjXSDZBMqZb1RN0YHXUn63OPIP2Bvy3ua9p2mDSsAT1yatQaGjgJlidXmv0\n3VKpwPjW1uRoeKFT1AJAdCzdbiAAry2wP2BvhWpr3IhSfvhfjS8HUpvn5FdS09bN\nCNcDCzkY8QKBgQCnRZhbqIsCog8812tAl9/VWInp7M9KrwMhBgA5Wg3SR/TXxAeM\nWMrZVYQgBzeJCnFgj5KM8hAek34qTGcp/ZPY0iMnfwynUfy2akEE9tWgL8jsQ/4i\n4yoqyTtuh3gh0+uEAxLQ2hawxrceVXCVDMu1KjTrt7ACXufpyl0pLja9JQKBgQCc\naaMA+AAGT1/kwGDsXsfJ3hCWTodq+R5RH8YgEFI/kFbl975IF3W+0Nn7ql/sp+1v\n1R1O6vwlgKm+ttiwVktIuYJb8GO+DCNdwbQtOG4+xuOA4JKzDjF5NBXX2rzbs5wr\nMGj4L3+vSiTGW9269zTkhhT67U2yie8oEfU3lmbVEQKBgHaVPnZl2TfcAkd5oUa5\nV5nEDfkJ/XJ9D2VVhedwgeyGLVfj1i0i/HULtttCy6cW4nXwolvap0q52ydhw99e\nMv1vRYNPKmMmqP5Ym2FWoOIGn8E0QVImWpecFGa5ZEXHtTzbpuTjm0fQJYr92Ddl\nmDoL8ivVTgGKF4SLS6jRMkL8\n-----END PRIVATE KEY-----\n",
  }),
  storageBucket: "gs://imagination-station-a2e19.appspot.com",
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
