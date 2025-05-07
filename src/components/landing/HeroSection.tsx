// src/components/landing/HeroSection.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { VideoBackground } from './VideoBackground';

export function HeroSection() {
  return (
    <section className="relative flex h-[calc(100vh-5rem)] min-h-[600px] items-center justify-center overflow-hidden text-center">
      <VideoBackground src="https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-vr-glasses-42930-large.mp4" />
      <div className="relative z-10 container mx-auto px-4 md:px-6 animate-fadeIn">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground drop-shadow-lg">
          Unlock Your Content's <span className="text-primary">Full Potential</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[700px] text-lg text-gray-200 md:text-xl drop-shadow-sm">
          Leverage AI to analyze readability, predict engagement, and receive actionable insights to make your content shine.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/signup" passHref>
            <Button size="lg" className="w-full sm:w-auto transition-transform hover:scale-105 shadow-xl hover:shadow-primary/50">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#features" passHref>
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 text-primary-foreground border-primary-foreground/50 hover:bg-white/20 hover:text-primary-foreground transition-colors backdrop-blur-sm">
              <PlayCircle className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
