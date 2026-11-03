'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { CinematicThreeCanvas } from '@/components/CinematicThreeCanvas';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { ArrowUpRight, FileText, Globe, Terminal } from 'lucide-react';

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
    <section id="home" className="py-10 sm:py-14 lg:py-18 border-b border-white/10 relative">
      {/* Top Telemetry Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-8 border-b border-white/10 font-mono text-xs text-[#9499A3]">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-[#D4FF00]/15 border border-[#D4FF00]/60 text-[#D4FF00] font-bold tracking-wider">
            PORTFOLIO DESIGN HACKATHON 2026 {'//'} SKILLINF
          </span>
          <span className="hidden md:inline text-[#9499A3] border-l border-white/15 pl-3">
            SECTOR: APPLIED SOFTWARE SYSTEMS
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4FF00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4FF00]"></span>
          </span>
          <span className="text-[#F4F4F0] font-medium">{profile.statusBadge}</span>
        </div>
      </div>

      {/* Main Hero Split Grid: 50% Editorial Punch + 50% Massive 3D WebGL Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Editorial Narrative Column (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-[#D4FF00]">
              <Terminal className="w-3.5 h-3.5" />
              <span>{profile.name.toUpperCase()} • B.TECH CSE (2023–2027)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-[#F4F4F0] leading-[1.04]">
              Full-Stack Architect.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF00] via-[#F4F4F0] to-[#00F0FF]">
                Algorithmic Rigor.
              </span>{' '}
              Applied AI Systems.
            </h1>
          </div>

          <p className="text-base sm:text-lg text-[#9499A3] leading-relaxed max-w-xl">
            Computer Science undergraduate at United Institute of Technology, Prayagraj.
            Building resilient MERN & Next.js web applications, solving 300+ Java DSA problems,
            and shipping applied deep learning pipelines.
          </p>

          {/* High-Impact Stat Badges (Visual Numbers, Not Text Walls) */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 bg-[#0E1015] border border-white/10 hover:border-[#D4FF00]/50 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-[#D4FF00] font-mono">300+</div>
              <div className="text-[11px] font-mono text-[#9499A3] mt-0.5">Java DSA Solved</div>
            </div>
            <div className="p-3.5 bg-[#0E1015] border border-white/10 hover:border-[#00F0FF]/50 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-[#00F0FF] font-mono">MERN</div>
              <div className="text-[11px] font-mono text-[#9499A3] mt-0.5">Full-Stack Core</div>
            </div>
            <div className="p-3.5 bg-[#0E1015] border border-white/10 hover:border-white/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-[#F4F4F0] font-mono">1st</div>
              <div className="text-[11px] font-mono text-[#9499A3] mt-0.5">SocProS Research</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={onExploreWork}
              className="px-7 py-3.5 bg-[#D4FF00] text-[#0A0B0E] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#e2ff4d] transition-all cursor-pointer shadow-[0_0_24px_rgba(212,255,0,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Explore My Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenResume}
              className="px-6 py-3.5 bg-[#111318] hover:bg-[#181C26] text-[#F4F4F0] border border-white/20 hover:border-[#D4FF00] font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4FF00]"
            >
              <FileText className="w-4 h-4 text-[#D4FF00]" />
              <span>Download Resume</span>
            </button>
          </div>

          {/* Direct Verified Social Anchors */}
          <div className="pt-1 flex flex-wrap items-center gap-5 text-xs font-mono text-[#9499A3]">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#D4FF00] transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>github.com/S1h2i3v4a</span>
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#D4FF00] transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>in/shivam15keshari</span>
            </a>
            <a
              href={profile.links.x}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#D4FF00] transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>@ShivamK11959343</span>
            </a>
          </div>
        </div>

        {/* Right 3D Cinematic Quantum WebGL Canvas (6 Cols) */}
        <div className="lg:col-span-6 w-full">
          <CinematicThreeCanvas reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
