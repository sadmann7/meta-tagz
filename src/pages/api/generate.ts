import type { ExtendedNextRequest, OpenAIStreamPayload } from "@/types/globals";
import { openaiStream } from "@/utils/openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: ExtendedNextRequest) => {
  const { description, language, robotsIndex, robotsFollow } = await req.json();

  const prompt = `My company is a ${description} and I want to rank on Google. I want to u
  se the following meta tags for my website. I want to use the following language: ${language}. I want to use the following robots.txt settings: index: ${robotsIndex}, follow: ${robotsFollow}.`;

  console.log(prompt);

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "I want you to act as a SEO optimized html meta tags generator. I will tell you what my company or idea does and you will tell me SEO optimzed meta tags for the website in the form of a html. Make sure to display only code, further explanations are not needed.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const stream = await openaiStream(payload);
  return new Response(stream);
};

export default handler;
