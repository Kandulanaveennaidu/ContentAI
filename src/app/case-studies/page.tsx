// src/app/case-studies/page.tsx
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Zap, FileText, ArrowRight, Briefcase, BarChart2, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { caseStudies, type CaseStudy } from '@/lib/case-studies-data'; // Import from the new data file


const fadeIn = (delay: number = 0, y: number = 20) => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

export default function CaseStudiesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.section
            className="text-center mb-12 md:mb-16"
            variants={fadeIn()}
            initial="hidden"
            animate="visible"
          >
            <FileText className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              ContentAI <span className="text-primary">Success Stories</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              See how businesses and creators are achieving remarkable results with ContentAI. Real-world examples of AI-driven content optimization in action.
            </p>
          </motion.section>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-1 gap-10" 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {caseStudies.map((study) => (
              <motion.div key={study.slug} variants={fadeIn(0, 25)}>
                <Card className="overflow-hidden shadow-xl hover:shadow-primary/20 transition-shadow duration-300 flex flex-col md:flex-row">
                  <div className="md:w-2/5 relative min-h-[250px] md:min-h-full">
                    <Image
                      src={study.imageSrc}
                      alt={`Case study for ${study.client}`}
                      fill // Changed from layout="fill" to fill for Next 13+
                      style={{objectFit:"cover"}} // Added style objectFit
                      className="transition-transform duration-500 hover:scale-105"
                      data-ai-hint={study.imageHint}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Added sizes for responsive images
                    />
                  </div>
                  <div className="md:w-3/5 flex flex-col">
                    <CardHeader className="p-6 pb-3">
                      <p className="text-sm font-semibold text-primary mb-1">{study.industry}</p>
                      <CardTitle className="text-2xl mb-1">
                        {study.client} Achieves Breakthrough Results
                      </CardTitle>
                      <CardDescription className="text-base">{study.challenge}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 flex-grow">
                      <div className="mb-4">
                        <h4 className="font-semibold text-foreground mb-1">Solution:</h4>
                        <p className="text-sm text-muted-foreground line-clamp-3">{study.solution}</p>
                      </div>
                      
                      <div className="mb-5">
                         <h4 className="font-semibold text-foreground mb-2">Key Results:</h4>
                         <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {study.results.map(result => (
                                <div key={result.label} className="p-3 bg-secondary rounded-md text-center">
                                    <p className="text-xl font-bold text-primary">{result.metric}</p>
                                    <p className="text-xs text-secondary-foreground">{result.label}</p>
                                </div>
                            ))}
                         </div>
                      </div>

                      {study.testimonial && (
                        <blockquote className="text-sm italic border-l-2 border-primary pl-3 py-1 bg-muted/50 rounded-r-md">
                          "{study.testimonial}" – <span className="font-medium">{study.client} Team</span>
                        </blockquote>
                      )}
                    </CardContent>
                     <div className="p-6 pt-2"> 
                       <Link href={`/case-studies/${study.slug}`} passHref>
                          <Button variant="default" className="w-full md:w-auto">
                            Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.section 
            className="text-center mt-16 md:mt-24 py-12 md:py-16 bg-gradient-to-r from-accent to-primary rounded-lg"
            variants={fadeIn(0.5)}
            initial="hidden"
            animate="visible"
          >
            <Zap className="mx-auto h-12 w-12 text-primary-foreground mb-4" />
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground mb-4">Ready to Write Your Own Success Story?</h2>
            <p className="mt-2 max-w-xl mx-auto text-lg text-primary-foreground/90 mb-8">
              Join innovative companies leveraging ContentAI to transform their content performance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link href="/signup" passHref>
                <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    Start Free Trial
                </Button>
                </Link>
                <Link href="/book-a-demo" passHref>
                <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground/70 hover:bg-primary-foreground/10">
                    Book a Demo
                </Button>
                </Link>
            </div>
          </motion.section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
