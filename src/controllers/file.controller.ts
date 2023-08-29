import { Request, Response } from "express";
import {
  deleteImage,
  fetchImage,
  getFileName,
  getFilePath,
} from "../helpers/file.helper";
import url from "url";
export const downloadImageHandler = async (req: Request, res: Response) => {
  const url: string = req.query.url as string;
  const fileName = await fetchImage(url);
  const file = await getFilePath(fileName);
  res.download(file, (err) => {
    if (err) {
      console.log(err);
    } else {
      deleteImage(file);
    }
  });
};
