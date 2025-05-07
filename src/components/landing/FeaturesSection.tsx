// src/components/landing/FeaturesSection.tsx
import { FeatureCard } from './FeatureCard';
import { BookOpen, TrendingUp, Zap, CheckCircle, BarChart3, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    icon: BookOpen,
    title: 'Readability Analysis',
    description: 'Get Flesch-Kincaid scores and actionable suggestions to make your content accessible to a wider audience.',
    imageSrc: "https://picsum.photos/seed/readability/600/400",
    imageHint: "text analysis document",
  },
  {
    icon: TrendingUp,
    title: 'Engagement Prediction',
    description: 'Predict how engaging your content will be and receive tips to boost interaction and resonance.',
    imageSrc: "https://picsum.photos/seed/engagement/600/400",
    imageHint: "chart graph data",
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Receive real-time analysis as you type or paste your content, enabling quick iterations.',
    imageSrc: "https://picsum.photos/seed/feedback/600/400",
    imageHint: "computer screen code",
  },
  {
    icon: BarChart3,
    title: 'Comprehensive Metrics',
    description: 'Track key content metrics and visualize your improvement over time with clear, concise dashboards.',
    imageSrc: "https://picsum.photos/seed/metrics/600/400",
    imageHint: "dashboard charts analytics",
  },
  {
    icon: Lightbulb,
    title: 'Actionable Suggestions',
    description: 'Go beyond scores with practical, AI-driven advice to refine your writing style and structure.',
    imageSrc: "https://picsum.photos/seed/suggestions/600/400",
    imageHint: "checklist ideas lightbulb",
  },
  {
    icon: CheckCircle,
    title: 'User-Friendly Interface',
    description: 'Enjoy a clean, intuitive platform designed for seamless content optimization.',
    imageSrc: "https://picsum.photos/seed/ui/600/400",
    imageHint: "modern user interface",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Everything You Need to <span className="text-primary">Elevate Your Content</span>
          </motion.h2>
          <motion.p 
            className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            ContentAI provides powerful tools to analyze, refine, and optimize your writing for maximum impact.
          </motion.p>
        </div>
        <motion.div 
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <FeatureCard 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description}
                className="h-full" // Ensure cards take full height for consistent layout
              >
                <div className="mt-4 rounded-md overflow-hidden">
                  <Image 
                    src={feature.imageSrc} 
                    alt={feature.title} 
                    width={600} 
                    height={400} 
                    className="object-cover aspect-[3/2]" 
                    data-ai-hint={feature.imageHint} 
                  />
                </div>
              </FeatureCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
