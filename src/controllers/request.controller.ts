import axios from "axios";
import { Request, Response } from "express";
import { deleteImage, fetchImage, getFile } from "../helpers/file.helper";
import { uploadFileToFirebase } from "../helpers/firebase.helper";
import { makeRequest } from "../services/replicate.service";
export const makeRequestHandler = async (req: Request, res: Response) => {
  try {
    console.log("================START================");
    console.log("processing request");
    const data: any = await makeRequest(req.body.prompt);
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
