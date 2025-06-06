import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Toaster as RadixToaster } from '@/components/ui/toaster'; // shadcn default toaster

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'DriveDirect - P2P Car Marketplace',
  description: 'The future of person-to-person car sales.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-user_background font-sans antialiased text-user_text',
          fontSans.variable
        )}
      >
        {/* You can add a ThemeProvider here if you plan to support light/dark mode toggle */}
        {children}
        {/* Note: Two toaster components are currently included (Sonner and Radix). 
            Consider standardizing on one for consistency and to potentially reduce bundle size,
            unless both serve distinct, intended purposes.
            SonnerToaster is often used for more dynamic/rich notifications.
            RadixToaster is the default provided by Shadcn/ui.
        */}
        <SonnerToaster richColors />
        <RadixToaster />
      </body>
    </html>
  );
}
