// src/components/layout/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
               <Image src="/logo.svg" alt="ContentAI Logo" width={28} height={28} />
               <span className="text-xl font-bold tracking-tight">
                 Content<span className="text-primary">AI</span>
               </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Elevate your content with AI-powered analysis and insights.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/#features" className="text-sm hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/#pricing" className="text-sm hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/analyze" className="text-sm hover:text-primary transition-colors">Analyze Content</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></Link>
            </div>
          </div>
        </div>
        <hr className="my-8 border-border" />
        <div className="text-center text-sm text-muted-foreground">
          &copy; {currentYear} ContentAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
