// src/app/ai-studies/page.tsx
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FlaskConical, BarChart2, Brain, FileJson, Download, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Helper function to generate slugs
const generateSlug = (title: string) => {
    return title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
};

const aiStudies = [
  {
    title: "The Impact of Flesch-Kincaid Score Optimization on User Engagement",
    date: "August 2023",
    category: "Readability Research",
    abstract: "This study investigates the correlation between content optimized for specific Flesch-Kincaid readability levels and key user engagement metrics such as time on page, bounce rate, and conversion rates across various industries.",
    methodology: "Comparative analysis of 10,000+ content pieces before and after AI-driven readability optimization using ContentAI. A/B testing performed on select content.",
    keyFindings: [
      "Content with Flesch-Kincaid scores aligned to target audience reading levels showed an average 22% increase in time on page.",
      "Simplifying complex sentence structures led to a 15% decrease in bounce rates.",
      "Actionable readability suggestions from ContentAI contributed to a 5-point average improvement in scores.",
    ],
    imageSrc: "https://picsum.photos/seed/studyread/500/300",
    imageHint: "scientific research graph",
    fullStudyLink: "#" // Placeholder
  },
  {
    title: "Predictive Modeling for Content Engagement: A Deep Learning Approach",
    date: "June 2023",
    category: "Engagement Prediction",
    abstract: "Details the development and validation of ContentAI's engagement prediction model, which utilizes natural language processing and deep learning techniques to forecast content performance.",
    methodology: "Trained on a dataset of over 1 million articles and their corresponding engagement data (social shares, comments, click-through rates). Model validated against a holdout set and real-world campaign performance.",
    keyFindings: [
      "The model achieved 85% accuracy in predicting high vs. low engagement content.",
      "Sentiment analysis and emotional arc detection were significant predictors of engagement.",
      "The model's actionable tips, when implemented, led to an average 18% lift in engagement signals.",
    ],
    imageSrc: "https://picsum.photos/seed/studyengage/500/300",
    imageHint: "neural network AI brain",
    fullStudyLink: "#" // Placeholder
  },
   {
    title: "Effectiveness of AI-Generated Content Briefs in Improving Content Quality and Efficiency",
    date: "September 2023",
    category: "Content Strategy & Workflow",
    abstract: "Examines how AI-generated content briefs impact the quality of first drafts, reduce revision cycles, and improve overall content production efficiency for marketing teams.",
    methodology: "Controlled study with two groups of content writers: one using traditional briefing methods, the other using ContentAI's brief generator. Metrics included draft quality scores, revision requests, and time to final approval.",
    keyFindings: [
      "AI-generated briefs resulted in a 40% reduction in major revision requests.",
      "Content produced using AI briefs scored 25% higher on initial quality assessments.",
      "Overall content production time was reduced by an average of 30% per piece.",
    ],
    imageSrc: "https://picsum.photos/seed/studybrief/500/300",
    imageHint: "team planning strategy",
    fullStudyLink: "#" // Placeholder
  }
];

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

export default function AiStudiesPage() {
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
            <FlaskConical className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              ContentAI <span className="text-primary">Research & AI Studies</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Explore the research, data, and methodologies behind ContentAI's intelligent platform. We're committed to transparency and advancing the field of AI in content.
            </p>
          </motion.section>

          <motion.div
            className="grid grid-cols-1 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {aiStudies.map((study, index) => (
              <motion.div key={study.title} variants={fadeIn(0, 25)}>
                <Card className="overflow-hidden shadow-xl hover:shadow-primary/15 transition-shadow duration-300">
                  <div className="md:flex">
                    <div className="md:w-1/3 p-6 bg-secondary/50 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-border">
                        <div className="mb-4">
                             {study.category === "Readability Research" && <BarChart2 className="h-12 w-12 text-primary" />}
                             {study.category === "Engagement Prediction" && <Brain className="h-12 w-12 text-primary" />}
                             {study.category === "Content Strategy & Workflow" && <FileJson className="h-12 w-12 text-primary" />}
                        </div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{study.category}</p>
                        <p className="text-sm text-muted-foreground">Published: {study.date}</p>
                        <Image src={study.imageSrc} alt={study.title} width={250} height={150} className="rounded-md mt-4 shadow-md object-cover" data-ai-hint={study.imageHint}/>
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader className="p-6 pb-3">
                        <CardTitle className="text-2xl leading-tight">{study.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 pt-0">
                        <div className="mb-4">
                          <h4 className="font-semibold text-foreground mb-1 text-sm">Abstract:</h4>
                          <p className="text-sm text-muted-foreground line-clamp-3">{study.abstract}</p>
                        </div>
                         <div className="mb-4">
                          <h4 className="font-semibold text-foreground mb-1 text-sm">Methodology Highlights:</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">{study.methodology}</p>
                        </div>
                        <div className="mb-4">
                          <h4 className="font-semibold text-foreground mb-1 text-sm">Key Findings:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            {study.keyFindings.slice(0,2).map((finding, i) => <li key={i} className="line-clamp-1">{finding}</li>)}
                             {study.keyFindings.length > 2 && <li>And more...</li>}
                          </ul>
                        </div>
                         <div className="mt-5 flex gap-3">
                            <Link href={study.fullStudyLink} passHref target="_blank" rel="noopener noreferrer">
                                <Button variant="default">
                                    Read Full Study (PDF) <Download className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                             {/* Updated Link to use generated slug */}
                             <Link href={`/blog/ai-study-${generateSlug(study.title)}`} passHref>
                                <Button variant="outline">
                                    View Blog Post <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

           <motion.section 
            className="text-center mt-16 md:mt-24 py-12 md:py-16 bg-secondary rounded-lg"
            variants={fadeIn(0.5)}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground mb-4">Advancing Content Intelligence Together</h2>
            <p className="mt-2 max-w-xl mx-auto text-lg text-secondary-foreground/80 mb-8">
              We believe in sharing our knowledge to foster innovation. If you're a researcher or academic interested in collaborating, please reach out.
            </p>
            <Link href="/contact?subject=ResearchCollaboration" passHref>
              <Button size="lg" variant="outline" className="border-secondary-foreground/50 text-secondary-foreground hover:bg-secondary-foreground/10">
                Collaborate With Us
              </Button>
            </Link>
          </motion.section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
