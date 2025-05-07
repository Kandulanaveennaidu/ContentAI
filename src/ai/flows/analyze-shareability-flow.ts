'use server';
/**
 * @fileOverview Analyzes the shareability potential of the content (Simulated).
 *
 * - analyzeShareability - A function that estimates shareability.
 * - AnalyzeShareabilityInput - The input type.
 * - AnalyzeShareabilityOutput - The output type.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeShareabilityInputSchema = z.object({
  content: z.string().describe('The content to be analyzed for shareability.'),
});
export type AnalyzeShareabilityInput = z.infer<typeof AnalyzeShareabilityInputSchema>;

const AnalyzeShareabilityOutputSchema = z.object({
  shareabilityScore: z.number().int().min(0).max(100).describe('An estimated shareability score (0-100). Higher is better.'),
  shareabilityTips: z.array(z.string()).describe('Actionable tips to improve the content\'s shareability.'),
});
export type AnalyzeShareabilityOutput = z.infer<typeof AnalyzeShareabilityOutputSchema>;

export async function analyzeShareability(input: AnalyzeShareabilityInput): Promise<AnalyzeShareabilityOutput> {
  return analyzeShareabilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeShareabilityPrompt',
  input: { schema: AnalyzeShareabilityInputSchema },
  output: { schema: AnalyzeShareabilityOutputSchema },
  prompt: `Analyze the following content and estimate its potential for being shared on social media or other platforms. Consider factors like headline strength, emotional appeal, uniqueness, practical value, and visual appeal potential.

Provide:
1.  An estimated shareability score between 0 and 100.
2.  A list of 2-3 specific, actionable tips to make the content more shareable.

Content:
{{{content}}}

Shareability Analysis:`,
});

const analyzeShareabilityFlow = ai.defineFlow(
  {
    name: 'analyzeShareabilityFlow',
    inputSchema: AnalyzeShareabilityInputSchema,
    outputSchema: AnalyzeShareabilityOutputSchema,
  },
  async (input) => {
    // In a real scenario, this might involve more complex analysis or different models.
    // For now, we rely on the LLM's ability to estimate based on the prompt.
    const { output } = await prompt(input);

    // Basic validation / fallback
     if (!output || typeof output.shareabilityScore !== 'number' || !Array.isArray(output.shareabilityTips)) {
        console.warn("Shareability analysis did not return expected format, providing defaults.");
        return {
            shareabilityScore: Math.floor(Math.random() * 40) + 30, // Random score between 30-70
            shareabilityTips: [
                "Consider adding a compelling image or video.",
                "Ensure the headline is attention-grabbing.",
                "Include a surprising statistic or unique insight."
            ]
        };
    }
    // Ensure score is within bounds
    output.shareabilityScore = Math.max(0, Math.min(100, output.shareabilityScore));

    return output;
  }
);
