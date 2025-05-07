// src/app/page.tsx
"use client"; 

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { CallToActionSection } from '@/components/landing/CallToActionSection';
import { TourProvider } from '@/components/tour/TourProvider';
import { ChatbotWidget } from '@/components/chatbot/ChatbotWidget';


export default function HomePage() {

  return (
    <TourProvider>
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
    </TourProvider>
  );
}
