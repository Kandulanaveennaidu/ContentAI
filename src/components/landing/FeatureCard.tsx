// src/components/landing/FeatureCard.tsx
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode; // Added to allow image insertion
}

export function FeatureCard({ icon: Icon, title, description, className, children }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`h-full ${className}`} // Ensure motion.div takes full height
    >
      <Card className={`h-full flex flex-col`}>
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="rounded-full bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{description}</p>
          {children} {/* Render children, e.g., image */}
        </CardContent>
      </Card>
    </motion.div>
  );
}
