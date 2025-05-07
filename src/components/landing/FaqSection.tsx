// src/components/landing/FaqSection.tsx
"use client";

import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqItems = [
  {
    value: "faq-1",
    question: "What is ContentAI?",
    answer: "ContentAI is an AI-powered platform designed to help content creators, marketers, and businesses analyze, optimize, and plan their content for better readability, engagement, and overall performance. We use advanced AI models to provide actionable insights.",
  },
  {
    value: "faq-2",
    question: "How does the Readability Analysis work?",
    answer: "Our Readability Analysis uses established metrics like the Flesch-Kincaid score to assess how easy your content is to understand. It also provides specific suggestions, such as simplifying complex sentences or replacing jargon, to improve clarity for your target audience.",
  },
  {
    value: "faq-3",
    question: "What data is Engagement Prediction based on?",
    answer: "Engagement Prediction is based on analyzing various content features (e.g., tone, structure, emotional appeal, topic relevance) against historical data of content performance. It provides a predictive score (High, Medium, Low) and offers tips to enhance engagement.",
  },
   {
    value: "faq-4",
    question: "Is ContentAI suitable for teams?",
    answer: "Yes! While great for individual creators, ContentAI offers plans and upcoming features designed specifically for team collaboration, including shared workspaces and reporting (Team Plan).",
  },
  {
    value: "faq-5",
    question: "Can I try ContentAI before subscribing?",
    answer: "Absolutely! We offer a Free plan with limited usage so you can experience the core features and see the value ContentAI brings before committing to a paid plan.",
  },
   {
    value: "faq-6",
    question: "How is my data handled?",
    answer: "We prioritize data security and privacy. Your content is processed securely, and we adhere to strict privacy protocols. Please see our Privacy Policy for full details.",
  },
];

const fadeIn = (delay: number = 0, y: number = 20) => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});


export function FaqSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={fadeIn()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <HelpCircle className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions? We've got answers. Find information about our platform and features below.
          </p>
        </motion.div>

        <motion.div 
          variants={fadeIn(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full bg-card p-4 sm:p-6 rounded-lg shadow-lg border">
            {faqItems.map((item) => (
              <AccordionItem value={item.value} key={item.value} className="border-b last:border-b-0 border-border/50">
                <AccordionTrigger className="text-left text-base md:text-lg hover:no-underline">
                    {item.question}
                </AccordionTrigger>
                <AccordionContent className="pt-2 text-muted-foreground text-sm md:text-base">
                    {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}