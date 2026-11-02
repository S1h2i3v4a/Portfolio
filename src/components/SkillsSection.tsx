'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA, SkillItem } from '@/data/portfolioData';
import { Sparkles, Cpu, ArrowUpRight } from 'lucide-react';

export function SkillsSection() {
  const { skillCategories, profile } = PORTFOLIO_DATA;
  const [selectedSkillSpotlight, setSelectedSkillSpotlight] = useState<SkillItem | null>(null);

  return (
    <section id="skills" className="py-16 sm:py-24 border-b border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest mb-2">
            02 {'//'} TECHNICAL CAPABILITY MATRIX
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#F4F4F0] tracking-tight">
            Verified Stack & Project Traceability.
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[#9499A3] max-w-md">
          Select any capability below to inspect how it is applied in verified repositories—zero
          arbitrary percentage bars or fabricated proficiency scores.
        </p>
      </div>

      {/* Interactive Skill Spotlight Banner */}
      {selectedSkillSpotlight && (
        <div className="mb-8 p-4 bg-[#151821] border border-[#D4FF00] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs text-[#D4FF00]">
              <Sparkles className="w-4 h-4" />
              <span>ACTIVE CAPABILITY TRACE {'//'} {selectedSkillSpotlight.name}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#F4F4F0]">
              <strong>Implementation Context:</strong> {selectedSkillSpotlight.context}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedSkillSpotlight(null)}
            className="px-3 py-1 border border-white/20 text-xs font-mono text-[#9499A3] hover:text-white shrink-0 cursor-pointer"
          >
            CLEAR TRACE [X]
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-[#111318] border border-white/10 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-[#9499A3] pb-3 mb-4 border-b border-white/10">
                <span className="text-[#D4FF00]">{cat.index}</span>
                <span>{cat.skills.length} MODULES</span>
              </div>
              <h3 className="text-lg font-bold text-[#F4F4F0] mb-1.5">{cat.title}</h3>
              <p className="text-xs text-[#9499A3] mb-5">{cat.description}</p>

              <div className="space-y-2.5">
                {cat.skills.map((skill) => {
                  const isSelected = selectedSkillSpotlight?.name === skill.name;
                  return (
                    <button
                      key={skill.name}
                      type="button"
                      onClick={() =>
                        setSelectedSkillSpotlight(isSelected ? null : skill)
                      }
                      className={`w-full text-left p-3 border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4FF00] ${
                        isSelected
                          ? 'border-[#D4FF00] bg-[#D4FF00]/10'
                          : 'border-white/10 bg-[#0A0B0E]/60 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-xs font-semibold text-[#F4F4F0]">
                        <span>{skill.name}</span>
                        <span className="text-[10px] text-[#D4FF00]">
                          {skill.relatedProjects.length} PROJ →
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9499A3] mt-1 line-clamp-2">
                        {skill.context}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {/* DSA & Problem Solving Dedicated Verification Card */}
        <div className="bg-[#151821] border border-[#D4FF00]/40 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-[#D4FF00] pb-3 border-b border-white/10">
              <span>CAP {'//'} 06 — ALGORITHMIC CORE</span>
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-[#F4F4F0]">
              Data Structures, Algorithms & System Design
            </h3>
            <p className="text-xs text-[#9499A3] leading-relaxed">
              Disciplined problem-solving practice in Java covering trees, graphs, dynamic
              programming, and design patterns, following Striver’s A2Z DSA sheet.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2 font-mono text-xs">
              <div className="p-2.5 bg-[#0A0B0E] border border-white/10">
                <div className="text-[10px] text-[#9499A3]">TREES & GRAPHS</div>
                <div className="text-[#F4F4F0] mt-0.5">BFS, DFS, Topo, Shortest Path</div>
              </div>
              <div className="p-2.5 bg-[#0A0B0E] border border-white/10">
                <div className="text-[10px] text-[#9499A3]">DYNAMIC PROG.</div>
                <div className="text-[#F4F4F0] mt-0.5">Memoization & Tabulation</div>
              </div>
              <div className="p-2.5 bg-[#0A0B0E] border border-white/10">
                <div className="text-[10px] text-[#9499A3]">SYSTEM DESIGN</div>
                <div className="text-[#F4F4F0] mt-0.5">SOLID, Caching & Scaling</div>
              </div>
              <div className="p-2.5 bg-[#0A0B0E] border border-white/10">
                <div className="text-[10px] text-[#9499A3]">CORE CS</div>
                <div className="text-[#F4F4F0] mt-0.5">OS, DBMS, SQL & OOP</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
            <span className="text-[#9499A3]">VERIFIED PRACTICE</span>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4FF00] hover:underline flex items-center gap-1"
            >
              <span>Inspect Repositories</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
