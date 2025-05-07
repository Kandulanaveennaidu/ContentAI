// src/components/landing/CallToActionSection.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export function CallToActionSection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <Sparkles className="mx-auto h-12 w-12 mb-4 opacity-80" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to Transform Your Content?
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-lg opacity-90">
          Join thousands of creators optimizing their content with ContentAI. Sign up for free and experience the difference.
        </p>
        <div className="mt-8">
          <Link href="/signup" passHref>
            <Button size="lg" variant="secondary" className="transition-transform hover:scale-105 shadow-lg hover:shadow-xl text-primary bg-primary-foreground hover:bg-primary-foreground/90">
              Sign Up for Free
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
