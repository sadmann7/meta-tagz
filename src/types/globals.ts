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
    tagVariant: z.infer<typeof tagVariantSchema>;
  }>;
}

type TagVariant = {
  value: "notSelfClosing" | "selfClosing";
  label: string;
  description: string;
};

export const tagVariants: TagVariant[] = [
  {
    value: "notSelfClosing",
    label: "Not self-closing",
    description:
      "Not self-closing tags are used to wrap content in a document.",
  },
  {
    value: "selfClosing",
    label: "Self-closing",
    description: "Self-closing tags are used to embed content in a document.",
  },
];

export const tagVariantSchema = z
  .object({
    value: z.enum(["notSelfClosing", "selfClosing"]).default("notSelfClosing"),
    label: z.string(),
    description: z.string(),
  })
  .refine((data) => {
    return tagVariants.some((variant) => variant.value === data.value);
  }, "Invalid tag variant")
  .default(tagVariants[0]);
