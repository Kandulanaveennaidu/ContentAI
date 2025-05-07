'use server';
/**
 * @fileOverview Generates relevant Frequently Asked Questions (FAQs) based on the provided content.
 *
 * - generateFaqs - A function that creates FAQs.
 * - GenerateFaqInput - The input type.
 * - GenerateFaqOutput - The output type.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateFaqInputSchema = z.object({
  content: z.string().describe('The content to generate FAQs from.'),
});
export type GenerateFaqInput = z.infer<typeof GenerateFaqInputSchema>;

const FaqItemSchema = z.object({
  question: z.string().describe('A relevant question based on the content.'),
  answer: z.string().describe('A concise answer to the question, derived from the content.'),
});

const GenerateFaqOutputSchema = z.object({
  faqs: z.array(FaqItemSchema).describe('An array of 2-3 generated FAQ items (question and answer).'),
});
export type GenerateFaqOutput = z.infer<typeof GenerateFaqOutputSchema>;

export async function generateFaqs(input: GenerateFaqInput): Promise<GenerateFaqOutput> {
  return generateFaqFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFaqPrompt',
  input: { schema: GenerateFaqInputSchema },
  output: { schema: GenerateFaqOutputSchema },
  prompt: `Based on the following content, generate 2-3 relevant Frequently Asked Questions (FAQs) with concise answers derived directly from the text. Ensure the questions address key topics or potential user queries related to the content.

Content:
{{{content}}}

Generated FAQs:`,
});

const generateFaqFlow = ai.defineFlow(
  {
    name: 'generateFaqFlow',
    inputSchema: GenerateFaqInputSchema,
    outputSchema: GenerateFaqOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    // Ensure the output format even if LLM doesn't perfectly match
    if (!output?.faqs) {
        console.warn("FAQ generation did not return expected format, returning empty array.");
        return { faqs: [] };
    }
    return output;
  }
);
