'use client';

import React from 'react';
import { BookOpenText } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full p-6 backdrop-blur-md bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3">
          <BookOpenText className="h-7 w-7 text-white/90" strokeWidth={1.5} />
          <h1 className="text-2xl font-bold text-white/90">SummarEase</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;