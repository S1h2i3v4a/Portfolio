'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { CheckCircle2 } from 'lucide-react';

const HolographicTrophyScene = dynamic(
  () => import('@/components/HolographicTrophyScene').then((mod) => mod.HolographicTrophyScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[440px] sm:h-[500px] bg-[#07090D] border border-white/10 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-full border-2 border-[#C7FF3E] border-t-transparent animate-spin mb-3" />
        <p className="font-mono text-xs text-[#929CAA] tracking-wider uppercase">
          PROJECTING 3D TROPHY MONUMENT...
        </p>
      </div>
    )
  }
);

interface JourneySectionProps {
  reducedMotion?: boolean;
}

export function JourneySection({ reducedMotion = false }: JourneySectionProps) {
  const { journey } = PORTFOLIO_DATA;

  return (
    <section
      id="journey"
      className="py-16 sm:py-24 lg:py-28 border-b border-white/[0.065] relative overflow-hidden"
    >
      {/* Background glow accent */}
      <div
        className="absolute top-1/2 right-1/3 w-96 h-96 rounded-full pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(199,255,62,0.2) 0%, transparent 70%)'
        }}
      />

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column matching reference image */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-2">
            <div className="font-mono text-xs text-[#C7FF3E] uppercase tracking-[0.14em] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#C7FF3E] rounded-full animate-pulse" />
              <span>05 / TRAJECTORY</span>
            </div>
            <h2
              className="font-black text-[#F4F7FB] tracking-tight leading-[1.05]"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.0rem)' }}
            >
              My Journey
            </h2>
            <div className="text-xl sm:text-2xl font-bold text-[#C7FF3E] tracking-tight">
              A Path of Growth & Learning
            </div>
          </div>

          {/* Vertical Neon Conduit Timeline matching reference */}
          <div className="relative border-l-2 border-white/10 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
            {journey.map((item) => (
              <div key={item.id} className="relative group">
                {/* Glowing Green Milestone Node matching reference */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#07090D] border-2 border-[#C7FF3E] group-hover:bg-[#C7FF3E] group-hover:shadow-[0_0_12px_#C7FF3E] transition-all" />

                <div className="bg-[#0D1219]/90 border border-white/10 group-hover:border-[#C7FF3E]/40 rounded-xl p-5 sm:p-6 transition-all backdrop-blur-md">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono text-xs">
                    <span className="text-[#C7FF3E] font-bold tracking-wider">
                      {item.period}
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#111923] border border-white/10 rounded text-[#929CAA]">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#F4F7FB] mb-1">
                    {item.title}
                  </h3>
                  <div className="font-mono text-xs text-[#68E7FF] mb-3">
                    {item.organization}
                  </div>

                  <p className="text-xs sm:text-sm text-[#929CAA] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((hl) => (
                      <span
                        key={hl}
                        className="px-2.5 py-1 bg-[#07090D] border border-white/10 rounded font-mono text-[11px] text-[#E9EDF4] flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#C7FF3E]" />
                        <span>{hl}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 3D Holographic Trophy Scene matching reference */}
        <div className="lg:col-span-5 w-full">
          <HolographicTrophyScene reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
