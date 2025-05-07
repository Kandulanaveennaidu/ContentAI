// src/app/page.tsx
"use client"; 

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { CallToActionSection } from '@/components/landing/CallToActionSection';
// Removed framer-motion imports that were causing issues or were part of the problematic parallax effect
// import { motion, useScroll, useTransform } from 'framer-motion'; 
// import React, { useRef } from 'react'; // useRef was for the parallax effect

export default function HomePage() {
  // const ref = useRef(null); // Removed as it was for the parallax scroll effect
  // const { scrollYProgress } = useScroll({ // Removed
  //   target: ref,
  //   offset: ["start start", "end start"]
  // });

  // const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]); // Removed parallax transform

  return (
    // <div ref={ref} className="flex min-h-screen flex-col bg-background"> // Removed ref
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        {/* 
          Removed the motion.div that applied a parallax effect (style={{ y }}).
          This was likely causing the layout issue where PricingSection overlapped.
        */}
        {/* <motion.div style={{ y }}> */}
          <FeaturesSection />
        {/* </motion.div> */}
        
        <PricingSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}

