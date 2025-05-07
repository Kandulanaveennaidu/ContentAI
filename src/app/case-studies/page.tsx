// src/app/case-studies/page.tsx
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Zap, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const caseStudies = [
  {
    slug: "boosting-blog-engagement-startup-x",
    client: "Startup X",
    industry: "SaaS Technology",
    challenge: "Low blog engagement and difficulty ranking for competitive keywords despite producing regular content.",
    solution: "Utilized ContentAI for readability analysis, engagement prediction, and SEO optimization. Implemented AI-generated content brief improvements.",
    results: [
      { metric: "+45%", label: "Increase in Average Time on Page" },
      { metric: "+30%", label: "Growth in Organic Traffic" },
      { metric: "Top 3", label: "Ranking for Target Keywords" },
    ],
    imageSrc: "https://picsum.photos/seed/casestudy1/500/350",
    imageHint: "graph success chart",
    testimonial: "ContentAI was a game-changer. We saw tangible improvements in our content's performance within weeks.",
  },
  {
    slug: "enhancing-conversion-ecommerce-brand",
    client: "E-commerce Brand Z",
    industry: "Online Retail",
    challenge: "Product descriptions were not converting visitors effectively, and content lacked persuasive power.",
    solution: "Leveraged ContentAI to refine product copy for clarity, engagement, and persuasive language. Optimized calls to action based on AI suggestions.",
    results: [
      { metric: "+25%", label: "Increase in Conversion Rate" },
      { metric: "-15%", label: "Reduction in Bounce Rate on Product Pages" },
      { metric: "+20%", label: "Higher Average Order Value" },
    ],
    imageSrc: "https://picsum.photos/seed/casestudy2/500/350",
    imageHint: "ecommerce online shopping",
    testimonial: "The AI-driven insights helped us speak directly to our customers' needs, dramatically improving our sales.",
  },
    {
    slug: "streamlining-content-agency-workflows",
    client: "Digital Marketing Agency Y",
    industry: "Marketing Services",
    challenge: "Inconsistent content quality across multiple writers and time-consuming briefing processes.",
    solution: "Implemented ContentAI's brief generator and analysis tools to standardize quality and accelerate content production.",
    results: [
      { metric: "-50%", label: "Reduction in Content Brief Creation Time" },
      { metric: "+35%", label: "Improvement in First-Draft Acceptance Rate" },
      { metric: "Consistent", label: "Brand Voice & Quality Across All Content" },
    ],
    imageSrc: "https://picsum.photos/seed/casestudy3/500/350",
    imageHint: "team working collaboration",
    testimonial: "ContentAI has streamlined our operations and elevated the quality of content we deliver to clients. It's an invaluable asset.",
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
            className="grid grid-cols-1 lg:grid-cols-1 gap-10" // Changed to 1 column for larger cards
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {caseStudies.map((study, index) => (
              <motion.div key={study.slug} variants={fadeIn(0, 25)}>
                <Card className="overflow-hidden shadow-xl hover:shadow-primary/20 transition-shadow duration-300 flex flex-col md:flex-row">
                  <div className="md:w-2/5 relative min-h-[250px] md:min-h-full">
                    <Image
                      src={study.imageSrc}
                      alt={`Case study for ${study.client}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 hover:scale-105"
                      data-ai-hint={study.imageHint}
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
                        <p className="text-sm text-muted-foreground">{study.solution}</p>
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
                     <div className="p-6 pt-2"> {/* CardFooter equivalent */}
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
