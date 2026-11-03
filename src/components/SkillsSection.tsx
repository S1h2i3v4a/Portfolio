'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA, SkillItem } from '@/data/portfolioData';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export function SkillsSection() {
  const { skillCategories, profile } = PORTFOLIO_DATA;
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('all');
  const [selectedSkillSpotlight, setSelectedSkillSpotlight] = useState<SkillItem>(
    skillCategories[0].skills[0] // Default spotlight to Java (300+ DSA)
  );

  const displayedSkills = activeCategoryTab === 'all'
    ? skillCategories.flatMap((c) => c.skills.map((s) => ({ ...s, categoryTitle: c.title, categoryIndex: c.index })))
    : skillCategories
        .filter((c) => c.id === activeCategoryTab)
        .flatMap((c) => c.skills.map((s) => ({ ...s, categoryTitle: c.title, categoryIndex: c.index })));

  return (
    <section id="skills" className="py-16 sm:py-24 border-b border-white/10 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#D4FF00]" />
            <span>02 {'//'} TECHNICAL CAPABILITY CONSTELLATION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#F4F4F0] tracking-tight">
            Verified Stack & Architectural Nodes.
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[#9499A3] max-w-md">
          Every node links directly to verified implementation code in Shivam’s repositories.
          Zero fabricated percentage meters or superficial proficiency scores.
        </p>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Skill category filter">
        <button
          type="button"
          onClick={() => setActiveCategoryTab('all')}
          className={`px-3.5 py-1.5 font-mono text-xs border transition-colors cursor-pointer ${
            activeCategoryTab === 'all'
              ? 'border-[#D4FF00] bg-[#D4FF00] text-[#0A0B0E] font-bold'
              : 'border-white/15 bg-[#111318] text-[#9499A3] hover:text-[#F4F4F0]'
          }`}
        >
          ALL CAPABILITIES ({skillCategories.reduce((acc, c) => acc + c.skills.length, 0)})
        </button>
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategoryTab(cat.id)}
            className={`px-3.5 py-1.5 font-mono text-xs border transition-colors cursor-pointer ${
              activeCategoryTab === cat.id
                ? 'border-[#D4FF00] bg-[#D4FF00] text-[#0A0B0E] font-bold'
                : 'border-white/15 bg-[#111318] text-[#9499A3] hover:text-[#F4F4F0]'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Main Capability Matrix Split: Interactive Nodes (Left) + Live Telemetry Dossier (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Capability Nodes (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {displayedSkills.map((skill) => {
            const isSelected = selectedSkillSpotlight?.name === skill.name;
            return (
              <button
                key={skill.name}
                type="button"
                onClick={() => setSelectedSkillSpotlight(skill)}
                className={`text-left p-4 border transition-all cursor-pointer relative overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4FF00] ${
                  isSelected
                    ? 'border-[#D4FF00] bg-[#151922] shadow-[0_0_20px_rgba(212,255,0,0.15)]'
                    : 'border-white/10 bg-[#0E1015] hover:border-white/30 hover:bg-[#12151D]'
                }`}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <span className="absolute top-0 left-0 bottom-0 w-1 bg-[#D4FF00]" />
                )}

                <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                  <span className="text-[#F4F4F0] font-bold tracking-wide">{skill.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 border ${isSelected ? 'border-[#D4FF00]/60 text-[#D4FF00]' : 'border-white/15 text-[#9499A3]'}`}>
                    {skill.relatedProjects.length} REPO TRACES
                  </span>
                </div>

                <p className="text-xs text-[#9499A3] line-clamp-2 leading-relaxed">
                  {skill.context}
                </p>

                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#D4FF00]">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    INSPECT NODE →
                  </span>
                  {isSelected && <span className="font-semibold text-xs">● ACTIVE</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Live Telemetry Dossier for Selected Node (5 Cols) */}
        <div className="lg:col-span-5 bg-[#111318] border border-[#D4FF00]/60 p-6 space-y-6 sticky top-24">
          <div className="border-b border-white/10 pb-4">
            <div className="flex items-center justify-between font-mono text-xs text-[#D4FF00] mb-1">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                ACTIVE NODE TELEMETRY DOSSIER
              </span>
              <span>VERIFIED // 2026</span>
            </div>
            <h3 className="text-2xl font-bold text-[#F4F4F0] mt-1">
              {selectedSkillSpotlight.name}
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="font-mono text-xs text-[#9499A3] uppercase mb-1">
                Engineering Context & Application:
              </div>
              <p className="text-sm text-[#F4F4F0] leading-relaxed bg-[#0A0B0E] p-3.5 border border-white/10">
                {selectedSkillSpotlight.context}
              </p>
            </div>

            <div>
              <div className="font-mono text-xs text-[#9499A3] uppercase mb-2">
                Traceable Project Repositories:
              </div>
              <div className="space-y-2">
                {selectedSkillSpotlight.relatedProjects.map((projId) => {
                  const projObj = PORTFOLIO_DATA.projects.find((p) => p.id === projId);
                  return (
                    <div
                      key={projId}
                      className="p-3 bg-[#0A0B0E] border border-white/10 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-mono text-xs font-bold text-[#D4FF00]">
                          {projObj ? projObj.title : projId}
                        </div>
                        <div className="text-[11px] text-[#9499A3]">
                          {projObj ? projObj.subtitle : 'Verified Repository Component'}
                        </div>
                      </div>
                      <a
                        href={projObj ? projObj.githubUrl : profile.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F4F4F0] hover:text-[#D4FF00] p-1.5"
                        title="View Repository"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Algorithmic Rigor Badge */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between font-mono text-xs">
              <span className="text-[#9499A3]">VERIFIED REPOSITORY:</span>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4FF00] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>github.com/S1h2i3v4a</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
