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
      <VideoBackground src="https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-vr-glasses-42930-large.mp4" />
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.h1 
          className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg" // Changed to text-white
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Unlock Your Content's <span className="text-primary">Full Potential</span>
        </motion.h1>
        <motion.p 
          className="mx-auto mt-6 max-w-[700px] text-lg text-gray-100 md:text-xl drop-shadow-sm" // Changed to text-gray-100 for slightly softer white
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
              <Button size="lg" className="w-full sm:w-auto shadow-xl hover:shadow-primary/50">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </Link>
          <Link href="#features" passHref>
             <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 text-white border-white/50 hover:bg-white/20 hover:text-white transition-colors backdrop-blur-sm"> {/* Ensured button text is white */}
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
