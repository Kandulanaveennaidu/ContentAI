// src/app/optimize/page.tsx
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Edit3, BarChart, Sparkles, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const optimizationFeatures = [
  {
    icon: Edit3,
    title: "Real-time Readability Enhancement",
    description: "Improve clarity and reach a wider audience with Flesch-Kincaid scores and actionable suggestions as you write. Make complex ideas simple and accessible.",
    imageSrc: "https://picsum.photos/seed/optread/500/300",
    imageHint: "editing document text"
  },
  {
    icon: Sparkles,
    title: "AI-Powered Engagement Prediction",
    description: "Understand how your content will likely perform before publishing. Get tips to boost interaction, emotional appeal, and overall resonance with your readers.",
    imageSrc: "https://picsum.photos/seed/optengage/500/300",
    imageHint: "social media engagement"
  },
  {
    icon: Search,
    title: "SEO Keyword Optimization",
    description: "Ensure your content is discoverable. ContentAI helps you identify and integrate relevant keywords naturally, improving search engine rankings.",
    imageSrc: "https://picsum.photos/seed/optseo/500/300",
    imageHint: "seo keyword research"
  },
  {
    icon: BarChart,
    title: "Performance Tracking & Iteration",
    description: "Monitor key content metrics over time. Understand what works, refine your approach, and continuously improve your content's effectiveness.",
    imageSrc: "https://picsum.photos/seed/opttrack/500/300",
    imageHint: "analytics dashboard chart"
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
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

export default function OptimizePage() {
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
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              <span className="text-primary">Optimize</span> Your Content for Maximum Impact
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              ContentAI provides a suite of intelligent tools to refine your writing, enhance readability, boost engagement, and improve SEO. Turn good content into great content.
            </p>
          </motion.section>

          <motion.section
            className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 md:mb-24"
            variants={fadeIn(0.2)}
            initial="hidden"
            animate="visible"
          >
             <motion.div variants={fadeIn(0.4)} initial="hidden" animate="visible">
              <Image
                src="https://picsum.photos/seed/contentoptimization/600/500"
                alt="Content optimization process"
                width={600}
                height={500}
                className="rounded-xl shadow-2xl object-cover"
                data-ai-hint="content editing screen"
              />
            </motion.div>
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-foreground">Unlock Peak Performance</h2>
              <p className="text-muted-foreground text-lg">
                Don't let your valuable content go unnoticed. ContentAI's optimization features empower you to fine-tune every aspect of your writing, ensuring it connects with your audience and achieves your objectives.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Elevate readability for broader appeal.</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Predict and enhance content engagement.</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Improve search visibility with SEO insights.</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Make data-backed improvements to your writing.</li>
              </ul>
              <Link href="/analyze" passHref>
                <Button size="lg" className="mt-4">Optimize Your Content Now</Button>
              </Link>
            </div>
          </motion.section>

          <motion.section
            className="mb-12 md:mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold tracking-tight text-center text-foreground mb-10 md:mb-12">
              Powerful Optimization Tools at Your Fingertips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {optimizationFeatures.map((feature) => (
                <motion.div key={feature.title} variants={fadeIn(0, 30)}>
                  <Card className="h-full overflow-hidden shadow-lg hover:shadow-primary/10 transition-shadow duration-300">
                     <CardHeader className="flex-row items-center gap-4 pb-2">
                       <div className="flex-shrink-0 rounded-full bg-primary/10 p-3 text-primary">
                         <feature.icon className="h-7 w-7" />
                       </div>
                       <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                       <Image 
                        src={feature.imageSrc} 
                        alt={feature.title} 
                        width={500} 
                        height={300} 
                        className="rounded-md object-cover aspect-video"
                        data-ai-hint={feature.imageHint}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

           <motion.section 
            className="text-center py-12 md:py-16 bg-gradient-to-r from-primary to-accent rounded-lg"
            variants={fadeIn(0.2)}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground mb-4">Ready to See the Difference?</h2>
            <p className="mt-2 max-w-xl mx-auto text-lg text-primary-foreground/90 mb-8">
              Start analyzing and optimizing your content with ContentAI. Sign up for free to experience the power of AI.
            </p>
            <Link href="/signup" passHref>
              <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Get Started Free
              </Button>
            </Link>
          </motion.section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
