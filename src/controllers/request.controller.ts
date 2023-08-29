import axios from "axios";
import { Request, Response } from "express";
import { deleteImage, fetchImage, getFile } from "../helpers/file.helper";
import { uploadFileToFirebase } from "../helpers/firebase.helper";
const sdk = require("api")("@runpod/v1.0#18nw21lj8lwwiy");

sdk.auth("E7K20UBU7T1GYLOFNIYEEMEF8O5W4Y4LW3X0XJC2");

export const makeRequestHandler = async (req: Request, res: Response) => {
  try {
    const options = {
      method: "POST",
      url: "https://api.runpod.ai/v2/kandinsky-v2/runsync",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "E7K20UBU7T1GYLOFNIYEEMEF8O5W4Y4LW3X0XJC2",
      },
      data: {
        input: {
          prompt: req.body.prompt,
          negative_prompt:
            "disfigured mouth, disfigured teeth, half head, half face, blury, side looking, old, wrinkle, child, no face, pencil, full body, sharp, far away, overlapping, duplication, nude, disfigured, kitsch, oversaturated, grain, low-res, Deformed, blurry, bad anatomy, poorly drawn face, mutation, mutated, extra limb, ugly, poorly drawn hands, missing limb, blurry, floating limbs, disconnected limbs, malformed hands, blur, out of focus, long body, disgusting, poorly drawn, childish, mutilated, mangled, surreal, out of frame, duplicate, 2 faces",
          num_steps: 100,
          guidance_scale: 4,
          h: 768,
          w: 768,
          sampler: "ddim",
          prior_cf_scale: 4,
          prior_steps: "5",
          num_images: 1,
          seed: -1,
        },
      },
    };
    console.log("================START================");
    console.log("processing request");
    const result = await axios.request(options);
    // console.log(result.data);
    console.log("Ok");
    console.log("fetching file");
    const fileName = await fetchImage(result.data.output.image_url);
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
