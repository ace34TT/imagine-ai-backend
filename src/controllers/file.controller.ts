import nodeFetch from "node-fetch";
import fs from "fs";
import { Request, Response } from "express";
export const downloadImage = async (req: Request, res: Response) => {
  const imageUrl =
    "https://14068d66ba387efac9ce5e4b1741bcf2.r2.cloudflarestorage.com/ai-api/08-23/sync-a0fbfb7b-674c-45d0-a3b0-73910d86338d/8f502bee.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=16b502c87564788383d52ec498a61a24%2F20230826%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230826T121425Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=ffcdf5cc8b3228ffcd2c9b6e1a12970096d477f813a46e37cbffe4967b6cd462";
  const image = await nodeFetch(imageUrl);
  await new Promise<void>((resolve, reject) => {
    const fileStream = fs.createWriteStream("./octocat.png");
    image.body!.pipe(fileStream);
    image.body!.on("error", (err: any) => {
      reject(err);
    });
    fileStream.on("finish", function () {
      resolve();
    });
  });
};
