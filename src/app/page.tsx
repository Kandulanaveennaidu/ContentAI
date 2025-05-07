// src/app/page.tsx
"use client"; 

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { CallToActionSection } from '@/components/landing/CallToActionSection';
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

export default function HomePage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Example of a parallax effect on a section, e.g. FeaturesSection
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={ref} className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        <motion.div style={{ y }}>
          <FeaturesSection />
        </motion.div>
        
        <PricingSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}
