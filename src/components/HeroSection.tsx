'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { ArrowUpRight, ArrowDown, Globe } from 'lucide-react';

const CinematicThreeCanvas = dynamic(
  () => import('@/components/CinematicThreeCanvas').then((mod) => mod.CinematicThreeCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[480px] sm:h-[560px] lg:h-[640px] bg-[#07090D] border border-white/10 flex flex-col items-center justify-center p-6 text-center">
        <svg
          viewBox="0 0 400 320"
          className="w-full max-w-[340px] h-auto stroke-[#C7FF3E]/80 fill-none animate-pulse"
          aria-label="Loading Cinematic Artifact"
        >
          <circle cx="200" cy="160" r="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
          <circle cx="200" cy="160" r="90" stroke="rgba(104,231,255,0.25)" />
          <polygon
            points="200,50 300,105 300,215 200,270 100,215 100,105"
            stroke="rgba(244,247,251,0.35)"
            strokeWidth="1.2"
          />
          <polygon
            points="200,80 270,160 200,240 130,160"
            stroke="#C7FF3E"
            strokeWidth="1.5"
          />
          <circle cx="200" cy="160" r="7" fill="#C7FF3E" />
          <text x="215" y="164" fill="#C7FF3E" fontSize="10" fontFamily="monospace">
            CORE / 01
          </text>
        </svg>
        <p className="text-xs font-mono text-[#697483] mt-3 tracking-wider">
          INITIALIZING WEBGL CORE...
        </p>
      </div>
    )
  }
);

interface HeroSectionProps {
  reducedMotion: boolean;
  onExploreWork: () => void;
  onOpenResume: () => void;
}

export function HeroSection({
  reducedMotion,
  onExploreWork,
  onOpenResume
}: HeroSectionProps) {
  const { profile } = PORTFOLIO_DATA;

  return (
    <section
      id="home"
      className="min-h-[760px] flex flex-col justify-center py-12 lg:py-16 border-b border-white/[0.065] relative"
    >
      {/* Main Two-Column Split (48% Left / 52% Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Editorial Narrative Column (~48% -> 6 of 12 or 5.75 of 12) */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center space-y-7">
          {/* Status Label & Name Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-[#C7FF3E] uppercase tracking-[0.12em]">
              <span className="w-2 h-2 bg-[#C7FF3E]" />
              <span>PORTFOLIO / SOFTWARE ENGINEERING / 2026</span>
            </div>

            <div className="font-mono text-sm sm:text-base font-semibold tracking-wider text-[#929CAA] uppercase">
              SHIVAM KESHARI
            </div>
          </div>

          {/* Core Headline: Tight Line-Height, Large Off-White Typography */}
          <h1
            className="font-black tracking-tight text-[#F4F7FB] leading-[1.02]"
            style={{ fontSize: 'clamp(2.75rem, 5.8vw, 5.5rem)' }}
          >
            Building Practical Systems.
            <br />
            Engineering What’s{' '}
            <span className="text-[#C7FF3E]">Next.</span>
          </h1>

          {/* Authentic Supporting Statement */}
          <p className="text-base sm:text-lg text-[#929CAA] leading-[1.7] max-w-xl">
            Computer Science undergraduate building full-stack applications, solving algorithmic
            problems in Java, and exploring applied AI and computer vision.
          </p>

          {/* Two Structured Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="button"
              onClick={onExploreWork}
              className="px-6 sm:px-7 py-3.5 bg-[#C7FF3E] hover:bg-[#bcf82e] text-[#07090D] font-mono text-[13px] sm:text-sm font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_24px_rgba(199,255,62,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>EXPLORE PROJECTS</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={onOpenResume}
              className="px-6 sm:px-7 py-3.5 bg-transparent hover:bg-white/[0.04] text-[#E9EDF4] border border-white/10 hover:border-[#C7FF3E] font-mono text-[13px] sm:text-sm font-medium uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3E]"
            >
              <span>DOWNLOAD RESUME</span>
              <ArrowDown className="w-4 h-4 text-[#C7FF3E]" />
            </button>
          </div>

          {/* Row of Genuine Social Links */}
          <div className="pt-2 flex flex-wrap items-center gap-5 text-xs font-mono text-[#929CAA]">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#C7FF3E] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C7FF3E]"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span className="text-white/15">•</span>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#C7FF3E] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C7FF3E]"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <span className="text-white/15">•</span>
            <a
              href={profile.links.x}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#C7FF3E] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C7FF3E]"
            >
              <Globe className="w-4 h-4" />
              <span>X (Twitter)</span>
            </a>
          </div>
        </div>

        {/* Right 3D Cinematic Computational Artifact Column (~52% -> 6 of 12) */}
        <div className="lg:col-span-6 xl:col-span-6 w-full">
          <CinematicThreeCanvas reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
