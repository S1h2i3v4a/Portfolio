'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Terminal, Layers, Cpu, Activity } from 'lucide-react';

export function AboutSection() {
  const { profile, philosophyQuote, aboutPillars } = PORTFOLIO_DATA;

  const pillarIcons: Record<string, React.ReactNode> = {
    Layers: <Layers className="w-5 h-5 text-[#D4FF00]" />,
    Cpu: <Cpu className="w-5 h-5 text-[#D4FF00]" />,
    Activity: <Activity className="w-5 h-5 text-[#D4FF00]" />
  };

  return (
    <section id="about" className="py-16 sm:py-24 border-b border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest mb-2">
            01 {'//'} IDENTITY & ENGINEERING PHILOSOPHY
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#F4F4F0] tracking-tight">
            Built Through Implementation, Not Passive Theory.
          </h2>
        </div>
        <div className="font-mono text-xs text-[#9499A3]">
          LOC {'//'} PRAYAGRAJ, IN — B.TECH CSE (2023–2027)
        </div>
      </div>

      {/* Narrative + Philosophy Quote */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        <div className="lg:col-span-7 bg-[#111318] border border-white/10 p-6 sm:p-8 space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#D4FF00]">
            DEVELOPER NARRATIVE
          </h3>
          <p className="text-sm sm:text-base text-[#F4F4F0] leading-relaxed">
            I am <strong className="text-[#D4FF00] font-semibold">{profile.name}</strong>, a
            final-year Computer Science & Engineering student at {profile.institution}. My engineering
            trajectory centers on combining strong algorithmic foundations in Java with practical
            full-stack web applications and applied machine learning systems.
          </p>
          <p className="text-sm sm:text-base text-[#9499A3] leading-relaxed">
            Whether designing a multi-stage OpenCV + EfficientNet pipeline for dermatological
            severity grading, structuring MongoDB aggregation pipelines for real-time financial
            tracking, or solving 300+ Data Structures and Algorithms problems, I focus on building
            software that solves concrete problems clearly and reliably.
          </p>
        </div>

        <div className="lg:col-span-5 bg-[#151821] border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-[#9499A3]">
              <span>PRINCIPLE {'//'} EXECUTION</span>
              <Terminal className="w-4 h-4 text-[#D4FF00]" />
            </div>
            <blockquote className="text-base sm:text-lg font-medium text-[#F4F4F0] leading-relaxed border-l-2 border-[#D4FF00] pl-4">
              “{philosophyQuote}”
            </blockquote>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 grid grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <span className="text-[#9499A3] block">PRIMARY DSA LANGUAGE</span>
              <span className="text-[#F4F4F0] font-semibold">Java (JDK 17+)</span>
            </div>
            <div>
              <span className="text-[#9499A3] block">WEB & AI STACK</span>
              <span className="text-[#D4FF00] font-semibold">MERN / Next.js / Python</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Core Engineering Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {aboutPillars.map((pillar) => (
          <div
            key={pillar.id}
            className="bg-[#111318] border border-white/10 hover:border-[#D4FF00]/50 p-6 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs px-2 py-0.5 bg-white/5 text-[#D4FF00] border border-white/10">
                  PILLAR {'//'} {pillar.id}
                </span>
                <span className="font-mono text-[11px] text-[#9499A3]">{pillar.subtitle}</span>
              </div>
              <div className="flex items-center gap-3">
                {pillarIcons[pillar.icon]}
                <h3 className="text-lg font-bold text-[#F4F4F0]">{pillar.title}</h3>
              </div>
              <p className="text-sm text-[#9499A3] leading-relaxed">{pillar.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
              <span className="text-[#9499A3]">VERIFIED SCOPE</span>
              <span className="text-[#D4FF00]">{pillar.metrics}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
