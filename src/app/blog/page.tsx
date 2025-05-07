// src/app/blog/page.tsx
"use client";

import { useState, useEffect } from 'react'; // Import hooks
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, UserCircle, Loader2, FilePlus } from 'lucide-react'; // Added Loader2, FilePlus
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog-data'; // Import BlogPost type
import { staticBlogPosts, loadUserBlogPosts } from '@/lib/blog-data'; // Import staticBlogPosts and loadUserBlogPosts function


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};


export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

   // Load posts on client mount
  useEffect(() => {
    // Load user posts from localStorage
    const userPosts = loadUserBlogPosts();
    // Combine static posts (imported) with user posts
    const combinedPosts = [...staticBlogPosts, ...userPosts]; 
    // Optional: Sort posts by date if desired
    combinedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setAllPosts(combinedPosts);
    setIsLoading(false);
  }, []); // Empty dependency array ensures this runs only once on mount


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.section
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              ContentAI <span className="text-primary">Insights Blog</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Stay updated with the latest trends, tips, and insights in AI-powered content optimization and strategy. Includes user-generated posts!
            </p>
             <Link href="/generate-blog" passHref className="mt-4 inline-block">
                <Button variant="outline">
                   <FilePlus className="mr-2 h-4 w-4" /> Create New Blog Post
                </Button>
            </Link>
          </motion.section>

          {isLoading ? (
             <div className="flex justify-center items-center py-20">
               <Loader2 className="h-12 w-12 animate-spin text-primary" />
             </div>
          ) : (
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {allPosts.length > 0 ? (
                    allPosts.map((post: BlogPost) => ( // Ensure post is typed as BlogPost
                        <motion.div key={post.slug} variants={itemVariants}>
                            <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="p-0">
                                <Link href={`/blog/${post.slug}`} passHref>
                                <Image
                                    src={post.imageSrc || post.featuredImage.src} // Fallback to featuredImage
                                    alt={post.title}
                                    width={400}
                                    height={250}
                                    className="object-cover w-full h-48 hover:scale-105 transition-transform duration-300"
                                    data-ai-hint={post.imageHint || post.featuredImage.hint}
                                />
                                </Link>
                            </CardHeader>
                            <CardContent className="flex-grow p-6">
                                <div className="mb-2 flex items-center space-x-4 text-xs text-muted-foreground">
                                    <div className="flex items-center">
                                        <CalendarDays className="mr-1.5 h-4 w-4" />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center">
                                        <UserCircle className="mr-1.5 h-4 w-4" />
                                        {post.author}
                                    </div>
                                </div>
                                <Link href={`/blog/${post.slug}`} passHref>
                                    <CardTitle className="text-xl font-semibold mb-2 hover:text-primary transition-colors duration-200 cursor-pointer line-clamp-2">{post.title}</CardTitle>
                                </Link>
                                <CardDescription className="text-sm line-clamp-3">{post.excerpt}</CardDescription>
                                <div className="mt-3">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full mr-1.5 mb-1.5 inline-block">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="p-6 pt-0">
                                <Link href={`/blog/${post.slug}`} passHref className="w-full">
                                <Button variant="outline" className="w-full">
                                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                </Link>
                            </CardFooter>
                            </Card>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-muted-foreground text-center col-span-full">No blog posts found.</p>
                )}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
