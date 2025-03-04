import { fal } from "@fal-ai/client";
import { BaseModel } from "./BaseModel";
const axios = require('axios');

export class FalAIModel {
  constructor() {

  }

  public async generateImage(prompt: string, tensorPath: string) {
    const { request_id, response_url } = await fal.queue.submit("fal-ai/flux-lora", {
        input: {
            prompt: prompt,
            loras: [{ path: tensorPath, scale: 1 }]
        },
        webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/webhook/image`,
    });

    return { request_id, response_url };
  }

  public async trainModel(zipUrl: string, triggerWord: string) {
    
    // const { request_id, response_url } = await fal.queue.submit("fal-ai/flux-lora-fast-training", {
    //     input: {
    //         images_data_url: zipUrl,
    //         trigger_word: triggerWord
    //     },
    //     webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/webhook/train`,
    // });

    // curl --request POST \
    // --url https://queue.fal.run/fal-ai/flux-lora-fast-training?fal_webhook=${process.env.WEBHOOK_BASE_URL}/fal-ai/webhook/train' \
    // --header "Authorization: Key $FAL_KEY" \
    // --header "Content-Type: application/json" \
    // --data '{
    //    "images_data_url": ""
    //    "trigger_word": triggerWord
    //  }'

    const response = await axios.post(
      'https://queue.fal.run/fal-ai/flux-lora-fast-training',
      {
        images_data_url: zipUrl,
        trigger_word: triggerWord
      },
      {
        headers: {
          'Authorization': `Key ${process.env.FAL_KEY}`,
          'Content-Type': 'application/json'
        },
        params: {
          fal_webhook: `${process.env.WEBHOOK_BASE_URL}/fal-ai/webhook/train`
        }
      }
    );

    const { request_id, response_url } = response.data;

    return { request_id, response_url };
  }

  public async generateImageSync(tensorPath: string) {
    const response = await fal.subscribe("fal-ai/flux-lora", {
        input: {
            prompt: "Generate a head shot for this user in front of a white background",
            loras: [{ path: tensorPath, scale: 1 }]
        },
    })
    return {
      imageUrl: response.data.images[0].url
    }
  }
}
