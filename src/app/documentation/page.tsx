// src/app/documentation/page.tsx
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BookOpen, Code, LifeBuoy, Search, Settings, Sparkles, BarChart3, Users, ArrowRight } from 'lucide-react'; // Added ArrowRight
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const faqItems = [
  {
    value: "item-1",
    question: "What is ContentAI?",
    answer: "ContentAI is an AI-powered platform designed to help content creators, marketers, and businesses analyze, optimize, and plan their content for better readability, engagement, and overall performance. We use advanced AI models to provide actionable insights.",
  },
  {
    value: "item-2",
    question: "How does the Readability Analysis work?",
    answer: "Our Readability Analysis uses established metrics like the Flesch-Kincaid score to assess how easy your content is to understand. It also provides specific suggestions, such as simplifying complex sentences or replacing jargon, to improve clarity for your target audience.",
  },
  {
    value: "item-3",
    question: "What data is Engagement Prediction based on?",
    answer: "Engagement Prediction is based on analyzing various content features (e.g., tone, structure, emotional appeal, topic relevance) against historical data of content performance. It provides a predictive score (High, Medium, Low) and offers tips to enhance engagement.",
  },
  {
    value: "item-4",
    question: "Can I integrate ContentAI with other tools?",
    answer: "We are continuously working on expanding our integrations. Currently, you can easily copy and paste content. We plan to release an API for direct integrations in the near future. Check our API Documentation section for updates.",
  },
  {
    value: "item-5",
    question: "Is my data secure with ContentAI?",
    answer: "Yes, data security is a top priority. We employ industry-standard security measures to protect your content and personal information. Please refer to our Privacy Policy for detailed information.",
  },
];

const fadeIn = (delay: number = 0, y: number = 20) => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

export default function DocumentationPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqItems = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <BookOpen className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              ContentAI <span className="text-primary">Documentation</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Your comprehensive guide to understanding and maximizing ContentAI. Find answers, learn about features, and get help.
            </p>
          </motion.section>

          <motion.div 
            className="mb-10 md:mb-12 max-w-2xl mx-auto"
            variants={fadeIn(0.2)}
            initial="hidden"
            animate="visible"
          >
            <div className="relative">
              <Input
                type="search"
                placeholder="Search documentation (e.g., 'readability score')..."
                className="pl-10 pr-4 py-3 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <motion.div 
              className="md:col-span-2"
              variants={fadeIn(0.3)}
              initial="hidden"
              animate="visible"
            >
              <Card className="shadow-lg mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center"><Sparkles className="h-6 w-6 mr-2 text-primary" /> Getting Started</CardTitle>
                  <CardDescription>New to ContentAI? Here’s how to begin.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Welcome to ContentAI! To get started, simply sign up for an account. Once logged in, you can navigate to the "Analyze Content" page from the header or dashboard. Paste your text into the provided area, and click "Analyze Content". Results for Readability and Engagement will appear in their respective tabs.</p>
                  <Image src="https://picsum.photos/seed/docstart/700/400" alt="ContentAI analyze page" width={700} height={400} className="rounded-md shadow-md" data-ai-hint="software interface dashboard" />
                  <Button variant="link" asChild><Link href="/analyze">Go to Analyzer <ArrowRight className="h-4 w-4 ml-1"/></Link></Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center"><BarChart3 className="h-6 w-6 mr-2 text-primary" /> Feature Guides</CardTitle>
                  <CardDescription>Detailed explanations of ContentAI features.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="readability">
                      <AccordionTrigger className="text-lg">Readability Analysis</AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        <p>Our Readability Analysis calculates the Flesch-Kincaid Grade Level score, indicating the educational level required to understand your text. A lower score means it's easier to read.</p>
                        <p><strong>Suggestions include:</strong></p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Shortening long sentences.</li>
                          <li>Replacing complex words with simpler alternatives.</li>
                          <li>Improving sentence structure for clarity.</li>
                        </ul>
                        <Image src="https://picsum.photos/seed/docread/600/350" alt="Readability analysis example" width={600} height={350} className="rounded-md shadow-sm mt-2" data-ai-hint="text analysis report" />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="engagement">
                      <AccordionTrigger className="text-lg">Engagement Prediction</AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        <p>ContentAI predicts engagement levels (High, Medium, Low) by analyzing factors like emotional tone, use of questions, storytelling elements, and clarity.</p>
                        <p><strong>Actionable tips may involve:</strong></p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Adding more direct questions to involve the reader.</li>
                          <li>Incorporating storytelling techniques.</li>
                          <li>Using stronger verbs and more vivid language.</li>
                          <li>Ensuring a clear call to action (if applicable).</li>
                        </ul>
                         <Image src="https://picsum.photos/seed/docengage/600/350" alt="Engagement prediction example" width={600} height={350} className="rounded-md shadow-sm mt-2" data-ai-hint="engagement chart graph" />
                      </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="history">
                      <AccordionTrigger className="text-lg">Analysis History</AccordionTrigger>
                      <AccordionContent>
                        <p>The "Analyze" page features an Analysis History section where your past 10 analyses are automatically saved. You can view details, re-analyze the content with current models, or delete items from your history. This helps track improvements and revisit past work.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center"><Code className="h-6 w-6 mr-2 text-primary" /> API Documentation (Coming Soon)</CardTitle>
                  <CardDescription>Integrate ContentAI's power into your own applications.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>We are working on providing API access for developers. This will allow you to programmatically send content for analysis and receive results in JSON format. Stay tuned for updates!</p>
                  <div className="mt-4 p-4 bg-muted rounded-md">
                    <p className="font-mono text-sm text-muted-foreground">// Example API endpoint (conceptual)</p>
                    <p className="font-mono text-sm text-muted-foreground">POST /api/v1/analyze</p>
                    <p className="font-mono text-sm text-muted-foreground">{`{ "content": "Your text here..." }`}</p>
                  </div>
                </CardContent>
              </Card>

            </motion.div>

            {/* Sidebar / FAQ Area */}
            <motion.div 
              className="md:col-span-1"
              variants={fadeIn(0.4)}
              initial="hidden"
              animate="visible"
            >
              <Card className="shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center"><LifeBuoy className="h-5 w-5 mr-2 text-primary" /> Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredFaqItems.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {filteredFaqItems.map((item) => (
                        <AccordionItem value={item.value} key={item.value}>
                          <AccordionTrigger>{item.question}</AccordionTrigger>
                          <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <p className="text-muted-foreground">No FAQs match your search term. Try a different query or browse sections.</p>
                  )}
                </CardContent>
              </Card>

              <motion.div 
                className="mt-8"
                variants={fadeIn(0.5)}
              >
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center"><Settings className="h-5 w-5 mr-2 text-primary"/> Account & Billing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">Manage your subscription, view invoices, or update payment details from your profile.</p>
                        <Button variant="outline" asChild className="w-full"><Link href="/profile">Go to Profile</Link></Button>
                         <Button variant="outline" asChild className="w-full"><Link href="/contact">Contact Support</Link></Button>
                    </CardContent>
                </Card>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
