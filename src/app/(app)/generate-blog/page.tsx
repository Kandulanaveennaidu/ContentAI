'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ReactMarkdown from 'react-markdown'; // Correct import
import remarkGfm from 'remark-gfm'; // Correct import
import { generateBlogPost, type GenerateBlogPostInput, type GenerateBlogPostOutput } from '@/ai/flows/generate-blog-post-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input'; // Use Input for topic
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, ImagePlus, Check, UploadCloud, FileText, Tags } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { BlogPost } from '@/lib/blog-data'; // Import base BlogPost type
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label'; // Import Label

const blogGenFormSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters.'),
  // Optional: Add more fields for keywords, tone etc. later
});

type BlogGenFormValues = z.infer<typeof blogGenFormSchema>;

// Define a type for stored user blog posts (using markdown content)
interface StoredUserBlogPost extends Omit<BlogPost, 'contentBlocks' | 'imageSrc'> {
  markdownContent: string;
  featuredImage: { src: string; alt: string; hint: string }; // Ensure featuredImage src is string (data URI)
}

const USER_BLOG_STORAGE_KEY = 'userGeneratedBlogPosts';

export default function GenerateBlogPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState<GenerateBlogPostOutput | null>(null);
  const [finalImageDataUri, setFinalImageDataUri] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<BlogGenFormValues>({
    resolver: zodResolver(blogGenFormSchema),
    defaultValues: { prompt: '' },
  });

  const handleGenerate = async (data: BlogGenFormValues) => {
    setIsLoading(true);
    setGeneratedData(null); // Clear previous results
    setFinalImageDataUri(null);

    try {
      const result = await generateBlogPost({ prompt: data.prompt });
      setGeneratedData(result);
      setFinalImageDataUri(result.featuredImageDataUri); // Set initial image
      toast({ title: 'Blog Post Generated!', description: 'Review the content and image below.' });
    } catch (error) {
      console.error('Blog generation error:', error);
      toast({
        title: 'Generation Failed',
        description: error instanceof Error ? error.message : 'Could not generate blog post. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
       if (file.size > 4 * 1024 * 1024) { // Limit file size (e.g., 4MB)
         toast({
            title: "Image Too Large",
            description: "Please upload an image smaller than 4MB.",
            variant: "destructive",
         });
         return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setFinalImageDataUri(dataUrl);
        toast({ title: 'Image Updated', description: 'Using your uploaded image.' });
      };
      reader.onerror = () => {
         toast({
            title: "Error Reading File",
            description: "Could not read the selected image file.",
            variant: "destructive",
         });
      }
      reader.readAsDataURL(file);
    }
  };

  // Helper to generate slugs (same as in blog-data)
  const generateSlug = (title: string) => {
    return title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
  };

  const handlePostBlog = () => {
    if (!generatedData || !finalImageDataUri) {
        toast({ title: "Cannot Post", description: "Blog content or image is missing.", variant: "destructive"});
        return;
    }
    setIsPosting(true);

    // Create the BlogPost structure
     const slug = generateSlug(generatedData.title);
     const newPost: StoredUserBlogPost = {
        slug: slug,
        title: generatedData.title,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), // Format date
        author: localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')!).name : 'ContentAI User', // Get author from profile or default
        excerpt: generatedData.excerpt, // Use generated excerpt
        markdownContent: generatedData.markdownContent, // Store markdown
        tags: generatedData.tags, // Use generated tags
        featuredImage: {
            src: finalImageDataUri, // Use final image (generated or uploaded)
            alt: generatedData.title, // Use title as alt text
            hint: generatedData.title.substring(0, 15), // Generate a simple hint
        },
        // Omit fields not relevant for user-generated posts via this tool
        // imageSrc, imageHint, relatedReads will be derived/unused for these posts
    };

    // Save to localStorage
    try {
        const existingPostsRaw = localStorage.getItem(USER_BLOG_STORAGE_KEY);
        const existingPosts: StoredUserBlogPost[] = existingPostsRaw ? JSON.parse(existingPostsRaw) : [];
        
        // Prevent duplicate slugs (basic check)
         if (existingPosts.some(post => post.slug === newPost.slug)) {
            newPost.slug = `${newPost.slug}-${Date.now()}`; // Append timestamp to make unique
         }

        const updatedPosts = [newPost, ...existingPosts];
        localStorage.setItem(USER_BLOG_STORAGE_KEY, JSON.stringify(updatedPosts));

        toast({ title: "Blog Post Published!", description: `Your post "${newPost.title}" is now live.` });
        router.push('/blog'); // Redirect to blog list

    } catch (error) {
        console.error("Failed to save blog post:", error);
        toast({ title: "Posting Failed", description: "Could not save your blog post.", variant: "destructive"});
        setIsPosting(false);
    }
    // Note: setIsPosting(false) is not called on success because we redirect
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <header className="mb-8 text-center">
          <motion.h1
            className="text-4xl font-bold tracking-tight text-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            AI <span className="text-primary">Blog Post</span> Generator <Wand2 className="inline-block h-10 w-10 text-primary -mt-2" />
          </motion.h1>
          <motion.p
            className="mt-2 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Enter a topic or prompt, and let AI craft a draft blog post with a featured image for you.
          </motion.p>
        </header>

        {/* Input Card */}
        <Card className="mb-8 shadow-xl">
           <CardHeader>
                <CardTitle>Blog Post Topic</CardTitle>
                <CardDescription>Describe the main subject or provide a detailed prompt for your blog post.</CardDescription>
           </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleGenerate)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic / Prompt</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'The future of renewable energy sources' or 'Write a blog post comparing React and Vue for front-end development'"
                          {...field}
                          rows={4}
                          className="text-base"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" /> Generate Blog Post
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>

        {/* Results Section */}
        <AnimatePresence>
            {isLoading && (
                <motion.div key="loading" variants={cardVariants} initial="hidden" animate="visible" exit="hidden" className="mt-8">
                     <Card className="shadow-lg">
                        <CardHeader>
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                         <CardContent className="space-y-4">
                            <Skeleton className="h-40 w-full" /> {/* Image placeholder */}
                             <Skeleton className="h-4 w-full" />
                             <Skeleton className="h-4 w-5/6" />
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-4 w-4/5" />
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-4 w-2/3" />
                         </CardContent>
                         <CardFooter>
                             <Skeleton className="h-10 w-24" />
                         </CardFooter>
                     </Card>
                </motion.div>
            )}
           {!isLoading && generatedData && (
            <motion.div key="results" variants={cardVariants} initial="hidden" animate="visible" exit="hidden" className="mt-8">
                <Card className="shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl md:text-3xl">{generatedData.title}</CardTitle>
                        <CardDescription className="flex flex-wrap gap-2 pt-2">
                            <span className="font-semibold mr-2 flex items-center"><Tags className="h-4 w-4 mr-1"/> Tags:</span>
                            {generatedData.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                        </CardDescription>
                         <CardDescription className="pt-1 italic"><span className="font-semibold not-italic mr-1 flex items-center"><FileText className="h-4 w-4 mr-1"/> Excerpt:</span> {generatedData.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Image Section */}
                        <div>
                            <Label className="text-lg font-semibold">Featured Image</Label>
                            <div className="mt-2 relative group aspect-video w-full max-w-2xl mx-auto">
                                {finalImageDataUri ? (
                                <Image
                                    src={finalImageDataUri}
                                    alt={generatedData.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-md shadow-md"
                                />
                                ) : (
                                    <div className="h-full w-full bg-muted rounded-md flex items-center justify-center">
                                        <ImagePlus className="h-16 w-16 text-muted-foreground"/>
                                    </div>
                                )}
                                 <div
                                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                    title="Upload new image"
                                >
                                    <UploadCloud className="h-10 w-10 text-white" />
                                </div>
                            </div>
                            <Input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/png, image/jpeg, image/webp" // Specify accepted types
                                onChange={handleImageChange}
                            />
                            <Button variant="outline" size="sm" className="mt-3" onClick={() => fileInputRef.current?.click()}>
                                <ImagePlus className="mr-2 h-4 w-4" /> Change Image
                            </Button>
                        </div>

                        {/* Content Section */}
                        <div>
                            <Label className="text-lg font-semibold">Generated Content (Markdown)</Label>
                             {/* Apply prose styles for better Markdown rendering & ensure width fits */}
                            <div className="mt-2 p-4 border rounded-md bg-muted/30 prose dark:prose-invert prose-sm sm:prose-base max-w-full break-words overflow-hidden">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {generatedData.markdownContent}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handlePostBlog} disabled={isPosting || !finalImageDataUri} size="lg">
                            {isPosting ? (
                                <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting...
                                </>
                            ) : (
                                 <>
                                <Check className="mr-2 h-4 w-4" /> Post to Blog
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </Card>
             </motion.div>
           )}
        </AnimatePresence>

    </div>
  );
}
