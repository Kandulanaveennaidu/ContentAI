// src/app/testimonials/page.tsx
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageSquareQuote } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: "Sarah L., Content Manager",
    company: "Bloom Co.",
    avatar: "https://picsum.photos/seed/sarahL/100",
    avatarHint: "woman smiling portrait",
    stars: 5,
    quote: "ContentAI has revolutionized our content workflow. The readability scores and engagement predictions are incredibly accurate and have helped us improve our blog's performance by over 40%!",
    imageSrc: "https://picsum.photos/seed/testimonial1/500/300",
    imageHint: "graph increasing success"
  },
  {
    name: "John B., SEO Specialist",
    company: "Digital Leap Agency",
    avatar: "https://picsum.photos/seed/johnB/100",
    avatarHint: "man professional glasses",
    stars: 5,
    quote: "The AI-driven suggestions for content structure and keyword integration are top-notch. ContentAI is an indispensable tool for anyone serious about SEO and content quality.",
    imageSrc: "https://picsum.photos/seed/testimonial2/500/300",
    imageHint: "seo analytics screen"
  },
  {
    name: "Emily K., Freelance Writer",
    company: "Self-Employed",
    avatar: "https://picsum.photos/seed/emilyK/100",
    avatarHint: "woman writing laptop",
    stars: 4,
    quote: "As a freelance writer, ContentAI helps me deliver higher quality work to my clients. The instant feedback loop is fantastic for refining my writing on the fly. The history feature is a lifesaver!",
    imageSrc: "https://picsum.photos/seed/testimonial3/500/300",
    imageHint: "freelancer working coffee"
  },
   {
    name: "David R., Marketing Director",
    company: "Innovate Solutions Ltd.",
    avatar: "https://picsum.photos/seed/davidR/100",
    avatarHint: "man corporate suit",
    stars: 5,
    quote: "Our team's productivity has soared since adopting ContentAI. The content brief generator and planning tools ensure everyone is aligned, leading to more cohesive and impactful campaigns.",
    imageSrc: "https://picsum.photos/seed/testimonial4/500/300",
    imageHint: "team meeting productive"
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

export default function TestimonialsPage() {
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
            <MessageSquareQuote className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Hear From Our <span className="text-primary">Happy Users</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Discover how ContentAI is helping creators, marketers, and businesses like yours achieve remarkable results.
            </p>
          </motion.section>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.name} variants={fadeIn(0, 25)}>
                <Card className="h-full flex flex-col overflow-hidden shadow-xl hover:scale-[1.015] transition-all duration-300 hover:shadow-primary/20 border border-border">
                  <CardHeader className="p-6 pb-4">
                    <div className="flex items-center mb-3">
                      <Avatar className="h-14 w-14 mr-4 border-2 border-primary">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.avatarHint}/>
                        <AvatarFallback>{testimonial.name.substring(0,1)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{testimonial.name}</CardTitle>
                        <p className="text-sm text-primary">{testimonial.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 flex-grow space-y-4">
                    <blockquote className="text-muted-foreground italic border-l-4 border-primary pl-4 py-2">
                      "{testimonial.quote}"
                    </blockquote>
                    <Image
                        src={testimonial.imageSrc}
                        alt={`Visual for ${testimonial.name}'s testimonial`}
                        width={500}
                        height={300}
                        className="rounded-md object-cover aspect-video shadow-md"
                        data-ai-hint={testimonial.imageHint}
                      />
                  </CardContent>
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
            <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground mb-4">Ready to Join Our Satisfied Users?</h2>
            <p className="mt-2 max-w-xl mx-auto text-lg text-secondary-foreground/80 mb-8">
              Experience the power of ContentAI for yourself. Start your free trial today and see how you can elevate your content game.
            </p>
            <Link href="/signup" passHref>
              <Button size="lg" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Start Your Free Trial Now
              </Button>
            </Link>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
