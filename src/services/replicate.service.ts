import { replicate } from "../configs/replicate.config";

export const makeRequest = async (prompt: string) => {
  const output = await replicate.run(
    "stability-ai/sdxl:d830ba5dabf8090ec0db6c10fc862c6eb1c929e1a194a5411852d25fd954ac82",
    {
      input: {
        prompt: prompt,
        width: 512,
        height: 512,
      },
    }
  );
  console.log(output);
  return output;
};
