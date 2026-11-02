'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface FooterProps {
  onOpenSourceModal: () => void;
  onScrollToTop: () => void;
}

export function Footer({ onOpenSourceModal, onScrollToTop }: FooterProps) {
  const { profile } = PORTFOLIO_DATA;

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#0A0B0E] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#9499A3]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#D4FF00]" />
          <span className="text-[#F4F4F0] font-bold">{profile.name.toUpperCase()}</span>
          <span>{'//'} PORTFOLIO DESIGN HACKATHON 2026 (SKILLINF)</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenSourceModal}
            className="hover:text-[#D4FF00] underline underline-offset-4 cursor-pointer"
          >
            Export Next.js Source & README
          </button>
          <button
            type="button"
            onClick={onScrollToTop}
            className="hover:text-[#F4F4F0] cursor-pointer"
          >
            TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
