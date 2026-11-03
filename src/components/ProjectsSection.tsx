'use client';

import React, { useState, useMemo } from 'react';
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData';
import { GithubIcon } from '@/components/Icons';
import { Workflow, Sliders, ExternalLink, Activity, Layers, Calendar, CloudSun } from 'lucide-react';

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

  const getProjectVisualTheme = (index: string) => {
    switch (index) {
      case 'CASE // 01':
        return {
          accentColor: '#00F0FF',
          badgeBg: 'rgba(0, 240, 255, 0.1)',
          badgeBorder: 'rgba(0, 240, 255, 0.4)',
          icon: <Activity className="w-4 h-4 text-[#00F0FF]" />
        };
      case 'CASE // 02':
        return {
          accentColor: '#D4FF00',
          badgeBg: 'rgba(212, 255, 0, 0.1)',
          badgeBorder: 'rgba(212, 255, 0, 0.4)',
          icon: <Layers className="w-4 h-4 text-[#D4FF00]" />
        };
      case 'CASE // 03':
        return {
          accentColor: '#9D4EDD',
          badgeBg: 'rgba(157, 78, 221, 0.1)',
          badgeBorder: 'rgba(157, 78, 221, 0.4)',
          icon: <Calendar className="w-4 h-4 text-[#9D4EDD]" />
        };
      default:
        return {
          accentColor: '#FFB703',
          badgeBg: 'rgba(255, 183, 3, 0.1)',
          badgeBorder: 'rgba(255, 183, 3, 0.4)',
          icon: <CloudSun className="w-4 h-4 text-[#FFB703]" />
        };
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-24 border-b border-white/10 relative">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
        <div>
          <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#D4FF00]" />
            <span>03 {'//'} VERIFIED ENGINEERING CASE STUDIES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#F4F4F0] tracking-tight">
            Real Problem Statements. Measured Architectures.
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
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
      <div className="space-y-10">
        {filteredProjects.map((project) => {
          const theme = getProjectVisualTheme(project.index);
          return (
            <article
              key={project.id}
              className="bg-[#0E1015] border border-white/10 hover:border-white/25 transition-all p-6 sm:p-8 lg:p-10 relative group"
            >
              {/* Top Case Study Metadata Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/10 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span
                    className="font-bold px-2.5 py-0.5 border"
                    style={{
                      color: theme.accentColor,
                      borderColor: theme.badgeBorder,
                      backgroundColor: theme.badgeBg
                    }}
                  >
                    {project.index}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-white/5 border border-white/10 text-[#F4F4F0]">
                    {theme.icon}
                    <span>{project.category}</span>
                  </span>
                </div>
                <span className="text-[#9499A3]">{project.timeline}</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Narrative, Problem, Solution (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#F4F4F0] tracking-tight">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs mt-1" style={{ color: theme.accentColor }}>
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Problem vs Solution Split */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#07080B] border border-white/10">
                      <div className="font-mono text-[10px] text-[#9499A3] uppercase mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#FF6B6B]" />
                        <span>01 // Real-World Problem</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#F4F4F0] leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-4 bg-[#07080B] border border-white/10">
                      <div className="font-mono text-[10px] uppercase mb-1.5 flex items-center gap-1.5" style={{ color: theme.accentColor }}>
                        <span className="w-1.5 h-1.5" style={{ backgroundColor: theme.accentColor }} />
                        <span>02 // Engineered Solution</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#F4F4F0] leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Key Features Checklist */}
                  <div className="space-y-2">
                    <div className="font-mono text-xs text-[#9499A3] uppercase">
                      Architectural Milestones & Implemented Features:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F4F4F0]">
                      {project.keyFeatures.slice(0, 4).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 bg-[#0A0B0E]/60 p-2 border border-white/5">
                          <span className="font-mono mt-0.5" style={{ color: theme.accentColor }}>→</span>
                          <span className="text-[#D1D5DB]">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Verified Tech Badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-[#0A0B0E] border border-white/15 font-mono text-[11px] text-[#F4F4F0]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Architecture Pipeline Blueprint (5 cols) */}
                <div className="lg:col-span-5 bg-[#07080B] border border-white/10 p-5 space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                    <span className="text-[#F4F4F0] flex items-center gap-2">
                      <Workflow className="w-3.5 h-3.5" style={{ color: theme.accentColor }} />
                      <span>SYSTEM PIPELINE ARCHITECTURE</span>
                    </span>
                    <span className="text-[#9499A3]">VERIFIED</span>
                  </div>

                  <div className="space-y-2.5">
                    {project.architectureSteps.map((step) => (
                      <div
                        key={step.step}
                        className="p-3 bg-[#111318] border border-white/10 flex items-start gap-3 hover:border-white/30 transition-colors"
                      >
                        <span
                          className="font-mono text-xs font-bold mt-0.5 shrink-0"
                          style={{ color: theme.accentColor }}
                        >
                          [{step.step}]
                        </span>
                        <div>
                          <div className="font-mono text-xs font-semibold text-[#F4F4F0]">
                            {step.label}
                          </div>
                          <div className="text-[11px] text-[#9499A3] mt-0.5">{step.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions Strip */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => onOpenCaseStudy(project)}
                      className="flex-1 py-3 px-4 bg-[#D4FF00] text-[#0A0B0E] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#e2ff4d] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Sliders className="w-4 h-4" />
                      <span>Inspect Interactive Demo</span>
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-3.5 bg-[#111318] border border-white/20 hover:border-[#D4FF00] text-[#F4F4F0] font-mono text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-3.5 bg-[#111318] border border-white/20 hover:border-[#D4FF00] text-[#D4FF00] font-mono text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live</span>
                      </a>
                    )}
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
