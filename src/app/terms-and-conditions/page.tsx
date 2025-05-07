// src/app/terms-and-conditions/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// This page simply redirects to the "Terms of Service" page.
export default function TermsAndConditionsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/terms-of-service');
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">Redirecting you to our Terms of Service page...</p>
    </div>
  );
}
