// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sparkles, Sun, Moon, BarChartHorizontalBig, Settings, UserCircle, BookOpen, ChevronDown, CalendarCheck, FileText, Users, Target, Award, FlaskConical, MessageSquareQuote, FileJson, Edit3, LogOut, Wand2 } from 'lucide-react'; // Added Wand2
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


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
const generateBlogLink = { href: '/generate-blog', label: 'Generate Blog', icon: Wand2 }; // New link

// Default user structure if localStorage is empty or invalid
const defaultUser = {
  name: "Guest",
  email: "",
  avatarDataUrl: null, // No default avatar image, rely on fallback
  bio: "",
  plan: "Free", 
};


export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); 
  const [userAvatar, setUserAvatar] = React.useState<string | null>(null);
  const [userName, setUserName] = React.useState<string>('');


  // Function to update user state from localStorage or defaults
   const updateUserState = React.useCallback(() => {
    if (typeof window !== "undefined") {
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedInStatus);

        if (loggedInStatus) {
            const storedProfile = localStorage.getItem('userProfile');
            if (storedProfile) {
                try {
                    const profile = JSON.parse(storedProfile);
                     // Validate profile structure or use defaults
                    setUserAvatar(profile.avatarDataUrl || defaultUser.avatarDataUrl);
                    setUserName(profile.name || defaultUser.name);
                } catch (e) {
                    console.error("Failed to parse profile, using defaults.", e);
                    setUserAvatar(defaultUser.avatarDataUrl);
                    setUserName(defaultUser.name);
                }
            } else {
                // Logged in, but no profile? Use defaults. Should ideally not happen.
                 setUserAvatar(defaultUser.avatarDataUrl);
                 setUserName(defaultUser.name);
            }
        } else {
            setUserAvatar(null);
            setUserName('');
        }
    }
   }, []); // Empty dependency array means this function definition doesn't change

    // Initial load and listen for storage changes
    React.useEffect(() => {
        updateUserState(); // Initial check

        const handleStorageChange = (event: StorageEvent) => {
            // Update state if relevant keys change in localStorage
            if (event.key === 'isLoggedIn' || event.key === 'userProfile') {
                updateUserState();
            }
        };
        
        // Also listen for custom profile update events
         const handleProfileUpdate = (event: CustomEvent) => {
            if (event.detail) {
                setUserAvatar(event.detail.avatarDataUrl || defaultUser.avatarDataUrl);
                setUserName(event.detail.name || defaultUser.name);
            } else {
                 updateUserState(); // Fallback to reading localStorage again if no detail
            }
         };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('profileUpdated', handleProfileUpdate as EventListener); 

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('profileUpdated', handleProfileUpdate as EventListener);
        };
    }, [pathname, updateUserState]); // Re-check on pathname change and if updateUserState definition changes (it shouldn't)


  const handleLogout = () => {
    setIsLoggedIn(false); 
    setUserAvatar(null);
    setUserName('');
    if(typeof window !== "undefined") localStorage.removeItem('isLoggedIn');
    if(typeof window !== "undefined") localStorage.removeItem('userProfile'); // Also clear profile
    router.push('/login'); 
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };
  
  const authLinks = (loggedIn: boolean, logoutHandler: () => void) => loggedIn ? [
    { href: '/profile', label: 'Profile', icon: UserCircle },
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '#', label: 'Logout', primary: false, action: logoutHandler, icon: LogOut }
  ] : [
    { href: '/login', label: 'Login' },
    { href: '/signup', label: 'Sign Up', primary: true },
  ];


  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAppRelatedPage = pathname.startsWith('/analyze') || pathname.startsWith('/dashboard') || pathname.startsWith('/profile') || pathname.startsWith('/settings') || pathname.startsWith('/generate-blog'); // Added generate-blog
  
  const navLinksToDisplay = isAppRelatedPage ? [] : mainNavLinksBase;
  
  const mobileNavLinks = isAppRelatedPage 
    ? [dashboardLink, appNavLink, generateBlogLink, ...authLinks(isLoggedIn, handleLogout)] // Added generateBlogLink
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
        <Link href="/" className="flex items-center gap-2" aria-label="ContentAI Home"> 
          <Image src="/logo.svg" alt="ContentAI Logo" width={36} height={36} /> 
          <span className="text-2xl font-bold tracking-tight text-foreground">
            Content<span className="text-primary">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex"> 
          {navLinksToDisplay.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-3 py-2 rounded-md", 
                pathname === link.href && "text-primary bg-accent/20" 
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Resources Dropdown */}
           {!isAppRelatedPage && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/20 px-3 py-2">
                  Resources <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {resourcesDropdownLinks.map(link => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className={cn("flex items-center gap-2 w-full", pathname === link.href && "bg-accent/20")}>
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
          
          {/* Links visible only on app-related pages */}
          {isAppRelatedPage && (
             <>
              <Link href={dashboardLink.href} passHref>
                  <Button variant="ghost" size="sm" className={cn(pathname.startsWith('/dashboard') && "text-primary bg-accent/20")}>
                     {React.createElement(dashboardLink.icon, { className: "mr-2 h-4 w-4"})}
                    {dashboardLink.label}
                  </Button>
                </Link>
               <Link href={appNavLink.href} passHref>
                  <Button variant="ghost" size="sm" className={cn(pathname.startsWith('/analyze') && "text-primary bg-accent/20")}>
                     {React.createElement(appNavLink.icon, { className: "mr-2 h-4 w-4"})}
                    {appNavLink.label}
                  </Button>
                </Link>
                 <Link href={generateBlogLink.href} passHref>
                  <Button variant="ghost" size="sm" className={cn(pathname.startsWith('/generate-blog') && "text-primary bg-accent/20")}>
                     {React.createElement(generateBlogLink.icon, { className: "mr-2 h-4 w-4"})}
                    {generateBlogLink.label}
                  </Button>
                </Link>
             </>
          )}


          <div className="h-6 w-px bg-border mx-2" />
          
          {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-0 h-9 w-9">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userAvatar || undefined} alt={userName || "User"} />
                      <AvatarFallback>{userName ? userName.substring(0,1).toUpperCase() : <UserCircle className="h-5 w-5"/>}</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">User Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{userName || "My Account"}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                   {authLinks(isLoggedIn, handleLogout).map((link) => (
                     link.href === '#' && link.action ? (
                        <DropdownMenuItem key={link.label} onClick={link.action} className="cursor-pointer">
                         {link.icon && React.createElement(link.icon, { className: "mr-2 h-4 w-4"})} {link.label}
                        </DropdownMenuItem>
                     ) : (
                        <DropdownMenuItem key={link.href} asChild>
                            <Link href={link.href!} className="flex items-center">
                            {link.icon && React.createElement(link.icon, { className: "mr-2 h-4 w-4"})} {link.label}
                            </Link>
                        </DropdownMenuItem>
                     )
                   ))}
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
                <Image src="/logo.svg" alt="ContentAI Logo" width={32} height={32} />
                 <span className="text-xl font-bold tracking-tight text-foreground">
                    Content<span className="text-primary">AI</span>
                 </span>
              </div>
              <nav className="flex flex-col gap-1"> 
                {mobileNavLinks.map((link) => {
                  if ((link as any).isDropdown) { // Dropdown for mobile too
                    return (
                      <DropdownMenu key={link.label}>
                        <DropdownMenuTrigger asChild>
                           <Button variant="ghost" className="w-full justify-start text-base font-medium text-muted-foreground hover:text-primary py-2 flex items-center">
                            {/* Check if link.icon exists before creating element */}
                            {link.icon && React.createElement(link.icon, { className: "mr-2 h-5 w-5"})}
                            {link.label} <ChevronDown className="ml-auto h-4 w-4"/>
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="bottom" align="start" className="w-[250px]">
                           {(link as any).items.map((subLink: any) => (
                            <DropdownMenuItem key={subLink.href} asChild>
                                <Link href={subLink.href} onClick={() => setMobileMenuOpen(false)} className={cn("flex items-center gap-2 w-full", pathname === subLink.href && "bg-accent/20")}>
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
                     <Button key={link.label} variant={ link.primary ? 'default' : 'ghost' } className="w-full justify-start text-base font-medium py-2" onClick={() => {link.action && link.action()}}>
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
                        link.primary ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground hover:bg-accent/20",
                        pathname === link.href && (link.primary ? "brightness-110" : "text-primary bg-accent/20")
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


