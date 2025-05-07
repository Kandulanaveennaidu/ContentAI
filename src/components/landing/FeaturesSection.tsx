// src/components/landing/FeaturesSection.tsx
import { FeatureCard } from './FeatureCard';
import { BookOpen, TrendingUp, Zap, CheckCircle, BarChart3, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Readability Analysis',
    description: 'Get Flesch-Kincaid scores and actionable suggestions to make your content accessible to a wider audience.',
  },
  {
    icon: TrendingUp,
    title: 'Engagement Prediction',
    description: 'Predict how engaging your content will be and receive tips to boost interaction and resonance.',
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Receive real-time analysis as you type or paste your content, enabling quick iterations.',
  },
  {
    icon: BarChart3,
    title: 'Comprehensive Metrics',
    description: 'Track key content metrics and visualize your improvement over time with clear, concise dashboards.',
  },
  {
    icon: Lightbulb,
    title: 'Actionable Suggestions',
    description: 'Go beyond scores with practical, AI-driven advice to refine your writing style and structure.',
  },
  {
    icon: CheckCircle,
    title: 'User-Friendly Interface',
    description: 'Enjoy a clean, intuitive platform designed for seamless content optimization.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Everything You Need to <span className="text-primary">Elevate Your Content</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            ContentAI provides powerful tools to analyze, refine, and optimize your writing for maximum impact.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
