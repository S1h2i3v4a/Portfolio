'use client';

import React, { useState, useMemo } from 'react';
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData';
import { GithubIcon } from '@/components/Icons';
import { Workflow, Sliders, ExternalLink, Activity, AlertCircle } from 'lucide-react';

interface ProjectsSectionProps {
  onOpenCaseStudy: (project: Project) => void;
}

export function ProjectsSection({ onOpenCaseStudy }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'AI & Computer Vision', 'Full-Stack Web', 'Developer Tools'];

  // Project 01 State (Skin Disease CV Pipeline)
  const [activeCvLayer, setActiveCvLayer] = useState<'input' | 'blackhat' | 'segmented' | 'inference'>('segmented');

  // Project 02 State (Expense Tracker)
  const [activeBudgetMonth, setActiveBudgetMonth] = useState<'October' | 'November'>('November');

  // Project 03 State (Event Planner Timeline)
  const [activeMilestoneId, setActiveMilestoneId] = useState<number>(1);
  const eventMilestones = [
    { id: 1, title: 'Venue Booking & Staging', vendor: 'Grand Hall Co.', status: 'Completed', cost: '₹22,000', budget: '₹25,000' },
    { id: 2, title: 'Sound & Lighting Crew', vendor: 'Sonic Pro AV', status: 'In-Progress', cost: '₹14,500', budget: '₹15,000' },
    { id: 3, title: 'Catering & Guest Registry', vendor: 'Royal Banquet', status: 'In-Progress', cost: '₹18,500', budget: '₹20,000' },
    { id: 4, title: 'Decor & Theme Assembly', vendor: 'Artisan Events', status: 'Scheduled', cost: '₹10,000', budget: '₹10,000' }
  ];

  // Project 04 State (Weather & Mock Telemetry)
  const [activeCity, setActiveCity] = useState<'Prayagraj' | 'Bengaluru' | 'Mumbai'>('Prayagraj');
  const [simulatedCode, setSimulatedCode] = useState<number>(200);

  const cityWeatherSpecs = {
    Prayagraj: { temp: '31°C', humidity: '44%', wind: '12 km/h NW', cond: 'Clear Sky' },
    Bengaluru: { temp: '25°C', humidity: '62%', wind: '16 km/h W', cond: 'Partly Cloudy' },
    Mumbai: { temp: '30°C', humidity: '74%', wind: '19 km/h SW', cond: 'Humid Haze' }
  };

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PORTFOLIO_DATA.projects;
    return PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 lg:py-28 border-b border-white/[0.065] relative"
    >
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline mb-12">
        <div className="lg:col-span-3">
          <div className="font-mono text-xs text-[#C7FF3E] uppercase tracking-[0.12em] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#C7FF3E]" />
            <span>03 / SELECTED WORK</span>
          </div>
        </div>

        <div className="lg:col-span-9 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2
            className="font-black text-[#F4F7FB] tracking-tight leading-[1.05]"
            style={{ fontSize: 'clamp(2.1rem, 4vw, 3.8rem)' }}
          >
            Real Problems.
            <br />
            Engineered Solutions.
          </h2>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 font-mono text-xs border transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C7FF3E] ${
                  selectedCategory === cat
                    ? 'border-[#C7FF3E] bg-[#C7FF3E] text-[#07090D] font-bold shadow-[0_0_12px_rgba(199,255,62,0.2)]'
                    : 'border-white/10 bg-[#0D1219] text-[#929CAA] hover:text-[#E9EDF4] hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Case Studies Container: Distinct Visual Preview Layouts */}
      <div className="space-y-12">
        {filteredProjects.map((project) => {
          return (
            <article
              key={project.id}
              className="bg-[#0D1219] border border-white/10 hover:border-white/20 transition-all p-6 sm:p-8 lg:p-9 relative group"
            >
              {/* Header Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/[0.065] font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold px-2.5 py-0.5 border border-[#C7FF3E]/40 text-[#C7FF3E] bg-[#C7FF3E]/10">
                    {project.index}
                  </span>
                  <span className="px-2.5 py-0.5 bg-white/[0.04] border border-white/10 text-[#E9EDF4]">
                    {project.category}
                  </span>
                </div>
                <span className="text-[#697483]">{project.timeline}</span>
              </div>

              {/* Title & Core Meta */}
              <div className="mb-6">
                <h3
                  className="font-bold text-[#F4F7FB] tracking-tight"
                  style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.3rem)' }}
                >
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-[#68E7FF] mt-1">{project.subtitle}</p>
              </div>

              {/* 2-Column Split: Tailored Visual Preview (Left) + Architecture Narrative (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Visual Custom Interactive Preview (6 Cols) */}
                <div className="lg:col-span-6 bg-[#07090D] border border-white/10 p-5 sm:p-6 space-y-4">
                  {/* PROJECT 01 PREVIEW: Clinical Research Computer Vision Pipeline */}
                  {project.id === 'skin-disease' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-white/[0.065] pb-2 text-[11px] font-mono text-[#697483]">
                        <span className="text-[#68E7FF] font-semibold flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5" />
                          OPENCV & EFFICIENTNET PIPELINE DIAGRAM
                        </span>
                        <span className="text-[#C7FF3E]">ILLUSTRATIVE PROTOTYPE</span>
                      </div>

                      {/* Interactive Stage Switcher */}
                      <div className="flex items-center gap-1.5 font-mono text-[11px]">
                        <span className="text-[#697483] mr-1">STAGE:</span>
                        {(['input', 'blackhat', 'segmented', 'inference'] as const).map((stage) => (
                          <button
                            key={stage}
                            type="button"
                            onClick={() => setActiveCvLayer(stage)}
                            className={`px-2 py-0.5 border uppercase transition-colors cursor-pointer ${
                              activeCvLayer === stage
                                ? 'border-[#68E7FF] text-[#68E7FF] bg-[#68E7FF]/10 font-bold'
                                : 'border-white/10 text-[#929CAA] hover:text-white'
                            }`}
                          >
                            {stage === 'input'
                              ? '1. Input'
                              : stage === 'blackhat'
                              ? '2. Black-Hat'
                              : stage === 'segmented'
                              ? '3. Otsu ROI'
                              : '4. EfficientNet'}
                          </button>
                        ))}
                      </div>

                      {/* Visual Clinical Canvas Simulation */}
                      <div className="relative h-48 bg-[#090C11] border border-white/10 flex items-center justify-center overflow-hidden">
                        <svg viewBox="0 0 240 140" className="w-60 h-36">
                          <rect x="10" y="10" width="220" height="120" fill="#0D1219" stroke="rgba(255,255,255,0.08)" />

                          {/* Base Lesion Contour */}
                          <ellipse
                            cx="120"
                            cy="70"
                            rx={activeCvLayer === 'segmented' ? '42' : '38'}
                            ry={activeCvLayer === 'segmented' ? '30' : '26'}
                            fill={
                              activeCvLayer === 'segmented'
                                ? 'rgba(104,231,255,0.22)'
                                : activeCvLayer === 'blackhat'
                                ? 'rgba(80,90,110,0.5)'
                                : 'rgba(210,115,85,0.55)'
                            }
                            stroke={
                              activeCvLayer === 'segmented'
                                ? '#68E7FF'
                                : activeCvLayer === 'blackhat'
                                ? 'rgba(255,255,255,0.4)'
                                : 'rgba(255,180,140,0.6)'
                            }
                            strokeWidth="1.5"
                            strokeDasharray={activeCvLayer === 'segmented' ? '3 2' : 'none'}
                          />

                          {/* Artifacts (Simulated Hairs) visible in raw input */}
                          {activeCvLayer === 'input' && (
                            <>
                              <path d="M 50 35 Q 120 85 190 45" stroke="rgba(255,255,255,0.45)" strokeWidth="1" fill="none" />
                              <path d="M 65 110 Q 110 65 175 100" stroke="rgba(255,255,255,0.45)" strokeWidth="1" fill="none" />
                              <text x="25" y="26" fill="#929CAA" fontSize="8" fontFamily="monospace">
                                RAW DERMOSCOPY WITH ARTIFACTS
                              </text>
                            </>
                          )}

                          {activeCvLayer === 'blackhat' && (
                            <>
                              <rect x="15" y="15" width="210" height="110" fill="none" stroke="rgba(104,231,255,0.2)" strokeDasharray="2 2" />
                              <text x="25" y="26" fill="#68E7FF" fontSize="8" fontFamily="monospace">
                                BLACK-HAT MORPHOLOGY + CLAHE NORMALIZED
                              </text>
                            </>
                          )}

                          {activeCvLayer === 'segmented' && (
                            <>
                              <rect x="68" y="34" width="104" height="72" fill="none" stroke="#C7FF3E" strokeWidth="1.2" strokeDasharray="3 3" />
                              <text x="72" y="28" fill="#C7FF3E" fontSize="8" fontFamily="monospace">
                                ROI EXTRACTED [OTSU ADAPTIVE]
                              </text>
                            </>
                          )}

                          {activeCvLayer === 'inference' && (
                            <>
                              <text x="25" y="28" fill="#C7FF3E" fontSize="8" fontFamily="monospace">
                                EFFICIENTNET-B0 CONVOLUTIONAL FEATURE MAP
                              </text>
                              <line x1="40" y1="70" x2="200" y2="70" stroke="#C7FF3E" strokeWidth="0.8" strokeDasharray="4 2" />
                              <circle cx="120" cy="70" r="18" fill="rgba(199,255,62,0.15)" stroke="#C7FF3E" strokeWidth="1" />
                            </>
                          )}
                        </svg>

                        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#07090D] border border-white/10 font-mono text-[10px] text-[#C7FF3E]">
                          SEVERITY: STAGE II [BENCHMARK]
                        </div>
                      </div>

                      {/* Experimental Validation Metric Strip */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px] text-[#929CAA]">
                        <div className="p-2.5 bg-[#111923] border border-white/[0.065]">
                          <div className="text-[10px] text-[#697483]">EVAL DATASET</div>
                          <div className="text-[#F4F7FB] font-bold mt-0.5">PH2 (200 Images, 80/20)</div>
                        </div>
                        <div className="p-2.5 bg-[#111923] border border-white/[0.065]">
                          <div className="text-[10px] text-[#697483]">TEST ACCURACY</div>
                          <div className="text-[#C7FF3E] font-bold mt-0.5">94.2% (Test Set)</div>
                        </div>
                        <div className="p-2.5 bg-[#111923] border border-white/[0.065]">
                          <div className="text-[10px] text-[#697483]">EVAL PRECISION</div>
                          <div className="text-[#68E7FF] font-bold mt-0.5">96.15% (Melanoma)</div>
                        </div>
                      </div>

                      {/* Mandatory Medical Disclaimer Notice */}
                      <div className="p-2.5 bg-[#111923] border-l-2 border-[#68E7FF] text-[11px] text-[#929CAA] flex items-start gap-2">
                        <AlertCircle className="w-3.5 h-3.5 text-[#68E7FF] shrink-0 mt-0.5" />
                        <span>
                          Submitted research prototype for SocProS 2026. This system is for academic evaluation
                          and is not a substitute for certified clinical medical diagnosis.
                        </span>
                      </div>
                    </div>
                  )}

                  {/* PROJECT 02 PREVIEW: Financial Expense & Budget Analytics */}
                  {project.id === 'expense-tracker' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-white/[0.065] pb-2 text-[11px] font-mono text-[#697483]">
                        <span className="text-[#C7FF3E] font-semibold">
                          ANALYTICS LEDGER & BURN RATE
                        </span>
                        <span className="text-[#68E7FF]">[DEMO DATA FOR VERIFICATION]</span>
                      </div>

                      {/* Month Toggle */}
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-[#929CAA]">ACTIVE CYCLE:</span>
                        <div className="flex gap-1.5">
                          {(['October', 'November'] as const).map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setActiveBudgetMonth(m)}
                              className={`px-2.5 py-0.5 border transition-colors cursor-pointer ${
                                activeBudgetMonth === m
                                  ? 'border-[#C7FF3E] text-[#C7FF3E] bg-[#C7FF3E]/10 font-bold'
                                  : 'border-white/10 text-[#929CAA]'
                              }`}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Burn Rate & Budget Bar Gauge */}
                      <div className="p-3.5 bg-[#111923] border border-white/[0.065] space-y-2.5">
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-[#F4F7FB]">
                            {activeBudgetMonth === 'November' ? 'Burn: ₹24,850' : 'Burn: ₹21,400'}
                          </span>
                          <span className="text-[#C7FF3E] font-bold">
                            {activeBudgetMonth === 'November' ? '82.8% of ₹30K Cap' : '71.3% of ₹30K Cap'}
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-[#07090D] overflow-hidden flex">
                          <div className="h-full bg-[#C7FF3E]" style={{ width: '42%' }} title="Development 42%" />
                          <div className="h-full bg-[#68E7FF]" style={{ width: '35%' }} title="Living 35%" />
                          <div className="h-full bg-[#A7F36B]" style={{ width: '23%' }} title="Education 23%" />
                        </div>
                        <div className="flex justify-between font-mono text-[10px] text-[#697483]">
                          <span>DEV: 42%</span>
                          <span>LIVING: 35%</span>
                          <span>EDU: 23%</span>
                        </div>
                      </div>

                      {/* Transaction Summary List */}
                      <div className="space-y-1.5 font-mono text-xs">
                        <div className="flex justify-between p-2 bg-[#111923] border border-white/[0.04]">
                          <span className="text-[#E9EDF4]">Cloud Server & DB Host</span>
                          <span className="text-[#C7FF3E]">₹3,450</span>
                        </div>
                        <div className="flex justify-between p-2 bg-[#111923] border border-white/[0.04]">
                          <span className="text-[#E9EDF4]">Domain & SSL Provisioning</span>
                          <span className="text-[#C7FF3E]">₹1,200</span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-[#090C11] border border-white/[0.065] font-mono text-[11px] text-[#68E7FF]">
                        MongoDB Pipeline: $match (userId) → $group (_id: &quot;$category&quot;) → $sort (total: -1)
                      </div>
                    </div>
                  )}

                  {/* PROJECT 03 PREVIEW: Celebration & Event Timeline Orchestrator */}
                  {project.id === 'event-planner' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-white/[0.065] pb-2 text-[11px] font-mono text-[#697483]">
                        <span className="text-[#C7FF3E] font-semibold">
                          TIMELINE MILESTONES & VENDORS
                        </span>
                        <span className="text-[#68E7FF]">[COORDINATION MATRIX]</span>
                      </div>

                      {/* Milestone List with Selection */}
                      <div className="space-y-2">
                        {eventMilestones.map((m) => {
                          const isSel = activeMilestoneId === m.id;
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => setActiveMilestoneId(m.id)}
                              className={`w-full text-left p-2.5 border transition-all cursor-pointer flex items-center justify-between font-mono text-xs ${
                                isSel
                                  ? 'border-[#C7FF3E] bg-[#17222C] text-[#F4F7FB]'
                                  : 'border-white/10 bg-[#111923] text-[#929CAA] hover:text-[#E9EDF4]'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-2 h-2 ${
                                    m.status === 'Completed'
                                      ? 'bg-[#C7FF3E]'
                                      : m.status === 'In-Progress'
                                      ? 'bg-[#68E7FF] animate-pulse'
                                      : 'bg-[#697483]'
                                  }`}
                                />
                                <span className="font-medium text-[#F4F7FB]">{m.title}</span>
                              </div>
                              <span className="text-[#C7FF3E] font-bold">{m.cost}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Selected Milestone Detail */}
                      {(() => {
                        const sel = eventMilestones.find((m) => m.id === activeMilestoneId) || eventMilestones[0];
                        return (
                          <div className="p-3 bg-[#111923] border border-white/[0.065] font-mono text-xs space-y-1">
                            <div className="flex justify-between text-[#929CAA]">
                              <span>VENDOR: <strong className="text-[#F4F7FB]">{sel.vendor}</strong></span>
                              <span>STATUS: <strong className="text-[#C7FF3E]">{sel.status}</strong></span>
                            </div>
                            <div className="flex justify-between text-[#697483] text-[11px] pt-1 border-t border-white/[0.04]">
                              <span>COMMITTED: {sel.cost}</span>
                              <span>ALLOCATED: {sel.budget}</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* PROJECT 04 PREVIEW: Developer Tools & Weather Telemetry */}
                  {project.id === 'mock-weather' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-white/[0.065] pb-2 text-[11px] font-mono text-[#697483]">
                        <span className="text-[#68E7FF] font-semibold">
                          REST API TELEMETRY & ERROR BOUNDARY
                        </span>
                        <span className="text-[#C7FF3E]">[SIMULATED DATA]</span>
                      </div>

                      {/* City Selector */}
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-[#929CAA]">TELEMETRY STATION:</span>
                        <div className="flex gap-1.5">
                          {(['Prayagraj', 'Bengaluru', 'Mumbai'] as const).map((city) => (
                            <button
                              key={city}
                              type="button"
                              onClick={() => setActiveCity(city)}
                              className={`px-2 py-0.5 border transition-colors cursor-pointer ${
                                activeCity === city
                                  ? 'border-[#68E7FF] text-[#68E7FF] bg-[#68E7FF]/10 font-bold'
                                  : 'border-white/10 text-[#929CAA]'
                              }`}
                            >
                              {city}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Metrics Display */}
                      <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                        <div className="p-3 bg-[#111923] border border-white/[0.065]">
                          <div className="text-[10px] text-[#697483]">STATION TEMP</div>
                          <div className="text-xl font-bold text-[#F4F7FB] mt-0.5">{cityWeatherSpecs[activeCity].temp}</div>
                          <div className="text-[10px] text-[#C7FF3E]">{cityWeatherSpecs[activeCity].cond}</div>
                        </div>
                        <div className="p-3 bg-[#111923] border border-white/[0.065]">
                          <div className="text-[10px] text-[#697483]">HUMIDITY / WIND</div>
                          <div className="text-sm font-bold text-[#F4F7FB] mt-0.5">{cityWeatherSpecs[activeCity].humidity}</div>
                          <div className="text-[10px] text-[#929CAA]">{cityWeatherSpecs[activeCity].wind}</div>
                        </div>
                      </div>

                      {/* HTTP Status Code Simulator Controls */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span className="text-[#697483]">HTTP BOUNDARY INJECTOR:</span>
                          {[200, 429, 500].map((code) => (
                            <button
                              key={code}
                              type="button"
                              onClick={() => setSimulatedCode(code)}
                              className={`px-2 py-0.5 border cursor-pointer font-bold transition-colors ${
                                simulatedCode === code
                                  ? code === 200
                                    ? 'border-[#C7FF3E] text-[#C7FF3E] bg-[#C7FF3E]/10'
                                    : code === 429
                                    ? 'border-[#68E7FF] text-[#68E7FF] bg-[#68E7FF]/10'
                                    : 'border-[#FF6B78] text-[#FF6B78] bg-[#FF6B78]/10'
                                  : 'border-white/10 text-[#697483]'
                              }`}
                            >
                              {code}
                            </button>
                          ))}
                        </div>

                        {/* Structured JSON Response Preview */}
                        <div className="p-2.5 bg-[#090C11] border border-white/[0.065] font-mono text-[11px] text-[#929CAA] overflow-x-auto">
                          {simulatedCode === 200 && (
                            <span className="text-[#C7FF3E]">
                              {`{ "status": 200, "city": "${activeCity}", "temp": "${cityWeatherSpecs[activeCity].temp}", "latencyMs": 18 }`}
                            </span>
                          )}
                          {simulatedCode === 429 && (
                            <span className="text-[#68E7FF]">
                              {`{ "status": 429, "error": "Too Many Requests", "retryAfterSeconds": 30 }`}
                            </span>
                          )}
                          {simulatedCode === 500 && (
                            <span className="text-[#FF6B78]">
                              {`{ "status": 500, "error": "Internal Server Error", "boundary": "NextServerTimeout" }`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Strip: Deep-Dive Inspector + Working Repo & Live Links */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenCaseStudy(project)}
                      className="flex-1 py-2.5 px-3 bg-[#C7FF3E] hover:bg-[#bcf82e] text-[#07090D] font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sliders className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Case Study Specs</span>
                    </button>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3.5 bg-[#111923] border border-white/10 hover:border-[#C7FF3E] text-[#E9EDF4] font-mono text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Repo</span>
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3.5 bg-[#111923] border border-white/10 hover:border-[#68E7FF] text-[#68E7FF] font-mono text-xs flex items-center gap-1.5 transition-colors"
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
                    <div className="p-4 bg-[#07090D] border border-white/10">
                      <div className="font-mono text-[10px] text-[#FF6B78] uppercase mb-1 tracking-wider">
                        01 / Problem Statement
                      </div>
                      <p className="text-xs text-[#929CAA] leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-4 bg-[#07090D] border border-white/10">
                      <div className="font-mono text-[10px] text-[#C7FF3E] uppercase mb-1 tracking-wider">
                        02 / Engineered Solution
                      </div>
                      <p className="text-xs text-[#929CAA] leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Architecture Pipeline Steps */}
                  <div className="bg-[#07090D] border border-white/10 p-4 space-y-2.5">
                    <div className="flex items-center justify-between border-b border-white/[0.065] pb-2 font-mono text-xs">
                      <span className="text-[#F4F7FB] flex items-center gap-1.5">
                        <Workflow className="w-3.5 h-3.5 text-[#C7FF3E]" />
                        <span>VERIFIED ARCHITECTURE PIPELINE</span>
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {project.architectureSteps.map((step) => (
                        <div
                          key={step.step}
                          className="p-2.5 bg-[#111923] border border-white/[0.04] flex items-start gap-2.5 text-xs font-mono"
                        >
                          <span className="text-[#C7FF3E] font-bold">[{step.step}]</span>
                          <div>
                            <span className="text-[#F4F7FB] font-semibold">{step.label}: </span>
                            <span className="text-[#929CAA]">{step.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 bg-[#07090D] border border-white/10 font-mono text-[11px] text-[#929CAA]"
                      >
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
