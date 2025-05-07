'use server';
/**
 * @fileOverview Summarizes the provided content.
 *
 * - summarizeContent - A function that generates a concise summary.
 * - SummarizeContentInput - The input type.
 * - SummarizeContentOutput - The output type.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SummarizeContentInputSchema = z.object({
  content: z.string().describe('The content to be summarized.'),
});
export type SummarizeContentInput = z.infer<typeof SummarizeContentInputSchema>;

const SummarizeContentOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the content (2-3 sentences).'),
});
export type SummarizeContentOutput = z.infer<typeof SummarizeContentOutputSchema>;

export async function summarizeContent(input: SummarizeContentInput): Promise<SummarizeContentOutput> {
  return summarizeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeContentPrompt',
  input: { schema: SummarizeContentInputSchema },
  output: { schema: SummarizeContentOutputSchema },
  prompt: `Generate a concise summary (approximately 2-3 sentences) of the following content. Focus on the main points and key takeaways.

Content:
{{{content}}}

Summary:`,
});

const summarizeContentFlow = ai.defineFlow(
  {
    name: 'summarizeContentFlow',
    inputSchema: SummarizeContentInputSchema,
    outputSchema: SummarizeContentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
