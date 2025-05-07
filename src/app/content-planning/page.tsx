// src/app/content-planning/page.tsx
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarRange, Lightbulb, Target, CheckCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    icon: Target,
    title: "Audience-Centric Topic Ideation",
    description: "Leverage AI to uncover topics that resonate with your target audience. ContentAI analyzes trends and search intent to suggest high-potential content ideas.",
    imageSrc: "https://picsum.photos/seed/planideate/500/300",
    imageHint: "brainstorming ideas lightbulb"
  },
  {
    icon: CalendarRange,
    title: "Strategic Content Calendars",
    description: "Organize your content pipeline effectively. Plan, schedule, and track your content pieces from ideation to publication within an intuitive calendar view.",
    imageSrc: "https://picsum.photos/seed/plancalendar/500/300",
    imageHint: "digital calendar schedule"
  },
  {
    icon: Lightbulb,
    title: "AI-Powered Outline Generation",
    description: "Kickstart your writing process with AI-generated outlines. Get structured suggestions for headings, subtopics, and key points to cover for comprehensive articles.",
    imageSrc: "https://picsum.photos/seed/planoutline/500/300",
    imageHint: "document outline structure"
  },
  {
    icon: Zap,
    title: "Competitor Content Gap Analysis",
    description: "Identify content gaps by analyzing top-ranking competitor content. Discover opportunities to create unique and more valuable pieces.",
    imageSrc: "https://picsum.photos/seed/plangap/500/300",
    imageHint: "data analysis chart"
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

export default function ContentPlanningPage() {
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
              Strategic <span className="text-primary">Content Planning</span> with AI
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Transform your content strategy from reactive to proactive. ContentAI empowers you to plan, create, and organize content that achieves your business goals.
            </p>
          </motion.section>

          <motion.section
            className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 md:mb-24"
            variants={fadeIn(0.2)}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-foreground">Plan Smarter, Not Harder</h2>
              <p className="text-muted-foreground text-lg">
                ContentAI's planning tools take the guesswork out of your content strategy. From identifying high-impact topics to structuring your articles for maximum readability and engagement, we provide the insights you need to succeed.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Discover relevant topics your audience cares about.</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Build data-driven content calendars.</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Create comprehensive content briefs effortlessly.</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Align your content with strategic objectives.</li>
              </ul>
              <Link href="/book-a-demo" passHref>
                <Button size="lg" className="mt-4">See Planning in Action</Button>
              </Link>
            </div>
            <motion.div variants={fadeIn(0.4)} initial="hidden" animate="visible">
              <Image
                src="https://picsum.photos/seed/contentstrategy/600/500"
                alt="Content planning dashboard"
                width={600}
                height={500}
                className="rounded-xl shadow-2xl object-cover"
                data-ai-hint="content strategy dashboard"
              />
            </motion.div>
          </motion.section>

          <motion.section
            className="mb-12 md:mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold tracking-tight text-center text-foreground mb-10 md:mb-12">
              Key Content Planning Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
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
            className="text-center py-12 md:py-16 bg-secondary rounded-lg"
            variants={fadeIn(0.2)}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground mb-4">Ready to Elevate Your Content Planning?</h2>
            <p className="mt-2 max-w-xl mx-auto text-lg text-secondary-foreground/80 mb-8">
              Start your free trial of ContentAI today and experience the future of content strategy.
            </p>
            <Link href="/signup" passHref>
              <Button size="lg" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
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
