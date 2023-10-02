import * as admin from "firebase-admin";
import path from "path";
const tempDirectory = path.resolve(__dirname, "../tmp/");
import fs from "fs";
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "imagination-station-d9e2c",
    clientEmail:
      "firebase-adminsdk-x22yx@imagination-station-d9e2c.iam.gserviceaccount.com",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCmPfwtiRRWqERZ\n85r+G2FtCbHH2xgPOMHZ034B/xp1vxYfRsT03TRFpvKD4UxWKKeGkIbWFHCv8yWH\noTqz2oRREeMAS/7qvRnFat+Gh1rfiCZpAE1DPC5seIU6wIygbpd/2Ws7fCz1PONQ\nXavcRXEQs7f+6iLoyFQGxfbXAWL/0LT2/+TCLPFxysXifxXv6hLsdU3HW7O57sR3\n3NJibg4r2GxRERdUblRN96+gWZUe70sW+HVx5dVjHFpcbOAUC4v1zx1suqN6Kdmy\nHgfeyoQ2sBC/gMLQt3byVK0tFhZvPmyicgdja4TUQujj/TUcpHokn0XN1aAISTHX\nl7rFliI7AgMBAAECggEAGPWCeJW1o4MU7ApqkU8sE/JaKj7nQFXNqPYbW5Jg9x+u\n4xg9duQFNpXnoExBqUfmSwpE7DxaZNhVIKVgymL67a8JTWCbj8O/bEfs8mY9CwWG\nespMT1VoROndWuJQ2r9v6IaMlnxAxbsUB9tgc6xLWu4YqGGfxyJYl0G+my4+nliJ\n9lY3ZO6/ZdYtEfMzcHy86ZbaEnsS2LfCcvP60cNa355cwOxbMQxl1WurBJedhJZv\n6g8wsN/zfLPdfarKxWS0gSJL9u7/0lfhk42OSxab0J86dyiR+T4LO1ksDBps+Q5D\njaMBOo8OJYqL5ey3BOn2MWQaDsJH9OTOQA6h9QOhoQKBgQDR7hKBE0AH9DdEq06e\nQrjScOxzzYQ8rGyYKlCmQiDupp8gxUyK7ZpMTDJ25GPd1ZcGlhW54gxzoSFyKCRv\nxIrUWCFRyIXwJ9CqvmxSo5cpq78k4fWAp3SmFPzkBW4Ua7BORqFftbYIgEAVv0vh\nIMqB/x6glOzvD5k4cpMzegQ74QKBgQDKuYRZs6GEfPMpKzbU59grmE2a8JAGd5RU\nOKuYMmerptvAkMyfuOKn/mas4gh4xiOo9Rp+rdf+Vy6Irgmy7HsCUQydLljfDF5q\nP2o3MsYBGe6/IZDmnDTLBsdGGOEF/rxZV9U2KYTrInFItFvcnJ1VIx0/HrNPhJ27\nbJ4sygoBmwKBgQCcOyYwQyhDAx/ije7LXvJ3QqzmHcvM77E9qTguE0a49O22EL8/\nIUbUg1yHGL+txxhHQYjXtn/3ybG/aFp9h3KeRxw85hOvv6HOgDrTYYXM8FEnXLY9\nUeJA+5udAuGCdwZVqsDMHspjFzcaOCx7VdD/3+JmNY8C9sPbu4ELLUJbYQKBgQDH\nM5B3zGk0FMujcpFImCD0hY4MZ8I+eJZKQ/1pam4wX5+kEyTe9f/Sb8tYqisE8j3s\nMhy8yfpqNCTHraxeIr2kwxuQABDX7AGCiZnHb57dSiwtp8AIuwmtTpXVrXDAQVW2\nvPYHaLjxjECg3ok9uK9pDz4X3gT4aCnOF6c9/7HhbQKBgQCwz9eRrsOyzccaZvk3\n1VNcc16r3Ux7y7bTtBXvf2DLZ2aVh9fc1lxVxkM60T+kgCWr5VJRT1lLgRVqtDP0\nZFcLNf/OKx+UIptKirthLCWWyZVkCJpMqFwCJpwqOzbUjC9mcq9P+ehQX7PucFJT\n/JDD7/8PGyFyaFIj6uee+w/Tig==\n-----END PRIVATE KEY-----\n",
  }),
  storageBucket: "imagination-station-d9e2c",
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
