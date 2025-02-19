import QueryProvider from '@/components/query-provider';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ui/theme-provider';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aircall',
  description: 'Generated by create next app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${montserrat.className} min-h-screen flex flex-col antialiased`}>
        <QueryProvider>
          <ThemeProvider attribute='class' defaultTheme='system'>
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
