// src/app/page.tsx
"use client"; 

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { CallToActionSection } from '@/components/landing/CallToActionSection';
// TourProvider removed from here
import { ChatbotWidget } from '@/components/chatbot/ChatbotWidget';


export default function HomePage() {

  return (
    // TourProvider removed from here
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
          <CallToActionSection />
        </main>
        <ChatbotWidget />
        <Footer />
      </div>
    // TourProvider removed from here
  );
}

