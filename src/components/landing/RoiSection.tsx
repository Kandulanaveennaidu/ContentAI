// src/components/landing/RoiSection.tsx
"use client";

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Clock, TrendingUp } from 'lucide-react';
import CountUp from 'react-countup';

const fadeIn = (delay: number = 0, y: number = 20) => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

export function RoiSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12 md:mb-16"
           variants={fadeIn()}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.3 }}
        >
          <TrendingUp className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            See How You'll <span className="text-primary">Save & Succeed</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            ContentAI optimizes your workflow, saving valuable time and resources while boosting content effectiveness.
          </p>
        </motion.div>

        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ visible: { transition: { staggerChildren: 0.2 }}}}
        >
          <motion.div variants={fadeIn(0.1)}>
            <Card className="text-center shadow-xl hover:shadow-primary/15 transition-shadow h-full">
              <CardContent className="p-6 md:p-8">
                <DollarSign className="mx-auto h-10 w-10 text-green-500 mb-4" />
                <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                   $<CountUp end={38000} duration={2.5} separator="," enableScrollSpy scrollSpyOnce/>
                </h3>
                <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">Dollars Saved Annually</p>
                <p className="text-xs text-muted-foreground mt-1">(Estimated based on reduced team hours)</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn(0.2)}>
            <Card className="text-center shadow-xl hover:shadow-primary/15 transition-shadow h-full">
               <CardContent className="p-6 md:p-8">
                 <Clock className="mx-auto h-10 w-10 text-blue-500 mb-4" />
                  <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                    <CountUp end={260} duration={2.5} enableScrollSpy scrollSpyOnce/>
                  </h3>
                  <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">Hours Saved Per Month</p>
                  <p className="text-xs text-muted-foreground mt-1">(Across planning, writing, editing & optimization)</p>
              </CardContent>
            </Card>
           </motion.div>
        </motion.div>
        <motion.p 
          className="text-center text-xs text-muted-foreground mt-8 max-w-lg mx-auto"
           variants={fadeIn(0.3)}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.3 }}
        >
            *Savings estimates are based on typical team sizes and content workflows. Actual results may vary based on usage and team structure.
        </motion.p>
      </div>
    </section>
  );
}