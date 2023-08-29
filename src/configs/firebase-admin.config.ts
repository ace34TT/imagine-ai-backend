import { cert, initializeApp } from "firebase-admin/app";
import serviceAccount from "./image-generation-1c19f-firebase-adminsdk-k17f9-2f60af5bb5.json";

// const tempDirectory = path.resolve(__dirname, "../tmp/");
initializeApp({
  credential: cert({
    projectId: "image-generation-1c19f",
    clientEmail:
      "firebase-adminsdk-k17f9@image-generation-1c19f.iam.gserviceaccount.com",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDxCG8dYuTLtcLR\nQ4DJxIv9Uq/s7/4J3umDeXFjV0whe2sECaz72bLbpBTUCET270jv396BJlVspf6w\nEK61q9njdkmCZKtbNv9aHWuQMLYcyzxwGCKJa8g+0x33+8ZhO5Y6muRxcZn3452J\nxtjYluDq8bTbbVnKhgEug9GPBV/h148vyjdD/aAkdqXMjTgP9AcyKwmTBHTc6nJo\nvhzgR4fdIsPbnGjyKSAf4TcqttavZNezDHd+ni91n/nvc2FcMiaj/c6WG1Sd2JyY\nlgENvMvlznk20rrPYqaA8q0Oie+R/0qA666QR4s6PS/9p7D/vpUddGBgcQhYcwTB\nG+lU45RnAgMBAAECggEAPXeiJoNWx6B1qzokuM+3x4Vzud/GECxZrp6kzOmxT4SS\n2PfCtoNg+mRQr3XgaHzDQ/D6ZEMrW8bFOY83jrrhmQFMY8VacauH2SpRiPbzKkqm\nAgwVmqfy7BqYtOnvQFKa0B06DrgixLW2MjGUkT+A4kl7js3HLT+ZQ4x4P5nmRshc\nVWqcgm/KUU/CohyFDX8ZMnMI5LvyGNq5n0HoyduK7Fa/8ECiL+5rMrV3ELRdXv0o\nExhnzXCRkKvXcT0glFUQyPrOsch736nJwWF2TJaD7Vm5BegwOUfpIHaJSpZjdxM3\nHGl4b6rBq3mj3KIiKeykw/4+mA/QivpnEZD4fPND8QKBgQD70njp9VZbMJSgxFMt\npaTH969OY223mPk88sdZHyHTUQSAtdnCqG1RkndbJspavmKkIU/CHPJEZSetUpdE\nLlgpYzdoFq+914vSqsX4ZRGB+1NhVGqAQ275cbiLnmSESmhjf2Ur80R0TvixxG2X\ngaNfZQpVKl4pA2QPeG8Kl/VLiQKBgQD1CCNllakMyDogVGnIVe9hRUs7IsVGti6n\nrtwoWPfsw5pYLaPa1Vugddhc3ONuLlTabvGlpyVLGdKX/Q9OvT5JMjL1vLfEinHV\n0Awsxs0h4NYSso1jAhPlyhrPbT2ilW/+R2EXkrc/cgKXpXHP6CbXK+hL2JXTuY6N\nL+v2MLA0bwKBgQCGAFfrV2welllgu1fvwGdRKZIVyn8F5dcrAZ3m5NQhGMmmnB5G\noU2azK/Kx3eCljDzWe6RQsoAbzuP1ZU86NRtIajIMNpP0TVMYyd5qH6Khmy2LC+I\nFVomTsd/NEgUxWuLFq2Fl6vjoGpiXj5bEtcW2jOHYkY82NsUCGg+YOJc0QKBgQDn\nJztFPM9SaJ01HI0CWddOWvFioyWZ1Ink1DeKtIuGRuyW3M9jxL0AfcuTpynCKmEQ\nA3NhQ3ISDBU4HpnPPQXCRWH/on12IujKvM6PeyfPGuy4jMqGqVIeB/AM2FA5zWHu\nbmXwuA65ApPhfUkFykrB2AD3dCW7q6QIGzotcLb5bwKBgAxZfec7y6/Ux1hWwl9y\nggoXEJ67M5kufu1NaO3muedjgxM53FbiSnjG0B00nS58lZLOMEak697JlqMWzbrn\nuJucWxIucyzrupQjfFrXlMlHlR0OoiC74SvAFi8F1luDzc3EnF6PtfZEV3lSn/mx\n6/AhhqCZSkI58YULiZDNWN2r\n-----END PRIVATE KEY-----\n",
  }),
  storageBucket: "gs://image-generation-1c19f.appspot.com",
});
