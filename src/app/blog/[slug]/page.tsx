// src/app/blog/[slug]/page.tsx
"use client";

import React, { useEffect, useState } from 'react'; // Import React for React.use() and hooks
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { staticBlogPosts, loadUserBlogPosts, type BlogPost, type ContentBlock } from '@/lib/blog-data'; // Import static posts and load function
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, UserCircle, MessageSquare, Twitter, Linkedin, Facebook, Link2, Loader2 } from 'lucide-react'; // Added Loader2
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'; // Removed CardHeader, CardTitle
import { Separator } from '@/components/ui/separator';
import ReactMarkdown from 'react-markdown'; // Correct import
import remarkGfm from 'remark-gfm'; // Correct import
import * as LucideIcons from 'lucide-react'; // For rendering icons in content blocks if needed


interface BlogSlugPageProps {
  params: {
    slug: string;
  };
}

const fadeIn = (delay: number = 0, y: number = 20) => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

// Modified renderContentBlock to include more types if needed (reusing from press/case studies)
const renderContentBlock = (block: ContentBlock, index: number): JSX.Element => {
  switch (block.type) {
    case 'heading':
      const Tag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
      return <Tag key={index} className={`text-${5 - (block.level || 2)}xl font-bold mt-8 mb-4 text-foreground`}>{block.text}</Tag>;
    case 'paragraph':
      return <p key={index} className="text-base md:text-lg text-muted-foreground leading-relaxed my-4">{block.text}</p>;
    case 'image':
      return (
        <motion.figure 
          key={index} 
          className="my-8 overflow-hidden rounded-lg shadow-lg"
          variants={fadeIn(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image src={block.src!} alt={block.alt || 'Blog content image'} width={800} height={450} className="w-full object-cover" data-ai-hint={block.hint || 'blog illustration'} />
          {block.alt && <figcaption className="text-center text-sm text-muted-foreground mt-2">{block.alt}</figcaption>}
        </motion.figure>
      );
    case 'list':
      return (
        <ul key={index} className="list-disc space-y-2 pl-6 my-4 text-muted-foreground">
          {block.items?.map((item, i) => <li key={i} className="text-base md:text-lg leading-relaxed">{item}</li>)}
        </ul>
      );
    case 'quote':
      return (
        <blockquote key={index} className="my-6 pl-4 border-l-4 border-primary italic text-muted-foreground bg-secondary/50 p-4 rounded-r-md">
          <p className="text-lg md:text-xl">"{block.text}"</p>
           {block.author && <cite className="block text-right mt-2 text-sm not-italic text-foreground">~ {block.author}</cite>}
        </blockquote>
      );
    case 'code':
      return (
        <pre key={index} className="bg-muted p-4 rounded-md text-sm my-6 overflow-x-auto">
          <code className={`language-${block.language || 'plaintext'}`}>{block.code}</code>
        </pre>
      );
     case 'video':
      return (
        <motion.div
            key={index}
            className="my-10 rounded-lg overflow-hidden shadow-xl"
            variants={fadeIn(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
          <video
            src={block.src}
            controls
            className="w-full aspect-video bg-black"
            poster={`https://picsum.photos/seed/${block.hint || 'vidprevslug'}/800/450?blur=1`}
            data-ai-hint={block.hint || 'video case study'}
          />
          {block.caption && <p className="text-center text-sm text-muted-foreground mt-0 p-3 bg-secondary">{block.caption}</p>}
        </motion.div>
      );
    case 'icon-section':
      const IconComponent = block.icon ? LucideIcons[block.icon as keyof typeof LucideIcons] : null;
      return (
        <motion.div
            key={index}
            className="my-8 flex flex-col sm:flex-row items-center gap-4 md:gap-6 p-6 bg-card border border-border rounded-xl shadow-lg"
            variants={fadeIn(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
          {IconComponent && (
            <div className="flex-shrink-0 text-primary bg-primary/10 p-4 rounded-full">
              <IconComponent className="h-8 w-8 md:h-10 md:w-10" />
            </div>
          )}
          <div className="text-center sm:text-left">
            {block.iconText && <p className="font-semibold text-xl md:text-2xl text-foreground mb-1">{block.iconText}</p>}
            {block.text && <p className="text-muted-foreground text-base">{block.text}</p>}
          </div>
        </motion.div>
      );
    default:
      return <></>;
  }
};


export default function BlogSlugPage({ params }: BlogSlugPageProps) {
  // Unwrap params using React.use() for Server Components
  const { slug } = React.use(params); 
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined); // undefined initial state for loading
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]); // State to hold all posts


  // Load all posts (static + user-generated) on client mount
  useEffect(() => {
    const userPosts = loadUserBlogPosts();
    const combined = [...staticBlogPosts, ...userPosts];
    setAllPosts(combined);
  }, []);


  // Find the specific post once allPosts are loaded
  useEffect(() => {
     if (allPosts.length > 0) {
       const foundPost = allPosts.find((p) => p.slug === slug);
       setPost(foundPost); // Set to foundPost or undefined if not found
     } else {
       // If allPosts is empty after loading, check if the slug matches a static post just in case
       const staticMatch = staticBlogPosts.find(p => p.slug === slug);
       setPost(staticMatch);
     }
  }, [allPosts, slug]);

  // Handle loading state
  if (post === undefined) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-grow py-12 md:py-16 flex items-center justify-center">
                 <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </main>
             <Footer />
        </div>
    );
  }

  // Handle not found state
  if (!post) {
    notFound();
  }
  
  // Determine related posts based on the found post's relatedReads slugs
   const relatedPosts = post.relatedReads
    ? allPosts.filter(p => post.relatedReads!.includes(p.slug) && p.slug !== post.slug).slice(0, 2)
    : [];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.article
            initial="hidden"
            animate="visible"
            variants={fadeIn()}
          >
            <div className="mb-8">
              <Link href="/blog" className="flex items-center text-primary hover:underline mb-4 text-sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
                variants={fadeIn(0.1)}
              >
                {post.title}
              </motion.h1>
              <motion.div 
                className="flex items-center space-x-4 text-sm text-muted-foreground mb-6"
                variants={fadeIn(0.2)}
              >
                <div className="flex items-center">
                  <UserCircle className="mr-1.5 h-5 w-5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="mr-1.5 h-5 w-5" />
                  <span>{post.date}</span>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="mb-8 md:mb-12 overflow-hidden rounded-xl shadow-2xl"
              variants={fadeIn(0.3)}
            >
              <Image
                src={post.featuredImage.src}
                alt={post.featuredImage.alt}
                width={1200}
                height={675}
                className="w-full object-cover aspect-video"
                priority
                data-ai-hint={post.featuredImage.hint}
              />
            </motion.div>

             {/* Render content: prioritize contentBlocks, fallback to markdownContent */}
            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
              {post.contentBlocks && post.contentBlocks.length > 0 ? (
                post.contentBlocks.map((block, index) => renderContentBlock(block, index))
              ) : post.markdownContent ? (
                 <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.markdownContent}</ReactMarkdown>
              ) : (
                <p className="text-muted-foreground italic">No content available for this post.</p>
              )}
            </div>

            <Separator className="my-10 md:my-12" />

            {/* Share Section */}
            <motion.div className="text-center mb-10 md:mb-12" variants={fadeIn(0.2)}>
              <h3 className="text-xl font-semibold text-foreground mb-3">Share this post</h3>
              <div className="flex justify-center space-x-3">
                <Button variant="outline" size="icon" aria-label="Share on Twitter">
                  <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Share on Facebook">
                  <Facebook className="h-5 w-5 text-[#1877F2]" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Share on LinkedIn">
                  <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Copy link" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                  <Link2 className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>

            {/* Related Reads Section */}
            {relatedPosts.length > 0 && (
              <motion.div className="mt-12 md:mt-16" variants={fadeIn(0.3)}>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Related Reads</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedPosts.map(relatedPost => (
                    <Card key={relatedPost.slug} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                       <Link href={`/blog/${relatedPost.slug}`} passHref>
                         <div className="aspect-video overflow-hidden">
                            <Image src={relatedPost.featuredImage.src} alt={relatedPost.title} width={400} height={225} className="object-cover w-full h-full hover:scale-105 transition-transform" data-ai-hint={relatedPost.featuredImage.hint}/>
                         </div>
                       </Link>
                       <CardContent className="p-4">
                        <Link href={`/blog/${relatedPost.slug}`} passHref>
                            <h3 className="text-lg font-semibold text-foreground hover:text-primary mb-1 line-clamp-2">{relatedPost.title}</h3>
                        </Link>
                         <p className="text-xs text-muted-foreground mb-2">{relatedPost.date} - {relatedPost.author}</p>
                         <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                       </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

