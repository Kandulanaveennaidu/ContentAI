// src/components/landing/HeroSection.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { VideoBackground } from './VideoBackground';
import { motion } from 'framer-motion';

export function HeroSection() {
  const buttonVariants = {
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
    tap: { scale: 0.95 }
  };

  return (
    <section className="relative flex h-[calc(100vh-5rem)] min-h-[600px] items-center justify-center overflow-hidden text-center">
      {/* Add the VideoBackground component */}
      <VideoBackground src="https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-vr-glasses-42930-large.mp4" />
      {/* Container needs higher z-index than video background */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.h1
          className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground" // Changed base text to foreground
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Unlock Your Content's <span className="text-primary">Full Potential</span>
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-[700px] text-lg text-foreground md:text-xl" // Changed text to foreground
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          Leverage AI to analyze readability, predict engagement, and receive actionable insights to make your content shine.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          <Link href="/signup" passHref>
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
              {/* Button retains its styling for visibility */}
              <Button size="lg" className="w-full sm:w-auto shadow-xl hover:shadow-primary/50">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </Link>
          <Link href="#features" passHref>
             <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
               {/* Updated className: Removed conflicting hover styles, using standard outline hover */}
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-foreground border-foreground/70 backdrop-blur-sm bg-black/30 dark:bg-white/30 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
