// src/app/blog/page.tsx
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    slug: "ai-in-content-creation-trends",
    title: "Top AI Trends Shaping Content Creation in 2024",
    date: "October 26, 2023",
    author: "Dr. Lexi Data",
    excerpt: "Artificial intelligence is no longer a futuristic concept but a present-day tool revolutionizing how we create and consume content. Explore the top trends...",
    imageSrc: "https://picsum.photos/seed/blogai/400/250",
    imageHint: "futuristic AI technology",
    tags: ["AI", "Content Creation", "Trends"]
  },
  {
    slug: "mastering-readability-for-engagement",
    title: "Mastering Readability: Keys to Unlocking Higher Engagement",
    date: "October 15, 2023",
    author: "ContentAI Team",
    excerpt: "Discover why readability is crucial for audience engagement and learn practical tips to improve your Flesch-Kincaid scores using ContentAI.",
    imageSrc: "https://picsum.photos/seed/blogread/400/250",
    imageHint: "person reading book",
    tags: ["Readability", "Engagement", "Writing Tips"]
  },
  {
    slug: "predictive-analytics-content-strategy",
    title: "How Predictive Analytics Can Supercharge Your Content Strategy",
    date: "September 28, 2023",
    author: "Mark Strategist",
    excerpt: "Move beyond guesswork. Learn how ContentAI's engagement prediction helps you make data-driven decisions for a more effective content strategy.",
    imageSrc: "https://picsum.photos/seed/blogpredict/400/250",
    imageHint: "data analytics chart",
    tags: ["Predictive Analytics", "Content Strategy", "Data"]
  },
   {
    slug: "future-of-seo-with-ai",
    title: "The Future of SEO: How AI is Changing the Game",
    date: "November 5, 2023",
    author: "Serena Search",
    excerpt: "SEO is constantly evolving, and AI is at the forefront of this change. Understand how AI tools like ContentAI can help you stay ahead.",
    imageSrc: "https://picsum.photos/seed/blogseo/400/250",
    imageHint: "search engine optimization",
    tags: ["SEO", "AI", "Digital Marketing"]
  },
  {
    slug: "case-study-boosting-conversion",
    title: "Case Study: How Company X Boosted Conversions by 30% with ContentAI",
    date: "November 12, 2023",
    author: "Client Success Team",
    excerpt: "A deep dive into how one of our clients utilized ContentAI to refine their messaging and achieve significant improvements in conversion rates.",
    imageSrc: "https://picsum.photos/seed/blogcase/400/250",
    imageHint: "success graph arrow",
    tags: ["Case Study", "Conversion Optimization", "Success Story"]
  },
];

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
              Stay updated with the latest trends, tips, and insights in AI-powered content optimization and strategy.
            </p>
          </motion.section>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {blogPosts.map((post) => (
              <motion.div key={post.slug} variants={itemVariants}>
                <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="p-0">
                    <Link href={`/blog/${post.slug}`} passHref>
                      <Image
                        src={post.imageSrc}
                        alt={post.title}
                        width={400}
                        height={250}
                        className="object-cover w-full h-48 hover:scale-105 transition-transform duration-300"
                        data-ai-hint={post.imageHint}
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
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
