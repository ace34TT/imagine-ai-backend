import axios from "axios";
require("dotenv").config();

export const kandinsky = async (prompt: any) => {
  try {
    const options = {
      method: "POST",
      url: "https://api.runpod.ai/v2/kandinsky-v2/runsync",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: process.env.RUNPOD_AUTH,
      },
      data: {
        input: {
          prompt: prompt,
          negative_prompt:
            "disfigured mouth, disfigured teeth, half head, half face, blury, side looking, old, wrinkle, child, no face, pencil, full body, sharp, far away, overlapping, duplication, nude, disfigured, kitsch, oversaturated, grain, low-res, Deformed, blurry, bad anatomy, poorly drawn face, mutation, mutated, extra limb, ugly, poorly drawn hands, missing limb, blurry, floating limbs, disconnected limbs, malformed hands, blur, out of focus, long body, disgusting, poorly drawn, childish, mutilated, mangled, surreal, out of frame, duplicate, 2 faces",
          num_steps: 100,
          guidance_scale: 4,
          h: 512,
          w: 512,
          sampler: "ddim",
          prior_cf_scale: 4,
          prior_steps: "5",
          num_images: 1,
          seed: -1,
        },
      },
    };
    const result = await axios.request(options);
    return result.data.output.image_url;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
