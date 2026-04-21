import { z } from 'zod';

/**
 * Strict schema for AI response payloads.
 * Ensures the generated content consistently matches expected structure.
 */
export const guidanceResponseSchema = z.object({
  title: z.string().describe("Main title of the guidance"),
  eat: z.array(z.string()).describe("List of foods to eat (includes Indian examples)"),
  avoid: z.array(z.string()).describe("List of foods to strictly avoid"),
  tips: z.array(z.string()).describe("Hydration and other lifestyle tips"),
  reason: z.string().describe("Short scientific yet accessible reasoning. NO MEDICAL CLAIMS."),
  regional: z.object({
    te: z.string().describe("Title or brief summary translated into Telugu"),
    hi: z.string().describe("Title or brief summary translated into Hindi"),
  }),
});

/**
 * @typedef {z.infer<typeof guidanceResponseSchema>} GuidanceResponse
 */
