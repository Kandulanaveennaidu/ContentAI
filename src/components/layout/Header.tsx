// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import * as React from 'react';

const navLinks = [
  { href: '/#features', label: 'Features' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/analyze', label: 'Analyze Content', cta: true }, // Special link for app
];

const authLinks = [
  { href: '/login', label: 'Login' },
  { href: '/signup', label: 'Sign Up', primary: true },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAppPage = pathname.startsWith('/analyze');

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled || isAppPage ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent",
        isAppPage && !isScrolled && "bg-background shadow-sm"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105" aria-label="ContentAI Home">
          <Image src="/logo.svg" alt="ContentAI Logo" width={32} height={32} />
          <span className="text-2xl font-bold tracking-tight text-foreground">
            Content<span className="text-primary">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {(isAppPage ? [] : navLinks.filter(link => !link.cta)).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          {isAppPage ? (
             <Link href="/analyze" passHref>
                <Button variant="default" size="sm" className="shadow-md hover:shadow-lg transition-shadow">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
          ) : (
            navLinks.filter(link => link.cta).map(link => (
              <Link key={link.href} href={link.href} passHref>
                <Button variant="default" size="sm" className="shadow-md hover:shadow-lg transition-shadow">
                  <Sparkles className="mr-2 h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            ))
          )}
          <div className="h-6 w-px bg-border" />
          {authLinks.map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <Button variant={link.primary ? 'default' : 'outline'} size="sm" className={cn(link.primary && "shadow-md hover:shadow-lg transition-shadow")}>
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-4" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background p-6">
              <div className="mb-6 flex items-center gap-2">
                <Image src="/logo.svg" alt="ContentAI Logo" width={28} height={28} />
                 <span className="text-xl font-bold tracking-tight text-foreground">
                    Content<span className="text-primary">AI</span>
                 </span>
              </div>
              <nav className="flex flex-col gap-4">
                {(isAppPage ? [] : navLinks).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      link.cta ? "text-primary font-semibold" : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAppPage && (
                  <Link
                    href="/analyze"
                    className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    Dashboard
                  </Link>
                )}
                <hr className="my-2 border-border" />
                {authLinks.map((link) => (
                  <Link key={link.href} href={link.href} passHref>
                    <Button variant={link.primary ? 'default' : 'outline'} className="w-full">
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
