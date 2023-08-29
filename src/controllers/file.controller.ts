import { Request, Response } from "express";
import {
  deleteImage,
  fetchImage,
  getFileName,
  getFilePath,
} from "../helpers/file.helper";
import url from "url";
import { saveFileFromFirebase } from "../helpers/firebase.helper";
export const downloadImageHandler = async (req: Request, res: Response) => {
  const url: string = req.query.url as string;
  // const fileName = await fetchImage(url);
  const filename = getFileName(url);
  await saveFileFromFirebase(filename);
  const file = await getFilePath(filename);
  res.download(file, (err) => {
    if (err) {
      console.log(err);
    } else {
      deleteImage(file);
    }
  });
};
