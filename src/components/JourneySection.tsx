'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Award, BookOpen, Cpu, GraduationCap, CheckCircle2 } from 'lucide-react';

export function JourneySection() {
  const { journey } = PORTFOLIO_DATA;

  const getJourneyIcon = (tag: string) => {
    if (tag.includes('RESEARCH')) return <BookOpen className="w-4 h-4 text-[#00F0FF]" />;
    if (tag.includes('HACKATHON')) return <Award className="w-4 h-4 text-[#D4FF00]" />;
    if (tag.includes('ALGORITHMIC')) return <Cpu className="w-4 h-4 text-[#D4FF00]" />;
    return <GraduationCap className="w-4 h-4 text-[#9D4EDD]" />;
  };

  return (
    <section id="journey" className="py-16 sm:py-24 border-b border-white/10 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#D4FF00]" />
            <span>04 {'//'} VERIFIED CHRONOLOGY & MILESTONES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#F4F4F0] tracking-tight">
            Academic, Research & Hackathon Trajectory.
          </h2>
        </div>
        <div className="font-mono text-xs text-[#9499A3]">
          TIMELINE {'//'} 2023 — 2027
        </div>
      </div>

      {/* Vertical Conduit Timeline */}
      <div className="relative border-l border-white/15 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-10">
        {journey.map((item) => (
          <div key={item.id} className="relative group">
            {/* Glowing Energy Node Marker */}
            <span className="absolute -left-[31px] sm:-left-[47px] top-2 w-3.5 h-3.5 bg-[#0A0B0E] border-2 border-[#D4FF00] group-hover:bg-[#D4FF00] group-hover:shadow-[0_0_12px_#D4FF00] transition-all" />

            <div className="bg-[#0E1015] border border-white/10 group-hover:border-white/30 p-6 sm:p-8 transition-all relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3 font-mono text-xs">
                <span className="flex items-center gap-2 text-[#D4FF00] font-bold tracking-wide">
                  {getJourneyIcon(item.tag)}
                  <span>{item.tag}</span>
                </span>
                <span className="px-2.5 py-0.5 bg-[#07080B] border border-white/10 text-[#F4F4F0]">
                  {item.period}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#F4F4F0] mb-1">
                {item.title}
              </h3>
              <div className="font-mono text-xs text-[#9499A3] mb-4">
                {item.organization}
              </div>

              <p className="text-sm sm:text-base text-[#9499A3] leading-relaxed mb-5">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {item.highlights.map((hl) => (
                  <span
                    key={hl}
                    className="px-3 py-1 bg-[#07080B] border border-white/10 font-mono text-xs text-[#D1D5DB] flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4FF00]" />
                    <span>{hl}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
