// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sparkles, Sun, Moon, BarChartHorizontalBig, Settings, UserCircle, BookOpen, ChevronDown, CalendarCheck, FileText, Users, Target, Award, FlaskConical, MessageSquareQuote, FileJson, Edit3 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuLabel } from '@/components/ui/dropdown-menu';


const mainNavLinksBase = [
  { href: '/#features', label: 'Features' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog'},
  { href: '/book-a-demo', label: 'Book a Demo'},
];

const resourcesDropdownLinks = [
  { href: '/why-contentai', label: 'Why ContentAI?', icon: Target },
  { href: '/case-studies', label: 'Case Studies', icon: FileText },
  { href: '/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { href: '/ai-studies', label: 'AI Studies', icon: FlaskConical },
  { href: '/documentation', label: 'Documentation', icon: BookOpen },
  { href: '/content-planning', label: 'Content Planning', icon: CalendarCheck },
  { href: '/optimize', label: 'Optimize Content', icon: Edit3 },
  { href: '/content-brief-generator', label: 'Brief Generator', icon: FileJson },
  
];

const appNavLink = { href: '/analyze', label: 'Analyze Content', icon: Sparkles };
const dashboardLink = { href: '/dashboard', label: 'Dashboard', icon: BarChartHorizontalBig };

const authLinks = (isLoggedIn: boolean, handleLogout: () => void) => isLoggedIn ? [
  { href: '/profile', label: 'Profile', icon: UserCircle },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '#', label: 'Logout', primary: false, action: handleLogout }
] : [
  { href: '/login', label: 'Login' },
  { href: '/signup', label: 'Sign Up', primary: true },
];

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); 
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    }
  }, [pathname]); // Re-check on pathname change for SPA behavior after login/logout


  const handleLogout = () => {
    console.log("Logout action"); 
    setIsLoggedIn(false); 
    if(typeof window !== "undefined") localStorage.removeItem('isLoggedIn');
    // Potentially redirect to home or login page
    // router.push('/'); // if using useRouter
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAppRelatedPage = pathname.startsWith('/analyze') || pathname.startsWith('/dashboard') || pathname.startsWith('/profile') || pathname.startsWith('/settings');
  
  const navLinksToDisplay = isAppRelatedPage ? [] : mainNavLinksBase;
  
  const mobileNavLinks = isAppRelatedPage 
    ? [dashboardLink, appNavLink, ...authLinks(isLoggedIn, handleLogout)] 
    : [...mainNavLinksBase, 
        {label: "Resources", isDropdown: true, items: resourcesDropdownLinks},
        appNavLink, 
        ...authLinks(isLoggedIn, handleLogout)
      ];


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
        <nav className="hidden items-center gap-1 md:flex"> {/* Reduced gap for more items */}
          {navLinksToDisplay.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-3 py-2 rounded-md", // Added padding & rounded
                pathname === link.href && "text-primary bg-accent"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Resources Dropdown */}
           {!isAppRelatedPage && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent px-3 py-2">
                  Resources <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {resourcesDropdownLinks.map(link => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className={cn("flex items-center gap-2 w-full", pathname === link.href && "bg-accent")}>
                      {link.icon && React.createElement(link.icon, {className: "h-4 w-4 text-muted-foreground"})}
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}


          {!isAppRelatedPage && isLoggedIn && (
            <Link href={dashboardLink.href} passHref>
              <Button variant="default" size="sm" className="shadow-md hover:shadow-lg transition-shadow">
                {React.createElement(dashboardLink.icon, { className: "mr-2 h-4 w-4"})}
                Go to Dashboard
              </Button>
            </Link>
          )}
           {!isAppRelatedPage && !isLoggedIn && (
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


          <div className="h-6 w-px bg-border mx-2" />
          
          {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <UserCircle className="h-6 w-6" />
                    <span className="sr-only">User Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
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
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          ) : (
            authLinks(isLoggedIn, handleLogout).map((link) => (
              <Link key={link.href} href={link.href!} passHref>
                <Button variant={link.primary ? 'default' : 'outline'} size="sm" className={cn(link.primary && "shadow-md hover:shadow-lg transition-shadow")}>
                  {link.label}
                </Button>
              </Link>
            ))
          )}


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
              <nav className="flex flex-col gap-1"> {/* Reduced gap for more items */}
                {mobileNavLinks.map((link) => {
                  if ((link as any).isDropdown) {
                    return (
                      <DropdownMenu key={link.label}>
                        <DropdownMenuTrigger asChild>
                           <Button variant="ghost" className="w-full justify-start text-base font-medium text-muted-foreground hover:text-primary py-2 flex items-center">
                            {link.icon && React.createElement(link.icon, { className: "mr-2 h-5 w-5"})}
                            {link.label} <ChevronDown className="ml-auto h-4 w-4"/>
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="bottom" align="start" className="w-[250px]">
                           {(link as any).items.map((subLink: any) => (
                            <DropdownMenuItem key={subLink.href} asChild>
                                <Link href={subLink.href} onClick={() => setMobileMenuOpen(false)} className={cn("flex items-center gap-2 w-full", pathname === subLink.href && "bg-accent")}>
                                {subLink.icon && React.createElement(subLink.icon, {className: "h-4 w-4 text-muted-foreground"})}
                                {subLink.label}
                                </Link>
                            </DropdownMenuItem>
                           ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    );
                  }
                  return (link.href === '#' && link.action) ? ( // Logout
                     <Button key={link.label} variant={'outline'} className="w-full justify-start text-base font-medium py-2" onClick={() => {link.action && link.action()}}>
                      {link.icon && React.createElement(link.icon, { className: "mr-2 h-5 w-5"})}
                      {link.label}
                    </Button>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href!}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "text-base font-medium transition-colors hover:text-primary py-2 flex items-center rounded-md px-3",
                        link.primary ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground hover:bg-accent",
                        pathname === link.href && (link.primary ? "brightness-110" : "text-primary bg-accent")
                      )}
                    >
                      {link.icon && React.createElement(link.icon, { className: "mr-2 h-5 w-5"})}
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}

