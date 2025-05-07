// src/components/landing/StrategySection.tsx
"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Target, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const fadeIn = (delay: number = 0, y: number = 20) => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

export function StrategySection() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 }}}}
        >
          <motion.div variants={fadeIn()}>
            <Target className="h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-6">
              Develop a Winning <span className="text-primary">Content Strategy</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Go beyond simple analysis. ContentAI provides the insights and tools you need to build a data-driven content strategy that propels your business forward.
            </p>
            <ul className="space-y-3 text-muted-foreground mb-8">
                <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-primary flex-shrink-0" /><span>Identify high-impact content opportunities and topics relevant to your audience.</span></li>
                <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-primary flex-shrink-0" /><span>Understand competitor strategies and find your unique content angles.</span></li>
                <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-primary flex-shrink-0" /><span>Plan and organize your content calendar for consistent, strategic publishing.</span></li>
                <li className="flex items-start"><CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-primary flex-shrink-0" /><span>Generate comprehensive briefs to ensure writers meet strategic goals.</span></li>
            </ul>
             <Link href="/content-planning" passHref>
                <Button size="lg" variant="default">
                    <Lightbulb className="mr-2 h-5 w-5" /> Explore Planning Tools
                </Button>
              </Link>
          </motion.div>

          <motion.div variants={fadeIn(0.2)}>
            <Image 
              src="https://picsum.photos/seed/contentstrategy/600/500" 
              alt="Content strategy planning board" 
              width={600} 
              height={500} 
              className="rounded-xl shadow-2xl object-cover"
              data-ai-hint="strategy board planning"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}