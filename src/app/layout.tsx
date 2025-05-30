import type {Metadata} from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'ContentAI - Amplify Your Content',
  description: 'AI-powered content analysis for readability and engagement.',
  icons: {
    // Reference the updated SVG logo for favicon
    icon: '/logo.svg', 
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`} suppressHydrationWarning>
      {/* Added suppressHydrationWarning to body as well */}
      <body className="font-sans antialiased" suppressHydrationWarning> 
        <ThemeProvider
          attribute="class"
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

