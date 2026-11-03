'use client';

import React, { useState, useMemo } from 'react';
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData';
import { GithubIcon } from '@/components/Icons';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface ProjectsSectionProps {
  onOpenCaseStudy: (project: Project) => void;
}

export function ProjectsSection({ onOpenCaseStudy }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'AI & Computer Vision', 'Full-Stack Web', 'Developer Tools'];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PORTFOLIO_DATA.projects;
    return PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 lg:py-28 border-b border-white/[0.065] relative overflow-hidden"
    >
      {/* Background glow accent */}
      <div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(104,231,255,0.2) 0%, transparent 70%)'
        }}
      />

      {/* Header matching Reference Image */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="font-mono text-xs text-[#C7FF3E] uppercase tracking-[0.14em] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#C7FF3E] rounded-full animate-pulse" />
            <span>04 / SELECTED WORK</span>
          </div>
          <h2
            className="font-black text-[#F4F7FB] tracking-tight leading-[1.05]"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.0rem)' }}
          >
            My Projects
          </h2>
          <div className="text-xl sm:text-2xl font-bold text-[#C7FF3E] tracking-tight">
            Turning Ideas Into Impact
          </div>
        </div>

        {/* View All Projects and Filter Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex flex-wrap gap-2" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 font-mono text-xs border rounded-full transition-all cursor-pointer backdrop-blur-md ${
                  selectedCategory === cat
                    ? 'border-[#C7FF3E] bg-[#C7FF3E] text-[#07090D] font-bold shadow-[0_0_12px_rgba(199,255,62,0.25)]'
                    : 'border-white/10 bg-[#0D1219] text-[#929CAA] hover:text-[#E9EDF4] hover:border-white/25'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 border border-[#C7FF3E]/40 hover:border-[#C7FF3E] text-[#C7FF3E] font-mono text-xs font-semibold rounded-full transition-all cursor-pointer bg-[#C7FF3E]/5"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Cinematic Floating Project Cards matching Reference Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {filteredProjects.map((project) => {
          return (
            <article
              key={project.id}
              className="bg-[#0D1219]/90 border border-white/10 hover:border-[#C7FF3E]/60 rounded-2xl transition-all duration-300 p-6 sm:p-7 relative group hover:shadow-[0_0_30px_rgba(199,255,62,0.12)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden backdrop-blur-md"
            >
              {/* Subtle top-right ambient gradient */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity"
                style={{
                  background: 'radial-gradient(circle, rgba(199,255,62,0.3) 0%, transparent 70%)'
                }}
              />

              <div>
                {/* Visual Preview Thumbnail Box */}
                <div className="w-full h-48 sm:h-52 rounded-xl bg-[#07090D] border border-white/10 overflow-hidden relative mb-5 flex items-center justify-center">
                  {project.id === 'skin-disease' && (
                    <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-[#1a120e] via-[#07090D] to-[#091b22]">
                      <svg viewBox="0 0 240 140" className="w-full h-full">
                        <ellipse cx="120" cy="70" rx="46" ry="34" fill="rgba(210,115,85,0.45)" stroke="#68E7FF" strokeWidth="1.5" strokeDasharray="3 2" />
                        <circle cx="120" cy="70" r="16" fill="rgba(199,255,62,0.2)" stroke="#C7FF3E" strokeWidth="1.2" />
                        <line x1="20" y1="70" x2="220" y2="70" stroke="rgba(104,231,255,0.25)" strokeWidth="0.8" strokeDasharray="4 4" />
                        <line x1="120" y1="10" x2="120" y2="130" stroke="rgba(104,231,255,0.25)" strokeWidth="0.8" strokeDasharray="4 4" />
                        <rect x="70" y="32" width="100" height="76" fill="none" stroke="#C7FF3E" strokeWidth="1" strokeDasharray="2 2" />
                        <text x="76" y="26" fill="#C7FF3E" fontSize="8" fontFamily="monospace">
                          ROI // PH2 DATASET
                        </text>
                      </svg>
                      <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#07090D]/90 border border-white/10 rounded font-mono text-[10px] text-[#C7FF3E]">
                        PH2: 200 IMAGES (80/20)
                      </div>
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-[#07090D]/90 border border-[#C7FF3E]/40 rounded font-mono text-[10px] text-[#C7FF3E] font-bold">
                        94.2% TEST ACCURACY
                      </div>
                    </div>
                  )}

                  {project.id === 'event-planner' && (
                    <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-[#1b0d28] via-[#07090D] to-[#0d2228]">
                      <svg viewBox="0 0 240 140" className="w-full h-full">
                        <circle cx="60" cy="70" r="18" fill="rgba(199,255,62,0.15)" stroke="#C7FF3E" strokeWidth="1.5" />
                        <circle cx="120" cy="50" r="22" fill="rgba(104,231,255,0.2)" stroke="#68E7FF" strokeWidth="1.5" />
                        <circle cx="180" cy="70" r="18" fill="rgba(255,107,120,0.15)" stroke="#FF6B78" strokeWidth="1.5" />
                        <path d="M 60 70 Q 90 20 120 50 T 180 70" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeDasharray="3 3" />
                        <text x="48" y="74" fill="#C7FF3E" fontSize="9" fontFamily="monospace">
                          01
                        </text>
                        <text x="108" y="54" fill="#68E7FF" fontSize="9" fontFamily="monospace">
                          02
                        </text>
                        <text x="168" y="74" fill="#FF6B78" fontSize="9" fontFamily="monospace">
                          03
                        </text>
                      </svg>
                      <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#07090D]/90 border border-white/10 rounded font-mono text-[10px] text-[#68E7FF]">
                        TIMELINE ORCHESTRATOR
                      </div>
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-[#07090D]/90 border border-white/10 rounded font-mono text-[10px] text-[#F4F7FB]">
                        VENDOR STATE MACHINE
                      </div>
                    </div>
                  )}

                  {project.id === 'mock-weather' && (
                    <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-[#0c1a2e] via-[#07090D] to-[#091b1f]">
                      <svg viewBox="0 0 240 140" className="w-full h-full">
                        {/* Sun */}
                        <circle cx="95" cy="55" r="24" fill="#FFD43B" opacity="0.85" />
                        {/* Cloud */}
                        <path
                          d="M 85 95 L 155 95 A 18 18 0 0 0 155 59 A 24 24 0 0 0 110 52 A 20 20 0 0 0 85 95 Z"
                          fill="rgba(255,255,255,0.85)"
                        />
                        <text x="140" y="45" fill="#68E7FF" fontSize="12" fontFamily="monospace" fontWeight="bold">
                          31°C
                        </text>
                        <text x="135" y="115" fill="#C7FF3E" fontSize="9" fontFamily="monospace">
                          HTTP 200 OK
                        </text>
                      </svg>
                      <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#07090D]/90 border border-white/10 rounded font-mono text-[10px] text-[#FFD43B]">
                        LIVE METEOROLOGY
                      </div>
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-[#07090D]/90 border border-white/10 rounded font-mono text-[10px] text-[#68E7FF]">
                        MOCK REST GENERATOR
                      </div>
                    </div>
                  )}

                  {project.id === 'expense-tracker' && (
                    <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-[#0a1e16] via-[#07090D] to-[#0d1f2b]">
                      <svg viewBox="0 0 240 140" className="w-full h-full">
                        <rect x="35" y="80" width="24" height="40" fill="#68E7FF" opacity="0.7" rx="2" />
                        <rect x="75" y="55" width="24" height="65" fill="#C7FF3E" opacity="0.85" rx="2" />
                        <rect x="115" y="40" width="24" height="80" fill="#68E7FF" opacity="0.7" rx="2" />
                        <rect x="155" y="65" width="24" height="55" fill="#C7FF3E" opacity="0.85" rx="2" />
                        <line x1="25" y1="120" x2="195" y2="120" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                        <text x="120" y="30" fill="#C7FF3E" fontSize="10" fontFamily="monospace" fontWeight="bold">
                          $MATCH → $GROUP
                        </text>
                      </svg>
                      <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#07090D]/90 border border-white/10 rounded font-mono text-[10px] text-[#C7FF3E]">
                        MONGODB AGGREGATIONS
                      </div>
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-[#07090D]/90 border border-white/10 rounded font-mono text-[10px] text-[#68E7FF]">
                        JWT AUTH LEDGER
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Title & Punchy Tagline matching Reference */}
                <div className="space-y-1 mb-3">
                  <div className="font-mono text-xs text-[#C7FF3E] uppercase font-semibold">
                    {project.index} {'//'} {project.category}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#F4F7FB] group-hover:text-[#C7FF3E] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#68E7FF]">
                    {project.id === 'skin-disease'
                      ? 'AI-powered diagnosis with 94.2% Test Accuracy (PH2 Dataset)'
                      : project.id === 'event-planner'
                      ? 'Plan. Celebrate. Remember.'
                      : project.id === 'mock-weather'
                      ? 'Real-time weather insights & Mock API simulator'
                      : 'MERN Stack Telemetry & Cash-Flow Analytics'}
                  </p>
                </div>

                {/* Problem Statement snippet */}
                <p className="text-xs sm:text-sm text-[#929CAA] line-clamp-2 leading-relaxed mb-4">
                  {project.problem}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-[#111923] border border-white/10 rounded font-mono text-[11px] text-[#E9EDF4]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2 py-1 bg-[#111923] border border-white/10 rounded font-mono text-[11px] text-[#697483]">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions: Circular Green Arrow Button + GitHub Repo */}
              <div className="pt-4 border-t border-white/[0.065] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#111923] hover:bg-[#17222C] border border-white/10 hover:border-[#C7FF3E] rounded-full text-[#929CAA] hover:text-[#C7FF3E] transition-colors"
                    title="View GitHub Repository"
                    aria-label={`View ${project.title} GitHub Repository`}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#111923] hover:bg-[#17222C] border border-white/10 hover:border-[#68E7FF] rounded-full text-[#929CAA] hover:text-[#68E7FF] transition-colors"
                      title="Open Live Deployment"
                      aria-label={`Open ${project.title} Live Deployment`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Circular Green Arrow Pill Button matching reference image */}
                <button
                  type="button"
                  onClick={() => onOpenCaseStudy(project)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#C7FF3E] hover:bg-[#bcf82e] text-[#07090D] font-mono text-xs font-bold rounded-full transition-all cursor-pointer shadow-[0_0_14px_rgba(199,255,62,0.25)] group-hover:scale-105 active:scale-95"
                >
                  <span>Explore Case Study</span>
                  <div className="w-5 h-5 rounded-full bg-[#07090D] text-[#C7FF3E] flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
