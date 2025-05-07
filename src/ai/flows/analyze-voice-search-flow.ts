'use server';
/**
 * @fileOverview Provides tips for optimizing content for voice search (Simulated).
 *
 * - analyzeVoiceSearch - A function that provides voice search optimization tips.
 * - AnalyzeVoiceSearchInput - The input type.
 * - AnalyzeVoiceSearchOutput - The output type.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeVoiceSearchInputSchema = z.object({
  content: z.string().describe('The content to be analyzed for voice search optimization.'),
});
export type AnalyzeVoiceSearchInput = z.infer<typeof AnalyzeVoiceSearchInputSchema>;

const AnalyzeVoiceSearchOutputSchema = z.object({
  voiceSearchTips: z.array(z.string()).describe('Actionable tips to optimize the content for voice search queries.'),
});
export type AnalyzeVoiceSearchOutput = z.infer<typeof AnalyzeVoiceSearchOutputSchema>;

export async function analyzeVoiceSearch(input: AnalyzeVoiceSearchInput): Promise<AnalyzeVoiceSearchOutput> {
  return analyzeVoiceSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeVoiceSearchPrompt',
  input: { schema: AnalyzeVoiceSearchInputSchema },
  output: { schema: AnalyzeVoiceSearchOutputSchema },
  prompt: `Analyze the following content and provide 3-4 specific, actionable tips for optimizing it for voice search (like queries made via Google Assistant or Alexa). Consider factors like natural language, question-based phrasing, featured snippet potential, and conciseness.

Content:
{{{content}}}

Voice Search Optimization Tips:`,
});

const analyzeVoiceSearchFlow = ai.defineFlow(
  {
    name: 'analyzeVoiceSearchFlow',
    inputSchema: AnalyzeVoiceSearchInputSchema,
    outputSchema: AnalyzeVoiceSearchOutputSchema,
  },
  async (input) => {
    // This is a simplified analysis focusing on generating tips via LLM.
    const { output } = await prompt(input);
    
     if (!output || !Array.isArray(output.voiceSearchTips)) {
         console.warn("Voice search analysis did not return expected format, providing defaults.");
         return {
            voiceSearchTips: [
                "Include headings phrased as common questions (e.g., 'What is...?').",
                "Use natural, conversational language throughout the text.",
                "Structure answers concisely, aiming for featured snippet eligibility.",
                "Ensure the content directly answers potential voice queries."
            ]
         };
     }

    return output;
  }
);
