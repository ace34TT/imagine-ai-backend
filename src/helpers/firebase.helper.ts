import * as admin from "firebase-admin";
import path from "path";
const tempDirectory = path.resolve(__dirname, "../tmp/");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "imagine-ai-bdc69",
    clientEmail:
      "firebase-adminsdk-jmmq6@imagine-ai-bdc69.iam.gserviceaccount.com",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvz4fBT2VcHtkU\npJO9wUMXmxhPw3rems/m/mp8hS48hd3xh8owkBzPHatYBU3jw8bqxQKCx7vwmnmi\n7pdILEJwAhWF0nHF+XBnlCE1kuWvhUfmnrQwO/7mlUp1PEyUQLoGTHrXwp+Blwlo\n97wnUmg7T/oEauPulISLRuXI9zcrv4cEf6pInfPj5XjRn1TPjp7yd6iqaW5ChdJu\nj76Jiuf5U7cVxCvPmDpAtJfNQQMI4AUFubvxKESFYvSBWZVnBKRmGs89UUzUBEtT\nmuDBHQYGGtPGd5QAA6BcTHP1Aq0scPaUMFOAOFnZTz2vllYbV19DM0eEdYnFN1L+\nzhGRhtxZAgMBAAECggEACGMfqFa30K2+EHCLhc1u/HTPM5rxRSZgjbYMcXVPD98Z\nB/lA6ZEudqkFMBVMsnV4C2IrrP6HVkKgU+gK+ov1/W70BObVu6qbNK3J6crgvz9d\n/0AJ+5UZI3nyy+X9B0ORPFSwtZNY1a9VaRcMeFnDlDTMCiLpTcvzCMvwkWZN0P3l\nXVABFxvLcvYQWTny0JsbTHY20hReH9B8jkAvsCWC+NfOFNEfCPYcg84wBaXqmERi\nOBk0eLtIThCoa5/MqznQcEgwjGsYnAkFSMYzMrxrP+zPmsgDgkIZJN9gXNUeVpZE\nwHkQ1ofCjFFpxmwxeIoHSmJvbEUX333vErkrG6PniwKBgQDY/ydywuDf2jsy/wzj\nLH5KD9OBgZqSFOqaL57nQPd8z82bcx6O4Kauy9OVVRm7WO1ldUvhEIjaHzb62Rjw\nuBGxtzra598jJuTI+A+A9kJr8evmZ/y6B2qMOlm3AVzuQgIIpoSdmweJO7Y18es2\ndRm5YmtAR1tbU/UXbUmsN2knQwKBgQDPaT/yfN0ruKSjeGWm2t82ArzGo5KewLIo\nLYV1nQ91SU/TxmmGU9l5SS3T7wIgkwEy/ejqexxc0cQcWf9cQgIVGybLjGBFA38e\npMm6hX3KkKMSk4dleTlJRowU1WTh3KsqdZuN+HcvWF7tomefKNcwLoIzJp/r/T/k\nzY6QHAIuMwKBgQCfu2LcdVt3LHt7VIe2CiCEgBXfNPoFImR3TyqXbBlBxO3CygDq\nh6/q55s+R8CDSjimAKv0Zml2tpeQG5LiT3ym5wvp69kzVQQAc6ll8uB9+Tz/A/jj\nL2ZdBu7XaadwsyIwH/Nq2J25hTzhhMzx700aS7pLPLuhBLJbplUe8kLzZQKBgBNB\nLhKQzOd2KLKURruKrhYRgvzdyoq6UM+yCiW1Au5cc/CxBrLVrea4iGyYT5Y+j2nw\ncGL0MtnbD12ibTZfWlojPyK+UWGWxYJOwfty0Q6xBrJ+x57/9fV7ex2kAc2F8s3q\nRRqU6luW1Jky7nO0EuYCK0wcVdROmlPfUVDHiNxJAoGBAMxGAhQpQB4Jpvsj9PcX\naDppLM+AoLWPnQdIUNjn2JsaoWo+TzQTpj6sxVX6H0I9R1t59YWAVxwsn5PJBnPg\nNA+Um76KBM6G5nw+yqVCJNlaRBKZtXQM72hT53SliZ6OMV2pMJedG1QZJVAoSkck\nrBI07bS1ccdAkQjnqOzrSJ8d\n-----END PRIVATE KEY-----\n",
  }),
  storageBucket: "gs://imagine-ai-bdc69.appspot.com",
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
