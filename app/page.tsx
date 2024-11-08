// app/page.tsx
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SummarizerCard from '@/components/SummarizerCard';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#2D0A5E] via-[#4A1173] to-[#6B0B4E]">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <SummarizerCard />
      </main>
      <Footer />
    </div>
  );
}