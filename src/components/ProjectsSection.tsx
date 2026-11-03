'use client';

import React, { useState, useMemo } from 'react';
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData';
import { GithubIcon } from '@/components/Icons';
import { Workflow, Sliders, ExternalLink, Activity } from 'lucide-react';

interface ProjectsSectionProps {
  onOpenCaseStudy: (project: Project) => void;
}

export function ProjectsSection({ onOpenCaseStudy }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'AI & Computer Vision', 'Full-Stack Web', 'Developer Tools'];

  // Project 01 Interactive Preview State (Skin Disease)
  const [activeCvLayer, setActiveCvLayer] = useState<'raw' | 'blackhat' | 'segmented'>('segmented');

  // Project 02 Interactive Preview State (Expense Tracker)
  const [activeBudgetMonth, setActiveBudgetMonth] = useState<'October' | 'November'>('November');

  // Project 03 Interactive Preview State (Event Planner)
  const eventMilestones = [
    { id: 1, title: 'Venue Booking & Staging', status: 'Done', cost: '₹22,000' },
    { id: 2, title: 'Sound & Lighting Crew', status: 'In-Progress', cost: '₹14,500' },
    { id: 3, title: 'Catering & Guest Registry', status: 'In-Progress', cost: '₹18,500' }
  ];

  // Project 04 Interactive Preview State (Weather & Mock API)
  const [activeCity, setActiveCity] = useState<'Prayagraj' | 'Bengaluru' | 'Mumbai'>('Prayagraj');
  const [simulatedCode, setSimulatedCode] = useState<number>(200);

  const cityWeatherSpecs = {
    Prayagraj: { temp: '31°C', humidity: '44%', wind: '12 km/h NW', cond: 'Clear' },
    Bengaluru: { temp: '25°C', humidity: '62%', wind: '16 km/h W', cond: 'Partly Cloudy' },
    Mumbai: { temp: '30°C', humidity: '74%', wind: '19 km/h SW', cond: 'Humid' }
  };

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PORTFOLIO_DATA.projects;
    return PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="projects" className="py-16 sm:py-24 border-b border-white/10 relative">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
        <div>
          <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#D4FF00]" />
            <span>03 {'//'} VERIFIED ENGINEERING CASE STUDIES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#F4F4F0] tracking-tight">
            Real Problem Statements. Visual System Architectures.
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 font-mono text-xs border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'border-[#D4FF00] bg-[#D4FF00] text-[#0A0B0E] font-bold shadow-[0_0_15px_rgba(212,255,0,0.2)]'
                  : 'border-white/15 bg-[#111318] text-[#9499A3] hover:text-[#F4F4F0] hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies Container */}
      <div className="space-y-12">
        {filteredProjects.map((project) => {
          return (
            <article
              key={project.id}
              className="bg-[#0E1015] border border-white/10 hover:border-white/25 transition-all p-6 sm:p-8 lg:p-10 relative group"
            >
              {/* Header Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/10 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold px-2.5 py-0.5 border border-[#D4FF00]/40 text-[#D4FF00] bg-[#D4FF00]/10">
                    {project.index}
                  </span>
                  <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 text-[#F4F4F0]">
                    {project.category}
                  </span>
                </div>
                <span className="text-[#9499A3]">{project.timeline}</span>
              </div>

              {/* Title & Core Meta */}
              <div className="mb-6">
                <h3 className="text-2xl sm:text-3xl font-black text-[#F4F4F0] tracking-tight">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-[#00F0FF] mt-1">{project.subtitle}</p>
              </div>

              {/* 2-Column Split: High-Impact Visual Mockup (Left) + Problem/Solution Architecture (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Visual Interactive Product Mockup (6 Cols) */}
                <div className="lg:col-span-6 bg-[#07080B] border border-white/10 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5 font-mono text-xs text-[#9499A3]">
                    <span className="text-[#D4FF00] font-semibold flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      LIVE SYSTEM PREVIEW MOCKUP
                    </span>
                    <span>INTERACTIVE</span>
                  </div>

                  {/* PROJECT 1 VISUAL MOCKUP: Skin Disease CV Inspector */}
                  {project.id === 'skin-disease' && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="text-[#9499A3]">LAYER:</span>
                        {(['raw', 'blackhat', 'segmented'] as const).map((layer) => (
                          <button
                            key={layer}
                            type="button"
                            onClick={() => setActiveCvLayer(layer)}
                            className={`px-2 py-0.5 border uppercase ${
                              activeCvLayer === layer
                                ? 'border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/15 font-bold'
                                : 'border-white/15 text-[#9499A3]'
                            }`}
                          >
                            {layer}
                          </button>
                        ))}
                      </div>

                      {/* Diagnostic Frame */}
                      <div className="relative h-44 bg-[#0A0D14] border border-white/15 flex items-center justify-center overflow-hidden">
                        <svg viewBox="0 0 200 130" className="w-48 h-32">
                          <rect x="10" y="10" width="180" height="110" fill="#0D111A" stroke="rgba(255,255,255,0.1)" />
                          {/* Lesion Area */}
                          <ellipse
                            cx="100"
                            cy="65"
                            rx={activeCvLayer === 'segmented' ? '36' : '32'}
                            ry={activeCvLayer === 'segmented' ? '26' : '24'}
                            fill={activeCvLayer === 'segmented' ? 'rgba(0,240,255,0.25)' : 'rgba(212,120,80,0.5)'}
                            stroke={activeCvLayer === 'segmented' ? '#00F0FF' : 'rgba(255,255,255,0.3)'}
                            strokeWidth="1.5"
                            strokeDasharray={activeCvLayer === 'segmented' ? '3 2' : 'none'}
                          />
                          {activeCvLayer === 'raw' && (
                            <>
                              <path d="M 40 30 Q 100 80 160 40" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
                              <path d="M 50 100 Q 90 60 150 90" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
                            </>
                          )}
                          {activeCvLayer === 'segmented' && (
                            <>
                              <rect x="58" y="32" width="84" height="66" fill="none" stroke="#D4FF00" strokeWidth="1.2" strokeDasharray="2 2" />
                              <text x="62" y="27" fill="#D4FF00" fontSize="8" fontFamily="monospace">ROI [0.94 CONF]</text>
                            </>
                          )}
                        </svg>

                        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#07080B]/90 border border-white/10 font-mono text-[10px] text-[#D4FF00]">
                          STAGE II (MODERATE)
                        </div>
                      </div>

                      {/* Confidence Meter */}
                      <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-[#9499A3]">
                        <div className="p-2 bg-[#111318] border border-white/5">
                          <div>TEXTURE:</div>
                          <div className="text-[#F4F4F0] font-bold">0.82 ASYM</div>
                        </div>
                        <div className="p-2 bg-[#111318] border border-white/5">
                          <div>BORDER:</div>
                          <div className="text-[#F4F4F0] font-bold">0.88 REG</div>
                        </div>
                        <div className="p-2 bg-[#111318] border border-white/5">
                          <div>ACCURACY:</div>
                          <div className="text-[#D4FF00] font-bold">94.2% F1</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PROJECT 2 VISUAL MOCKUP: Expense Tracker Fintech Console */}
                  {project.id === 'expense-tracker' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-[#9499A3]">ACTIVE LEDGER:</span>
                        <div className="flex gap-2">
                          {(['October', 'November'] as const).map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setActiveBudgetMonth(m)}
                              className={`px-2 py-0.5 border ${
                                activeBudgetMonth === m
                                  ? 'border-[#D4FF00] text-[#D4FF00] bg-[#D4FF00]/10'
                                  : 'border-white/10 text-[#9499A3]'
                              }`}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Burn Rate Bar Gauge */}
                      <div className="p-3 bg-[#111318] border border-white/10 space-y-2">
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-[#F4F4F0]">Monthly Burn Rate: ₹24,850</span>
                          <span className="text-[#D4FF00] font-bold">82.8% of ₹30K</span>
                        </div>
                        <div className="w-full h-2 bg-[#07080B] overflow-hidden flex">
                          <div className="h-full bg-[#D4FF00]" style={{ width: '42%' }} title="Engineering 42%" />
                          <div className="h-full bg-[#00F0FF]" style={{ width: '35%' }} title="Living 35%" />
                          <div className="h-full bg-[#9D4EDD]" style={{ width: '23%' }} title="Education 23%" />
                        </div>
                        <div className="flex justify-between font-mono text-[10px] text-[#9499A3]">
                          <span>ENG (42%)</span>
                          <span>LIVING (35%)</span>
                          <span>EDU (23%)</span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-[#07080B] border border-white/5 font-mono text-[11px] text-[#00F0FF]">
                        MongoDB Aggregation: $match → $group by Category → $sort by Amount DESC
                      </div>
                    </div>
                  )}

                  {/* PROJECT 3 VISUAL MOCKUP: Event Planner Milestone Matrix */}
                  {project.id === 'event-planner' && (
                    <div className="space-y-2.5">
                      <div className="font-mono text-[11px] text-[#9499A3]">
                        EVENT TIMELINE MILESTONE ORCHESTRATOR:
                      </div>
                      <div className="space-y-2">
                        {eventMilestones.map((m) => (
                          <div
                            key={m.id}
                            className="flex items-center justify-between p-2.5 bg-[#111318] border border-white/10 text-xs font-mono"
                          >
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 ${m.status === 'Done' ? 'bg-[#D4FF00]' : 'bg-[#00F0FF] animate-pulse'}`} />
                              <span className="text-[#F4F4F0]">{m.title}</span>
                            </div>
                            <span className="text-[#D4FF00] font-bold">{m.cost}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-2 bg-[#07080B] border border-white/5 font-mono text-[11px] text-[#9499A3] flex justify-between">
                        <span>PLANNED: ₹55,000</span>
                        <span className="text-[#D4FF00]">COMMITTED: ₹55,000 (DELTA: ₹0)</span>
                      </div>
                    </div>
                  )}

                  {/* PROJECT 4 VISUAL MOCKUP: Weather Telemetry Playground */}
                  {project.id === 'mock-weather' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-[#9499A3]">STATION:</span>
                        <div className="flex gap-1.5">
                          {(['Prayagraj', 'Bengaluru', 'Mumbai'] as const).map((city) => (
                            <button
                              key={city}
                              type="button"
                              onClick={() => setActiveCity(city)}
                              className={`px-2 py-0.5 border ${
                                activeCity === city
                                  ? 'border-[#D4FF00] text-[#D4FF00] bg-[#D4FF00]/10'
                                  : 'border-white/10 text-[#9499A3]'
                              }`}
                            >
                              {city}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                        <div className="p-3 bg-[#111318] border border-white/10">
                          <div className="text-[10px] text-[#9499A3]">TEMPERATURE</div>
                          <div className="text-xl font-bold text-[#F4F4F0] mt-0.5">{cityWeatherSpecs[activeCity].temp}</div>
                          <div className="text-[10px] text-[#D4FF00]">{cityWeatherSpecs[activeCity].cond}</div>
                        </div>
                        <div className="p-3 bg-[#111318] border border-white/10">
                          <div className="text-[10px] text-[#9499A3]">HUMIDITY / WIND</div>
                          <div className="text-sm font-bold text-[#F4F4F0] mt-0.5">{cityWeatherSpecs[activeCity].humidity}</div>
                          <div className="text-[10px] text-[#9499A3]">{cityWeatherSpecs[activeCity].wind}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="text-[#9499A3]">SIMULATE HTTP:</span>
                        {[200, 429, 500].map((code) => (
                          <button
                            key={code}
                            type="button"
                            onClick={() => setSimulatedCode(code)}
                            className={`px-2 py-0.5 border ${
                              simulatedCode === code
                                ? 'border-[#D4FF00] text-[#D4FF00] bg-[#D4FF00]/10'
                                : 'border-white/15 text-[#9499A3]'
                            }`}
                          >
                            {code}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Direct Case Study Action Strip */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenCaseStudy(project)}
                      className="flex-1 py-2.5 px-3 bg-[#D4FF00] text-[#0A0B0E] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#e2ff4d] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Deep-Dive Inspector</span>
                    </button>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 bg-[#111318] border border-white/20 hover:border-[#D4FF00] text-[#F4F4F0] font-mono text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Repo</span>
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 bg-[#111318] border border-white/20 hover:border-[#D4FF00] text-[#D4FF00] font-mono text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Problem, Solution & Architecture Pipeline (6 Cols) */}
                <div className="lg:col-span-6 space-y-4">
                  {/* Problem vs Solution Side-by-Side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-[#07080B] border border-white/10">
                      <div className="font-mono text-[10px] text-[#FF6B6B] uppercase mb-1">
                        01 // Problem Statement
                      </div>
                      <p className="text-xs text-[#D1D5DB] leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-3.5 bg-[#07080B] border border-white/10">
                      <div className="font-mono text-[10px] text-[#D4FF00] uppercase mb-1">
                        02 // Engineered Solution
                      </div>
                      <p className="text-xs text-[#D1D5DB] leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Verified Architecture Pipeline Steps */}
                  <div className="bg-[#07080B] border border-white/10 p-4 space-y-2.5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 font-mono text-xs">
                      <span className="text-[#F4F4F0] flex items-center gap-1.5">
                        <Workflow className="w-3.5 h-3.5 text-[#D4FF00]" />
                        <span>VERIFIED PIPELINE ARCHITECTURE</span>
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {project.architectureSteps.map((step) => (
                        <div
                          key={step.step}
                          className="p-2 bg-[#111318] border border-white/5 flex items-start gap-2.5 text-xs font-mono"
                        >
                          <span className="text-[#D4FF00] font-bold">[{step.step}]</span>
                          <div>
                            <span className="text-[#F4F4F0] font-semibold">{step.label}: </span>
                            <span className="text-[#9499A3]">{step.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-[#07080B] border border-white/15 font-mono text-[11px] text-[#9499A3]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
