'use client';
import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/NavBar/Navbar';
import Footer from '@/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string | null>(null); 

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar isVisible={true} token={null} setToken={() => {}} />
        {children}
        <Footer isVisible={true} />
      </body>
    </html>
  );
}
