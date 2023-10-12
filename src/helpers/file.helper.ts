import nodeFetch from "node-fetch";
import fs from "fs";
import path from "path";
const tempDirectory = path.resolve(__dirname, "../tmp/");

export const generateRandomString = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const fetchImage = async (url: string) => {
  const response = await nodeFetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch image: ${response.status} ${response.statusText}`
    );
  }
  if (!fs.existsSync(tempDirectory)) {
    fs.mkdirSync(tempDirectory, { recursive: true });
  }
  const fileName = generateRandomString(10);
  const fileStream = fs.createWriteStream(
    path.resolve(tempDirectory + "/" + (fileName + ".png"))
  );
  await new Promise((resolve, reject) => {
    response.body.pipe(fileStream);
    response.body.on("error", reject);
    fileStream.on("finish", resolve);
  });
  return fileName + ".png";
};

export const getFile = async (fileName: string) => {
  try {
    const data = await fs.promises.readFile(
      path.resolve(tempDirectory, fileName)
    );
    return data;
  } catch (err) {
    throw err; // You can handle or rethrow the error as needed
  }
};
export const getFilePath = async (fileName: string) => {
  return path.resolve(tempDirectory, fileName);
};
export const deleteImage = async (filename: string) => {
  console.log("deleting : " + path.resolve(tempDirectory, filename));
  fs.unlinkSync(path.resolve(tempDirectory, filename));
};
export const getFileName = (url: string) => {
  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  return fileName;
};
