'use client';

import React from 'react';
import { Project } from '@/data/portfolioData';
import { InteractiveDemos } from '@/components/InteractiveDemos';
import { GithubIcon } from '@/components/Icons';
import { X, CheckCircle2, ExternalLink } from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
    >
      <div className="bg-[#0D1219] border border-[#C7FF3E]/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.065] pb-4">
          <div>
            <div className="font-mono text-xs text-[#C7FF3E]">
              {project.index} {'//'} {project.category}
            </div>
            <h2
              id="case-study-modal-title"
              className="text-xl sm:text-2xl font-bold text-[#F4F7FB] mt-1"
            >
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 border border-white/20 text-[#929CAA] hover:text-[#F4F7FB] hover:border-[#C7FF3E] cursor-pointer"
            aria-label="Close Case Study Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Live Pipeline / Sandbox Component */}
        <InteractiveDemos project={project} />

        {/* Detailed Engineering Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#07090D] border border-white/10 space-y-2">
            <div className="font-mono text-xs text-[#C7FF3E] uppercase">
              Key Architectural Decision
            </div>
            <p className="text-xs sm:text-sm text-[#E9EDF4] leading-relaxed">
              {project.technicalDecisions}
            </p>
          </div>
          <div className="p-4 bg-[#07090D] border border-white/10 space-y-2">
            <div className="font-mono text-xs text-[#929CAA] uppercase">
              Intended Users & Operational Context
            </div>
            <p className="text-xs sm:text-sm text-[#E9EDF4] leading-relaxed">
              {project.intendedUsers}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="font-mono text-xs text-[#929CAA] uppercase">
            Complete Implemented Feature Checklist:
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-[#E9EDF4]">
            {project.keyFeatures.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C7FF3E] shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-white/[0.065] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#C7FF3E] hover:bg-[#bcf82e] text-[#07090D] font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View GitHub Repo</span>
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-white/20 text-[#F4F7FB] font-mono text-xs flex items-center gap-1.5 hover:border-[#68E7FF] transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-[#68E7FF]" />
                <span>Open Live Deployment</span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-white/15 font-mono text-xs text-[#929CAA] hover:text-[#F4F7FB] cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
