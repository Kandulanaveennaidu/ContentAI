// src/app/case-studies/[slug]/page.tsx
"use client";

import React from 'react'; // Import React for React.use()
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { caseStudies, type CaseStudy } from '@/lib/case-studies-data'; // Correct import path
import type { PressContentBlock as CaseStudyContentBlock } from '@/lib/press-articles-data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface CaseStudySlugPageProps {
  params: {
    slug: string;
  };
}

const fadeIn = (delay: number = 0, y: number = 20) => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

const renderContentBlock = (block: CaseStudyContentBlock, index: number): JSX.Element => {
  const IconComponent = block.icon ? LucideIcons[block.icon as keyof typeof LucideIcons] : null;
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
          <Image src={block.src!} alt={block.alt || 'Case study image'} width={800} height={450} className="w-full object-cover" data-ai-hint={block.hint || 'study illustration'} />
          {block.caption && <figcaption className="text-center text-sm text-muted-foreground mt-2 p-2 bg-secondary rounded-b-lg">{block.caption}</figcaption>}
        </motion.figure>
      );
    case 'list':
      return (
        <ul key={index} className="list-disc space-y-2 pl-6 my-5 text-muted-foreground">
          {block.items?.map((item, i) => <li key={i} className="text-base md:text-lg leading-relaxed flex items-start"><LucideIcons.CheckSquare className="h-5 w-5 mr-2 mt-1 text-primary flex-shrink-0"/><span>{item}</span></li>)}
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
            poster={`https://picsum.photos/seed/${block.hint || 'vidprevslug'}/800/450?blur=1`}
            data-ai-hint={block.hint || 'video case study'}
          />
          {block.caption && <p className="text-center text-sm text-muted-foreground mt-0 p-3 bg-secondary">{block.caption}</p>}
        </motion.div>
      );
    case 'icon-section':
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

export default function CaseStudySlugPage({ params }: CaseStudySlugPageProps) {
  // Unwrap params using React.use() for Server Components
  const { slug } = React.use(params);
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <motion.article
            initial="hidden"
            animate="visible"
            variants={fadeIn()}
          >
            <div className="mb-8 text-center">
              <Link href="/case-studies" className="inline-flex items-center text-primary hover:underline mb-6 text-sm">
                <LucideIcons.ArrowLeft className="mr-2 h-4 w-4" />
                Back to Case Studies
              </Link>

              <motion.div className="flex justify-center items-center gap-2 mb-2" variants={fadeIn(0.05)}>
                <Badge variant="secondary" className="text-base px-3 py-1">{study.industry}</Badge>
              </motion.div>

              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-3"
                variants={fadeIn(0.1)}
              >
                {study.client}: <span className="text-primary">{study.challenge.length > 50 ? study.challenge.substring(0,50) + "..." : study.challenge}</span>
              </motion.h1>
               {study.date && (
                <motion.p
                    className="text-sm text-muted-foreground mb-5"
                    variants={fadeIn(0.15)}
                >
                    Published on {study.date}
                </motion.p>
               )}
            </div>

            <motion.div
              className="mb-10 md:mb-12 overflow-hidden rounded-2xl shadow-2xl border-4 border-primary/20"
              variants={fadeIn(0.2)}
            >
              <Image
                src={study.featuredImageFull.src}
                alt={study.featuredImageFull.alt}
                width={1200}
                height={600}
                className="w-full object-cover aspect-[2/1]"
                priority
                data-ai-hint={study.featuredImageFull.hint}
              />
            </motion.div>

            <motion.div
                className="text-lg md:text-xl text-muted-foreground leading-relaxed my-8 p-6 bg-secondary/30 rounded-xl border-l-4 border-primary shadow"
                variants={fadeIn(0.25)}
            >
                <h2 className="text-2xl font-semibold text-foreground mb-2">Executive Summary</h2>
                <p>{study.summary}</p>
            </motion.div>

            <div className="prose-custom max-w-none mx-auto">
              {study.detailedContentBlocks.map((block, index) => renderContentBlock(block, index))}
            </div>

            <Separator className="my-12 md:my-16" />

            <motion.div className="text-center mb-10 md:mb-12" variants={fadeIn(0.3)}>
                 <h3 className="text-2xl font-semibold text-foreground mb-6">Key Results Achieved</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {study.results.map(result => (
                        <Card key={result.label} className="text-center bg-card hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold text-primary">{result.metric}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{result.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            </motion.div>

            {study.testimonial && (
                 <motion.div className="my-12" variants={fadeIn(0.35)}>
                    <Card className="bg-secondary/50 border-primary/30">
                        <CardHeader className="items-center text-center">
                            <LucideIcons.Quote className="h-10 w-10 text-primary mb-2"/>
                            <CardTitle className="text-xl">Client Testimonial</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-lg italic text-foreground">"{study.testimonial}"</p>
                            <p className="mt-2 text-sm font-medium text-muted-foreground">- The {study.client} Team</p>
                        </CardContent>
                    </Card>
                 </motion.div>
            )}

            <motion.div
              className="text-center py-10 mt-12 bg-gradient-to-r from-primary to-accent rounded-lg"
              variants={fadeIn(0.4)}
            >
              <h2 className="text-2xl font-bold tracking-tight text-primary-foreground mb-3">
                Ready to achieve similar results?
              </h2>
              <p className="mt-1 max-w-lg mx-auto text-md text-primary-foreground/90 mb-6">
                Let ContentAI help you transform your content strategy.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                  <Link href="/book-a-demo" passHref>
                  <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                      Book a Demo
                  </Button>
                  </Link>
                  <Link href="/signup" passHref>
                  <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground/70 hover:bg-primary-foreground/10">
                      Start Free Trial
                  </Button>
                  </Link>
              </div>
            </motion.div>

          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
