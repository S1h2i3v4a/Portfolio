'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export function JourneySection() {
  const { journey } = PORTFOLIO_DATA;

  return (
    <section id="journey" className="py-16 sm:py-24 border-b border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest mb-2">
            04 {'//'} ACADEMIC, RESEARCH & HACKATHON TRAJECTORY
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#F4F4F0] tracking-tight">
            Verified Milestones & Continuous Learning.
          </h2>
        </div>
        <div className="font-mono text-xs text-[#9499A3]">
          CHRONOLOGY {'//'} 2023 — 2027
        </div>
      </div>

      <div className="relative border-l border-white/15 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-10">
        {journey.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline Node Marker */}
            <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 bg-[#0A0B0E] border-2 border-[#D4FF00] group-hover:bg-[#D4FF00] transition-colors" />

            <div className="bg-[#111318] border border-white/10 group-hover:border-white/25 p-6 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono text-xs">
                <span className="text-[#D4FF00] font-semibold">{item.tag}</span>
                <span className="px-2.5 py-0.5 bg-[#0A0B0E] border border-white/10 text-[#F4F4F0]">
                  {item.period}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#F4F4F0]">{item.title}</h3>
              <div className="font-mono text-xs text-[#9499A3] mb-3">{item.organization}</div>
              <p className="text-sm text-[#9499A3] leading-relaxed mb-4">{item.description}</p>

              <div className="flex flex-wrap gap-2">
                {item.highlights.map((hl) => (
                  <span
                    key={hl}
                    className="px-2.5 py-1 bg-[#0A0B0E] border border-white/10 font-mono text-[11px] text-[#F4F4F0]"
                  >
                    {hl}
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
