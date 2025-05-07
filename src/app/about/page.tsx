// src/app/about/page.tsx
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Target, Eye, Brain, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const teamMembers = [
  { name: "Alex Johnson", role: "Lead AI Developer", avatar: "https://picsum.photos/seed/alex/100", hint: "person smiling" },
  { name: "Maria Garcia", role: "UX/UI Design Lead", avatar: "https://picsum.photos/seed/maria/100", hint: "woman portrait" },
  { name: "Sam Lee", role: "Content Strategy Expert", avatar: "https://picsum.photos/seed/sam/100", hint: "man glasses" },
];

const values = [
  { icon: Zap, title: "Innovation", description: "Continuously exploring new AI frontiers to provide cutting-edge content solutions." },
  { icon: Users, title: "User-Centricity", description: "Designing tools that are intuitive, powerful, and genuinely helpful for creators." },
  { icon: Eye, title: "Clarity", description: "Making complex analysis simple and actionable for everyone." },
  { icon: Brain, title: "Intelligence", description: "Leveraging the best of AI to empower human creativity and effectiveness." },
];

export default function AboutPage() {
  const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <motion.section 
            className="text-center mb-16 md:mb-24"
            initial="hidden"
            animate="visible"
            variants={fadeIn()}
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              About <span className="text-primary">ContentAI</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
              We are passionate about empowering creators with intelligent tools to elevate their content. Our mission is to make sophisticated content analysis accessible and actionable for everyone.
            </p>
          </motion.section>

          {/* Our Story Section */}
          <motion.section 
            className="mb-16 md:mb-24 grid md:grid-cols-2 gap-8 md:gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn(0.2)}
          >
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="https://picsum.photos/seed/story/800/600" 
                alt="Team working collaboratively" 
                width={800} 
                height={600}
                className="object-cover"
                data-ai-hint="team collaboration office"
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                ContentAI started with a simple idea: what if anyone could harness the power of artificial intelligence to understand and improve their writing? Frustrated by opaque metrics and complex tools, our founders set out to build a platform that delivers clear, insightful, and practical content guidance.
              </p>
              <p className="text-muted-foreground">
                From analyzing readability for broader reach to predicting engagement for deeper impact, ContentAI is your partner in crafting content that truly connects. We believe in the synergy of human creativity and AI precision.
              </p>
            </div>
          </motion.section>

          {/* Our Values Section */}
          <motion.section 
            className="mb-16 md:mb-24 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn(0.3)}
          >
            <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div key={value.title} variants={fadeIn(0.4 + index * 0.1)}>
                  <Card className="h-full text-center hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <value.icon className="h-6 w-6" />
                      </div>
                      <CardTitle>{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          {/* Team Section (Optional) */}
          <motion.section 
            className="mb-12 md:mb-20 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn(0.4)}
          >
            <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-12">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div key={member.name} variants={fadeIn(0.5 + index * 0.15)}>
                  <Card className="hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="pt-6">
                      <Avatar className="h-24 w-24 mx-auto mb-4">
                        <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.hint} />
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                      <p className="text-sm text-primary">{member.role}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
