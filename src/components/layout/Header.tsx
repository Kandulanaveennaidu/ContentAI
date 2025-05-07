// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sparkles, Sun, Moon, BarChartHorizontalBig, Settings, UserCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';


const mainNavLinks = [
  { href: '/#features', label: 'Features' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us'},
];

const appNavLink = { href: '/analyze', label: 'Analyze Content', icon: Sparkles };
const dashboardLink = { href: '/dashboard', label: 'Dashboard', icon: BarChartHorizontalBig };


const authLinks = (isLoggedIn: boolean) => isLoggedIn ? [
  { href: '/profile', label: 'Profile', icon: UserCircle },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '#', label: 'Logout', primary: false, action: () => console.log("Logout clicked") /* Placeholder */ }
] : [
  { href: '/login', label: 'Login' },
  { href: '/signup', label: 'Sign Up', primary: true },
];


export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  // Placeholder for login state - replace with actual auth context
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); 
  React.useEffect(() => {
    // Simulate checking login state on mount
    if (typeof window !== "undefined") {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    }
  }, []);


  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAppRelatedPage = pathname.startsWith('/analyze') || pathname.startsWith('/dashboard') || pathname.startsWith('/profile') || pathname.startsWith('/settings');
  
  const navLinksToDisplay = isAppRelatedPage ? [] : mainNavLinks;
  const mobileNavLinks = isAppRelatedPage 
    ? [dashboardLink, appNavLink] 
    : [...mainNavLinks, appNavLink, dashboardLink];


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled || isAppRelatedPage ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent",
        isAppRelatedPage && !isScrolled && "bg-background shadow-sm" 
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
          {navLinksToDisplay.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                pathname === link.href && "text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}

          {!isAppRelatedPage && (
            <Link href={appNavLink.href} passHref>
              <Button variant="default" size="sm" className="shadow-md hover:shadow-lg transition-shadow">
                {React.createElement(appNavLink.icon, { className: "mr-2 h-4 w-4"})}
                {appNavLink.label}
              </Button>
            </Link>
          )}
          
          {isAppRelatedPage && (
             <Link href={dashboardLink.href} passHref>
                <Button variant="ghost" size="sm" className={cn(pathname.startsWith('/dashboard') && "text-primary bg-accent")}>
                   {React.createElement(dashboardLink.icon, { className: "mr-2 h-4 w-4"})}
                  {dashboardLink.label}
                </Button>
              </Link>
          )}
           {isAppRelatedPage && (
             <Link href={appNavLink.href} passHref>
                <Button variant="ghost" size="sm" className={cn(pathname.startsWith('/analyze') && "text-primary bg-accent")}>
                   {React.createElement(appNavLink.icon, { className: "mr-2 h-4 w-4"})}
                  {appNavLink.label}
                </Button>
              </Link>
          )}


          <div className="h-6 w-px bg-border" />
          
          {authLinks(isLoggedIn).map((link) => (
            link.href === '#' && link.action ? ( // Logout button
              <Button key={link.label} variant={'outline'} size="sm" onClick={() => {
                link.action && link.action();
                setIsLoggedIn(false); // Simulate logout
                if(typeof window !== "undefined") localStorage.removeItem('isLoggedIn');
              }}>
                {link.label}
              </Button>
            ) : link.icon ? ( // Profile/Settings (dropdown for logged in)
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <UserCircle className="h-6 w-6" />
                    <span className="sr-only">{link.label}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <UserCircle className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                     <Link href="/settings">
                       <Settings className="mr-2 h-4 w-4" /> Settings
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                     console.log("Logout action"); // Placeholder
                     setIsLoggedIn(false); 
                     if(typeof window !== "undefined") localStorage.removeItem('isLoggedIn');
                     // Potentially redirect to home or login page
                  }}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : ( // Standard auth links (Login/Signup)
              <Link key={link.href} href={link.href!} passHref>
                <Button variant={link.primary ? 'default' : 'outline'} size="sm" className={cn(link.primary && "shadow-md hover:shadow-lg transition-shadow")}>
                  {link.label}
                </Button>
              </Link>
            )
          )).filter((_, index) => isLoggedIn ? index === 0 : true) /* Show only one icon/button for logged in state */ }


          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
           <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" /> 
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
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-base font-medium transition-colors hover:text-primary py-2 flex items-center",
                      (link as any).cta ? "text-primary font-semibold" : "text-muted-foreground",
                       pathname === link.href && ((link as any).cta ? "text-primary brightness-110" : "text-primary")
                    )}
                  >
                    {link.icon && React.createElement(link.icon, { className: "mr-2 h-5 w-5"})}
                    {link.label}
                  </Link>
                ))}
                <hr className="my-2 border-border" />
                {authLinks(isLoggedIn).map((link) => (
                  link.href === '#' && link.action ? (
                     <Button key={link.label} variant={'outline'} className="w-full" onClick={() => {
                       link.action && link.action();
                       setIsLoggedIn(false);
                       if(typeof window !== "undefined") localStorage.removeItem('isLoggedIn');
                       setMobileMenuOpen(false);
                     }}>
                      {link.label}
                    </Button>
                  ) : (
                    <Link key={link.href} href={link.href!} passHref>
                      <Button variant={link.primary ? 'default' : 'outline'} className="w-full" onClick={() => setMobileMenuOpen(false)}>
                        {link.icon && React.createElement(link.icon, { className: "mr-2 h-4 w-4"})}
                        {link.label}
                      </Button>
                    </Link>
                  )
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
