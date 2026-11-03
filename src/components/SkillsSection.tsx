'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA, SkillItem } from '@/data/portfolioData';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export function SkillsSection() {
  const { skillCategories, profile } = PORTFOLIO_DATA;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(
    skillCategories[0].skills[0] // Default to Java
  );

  // Flatten skills with category info
  const allSkills = skillCategories.flatMap((c) =>
    c.skills.map((s) => ({ ...s, catId: c.id, catTitle: c.title }))
  );

  const filteredSkills = activeCategory === 'all'
    ? allSkills
    : allSkills.filter((s) => s.catId === activeCategory);

  // Constellation node coordinates for dynamic interactive visualization
  const constellationNodes = [
    { name: 'Java', x: 20, y: 35, color: '#D4FF00', size: 18, category: 'DSA & Algorithms' },
    { name: 'Python', x: 42, y: 22, color: '#00F0FF', size: 16, category: 'Deep Learning' },
    { name: 'React.js', x: 68, y: 30, color: '#00F0FF', size: 18, category: 'Frontend' },
    { name: 'Next.js', x: 85, y: 45, color: '#D4FF00', size: 17, category: 'Full-Stack' },
    { name: 'Node.js', x: 60, y: 62, color: '#D4FF00', size: 16, category: 'Backend' },
    { name: 'MongoDB', x: 80, y: 75, color: '#00F0FF', size: 16, category: 'Databases' },
    { name: 'EfficientNet', x: 32, y: 58, color: '#00F0FF', size: 17, category: 'Computer Vision' },
    { name: 'OpenCV', x: 15, y: 72, color: '#D4FF00', size: 15, category: 'Image Processing' },
    { name: 'TypeScript', x: 48, y: 44, color: '#D4FF00', size: 16, category: 'Type Safety' },
    { name: 'System Design', x: 38, y: 82, color: '#F4F4F0', size: 16, category: 'Core CS' }
  ];

  return (
    <section id="skills" className="py-16 sm:py-22 border-b border-white/10 relative">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#D4FF00]" />
            <span>02 {'//'} INTERACTIVE CAPABILITY CONSTELLATION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#F4F4F0] tracking-tight">
            Measured Stack & Architectural Nodes.
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[#9499A3] max-w-sm">
          Select any node in the constellation or capability pill to inspect its production application. Zero fake progress bars.
        </p>
      </div>

      {/* Visual Constellation Map (Interactive SVG Graph) */}
      <div className="mb-8 p-6 bg-[#07080B] border border-white/10 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs font-mono text-[#9499A3]">
          <span className="text-[#D4FF00] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            LIVE ARCHITECTURAL TOPOLOGY
          </span>
          <span className="hidden sm:inline">CLICK ANY NODE TO INSPECT CONTEXT</span>
        </div>

        {/* Constellation Canvas View */}
        <div className="relative w-full h-[240px] sm:h-[280px]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Background Grid Lines */}
            <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="0.3" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.3" />
            <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="0.3" />

            {/* Glowing Connection Lines Between Technologies */}
            <line x1="20" y1="35" x2="48" y2="44" stroke="rgba(212,255,0,0.25)" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="42" y1="22" x2="32" y2="58" stroke="rgba(0,240,255,0.3)" strokeWidth="0.6" />
            <line x1="32" y1="58" x2="15" y2="72" stroke="rgba(0,240,255,0.3)" strokeWidth="0.6" />
            <line x1="68" y1="30" x2="85" y2="45" stroke="rgba(212,255,0,0.35)" strokeWidth="0.6" />
            <line x1="85" y1="45" x2="60" y2="62" stroke="rgba(212,255,0,0.35)" strokeWidth="0.6" />
            <line x1="60" y1="62" x2="80" y2="75" stroke="rgba(0,240,255,0.35)" strokeWidth="0.6" />
            <line x1="48" y1="44" x2="68" y2="30" stroke="rgba(244,244,240,0.25)" strokeWidth="0.5" />
            <line x1="20" y1="35" x2="38" y2="82" stroke="rgba(212,255,0,0.25)" strokeWidth="0.5" strokeDasharray="1 1" />
          </svg>

          {/* Render Nodes as Interactive HTML Elements Positioned by Percent */}
          {constellationNodes.map((node) => {
            const isSelected = selectedSkill?.name.toLowerCase().includes(node.name.toLowerCase().slice(0, 4));
            return (
              <button
                key={node.name}
                type="button"
                onClick={() => {
                  const matched = allSkills.find((s) => s.name.toLowerCase().includes(node.name.toLowerCase().slice(0, 4)));
                  if (matched) setSelectedSkill(matched);
                }}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-none transition-all cursor-pointer group flex items-center gap-1.5 focus:outline-none ${
                  isSelected
                    ? 'scale-125 z-20'
                    : 'hover:scale-110 z-10'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-none block border shadow-lg transition-transform"
                  style={{
                    backgroundColor: isSelected ? node.color : '#0A0B0E',
                    borderColor: node.color,
                    boxShadow: isSelected ? `0 0 14px ${node.color}` : 'none'
                  }}
                />
                <span
                  className={`font-mono text-[11px] font-bold px-1.5 py-0.5 border backdrop-blur-md whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#151922] text-[#F4F4F0] border-[#D4FF00]'
                      : 'bg-[#0A0B0E]/80 text-[#9499A3] border-white/10 group-hover:text-white group-hover:border-white/30'
                  }`}
                >
                  {node.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap gap-2 mb-6" role="tablist">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`px-3.5 py-1.5 font-mono text-xs border transition-colors cursor-pointer ${
            activeCategory === 'all'
              ? 'border-[#D4FF00] bg-[#D4FF00] text-[#0A0B0E] font-bold'
              : 'border-white/15 bg-[#111318] text-[#9499A3] hover:text-[#F4F4F0]'
          }`}
        >
          ALL CAPABILITIES
        </button>
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 font-mono text-xs border transition-colors cursor-pointer ${
              activeCategory === cat.id
                ? 'border-[#D4FF00] bg-[#D4FF00] text-[#0A0B0E] font-bold'
                : 'border-white/15 bg-[#111318] text-[#9499A3] hover:text-[#F4F4F0]'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Split View: Sleek Nodes List (Left) + Selected Node Telemetry Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Pill-Style Interactive Nodes (7 Cols) */}
        <div className="lg:col-span-7 flex flex-wrap gap-2.5">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkill?.name === skill.name;
            return (
              <button
                key={skill.name}
                type="button"
                onClick={() => setSelectedSkill(skill)}
                className={`p-3 border font-mono text-xs transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-[#D4FF00] bg-[#151922] text-[#F4F4F0] shadow-[0_0_15px_rgba(212,255,0,0.15)]'
                    : 'border-white/10 bg-[#0E1015] text-[#9499A3] hover:border-white/30 hover:text-white'
                }`}
              >
                <span className="font-bold">{skill.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 border ${isSelected ? 'border-[#D4FF00] text-[#D4FF00]' : 'border-white/10 text-[#9499A3]'}`}>
                  {skill.relatedProjects.length} PROJ
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Selected Node Verified Telemetry Card (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0E1015] border border-[#D4FF00]/60 p-5 sm:p-6 space-y-4">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] text-[#D4FF00]">ACTIVE CAPABILITY TRACE</div>
              <h3 className="text-xl font-bold text-[#F4F4F0] mt-0.5">{selectedSkill.name}</h3>
            </div>
            <span className="px-2 py-0.5 bg-[#D4FF00]/10 border border-[#D4FF00]/40 font-mono text-[10px] text-[#D4FF00]">
              VERIFIED
            </span>
          </div>

          <div className="p-3 bg-[#07080B] border border-white/10 text-xs sm:text-sm text-[#F4F4F0] leading-relaxed">
            {selectedSkill.context}
          </div>

          <div className="space-y-2">
            <div className="font-mono text-[11px] text-[#9499A3]">LINKED IMPLEMENTATIONS:</div>
            {selectedSkill.relatedProjects.map((pId) => {
              const pObj = PORTFOLIO_DATA.projects.find((p) => p.id === pId);
              return (
                <div key={pId} className="flex items-center justify-between p-2.5 bg-[#111318] border border-white/5 text-xs font-mono">
                  <span className="text-[#D4FF00] font-semibold">{pObj?.title || pId}</span>
                  <a
                    href={pObj?.githubUrl || profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9499A3] hover:text-white"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
