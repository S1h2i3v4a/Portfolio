'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon, PlayIcon } from '@/components/Icons';
import { ArrowUpRight, ArrowDown, Globe } from 'lucide-react';

const HeroAstronautScene = dynamic(
  () => import('@/components/HeroAstronautScene').then((mod) => mod.HeroAstronautScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[460px] sm:h-[540px] lg:h-[640px] bg-[#07090D] border border-white/10 flex flex-col items-center justify-center p-6 text-center">
        <svg
          viewBox="0 0 240 240"
          className="w-48 h-48 stroke-[#C7FF3E]/80 fill-none animate-pulse"
          aria-label="Loading 3D Space Scene"
        >
          <circle cx="120" cy="120" r="80" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
          <circle cx="120" cy="120" r="50" stroke="rgba(104,231,255,0.3)" />
          <circle cx="120" cy="90" r="22" stroke="#C7FF3E" strokeWidth="1.5" />
          <rect x="100" y="115" width="40" height="50" rx="4" stroke="white" strokeWidth="1.2" />
        </svg>
        <p className="text-xs font-mono text-[#697483] mt-3 tracking-widest uppercase">
          INITIALIZING ZERO-G ASTRONAUT TELEMETRY...
        </p>
      </div>
    )
  }
);

interface HeroSectionProps {
  reducedMotion: boolean;
  onExploreWork: () => void;
  onWatchDemo?: () => void;
}

export function HeroSection({
  reducedMotion,
  onExploreWork,
  onWatchDemo
}: HeroSectionProps) {
  const { profile } = PORTFOLIO_DATA;

  return (
    <section
      id="home"
      className="min-h-[720px] lg:min-h-[780px] flex flex-col justify-center py-10 lg:py-16 border-b border-white/[0.065] relative overflow-hidden"
    >
      {/* Background radial cosmic glow */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(104,231,255,0.18) 0%, rgba(199,255,62,0.08) 40%, transparent 70%)'
        }}
      />

      {/* Main Two-Column Split (Left Copy / Right 3D Astronaut) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center relative z-10">
        {/* Left Column matching reference image exactly */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-7">
          {/* Greeting */}
          <div className="space-y-1">
            <span className="text-lg sm:text-xl text-[#929CAA] font-medium tracking-wide">
              Hi, I&apos;m
            </span>
            <h1
              className="font-black tracking-tight text-[#F4F7FB] leading-[0.98]"
              style={{ fontSize: 'clamp(3.0rem, 6.2vw, 5.8rem)' }}
            >
              Shivam
            </h1>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#C7FF3E] tracking-tight pt-1">
              Full-Stack Developer
            </div>
          </div>

          {/* Subtitle statement */}
          <p className="text-base sm:text-lg text-[#929CAA] leading-[1.65] max-w-xl">
            Building intelligent, scalable and immersive web experiences.
          </p>

          {/* Primary Action Buttons matching Reference Image */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            {/* Explore Projects Button: Solid Lime Pill */}
            <button
              type="button"
              onClick={onExploreWork}
              className="px-7 py-3 bg-[#C7FF3E] hover:bg-[#bcf82e] text-[#07090D] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_24px_rgba(199,255,62,0.28)] hover:shadow-[0_0_32px_rgba(199,255,62,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Watch Demo Button matching reference image */}
            <button
              type="button"
              onClick={onWatchDemo}
              className="px-6 py-3 bg-[#0D1219]/90 hover:bg-[#111923] text-[#E9EDF4] hover:text-[#C7FF3E] border border-white/15 hover:border-[#C7FF3E] font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full flex items-center gap-2.5 transition-all cursor-pointer backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3E]"
            >
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[#C7FF3E]">
                <PlayIcon className="w-2.5 h-2.5 ml-0.5" />
              </div>
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Quick Resume Download & Authentic Social Links */}
          <div className="pt-2 flex flex-wrap items-center gap-5 text-xs font-mono text-[#929CAA]">
            <a
              href="/resume.pdf"
              download="Shivam_Keshari_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#C7FF3E] hover:underline font-semibold"
            >
              <ArrowDown className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>
            <span className="text-white/15">•</span>
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

        {/* Right 3D Astronaut Scene */}
        <div className="lg:col-span-6 xl:col-span-6 w-full">
          <HeroAstronautScene reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
