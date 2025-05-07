// src/app/(app)/layout.tsx
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChatbotWidget } from '@/components/chatbot/ChatbotWidget';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow bg-background">{children}</main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
}
