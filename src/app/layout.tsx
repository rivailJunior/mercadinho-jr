'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import Header from '@/components/ui/header';
import { MenuItems } from '@/constants/menu-items';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <header>
        <title>Mercado Riva</title>
      </header>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <body className={inter.className}>
          <Header menuItems={MenuItems} />
          <main className='container mx-auto p-10'>{children}</main>
        </body>
      </ThemeProvider>
    </html>
  );
}
