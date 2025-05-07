// src/components/layout/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
               {/* Reference the updated SVG logo */}
               <Image src="/logo.svg" alt="ContentAI Logo" width={40} height={40} /> 
               <span className="text-xl font-bold tracking-tight">
                 Content<span className="text-primary">AI</span>
               </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Elevate your content with AI-powered analysis and insights. Understand readability, predict engagement, and craft messages that resonate.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/company" className="text-sm hover:text-primary transition-colors">Our Company</Link></li>
              <li><Link href="/#features" className="text-sm hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/#pricing" className="text-sm hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/press-and-awards" className="text-sm hover:text-primary transition-colors">Press & Awards</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/analyze" className="text-sm hover:text-primary transition-colors">Analyze Content</Link></li>
              <li><Link href="/optimize" className="text-sm hover:text-primary transition-colors">Optimize Content</Link></li>
              <li><Link href="/content-planning" className="text-sm hover:text-primary transition-colors">Content Planning</Link></li>
              <li><Link href="/content-brief-generator" className="text-sm hover:text-primary transition-colors">Brief Generator</Link></li>
              <li><Link href="/documentation" className="text-sm hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="/case-studies" className="text-sm hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="/ai-studies" className="text-sm hover:text-primary transition-colors">AI Studies</Link></li>
              <li><Link href="/testimonials" className="text-sm hover:text-primary transition-colors">Testimonials</Link></li>
              <li><Link href="/why-contentai" className="text-sm hover:text-primary transition-colors">Why ContentAI?</Link></li>
               <li><Link href="/book-a-demo" className="text-sm hover:text-primary transition-colors">Book a Demo</Link></li>
            </ul>
          </div>

        </div>

        <hr className="my-8 border-border" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0 space-x-3">
             <span>&copy; {currentYear} ContentAI Inc. All rights reserved.</span> 
             <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
             <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></Link>
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></Link>
            <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></Link>
            <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

