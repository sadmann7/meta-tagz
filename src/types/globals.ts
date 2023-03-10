import { NextRequest } from "next/server";
import { z } from "zod";

export type OpenAIStreamPayload = {
  model: ChatGPTModel;
  messages: ChatGPTMessage[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
};

export type ChatGPTModel =
  | "gpt-3.5-turbo"
  | "text-davinci-003"
  | "text-curie-001"
  | "text-babbage-001"
  | "text-ada-001";

export type ChatGPTAgent = "user" | "system";

export type ChatGPTMessage = {
  role: ChatGPTAgent;
  content: string;
};

export interface ExtendedNextRequest extends NextRequest {
  json: () => Promise<{
    description: string;
    language: string;
    robotsIndex?: boolean;
    robotsFollow?: boolean;
    tagVariant: z.infer<typeof tagVariantSchema>["value"];
  }>;
}

type TagVariant = {
  value: "nonSelfClosing" | "selfClosing";
  label: string;
  description: string;
};

export const tagVariants: TagVariant[] = [
  {
    value: "nonSelfClosing",
    label: "Non self-closing",
    description:
      "Non self-closing HTML tags are used to wrap content in a document",
  },
  {
    value: "selfClosing",
    label: "Self-closing",
    description:
      "Self-closing tags like in JSX or TSX are used to wrap content in a document",
  },
];

export const tagVariantSchema = z
  .object({
    value: z.enum(["nonSelfClosing", "selfClosing"]).default("nonSelfClosing"),
    label: z.string(),
    description: z.string(),
  })
  .refine((data) => {
    return tagVariants.some((variant) => variant.value === data.value);
  }, "Invalid tag variant")
  .default(tagVariants[0]);
