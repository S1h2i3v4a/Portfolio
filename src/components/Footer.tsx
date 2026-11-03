'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenSourceModal?: () => void;
  onScrollToTop: () => void;
}

export function Footer({ onScrollToTop }: FooterProps) {
  const { profile } = PORTFOLIO_DATA;

  return (
    <footer className="relative z-10 border-t border-white/[0.065] bg-[#07090D] py-8">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#929CAA]">
        {/* Moniker + Year */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-[#C7FF3E] inline-block" />
          <span className="text-[#F4F7FB] font-bold tracking-wider">SHIVAM.K</span>
          <span className="text-[#697483]">© 2026</span>
          <span className="hidden md:inline text-white/10">|</span>
          <span className="hidden md:inline text-[#697483]">
            PORTFOLIO DESIGN HACKATHON 2026 (SKILLINF)
          </span>
        </div>

        {/* Links + Back to Top */}
        <div className="flex items-center gap-5 text-[11px]">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C7FF3E] transition-colors"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C7FF3E] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={profile.links.x}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C7FF3E] transition-colors"
          >
            X (Twitter)
          </a>

          <button
            type="button"
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 px-2.5 py-1 border border-white/10 text-[#929CAA] hover:text-[#C7FF3E] hover:border-[#C7FF3E] transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
