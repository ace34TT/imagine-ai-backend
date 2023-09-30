import { replicate } from "../configs/replicate.config";

export const sdxl = async (prompt: string) => {
  try {
    const output = await replicate.run(
      "stability-ai/sdxl:d830ba5dabf8090ec0db6c10fc862c6eb1c929e1a194a5411852d25fd954ac82",
      {
        input: {
          prompt: prompt,
          negative_prompt: "extra fingers , crossed fingers , bad hand",
          width: 1024,
          height: 1024,
          scheduler: "DDIM",
          num_inference_steps: 30,
          guidance_scale: 7.5,
          prompt_strength: 0.8,
          refine: "expert_ensemble_refiner",
          high_noise_frac: 0.8,
          lora_scale: 0.6,
        },
      }
    );
    return output;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const wuerstchen_v2 = async (prompt: string) => {
  try {
    const output = await replicate.run(
      "pagebrain/wuerstchen-v2:0725c5f70905b87ffadd7d6fe4cfae1b5457784d911eebd8521022892deb481a",
      {
        input: {
          prompt: prompt,
          negative_prompt: "extra fingers , crossed fingers , bad hand",
          width: 1024,
          height: 1024,
          prior_num_inference_steps: 30,
        },
      }
    );
    return output;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
