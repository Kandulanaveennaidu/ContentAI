'use server';
/**
 * @fileOverview Engagement Prediction AI agent.
 *
 * - engagementPrediction - A function that handles the engagement prediction process.
 * - EngagementPredictionInput - The input type for the engagementPrediction function.
 * - EngagementPredictionOutput - The return type for the engagementPrediction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EngagementPredictionInputSchema = z.object({
  content: z.string().describe('The content to be analyzed for engagement prediction.'),
});
export type EngagementPredictionInput = z.infer<typeof EngagementPredictionInputSchema>;

const EngagementPredictionOutputSchema = z.object({
  predictedEngagement: z
    .string()
    .describe('The predicted engagement level of the content (e.g., high, medium, low).'),
  actionableTips: z.array(z.string()).describe('Actionable tips to improve content engagement.'),
});
export type EngagementPredictionOutput = z.infer<typeof EngagementPredictionOutputSchema>;

export async function engagementPrediction(input: EngagementPredictionInput): Promise<EngagementPredictionOutput> {
  return engagementPredictionFlow(input);
}

const engagementPredictionPrompt = ai.definePrompt({
  name: 'engagementPredictionPrompt',
  input: {schema: EngagementPredictionInputSchema},
  output: {schema: EngagementPredictionOutputSchema},
  prompt: `You are an expert in content engagement prediction.

  Analyze the following content and predict its engagement level. Provide actionable tips to improve the content's engagement.

  Content: {{{content}}}

  Predicted Engagement:
  Actionable Tips:`, // Ensure LLM returns output in the desired format
});

const engagementPredictionFlow = ai.defineFlow(
  {
    name: 'engagementPredictionFlow',
    inputSchema: EngagementPredictionInputSchema,
    outputSchema: EngagementPredictionOutputSchema,
  },
  async input => {
    const {output} = await engagementPredictionPrompt(input);
    return output!;
  }
);
