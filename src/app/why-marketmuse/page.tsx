// src/app/why-contentai/page.tsx (Formerly why-marketmuse)
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, Users, Target, BarChartBig, Lightbulb, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const advantages = [
  {
    icon: Zap,
    title: "AI-Powered Precision",
    description: "Leverage cutting-edge AI to analyze content with unparalleled accuracy. Get insights that go beyond basic metrics, helping you understand true content effectiveness.",
    imageSrc: "https://picsum.photos/seed/whyai/400/250",
    imageHint: "futuristic AI brain"
  },
  {
    icon: Target,
    title: "Actionable Insights, Not Just Data",
    description: "ContentAI provides clear, actionable recommendations. We don't just show you scores; we tell you how to improve, making optimization straightforward.",
    imageSrc: "https://picsum.photos/seed/whyaction/400/250",
    imageHint: "target arrow bullseye"
  },
  {
    icon: Users,
    title: "Designed for Creators & Teams",
    description: "Whether you're a solo blogger or a large marketing team, ContentAI's intuitive interface and upcoming collaborative features are built for your success.",
    imageSrc: "https://picsum.photos/seed/whyteam/400/250",
    imageHint: "team collaboration meeting"
  },
  {
    icon: TrendingUp,
    title: "Drive Real Results",
    description: "Our platform is focused on helping you achieve tangible outcomes: higher engagement, better readability, improved SEO, and ultimately, greater content ROI.",
    imageSrc: "https://picsum.photos/seed/whyresults/400/250",
    imageHint: "graph showing upward trend"
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
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

export default function WhyContentAIPage() {
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
            <Lightbulb className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Why Choose <span className="text-primary">ContentAI</span>?
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Discover the ContentAI difference. We're more than just an analysis tool; we're your strategic partner in creating content that captivates, converts, and climbs the ranks.
            </p>
          </motion.section>

          <motion.section
            className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 md:mb-24"
            variants={fadeIn(0.2)}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-foreground">Elevate Your Content Beyond the Competition</h2>
              <p className="text-muted-foreground text-lg">
                In today's crowded digital landscape, exceptional content isn't a luxury—it's a necessity. ContentAI empowers you with the intelligence to not only meet but exceed audience expectations and outshine competitors.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Gain deeper understanding of content performance.</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Streamline your optimization workflow.</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Make data-informed content decisions confidently.</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary" /> Consistently produce high-quality, engaging content.</li>
              </ul>
               <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/signup" passHref>
                    <Button size="lg">Start Your Free Trial</Button>
                </Link>
                <Link href="/book-a-demo" passHref>
                    <Button size="lg" variant="outline">Book a Personalized Demo</Button>
                </Link>
               </div>
            </div>
            <motion.div variants={fadeIn(0.4)} initial="hidden" animate="visible">
              <Image
                src="https://picsum.photos/seed/whychoose/600/500"
                alt="ContentAI dashboard showing content improvement"
                width={600}
                height={500}
                className="rounded-xl shadow-2xl object-cover"
                data-ai-hint="dashboard graph charts"
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
              The ContentAI Advantage
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {advantages.map((advantage, index) => (
                <motion.div key={advantage.title} variants={fadeIn(0, 25)}>
                  <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-primary/10 transition-shadow duration-300">
                    <CardHeader className="items-center text-center">
                       <div className="mb-3 rounded-full bg-primary/10 p-4 text-primary inline-block">
                         <advantage.icon className="h-8 w-8" />
                       </div>
                       <CardTitle className="text-xl">{advantage.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow text-center space-y-3">
                      <p className="text-sm text-muted-foreground px-2">{advantage.description}</p>
                      <div className="px-4">
                        <Image 
                            src={advantage.imageSrc} 
                            alt={advantage.title} 
                            width={400} 
                            height={250} 
                            className="rounded-md object-cover aspect-video mx-auto"
                            data-ai-hint={advantage.imageHint}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          <motion.section 
            className="text-center py-12 md:py-16 bg-gradient-to-br from-primary via-primary/80 to-accent rounded-lg"
            variants={fadeIn(0.2)}
            initial="hidden"
            animate="visible"
          >
            <BarChartBig className="mx-auto h-12 w-12 text-primary-foreground mb-4" />
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground mb-4">Ready to Experience the ContentAI Difference?</h2>
            <p className="mt-2 max-w-xl mx-auto text-lg text-primary-foreground/90 mb-8">
              Join thousands of successful creators and businesses who trust ContentAI.
            </p>
            <Link href="/signup" passHref>
              <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Get Started for Free Today
              </Button>
            </Link>
          </motion.section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
