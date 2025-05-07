'use server';
/**
 * @fileOverview A chatbot AI agent for ContentAI.
 *
 * - chatWithBot - A function that handles the chatbot interaction.
 * - ChatbotInput - The input type for the chatWithBot function.
 * - ChatbotOutput - The return type for the chatWithBot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatbotInputSchema = z.object({
  message: z.string().describe('The user current message to the chatbot.'),
  history: z.array(ChatMessageSchema).optional().describe('The history of the conversation so far.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  reply: z.string().describe('The chatbot reply to the user.'),
  suggestedVideo: z.string().optional().describe('A URL to a suggested video if relevant to the query.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function chatWithBot(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  prompt: `You are "ContentAI Helper", a friendly and helpful AI assistant for the ContentAI SaaS product.
ContentAI helps users analyze their written content for readability and predict its engagement.
Your goal is to assist users, answer their questions about ContentAI features, and guide them on how to use the platform.

Keep your responses concise and to the point.
If a user asks how a specific feature works or how to do something, you can explain it.
If you think a short video would be helpful to explain a feature, you can suggest one by providing a URL in the 'suggestedVideo' field. For example, if they ask about readability analysis, you could suggest a video explaining it.

Available features in ContentAI:
- Readability Analysis: Uses Flesch-Kincaid scores and provides suggestions.
- Engagement Prediction: Predicts engagement (high, medium, low) and offers tips.
- Content Analyzer Page: Main page to paste text and get analysis.
- Analysis History: Users can view past analyses.

Example video suggestion:
If user asks: "How does readability analysis work?"
Your reply could be: "Readability analysis helps you understand how easy your text is to read. We use the Flesch-Kincaid score. Would you like to see a quick video on it?" and set suggestedVideo to "https://www.example.com/videos/readability-analysis-demo.mp4".

Current conversation:
{{#if history}}
{{#each history}}
{{role}}: {{{content}}}
{{/each}}
{{/if}}
user: {{{message}}}
model:
`,
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    // Simple logic for video suggestion based on keywords.
    // This could be made more sophisticated or tool-based.
    let videoUrl: string | undefined = undefined;
    const lowerCaseMessage = input.message.toLowerCase();

    if (lowerCaseMessage.includes("readability") && (lowerCaseMessage.includes("how") || lowerCaseMessage.includes("explain"))) {
        videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-her-laptop-329-large.mp4"; // Placeholder video
    } else if (lowerCaseMessage.includes("engagement") && (lowerCaseMessage.includes("how") || lowerCaseMessage.includes("explain"))) {
        videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-43500-large.mp4"; // Placeholder video
    } else if (lowerCaseMessage.includes("tour") || lowerCaseMessage.includes("guide me")) {
        videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-information-technology-symbols-26681-large.mp4"; // Placeholder general tour video
    }


    const {output} = await prompt(input);
    
    // Ensure the LLM output doesn't override our determined video.
    // Or, let the LLM decide the video based on its refined output.
    // For now, if we determined a video, we use it.
    if (videoUrl && !output?.suggestedVideo) {
        return { reply: output!.reply, suggestedVideo: videoUrl};
    }
    
    return output!;
  }
);
