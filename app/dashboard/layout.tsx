import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-[#141414] text-white`}>
      {children}
    </div>
  );
}
