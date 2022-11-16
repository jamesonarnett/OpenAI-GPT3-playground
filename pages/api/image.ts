import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await openai.createImage({
    prompt: req.body.prompt,
    n: 1,
    size: "512x512",
  });

  if (!result) {
    res.status(500).json({ error: "No image returned" });
    console.error("No image returned");
    return;
  }
  res.status(200).json({ imageURL: result.data.data[0].url });
}
