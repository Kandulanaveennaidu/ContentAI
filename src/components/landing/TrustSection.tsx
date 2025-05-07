// src/components/landing/TrustSection.tsx
"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Lock, Server } from 'lucide-react';
import Image from 'next/image';

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: 'Data Security',
    description: 'We employ industry-standard security measures to protect your content and personal information. Your data privacy is our top priority.',
  },
  {
    icon: Lock,
    title: 'Privacy Focused',
    description: 'Your submitted content is processed securely and only stored as needed for features like analysis history, which you control.',
  },
  {
    icon: Server,
    title: 'Reliable Infrastructure',
    description: 'Built on robust and scalable cloud infrastructure to ensure consistent availability and performance when you need it most.',
  },
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

export function TrustSection() {
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
          <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            We Build <span className="text-primary">Customer Trust</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Your content and data are safe with us. We prioritize security and privacy in everything we do.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
           <motion.div 
             variants={fadeIn(0.2)}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.3 }}
           >
                <Image 
                    src="https://picsum.photos/seed/trustsecurity/600/450" 
                    alt="Data security concept with shield and lock" 
                    width={600} 
                    height={450} 
                    className="rounded-xl shadow-xl object-cover"
                    data-ai-hint="data security shield"
                />
            </motion.div>
           <motion.div 
             className="space-y-6"
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.2 }}
           >
            {trustFeatures.map((feature, index) => (
              <motion.div key={feature.title} variants={fadeIn(0, 25)}>
                <Card className="bg-card/50 border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="flex-shrink-0 rounded-full bg-primary/10 p-3 text-primary">
                       <feature.icon className="h-6 w-6" />
                    </div>
                     <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
           </motion.div>
          
        </div>
      </div>
    </section>
  );
}