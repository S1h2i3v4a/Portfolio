'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { ArchitecturalCanvas } from '@/components/ArchitecturalCanvas';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { ArrowUpRight, FileText, Globe } from 'lucide-react';

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
    <section id="home" className="py-12 sm:py-16 lg:py-24 border-b border-white/10">
      {/* Top Metadata Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-white/10 font-mono text-xs text-[#9499A3]">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#D4FF00]/15 border border-[#D4FF00]/50 text-[#D4FF00] font-semibold">
            PORTFOLIO DESIGN HACKATHON 2026 {'//'} SKILLINF
          </span>
          <span className="hidden sm:inline">INDEX {'//'} 00 — SYSTEM OVERVIEW</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4FF00]" />
          <span className="text-[#F4F4F0]">{profile.statusBadge}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Editorial Typography & CTAs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#D4FF00]">
              {profile.name} — {profile.academicStatus}
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#F4F4F0] leading-[1.08]">
              Engineering Practical{' '}
              <span className="underline decoration-[#D4FF00] decoration-2 underline-offset-8">
                Full-Stack Systems
              </span>
              , Algorithmic Rigor & Applied AI Workflows.
            </h1>
          </div>

          <p className="text-base sm:text-lg text-[#9499A3] max-w-2xl leading-relaxed">
            {profile.subheadline}
          </p>

          {/* Verified Quick Telemetry Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 bg-[#111318] border border-white/10">
              <div className="font-mono text-[11px] text-[#9499A3]">CORE FOCUS</div>
              <div className="font-mono text-sm font-semibold text-[#F4F4F0] mt-1">
                MERN & Next.js
              </div>
            </div>
            <div className="p-3.5 bg-[#111318] border border-white/10">
              <div className="font-mono text-[11px] text-[#9499A3]">ALGORITHMS</div>
              <div className="font-mono text-sm font-semibold text-[#D4FF00] mt-1">
                300+ Java DSA
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 p-3.5 bg-[#111318] border border-white/10">
              <div className="font-mono text-[11px] text-[#9499A3]">APPLIED RESEARCH</div>
              <div className="font-mono text-sm font-semibold text-[#F4F4F0] mt-1">
                EfficientNet + OpenCV
              </div>
            </div>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              type="button"
              onClick={onExploreWork}
              className="px-6 py-3.5 bg-[#D4FF00] text-[#0A0B0E] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#e1ff33] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
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

          {/* Direct Verified Profile Links */}
          <div className="pt-4 flex flex-wrap items-center gap-5 text-xs font-mono text-[#9499A3]">
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

        {/* Right Column: Interactive 3D Architectural Core (5 Cols) */}
        <div className="lg:col-span-5">
          <ArchitecturalCanvas reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
