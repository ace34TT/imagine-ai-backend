import { sdxl, wuerstchen_v2 } from "./../services/replicate.service";
import axios from "axios";
import { Request, Response } from "express";
import { deleteImage, fetchImage, getFile } from "../helpers/file.helper";
import { uploadFileToFirebase } from "../helpers/firebase.helper";
import { kandinsky } from "../services/runpod.service";
import { logger } from "../helpers/logger.helper";

export const makeRequest = async (req: Request, res: Response) => {
  try {
    logger("================START================");
    logger("processing request");
    let data: any;
    console.log(req.params.model);
    switch (req.params.model) {
      case "sdxl":
        data = await sdxl(req.body.prompt);
        data = data[0];
        break;
      case "wuerstchen_v2":
        data = await wuerstchen_v2(req.body.prompt);
        data = data[0];
        break;
      case "kandinsky_v2":
        data = await kandinsky(req.body.prompt);
        break;
      default:
        return res.status(400).json({ message: "Model not found" });
    }
    logger(data);
    console.log("Ok");
    console.log("fetching file");
    const fileName = await fetchImage(data);
    console.log("Ok");
    console.log("uploading file");
    console.log(fileName);
    const file = await getFile(fileName);
    console.log(file);
    const finalUrl = await uploadFileToFirebase(file, fileName);
    console.log(finalUrl);
    console.log("Ok");
    console.log("deleting file");
    deleteImage(fileName);
    console.log("================END================");
    return res.status(200).json({ image_url: finalUrl });
  } catch (error: any) {
    console.log(error.message);
    // console.trace(error);
    return res.status(500).json({ error: error.message });
  }
};
export const makeWuerstchenV2RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("================START================");
    console.log("processing request");
    const data: any = await wuerstchen_v2(req.body.prompt);
    console.log(data[0]);
    console.log("Ok");
    console.log("fetching file");
    const fileName = await fetchImage(data[0]);
    console.log("Ok");
    console.log("uploading file");
    console.log(fileName);
    const file = await getFile(fileName);
    console.log(file);
    const finalUrl = await uploadFileToFirebase(file, fileName);
    console.log(finalUrl);
    console.log("Ok");
    console.log("deleting file");
    deleteImage(fileName);
    console.log("================END================");
    return res.status(200).json({ image_url: finalUrl });
  } catch (error: any) {
    console.log(error.message);
    // console.trace(error);
    return res.status(500).json({ error: error.message });
  }
};
