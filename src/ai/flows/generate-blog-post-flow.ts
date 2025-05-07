'use server';
/**
 * @fileOverview Generates a blog post with text (Markdown) and a featured image based on a user prompt.
 *
 * - generateBlogPost - A function that handles the blog post generation.
 * - GenerateBlogPostInput - The input type.
 * - GenerateBlogPostOutput - The output type.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateBlogPostInputSchema = z.object({
  prompt: z.string().describe('The topic or prompt for the blog post.'),
  // Optional: Add more inputs like keywords, desired tone, target audience later
});
export type GenerateBlogPostInput = z.infer<typeof GenerateBlogPostInputSchema>;

const GenerateBlogPostOutputSchema = z.object({
  title: z.string().describe('A compelling title for the blog post.'),
  markdownContent: z.string().describe('The full blog post content formatted in Markdown.'),
  featuredImageDataUri: z
    .string()
    .describe(
      "A generated featured image for the blog post, as a data URI (e.g., 'data:image/png;base64,...')."
    ),
    excerpt: z.string().describe('A short excerpt or summary of the blog post (1-2 sentences).'),
    tags: z.array(z.string()).describe('A list of 3-5 relevant tags for the blog post.'),
});
export type GenerateBlogPostOutput = z.infer<typeof GenerateBlogPostOutputSchema>;

export async function generateBlogPost(input: GenerateBlogPostInput): Promise<GenerateBlogPostOutput> {
  return generateBlogPostFlow(input);
}

// Define the prompt for generating text content (Markdown)
const textGenerationPrompt = ai.definePrompt({
  name: 'generateBlogPostTextPrompt',
  input: { schema: GenerateBlogPostInputSchema },
  // Define partial output schema for text-related fields
  output: { schema: z.object({ 
      title: GenerateBlogPostOutputSchema.shape.title, 
      markdownContent: GenerateBlogPostOutputSchema.shape.markdownContent,
      excerpt: GenerateBlogPostOutputSchema.shape.excerpt,
      tags: GenerateBlogPostOutputSchema.shape.tags,
    }) }, 
  prompt: `Generate a well-structured and engaging blog post based on the following prompt.

  Prompt: {{{prompt}}}

  Format the entire blog post content using Markdown. Include headings (##, ###), paragraphs, bullet points (*), and potentially bold text where appropriate.
  
  Ensure the blog post includes:
  1.  A compelling title.
  2.  An introduction that hooks the reader.
  3.  A body with clear sections and paragraphs.
  4.  A concluding paragraph summarizing the key points or offering a final thought.
  5.  A concise excerpt (1-2 sentences) summarizing the post.
  6.  A list of 3-5 relevant tags (keywords).

  Output the title, markdown content, excerpt, and tags according to the specified output schema.
  `,
});

// Main flow
const generateBlogPostFlow = ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: GenerateBlogPostInputSchema,
    outputSchema: GenerateBlogPostOutputSchema,
  },
  async (input) => {
    
    console.log("Starting blog post generation flow for prompt:", input.prompt);

    // Step 1: Generate the text content (title, markdown, excerpt, tags)
    const { output: textOutput } = await textGenerationPrompt(input);

    if (!textOutput || !textOutput.title || !textOutput.markdownContent || !textOutput.excerpt || !textOutput.tags) {
      console.error("Text generation failed or produced invalid output:", textOutput);
      throw new Error('Failed to generate blog post text content.');
    }
    
    console.log("Text content generated successfully. Title:", textOutput.title);

    // Step 2: Generate the featured image based on the title or prompt
    // Use a simpler prompt for image generation, derived from the main prompt or title
    const imagePrompt = `Generate a visually appealing featured image suitable for a blog post titled "${textOutput.title}". The image should relate to the core topic: ${input.prompt}. Focus on a clear subject with a professional aesthetic.`;
    console.log("Generating image with prompt:", imagePrompt);

    try {
        const { media } = await ai.generate({
            // IMPORTANT: ONLY use the experimental model capable of image generation.
            model: 'googleai/gemini-2.0-flash-exp', 
            prompt: imagePrompt,
            config: {
                responseModalities: ['TEXT', 'IMAGE'], // MUST request both
                // Optional: Add more specific image generation controls if needed
                // generationConfig: { candidateCount: 1, maxOutputTokens: 1024 }, 
            },
        });

        if (!media?.url) {
             console.error("Image generation failed, no media URL returned.");
             throw new Error('Failed to generate featured image.');
        }
        
        console.log("Image generated successfully.");

        // Combine text and image results
        return {
            title: textOutput.title,
            markdownContent: textOutput.markdownContent,
            featuredImageDataUri: media.url,
            excerpt: textOutput.excerpt,
            tags: textOutput.tags,
        };
    } catch(imageError) {
        console.error("Error during image generation:", imageError);
         // Decide how to handle image failure: throw error or return without image?
         // For now, let's throw, as the image is part of the expected output.
         throw new Error('Failed to generate featured image.'); 
    }
  }
);
