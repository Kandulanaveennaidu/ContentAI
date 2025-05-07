// src/app/page.tsx
"use client"; 

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { TrustSection } from '@/components/landing/TrustSection'; // Added
import { StrategySection } from '@/components/landing/StrategySection'; // Added
import { RoiSection } from '@/components/landing/RoiSection'; // Added
import { FaqSection } from '@/components/landing/FaqSection'; // Added
import { PricingSection } from '@/components/landing/PricingSection';
import { CallToActionSection } from '@/components/landing/CallToActionSection';
import { ChatbotWidget } from '@/components/chatbot/ChatbotWidget';


export default function HomePage() {

  return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <FeaturesSection />
          <TrustSection /> 
          <StrategySection /> 
          <RoiSection /> 
          <PricingSection />
          <FaqSection /> 
          <CallToActionSection />
        </main>
        <ChatbotWidget />
        <Footer />
      </div>
  );
}


