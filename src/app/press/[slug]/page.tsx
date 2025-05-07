// src/app/press/[slug]/page.tsx
"use client";

import React from 'react'; // Import React for React.use()
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { pressArticles, type PressArticle, type PressContentBlock } from '@/lib/press-articles-data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as LucideIcons from 'lucide-react'; // Import all icons
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface PressSlugPageProps {
  params: {
    slug: string;
  };
}

const fadeIn = (delay: number = 0, y: number = 20) => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

const renderContentBlock = (block: PressContentBlock, index: number): JSX.Element => {
  switch (block.type) {
    case 'heading':
      const Tag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
      return <Tag key={index} className={`text-${5 - (block.level || 2)}xl font-bold mt-10 mb-5 text-foreground`}>{block.text}</Tag>;
    case 'paragraph':
      return <p key={index} className="text-base md:text-lg text-muted-foreground leading-relaxed my-5">{block.text}</p>;
    case 'image':
      return (
        <motion.figure 
          key={index} 
          className="my-8 overflow-hidden rounded-lg shadow-xl"
          variants={fadeIn(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image src={block.src!} alt={block.alt || 'Press article image'} width={800} height={450} className="w-full object-cover" data-ai-hint={block.hint || 'article illustration'} />
          {block.caption && <figcaption className="text-center text-sm text-muted-foreground mt-2 p-2 bg-secondary rounded-b-lg">{block.caption}</figcaption>}
        </motion.figure>
      );
    case 'list':
      return (
        <ul key={index} className="list-disc space-y-2 pl-6 my-5 text-muted-foreground">
          {block.items?.map((item, i) => <li key={i} className="text-base md:text-lg leading-relaxed flex items-start"><LucideIcons.CheckCircle className="h-5 w-5 mr-2 mt-1 text-primary flex-shrink-0"/><span>{item}</span></li>)}
        </ul>
      );
    case 'quote':
      return (
        <blockquote key={index} className="my-8 pl-6 border-l-4 border-primary italic text-muted-foreground bg-secondary/50 p-6 rounded-r-lg shadow-md">
          <p className="text-lg md:text-xl">"{block.text}"</p>
          {block.author && <cite className="block text-right mt-2 text-sm not-italic text-foreground">~ {block.author}</cite>}
        </blockquote>
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
            poster={`https://picsum.photos/seed/${block.hint || 'vidprev'}/800/450?blur=1`}
            data-ai-hint={block.hint || 'video content'}
          />
          {block.caption && <p className="text-center text-sm text-muted-foreground mt-0 p-3 bg-secondary">{block.caption}</p>}
        </motion.div>
      );
    case 'icon-section':
      // @ts-ignore
      const IconComponent = block.icon ? LucideIcons[block.icon as keyof typeof LucideIcons] : LucideIcons.Info;
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

export default function PressSlugPage({ params }: PressSlugPageProps) {
   // Unwrap params using React.use() for Server Components
  const { slug } = React.use(params);
  const article = pressArticles.find((p) => p.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl"> {/* Wider than blog */}
          <motion.article
            initial="hidden"
            animate="visible"
            variants={fadeIn()}
          >
            <div className="mb-8 text-center">
              <Link href="/press-and-awards" className="inline-flex items-center text-primary hover:underline mb-6 text-sm">
                <LucideIcons.ArrowLeft className="mr-2 h-4 w-4" />
                Back to Press & Awards
              </Link>
              
              <motion.div className="flex justify-center items-center gap-4 mb-4" variants={fadeIn(0.1)}>
                <Image src={article.logoSrc} alt={`${article.publication} Logo`} width={150} height={50} className="object-contain h-10" data-ai-hint={article.logoHint}/>
                <span className="text-muted-foreground">|</span>
                <p className="text-muted-foreground font-medium">{article.publication}</p>
              </motion.div>

              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-3"
                variants={fadeIn(0.2)}
              >
                {article.title}
              </motion.h1>
              <motion.p 
                className="text-sm text-muted-foreground mb-5"
                variants={fadeIn(0.3)}
              >
                Published on {article.date}
              </motion.p>
              {article.tags && article.tags.length > 0 && (
                <motion.div className="flex flex-wrap justify-center gap-2 mb-6" variants={fadeIn(0.35)}>
                    {article.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                </motion.div>
              )}
            </div>

            <motion.div 
              className="mb-10 md:mb-12 overflow-hidden rounded-2xl shadow-2xl border-4 border-primary/20"
              variants={fadeIn(0.4)}
            >
              <Image
                src={article.featuredImage.src}
                alt={article.featuredImage.alt}
                width={1200}
                height={600}
                className="w-full object-cover aspect-[2/1]"
                priority
                data-ai-hint={article.featuredImage.hint}
              />
            </motion.div>
            
            <motion.p 
                className="text-lg md:text-xl text-muted-foreground leading-relaxed my-8 p-4 bg-secondary/30 rounded-md border-l-4 border-primary"
                variants={fadeIn(0.45)}
            >
                <strong>Summary:</strong> {article.summary}
            </motion.p>


            <div className="prose-custom max-w-none mx-auto"> {/* Custom prose class for potential specific styling */}
              {article.contentBlocks.map((block, index) => renderContentBlock(block, index))}
            </div>

            <Separator className="my-12 md:my-16" />

            {/* Share Section or Original Link */}
            {article.originalArticleLink && article.originalArticleLink !== "#" && (
                 <motion.div className="text-center mb-10 md:mb-12" variants={fadeIn(0.2)}>
                    <Link href={article.originalArticleLink} target="_blank" rel="noopener noreferrer">
                        <Button variant="default" size="lg">
                            Read Original Article on {article.publication} <LucideIcons.ExternalLink className="ml-2 h-5 w-5"/>
                        </Button>
                    </Link>
                 </motion.div>
            )}
            
            <motion.div className="text-center" variants={fadeIn(0.3)}>
                <h3 className="text-xl font-semibold text-foreground mb-3">Share this Story</h3>
                <div className="flex justify-center space-x-3">
                    <Button variant="outline" size="icon" aria-label="Share on Twitter"><LucideIcons.Twitter className="h-5 w-5 text-[#1DA1F2]" /></Button>
                    <Button variant="outline" size="icon" aria-label="Share on Facebook"><LucideIcons.Facebook className="h-5 w-5 text-[#1877F2]" /></Button>
                    <Button variant="outline" size="icon" aria-label="Share on LinkedIn"><LucideIcons.Linkedin className="h-5 w-5 text-[#0A66C2]" /></Button>
                    <Button variant="outline" size="icon" aria-label="Copy link" onClick={() => navigator.clipboard.writeText(window.location.href)}><LucideIcons.Link2 className="h-5 w-5" /></Button>
                </div>
            </motion.div>

          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Add some specific styles for prose if needed in globals.css or here if this file grows too large
// For example, .prose-custom h2 { ... } 
// For now, relying on Tailwind utility classes in renderContentBlock
