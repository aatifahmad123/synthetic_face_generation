import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
// import { Header } from '@/components/header'; // Removed Header import
import { Footer } from '@/components/footer';
import { ScrollToTop } from '@/components/scroll-to-top';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Synthetic Face Generation and Classification using WGAN-GP and CNN', // Updated title
  description: 'Exploring Synthetic Celebrity Face Generation using WGANs by Aatif Ahmad.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn('min-h-screen font-sans antialiased', poppins.variable)}>
        <div className="relative flex min-h-screen flex-col">
          {/* <Header /> */} {/* Removed Header usage */}
          <main className="flex-1 pt-8">{children}</main> {/* Added top padding */}
          <Footer />
        </div>
        <Toaster />
        <ScrollToTop />
      </body>
    </html>
  );
}
