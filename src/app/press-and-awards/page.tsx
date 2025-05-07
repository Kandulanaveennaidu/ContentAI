// src/app/press-and-awards/page.tsx
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Newspaper, Download, BookOpen, MessageSquare } from 'lucide-react'; // Changed ExternalLink to BookOpen
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const pressMentions = [
  {
    publication: "Tech Innovate Magazine",
    title: "ContentAI: Revolutionizing Content Strategy with AI",
    slug: "contentai-revolutionizing-content-strategy-with-ai",
    date: "September 15, 2023",
    logoSrc: "https://picsum.photos/seed/techinnovate/150/50", // Removed grayscale
    logoHint: "magazine logo tech"
  },
  {
    publication: "AI Weekly Chronicle",
    title: "The Future of Writing: How ContentAI is Leading the Charge",
    slug: "the-future-of-writing-how-contentai-is-leading-the-charge",
    date: "August 28, 2023",
    logoSrc: "https://picsum.photos/seed/aiweekly/150/50", // Removed grayscale
    logoHint: "news logo AI"
  },
  {
    publication: "Marketing Pro Daily",
    title: "ContentAI's Engagement Prediction Tool: A Game Changer for Marketers",
    slug: "contentais-engagement-prediction-tool-a-game-changer-for-marketers",
    date: "July 05, 2023",
    logoSrc: "https://picsum.photos/seed/marketingpro/150/50", // Removed grayscale
    logoHint: "marketing logo pro"
  },
];

const awards = [
  {
    name: "AI Innovation Award 2023",
    awardedBy: "Global Tech Leaders Forum",
    description: "Recognized for outstanding innovation in applying artificial intelligence to content creation and analysis.",
    icon: Award,
    imageSrc: "https://picsum.photos/seed/awardai/300/200",
    imageHint: "trophy award gold"
  },
  {
    name: "Top Content Tech Solution 2023",
    awardedBy: "Content Marketing Institute",
    description: "Awarded for providing a leading technology solution that significantly improves content quality and effectiveness.",
    icon: MessageSquare, // Changed from MessageSquareQuote to MessageSquare, or keep as is if preferred
    imageSrc: "https://picsum.photos/seed/awardcontent/300/200",
    imageHint: "certificate award document"
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
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

export default function PressAndAwardsPage() {
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
            <Award className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Press & <span className="text-primary">Awards</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Discover what others are saying about ContentAI and the recognition we've received for innovation and excellence in AI-powered content solutions.
            </p>
          </motion.section>

          {/* Press Mentions Section */}
          <motion.section
            className="mb-16 md:mb-24"
            variants={fadeIn(0.2)}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-8 text-center md:text-left">
              <Newspaper className="inline-block h-8 w-8 mr-3 text-primary" />
              In The News
            </h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {pressMentions.map((mention, index) => (
                <motion.div key={index} variants={fadeIn(0, 20)}>
                  <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    <CardHeader>
                      <div className="mb-3 h-12 flex items-center">
                        <Image 
                          src={mention.logoSrc} 
                          alt={`${mention.publication} Logo`} 
                          width={120} // Adjusted to match original values if they worked
                          height={40}
                          className="object-contain" 
                          data-ai-hint={mention.logoHint} 
                        />
                      </div>
                      <CardTitle className="text-lg leading-snug">{mention.title}</CardTitle>
                      <CardDescription>{mention.publication} - {mention.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow"></CardContent> {/* Spacer */}
                    <div className="p-4 pt-0">
                      <Link href={`/press/${mention.slug}`} passHref>
                        <Button variant="outline" className="w-full">
                          Read Article <BookOpen className="ml-2 h-4 w-4" /> {/* Changed icon */}
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Awards Section */}
          <motion.section
            className="mb-16 md:mb-24"
            variants={fadeIn(0.4)}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-8 text-center md:text-left">
              <Award className="inline-block h-8 w-8 mr-3 text-primary" />
              Our Achievements
            </h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
            >
              {awards.map((award, index) => (
                <motion.div key={award.name} variants={fadeIn(0, 20)}>
                  <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                     <div className="relative h-48 w-full">
                        <Image src={award.imageSrc} alt={award.name} layout="fill" objectFit="cover" data-ai-hint={award.imageHint} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                            <award.icon className="h-10 w-10 text-white mb-1" />
                            <CardTitle className="text-xl text-white">{award.name}</CardTitle>
                        </div>
                    </div>
                    <CardContent className="p-6 flex-grow">
                      <p className="text-sm font-semibold text-primary mb-1">{award.awardedBy}</p>
                      <p className="text-sm text-muted-foreground">{award.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Press Kit Section */}
          <motion.section
            className="text-center py-12 md:py-16 bg-secondary rounded-lg"
            variants={fadeIn(0.6)}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-semibold text-secondary-foreground mb-3">For Media Inquiries</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Access our official logos, brand guidelines, and company information. For interviews or specific requests, please contact our media team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" asChild>
                <a href="/assets/ContentAI-Press-Kit.pdf" download="ContentAI-Press-Kit.pdf">
                    <Download className="mr-2 h-5 w-5" /> Download Press Kit
                </a>
              </Button>
              <Link href="/contact?subject=MediaInquiry" passHref>
                <Button size="lg" variant="outline" className="border-secondary-foreground/50 text-secondary-foreground hover:bg-secondary-foreground/10">
                  Contact Media Team
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

