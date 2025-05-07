'use server';
/**
 * @fileOverview Analyzes content readability and provides suggestions for improvement.
 *
 * - analyzeReadability - A function that analyzes content readability.
 * - ReadabilityAnalysisInput - The input type for the analyzeReadability function.
 * - ReadabilityAnalysisOutput - The return type for the analyzeReadability function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReadabilityAnalysisInputSchema = z.object({
  content: z.string().describe('The content to be analyzed for readability.'),
});
export type ReadabilityAnalysisInput = z.infer<typeof ReadabilityAnalysisInputSchema>;

const ReadabilityAnalysisOutputSchema = z.object({
  fleschKincaidScore: z
    .number()
    .describe('The Flesch-Kincaid readability score of the content.'),
  suggestions: z.array(z.string()).describe('Suggestions for improving the content readability.'),
});
export type ReadabilityAnalysisOutput = z.infer<typeof ReadabilityAnalysisOutputSchema>;

export async function analyzeReadability(input: ReadabilityAnalysisInput): Promise<ReadabilityAnalysisOutput> {
  return readabilityAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'readabilityAnalysisPrompt',
  input: {schema: ReadabilityAnalysisInputSchema},
  output: {schema: ReadabilityAnalysisOutputSchema},
  prompt: `You are an expert content editor specializing in readability.

You will analyze the content provided and provide a Flesch-Kincaid readability score.  You will also provide a list of suggestions for improving the content's readability for a wider audience.

Content to analyze:
{{{content}}}`,
});

const readabilityAnalysisFlow = ai.defineFlow(
  {
    name: 'readabilityAnalysisFlow',
    inputSchema: ReadabilityAnalysisInputSchema,
    outputSchema: ReadabilityAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
