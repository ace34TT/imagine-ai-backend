import nodeFetch from "node-fetch";
import fs from "fs";
import path from "path";
const tempDirectory = path.resolve(__dirname, "../tmp/");
console.log(tempDirectory);

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
export const resizeImage = (file: Blob | MediaSource): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const maxSize = 512;
      let width = img.width;
      let height = img.height;
      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height *= maxSize / width;
          width = maxSize;
        } else {
          width *= maxSize / height;
          height = maxSize;
        }
      }
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;
      ctx!.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, "image/jpeg");
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = URL.createObjectURL(file);
  });
};
export const fetchImage = async (url: string) => {
  const response = await nodeFetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch image: ${response.status} ${response.statusText}`
    );
  }
  const fileName = generateRandomString(10);
  console.log(path.resolve(tempDirectory + "/" + fileName));
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
export const checkFile = async () => {};
