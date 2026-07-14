/**
 * @fileoverview Chat server function for StadiumIQ.
 * Exposes a TanStack Start server function that forwards chat messages
 * to the xAI Grok API with input validation, rate-limit error handling,
 * and language-aware system prompting.
 *
 * @module chat.functions
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SYSTEM_PROMPT } from "./constants";

/**
 * Zod schema for validating the chat API request payload.
 * Limits message count (1–30) and individual message length (1–2000 chars)
 * to prevent token budget overruns and abuse.
 */
const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(30),
  /** BCP-47 language name used to instruct the model to reply in that language */
  language: z.string().max(20).optional(),
});

/**
 * TanStack Start server function — proxies a chat conversation to the Grok model
 * via the xAI API. Runs exclusively on the server, keeping the API key
 * out of the client bundle.
 *
 * @param {{ data: z.infer<typeof ChatInput> }} input - Validated chat payload
 * @returns {Promise<{ reply: string }>} The assistant's reply text
 *
 * @throws {Error} When the API key is missing, the rate limit is exceeded,
 *   AI credits are exhausted, or the upstream request fails.
 *
 * @example
 * const { reply } = await chat({ data: { messages, language: "Español" } });
 */
export const chatWithStadiumIQ = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ChatInput.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.GROK_API_KEY || process.env.XAI_API_KEY;
    if (!key) throw new Error("Missing GROK_API_KEY");

    const systemContent = data.language
      ? `${SYSTEM_PROMPT} Reply in ${data.language}.`
      : SYSTEM_PROMPT;

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "grok-2-latest",
        messages: [{ role: "system", content: systemContent }, ...data.messages],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429) throw new Error("Rate limit reached. Please try again shortly.");
      if (res.status === 402)
        throw new Error("AI credits exhausted. Please add credits in workspace billing.");
      throw new Error(`AI error [${res.status}]: ${text.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = json.choices?.[0]?.message?.content ?? "";
    return { reply };
  });
