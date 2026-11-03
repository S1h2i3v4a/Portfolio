'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Terminal, Layers, Cpu, Activity, ShieldCheck } from 'lucide-react';

export function AboutSection() {
  const { profile, philosophyQuote, aboutPillars } = PORTFOLIO_DATA;

  const pillarIcons: Record<string, React.ReactNode> = {
    Layers: <Layers className="w-5 h-5 text-[#D4FF00]" />,
    Cpu: <Cpu className="w-5 h-5 text-[#D4FF00]" />,
    Activity: <Activity className="w-5 h-5 text-[#00F0FF]" />
  };

  return (
    <section id="about" className="py-16 sm:py-22 border-b border-white/10 relative">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#D4FF00]" />
            <span>01 {'//'} IDENTITY & ENGINEERING ETHOS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#F4F4F0] tracking-tight">
            Built Through Implementation, Not Passive Theory.
          </h2>
        </div>
        <div className="font-mono text-xs text-[#9499A3]">
          LOC {'//'} PRAYAGRAJ, INDIA — B.TECH CSE (CLASS OF 2027)
        </div>
      </div>

      {/* High-Impact Stat Callout Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-[#0E1015] border border-white/10 flex items-start gap-3">
          <div className="p-2.5 bg-[#151922] border border-white/10 text-[#D4FF00]">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-[#F4F4F0]">300+ Problems</div>
            <div className="text-xs text-[#9499A3] mt-0.5">Striver A2Z Java DSA Roadmap & LLD</div>
          </div>
        </div>

        <div className="p-4 bg-[#0E1015] border border-white/10 flex items-start gap-3">
          <div className="p-2.5 bg-[#151922] border border-white/10 text-[#00F0FF]">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-[#F4F4F0]">SocProS 2026 Paper</div>
            <div className="text-xs text-[#9499A3] mt-0.5">EfficientNet Skin Severity Research Submission</div>
          </div>
        </div>

        <div className="p-4 bg-[#0E1015] border border-white/10 flex items-start gap-3">
          <div className="p-2.5 bg-[#151922] border border-white/10 text-[#D4FF00]">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-[#F4F4F0]">MERN + Next.js</div>
            <div className="text-xs text-[#9499A3] mt-0.5">Aggregation Pipelines & Resilient REST APIs</div>
          </div>
        </div>
      </div>

      {/* Narrative + Philosophy Quote Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        <div className="lg:col-span-7 bg-[#111318] border border-white/10 p-6 sm:p-8 space-y-4 relative overflow-hidden">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#D4FF00] flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>ENGINEERING DOSSIER</span>
          </h3>

          <p className="text-sm sm:text-base text-[#F4F4F0] leading-relaxed">
            I am <strong className="text-[#D4FF00] font-semibold">{profile.name}</strong>, a
            Computer Science & Engineering undergraduate at {profile.institution}. My journey centers
            on combining algorithmic rigor with practical full-stack web architectures and applied deep learning pipelines.
          </p>

          <p className="text-sm sm:text-base text-[#9499A3] leading-relaxed">
            I prioritize shipping working systems: automating OpenCV morphological artifact filtering for dermatological lesion classification, designing performant MongoDB aggregations for real-time finance ledgers, and practicing disciplined data structures in Java.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 bg-[#0A0B0E] border border-white/15 text-[#D4FF00]">
              ✓ Striver A2Z Java DSA
            </span>
            <span className="px-2.5 py-1 bg-[#0A0B0E] border border-white/15 text-[#00F0FF]">
              ✓ EfficientNet + OpenCV
            </span>
            <span className="px-2.5 py-1 bg-[#0A0B0E] border border-white/15 text-[#F4F4F0]">
              ✓ SIH & Eurogrip Hackathons
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#151922] border border-[#D4FF00]/40 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-[#9499A3]">
              <span className="text-[#D4FF00] font-bold">OPERATIONAL PRINCIPLE</span>
              <ShieldCheck className="w-4 h-4 text-[#D4FF00]" />
            </div>

            <blockquote className="text-base sm:text-lg font-medium text-[#F4F4F0] leading-relaxed border-l-2 border-[#D4FF00] pl-4">
              &ldquo;{philosophyQuote}&rdquo;
            </blockquote>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 grid grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <span className="text-[#9499A3] block">PROBLEM SOLVING</span>
              <span className="text-[#F4F4F0] font-semibold">Java 17+ / DSA / LLD</span>
            </div>
            <div>
              <span className="text-[#9499A3] block">STACK</span>
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
            className="bg-[#111318] border border-white/10 hover:border-[#D4FF00]/60 p-6 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs px-2.5 py-0.5 bg-white/5 text-[#D4FF00] border border-white/10 font-bold">
                  PILLAR {'//'} {pillar.id}
                </span>
                <span className="font-mono text-[11px] text-[#9499A3]">{pillar.subtitle}</span>
              </div>

              <div className="flex items-center gap-3">
                {pillarIcons[pillar.icon]}
                <h3 className="text-lg font-bold text-[#F4F4F0] group-hover:text-[#D4FF00] transition-colors">
                  {pillar.title}
                </h3>
              </div>

              <p className="text-sm text-[#9499A3] leading-relaxed">{pillar.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
              <span className="text-[#9499A3]">SCOPE</span>
              <span className="text-[#D4FF00] font-semibold">{pillar.metrics}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
