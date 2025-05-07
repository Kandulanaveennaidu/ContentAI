'use server';
/**
 * @fileOverview Analyzes the tone and sentiment of the provided content.
 *
 * - analyzeToneSentiment - A function that performs tone and sentiment analysis.
 * - AnalyzeToneSentimentInput - The input type.
 * - AnalyzeToneSentimentOutput - The output type.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeToneSentimentInputSchema = z.object({
  content: z.string().describe('The content to be analyzed.'),
});
export type AnalyzeToneSentimentInput = z.infer<typeof AnalyzeToneSentimentInputSchema>;

const AnalyzeToneSentimentOutputSchema = z.object({
  detectedTone: z.string().describe('The primary detected tone of the content (e.g., Formal, Casual, Optimistic, Persuasive).'),
  sentimentScore: z.number().describe('A sentiment score ranging from -1 (very negative) to 1 (very positive).'),
  emotionalKeywords: z.array(z.string()).describe('Keywords or phrases identified as carrying significant emotional weight.'),
});
export type AnalyzeToneSentimentOutput = z.infer<typeof AnalyzeToneSentimentOutputSchema>;

export async function analyzeToneSentiment(input: AnalyzeToneSentimentInput): Promise<AnalyzeToneSentimentOutput> {
  return analyzeToneSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeToneSentimentPrompt',
  input: { schema: AnalyzeToneSentimentInputSchema },
  output: { schema: AnalyzeToneSentimentOutputSchema },
  prompt: `Analyze the following content for its overall tone and sentiment. Provide:
1.  The primary detected tone (e.g., Formal, Casual, Optimistic, Persuasive, Informative, Joyful, Urgent, Empathetic).
2.  A sentiment score between -1 (very negative) and 1 (very positive).
3.  A list of up to 5 keywords or short phrases that carry the most significant emotional weight in the text.

Content:
{{{content}}}

Analysis:`,
});

const analyzeToneSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeToneSentimentFlow',
    inputSchema: AnalyzeToneSentimentInputSchema,
    outputSchema: AnalyzeToneSentimentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
