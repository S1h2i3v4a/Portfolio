'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { ArrowUpRight, Cpu, Layers, Activity } from 'lucide-react';

const HolographicBustScene = dynamic(
  () => import('@/components/HolographicBustScene').then((mod) => mod.HolographicBustScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[440px] sm:h-[500px] bg-[#07090D] border border-white/10 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full border-2 border-[#C7FF3E] border-t-transparent animate-spin mb-3" />
        <p className="font-mono text-xs text-[#929CAA] uppercase tracking-wider">
          MATERIALIZING HOLOGRAPHIC SCULPTURE...
        </p>
      </div>
    )
  }
);

interface AboutSectionProps {
  reducedMotion?: boolean;
}

export function AboutSection({ reducedMotion = false }: AboutSectionProps) {
  const { profile } = PORTFOLIO_DATA;

  const corePillars = [
    {
      icon: Layers,
      title: 'Full-Stack Architecture',
      detail: 'Next.js App Router, React 19, Node.js, Express & MongoDB'
    },
    {
      icon: Cpu,
      title: 'Algorithmic Problem Solving',
      detail: '300+ DSA problems solved in Java across LeetCode & GFG'
    },
    {
      icon: Activity,
      title: 'Applied AI & Computer Vision',
      detail: 'OpenCV preprocessing & EfficientNet-B0 research (SocProS 2026)'
    }
  ];

  return (
    <section
      id="about"
      className="py-16 sm:py-24 lg:py-28 border-b border-white/[0.065] relative overflow-hidden"
    >
      {/* Background glow accent */}
      <div
        className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(104,231,255,0.25) 0%, transparent 70%)'
        }}
      />

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column matching reference image */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-7">
          <div className="space-y-2">
            <div className="font-mono text-xs text-[#C7FF3E] uppercase tracking-[0.14em] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#C7FF3E] rounded-full animate-pulse" />
              <span>02 / ABOUT ME</span>
            </div>

            <h2
              className="font-black text-[#F4F7FB] tracking-tight leading-[1.05]"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)' }}
            >
              About Me
            </h2>

            <div className="text-xl sm:text-2xl font-bold text-[#C7FF3E] tracking-tight">
              Crafting the Future with Code
            </div>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-[#929CAA] leading-[1.75]">
            <p>
              I&apos;m a passionate <strong className="text-[#F4F7FB] font-semibold">Full-Stack Developer</strong> with
              a strong interest in AI, 3D technologies and building innovative solutions. I love
              turning complex problems into elegant, user-friendly experiences.
            </p>
            <p className="text-sm sm:text-base text-[#697483] leading-relaxed">
              Currently pursuing my B.Tech in Computer Science & Engineering at {profile.institution} (2023–2027).
              My engineering approach prioritizes hands-on construction over speculative theory—whether
              optimizing OpenCV filters for dermatological screening or structuring performant MongoDB aggregations.
            </p>
          </div>

          {/* Three Feature Pillars */}
          <div className="space-y-2.5 pt-1">
            {corePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="flex items-center gap-3 p-3 bg-[#0D1219] border border-white/10 hover:border-white/20 transition-all rounded-lg"
                >
                  <div className="p-2 rounded bg-[#111923] border border-white/10 text-[#C7FF3E]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-xs font-bold text-[#F4F7FB]">
                      {pillar.title}
                    </div>
                    <div className="text-xs text-[#929CAA]">{pillar.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Learn More Button matching reference */}
          <div className="pt-2">
            <a
              href="#journey"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-transparent hover:bg-[#C7FF3E]/10 border border-[#C7FF3E] text-[#C7FF3E] hover:text-white font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-[0_0_16px_rgba(199,255,62,0.15)]"
            >
              <span>Learn More</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right 3D Digital Sculpture Scene */}
        <div className="lg:col-span-6 w-full">
          <HolographicBustScene reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
