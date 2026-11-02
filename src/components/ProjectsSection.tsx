'use client';

import React, { useState, useMemo } from 'react';
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData';
import { GithubIcon } from '@/components/Icons';
import { Workflow, Sliders, ExternalLink } from 'lucide-react';

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
    <section id="projects" className="py-16 sm:py-24 border-b border-white/10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
        <div>
          <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest mb-2">
            03 {'//'} SELECTED ENGINEERING CASE STUDIES
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#F4F4F0] tracking-tight">
            Real Problem Statements. Verified Architectures.
          </h2>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 font-mono text-xs border transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'border-[#D4FF00] bg-[#D4FF00] text-[#0A0B0E] font-bold'
                  : 'border-white/15 bg-[#111318] text-[#9499A3] hover:text-[#F4F4F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="space-y-8">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="bg-[#111318] border border-white/10 hover:border-[#D4FF00]/60 transition-all p-6 sm:p-8"
          >
            {/* Top Case Study Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-white/10 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="text-[#D4FF00] font-bold">{project.index}</span>
                <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 text-[#F4F4F0]">
                  {project.category}
                </span>
              </div>
              <span className="text-[#9499A3]">{project.timeline}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Narrative & Problem/Solution (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#F4F4F0]">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-[#D4FF00] mt-1">{project.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 bg-[#0A0B0E] border border-white/10">
                    <div className="font-mono text-[11px] text-[#9499A3] uppercase mb-1.5">
                      01 {'//'} Problem Statement
                    </div>
                    <p className="text-xs sm:text-sm text-[#F4F4F0] leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                  <div className="p-4 bg-[#0A0B0E] border border-white/10">
                    <div className="font-mono text-[11px] text-[#D4FF00] uppercase mb-1.5">
                      02 {'//'} Engineered Solution
                    </div>
                    <p className="text-xs sm:text-sm text-[#F4F4F0] leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Key Features List */}
                <div className="space-y-2">
                  <div className="font-mono text-xs text-[#9499A3] uppercase">
                    Key Implemented Capabilities:
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F4F4F0]">
                    {project.keyFeatures.slice(0, 4).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#D4FF00] font-mono mt-0.5">→</span>
                        <span className="text-[#9499A3]">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Verified Stack Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
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

              {/* Right System Architecture Blueprint & Actions (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-[#0A0B0E] border border-white/10 p-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5 font-mono text-xs">
                    <span className="text-[#F4F4F0] flex items-center gap-1.5">
                      <Workflow className="w-3.5 h-3.5 text-[#D4FF00]" />
                      SYSTEM PIPELINE ARCHITECTURE
                    </span>
                    <span className="text-[#9499A3]">VERIFIED</span>
                  </div>

                  <div className="space-y-2">
                    {project.architectureSteps.map((step) => (
                      <div
                        key={step.step}
                        className="p-2.5 bg-[#111318] border border-white/10 flex items-start gap-3"
                      >
                        <span className="font-mono text-[11px] text-[#D4FF00] font-bold mt-0.5">
                          [{step.step}]
                        </span>
                        <div>
                          <div className="font-mono text-xs font-semibold text-[#F4F4F0]">
                            {step.label}
                          </div>
                          <div className="text-[11px] text-[#9499A3]">{step.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-5 mt-5 border-t border-white/10 flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => onOpenCaseStudy(project)}
                    className="flex-1 py-2.5 px-4 bg-[#D4FF00] text-[#0A0B0E] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#e1ff33] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Inspect Interactive Case Study</span>
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3.5 bg-[#111318] border border-white/20 hover:border-[#D4FF00] text-[#F4F4F0] font-mono text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3.5 bg-[#111318] border border-white/20 hover:border-[#D4FF00] text-[#D4FF00] font-mono text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
