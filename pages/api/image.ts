import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const prompt = "an image of an orange alien with a blue hat and a red shirt.";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    user: "davinci",
  });
  res.status(200).json({ result: result.data });
}
