// src/app/(app)/layout.tsx
"use client"; // Required because TourProvider is a client component

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChatbotWidget } from '@/components/chatbot/ChatbotWidget';
import { TourProvider } from '@/components/tour/TourProvider'; // Import TourProvider

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TourProvider> {/* Wrap content with TourProvider */}
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow bg-background">{children}</main>
        <ChatbotWidget />
        <Footer />
      </div>
    </TourProvider>
  );
}

