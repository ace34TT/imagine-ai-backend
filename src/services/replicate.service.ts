import { replicate } from "../configs/replicate.config";

export const makeRequest = async (prompt: string) => {
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
};
