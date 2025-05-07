// src/app/(app)/layout.tsx
"use client"; 

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChatbotWidget } from '@/components/chatbot/ChatbotWidget';
import { TourProvider } from '@/components/tour/TourProvider';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!isLoggedIn) {
        // Allow access to login/signup pages even if trying to access an app page initially
        if (pathname !== '/login' && pathname !== '/signup') {
          router.replace('/login');
        } else {
           setIsVerifying(false);
        }
      } else {
        setIsVerifying(false);
      }
    }
  }, [router, pathname]);

  if (isVerifying) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <TourProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow bg-background">{children}</main>
        <ChatbotWidget />
        <Footer />
      </div>
    </TourProvider>
  );
}
