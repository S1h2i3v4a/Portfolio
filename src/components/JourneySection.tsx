'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { CheckCircle2 } from 'lucide-react';

export function JourneySection() {
  const { journey } = PORTFOLIO_DATA;

  return (
    <section
      id="journey"
      className="py-16 sm:py-24 lg:py-28 border-b border-white/[0.065] relative"
    >
      {/* Header: Section index on left, Heading on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline mb-14">
        <div className="lg:col-span-3">
          <div className="font-mono text-xs text-[#C7FF3E] uppercase tracking-[0.12em] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#C7FF3E]" />
            <span>04 / JOURNEY</span>
          </div>
        </div>

        <div className="lg:col-span-9 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2
            className="font-black text-[#F4F7FB] tracking-tight leading-[1.05]"
            style={{ fontSize: 'clamp(2.1rem, 4vw, 3.8rem)' }}
          >
            A Timeline of
            <br />
            Building and Learning.
          </h2>
          <div className="font-mono text-xs text-[#697483]">
            CHRONOLOGY / 2023 — 2027
          </div>
        </div>
      </div>

      {/* Vertical Conduit Timeline: Fine Line + Lime Milestone Markers */}
      <div className="relative border-l border-white/10 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-10">
        {journey.map((item) => (
          <div key={item.id} className="relative group">
            {/* Carefully Positioned Lime Milestone Marker */}
            <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3 h-3 bg-[#07090D] border-2 border-[#C7FF3E] group-hover:bg-[#C7FF3E] group-hover:shadow-[0_0_10px_#C7FF3E] transition-all" />

            <div className="bg-[#0D1219] border border-white/10 group-hover:border-white/20 p-6 sm:p-7 transition-all relative">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5 font-mono text-xs">
                <span className="text-[#C7FF3E] font-bold tracking-wide">
                  {item.tag}
                </span>
                <span className="px-2.5 py-0.5 bg-[#07090D] border border-white/10 text-[#929CAA]">
                  {item.period}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#F4F7FB] mb-1">
                {item.title}
              </h3>
              <div className="font-mono text-xs text-[#68E7FF] mb-3">
                {item.organization}
              </div>

              <p className="text-sm sm:text-base text-[#929CAA] leading-[1.7] mb-4">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {item.highlights.map((hl) => (
                  <span
                    key={hl}
                    className="px-2.5 py-1 bg-[#07090D] border border-white/[0.065] font-mono text-xs text-[#E9EDF4] flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C7FF3E]" />
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
