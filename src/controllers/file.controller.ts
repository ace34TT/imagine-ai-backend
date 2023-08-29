import { Request, Response } from "express";
import { deleteImage, fetchImage, getFilePath } from "../helpers/file.helper";
export const downloadImageHandler = async (req: Request, res: Response) => {
  const fileName = await fetchImage(req.body.url);
  const file = await getFilePath(fileName);
  // deleteImage(fileName);
  res.download(file, (err) => {
    if (err) {
      console.log(err);
    } else {
      deleteImage(file);
    }
  });
};
