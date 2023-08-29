import * as admin from "firebase-admin";
import path from "path";
const tempDirectory = path.resolve(__dirname, "../tmp/");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "imagine-ai-v3",
    clientEmail:
      "firebase-adminsdk-k7a59@imagine-ai-v3.iam.gserviceaccount.com",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCT/YFoJzFfWaj7\nRyyX+ia7fLx+V6GT3tzUDvIzfWcgf0+zH8tbyDYuhovZiLmYwLCWg/liXerm82+o\n9Nx/YzBlIoBWZB/6Idrxjbwbny+jWSLECyoAdv8LNAQfrEuMXSJHIMYbqFjofJTV\n1L3zhL1CeyVKe6OsRF/k/vjGaqok6oMcOofKnoS5NOIwsEMlIb6dA5cX6QI8Vidz\npBecW226UUgc+yka2LcxcReSttixRjjVVpCJ39Fb65rUpNCYT0Uar5Gnyu6+HJPb\n47CDVqcRdvwI/xhHeiANVN1lo5sjKVMixzMreynP9brvj62NRXaKya3JuZudqQvc\n1twTvF91AgMBAAECgf9NR4dhV+LjlsgR5xSiWT619gKJf9t1tfgbGeYkn1NhbYBf\n9DYoGbXtN+Zx0Bpwagzd4eIyO9By9IG8tKm0dXmYq8UuJKv0h+QErpzDvr7qNGpM\nysvsrfLfBKzNQ8ENqR1SmGAOkU3cO9zjVUoPOeg0jzOQYIAkpAdeZy15XnWlpfQh\ntQTodQpNXS2fQlWyNBZ5tNAZgwE5hSJIZMICNtHkkXblIkjEyCqYG3i9wkpqOagP\nz/eTAaXPuTkNQW1WPbIwpapvyOQVIRGjfDeLpbn4rL5BjmWlQFaAy2Pfaf+Iij8M\nVo3sKXkMXiegpWRVIDxLLDQ6eX5TS8pb6jGSwMkCgYEAzDpZciEvTbS3jP2YpqqX\nSmmXXmu5TtQWOQdF2ZBMtlLAHvP09K+KkfXcuz9RbRZqcanU/eF8Tjg06SIaCnTr\nEsmDGL/svth+MA8CkIiWBdyy0Dv/rzgnsQfDS9TwpAKfRqAT85VwiFtG5ZrJMsNr\nVTtrSBDE8O+tO4NifeY1+MkCgYEAuYGJFwmD/uQN+5LVTuFdlCAoGkbmotY3pggp\nkQ6RlQR1QIeIBAd46OzL/gQfHJEHnywDOaMcAoPN/by7lRjzuXyXw3YNwNPNhwBy\nt0yfPDgdegg8PJjiT9TFQQH2NGlEWdWNfI7D4Z6bW8VwG+kgsbmyqSCg8MSJXSdu\nhaYss00CgYEAgCRodS0PQkGPHf8M5h6JuR4R5SPQbP60RuoiUMWy7H91nrZRz6nJ\nV5Yd/rtW+wyik1kNlJMD7QxlXpaQIlmEGhComkHqaUDrxHnWkRuyjlERPYk4ABhL\nB1AooQ8mQrKGf8j3W9I7fsNO88gwUBK/6QXUZa5n9Ale98WTag2ldckCgYAdT3VM\nuYkslfYLoOipPPyfMfGELV21ruk+B54huE6SYBDysDdyg4e8LeYRba9IwTWWFcsw\nqS/8ybybcd2lsjqYPTJxhM6pgA3CXfTCN44VYrxtkq2J2ZIwkOrV2ayAHX3aP97K\nJniWxou/lVOgZVZwHmo3RNuJD1Sw7lENNvNrJQKBgQCfzjre9klvmfTTo3BjBVb8\ns0MP7FFzWNaGM0LmOCedhTTBy4075BckeUyzw0delzRs2gnADYt2sSsifDW0a9+I\nrcMy6RJlLfLPKlChswJ7hlV0/TaWbLl0OILr9MxpMeXgGyYpUCyHQCcSQrkRxX4B\nvRT5hjGaLS0u+Bym2cIFiQ==\n-----END PRIVATE KEY-----\n",
  }),
  storageBucket: "gs://imagine-ai-v3.appspot.com",
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
