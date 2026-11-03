'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { X, Printer } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;
  const { profile } = PORTFOLIO_DATA;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div className="bg-[#0D1219] border border-[#C7FF3E]/50 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.065] pb-4">
          <div>
            <div className="font-mono text-xs text-[#C7FF3E]">
              DOCUMENT // VERIFIED CURRICULUM VITAE
            </div>
            <h2 id="resume-modal-title" className="text-xl font-bold text-[#F4F7FB] mt-1">
              {profile.name} — Technical Resume Summary
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 border border-white/20 text-[#929CAA] hover:text-[#F4F7FB] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Note */}
        <div className="p-3.5 bg-[#07090D] border border-[#C7FF3E]/30 font-mono text-xs text-[#929CAA] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>
            <strong className="text-[#C7FF3E]">OFFICIAL RECORD:</strong> PDF document for Shivam Keshari (B.Tech CSE 2023–2027).
          </span>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-1.5 bg-[#C7FF3E] hover:bg-[#bcf82e] text-[#07090D] font-bold flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
          >
            <Printer className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Print / Save as PDF</span>
          </button>
        </div>

        {/* Structured One-Page Engineering Resume Sheet */}
        <div className="bg-[#07090D] border border-white/10 p-6 space-y-5 text-xs sm:text-sm">
          <div className="border-b border-white/[0.065] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-[#F4F7FB]">{profile.name.toUpperCase()}</h3>
              <p className="text-[#929CAA] font-mono text-xs">
                {profile.academicStatus} • {profile.institution}
              </p>
            </div>
            <div className="font-mono text-xs text-[#C7FF3E] space-y-0.5 sm:text-right">
              <div>github.com/S1h2i3v4a</div>
              <div>linkedin.com/in/shivam15keshari</div>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs text-[#C7FF3E] uppercase mb-2">
              Technical Skills
            </h4>
            <p className="text-[#E9EDF4] leading-relaxed">
              <strong>Languages:</strong> Java, Python, JavaScript (ES6+), TypeScript, SQL •{' '}
              <strong>Web:</strong> React.js, Next.js, Node.js, Express.js, MongoDB, Tailwind CSS •{' '}
              <strong>AI/ML:</strong> EfficientNet, CNNs, OpenCV, TensorFlow/Keras, Scikit-Learn •{' '}
              <strong>CS Core:</strong> Data Structures & Algorithms, OOP, System Design, Git
            </p>
          </div>

          <div className="border-t border-white/[0.065] pt-4">
            <h4 className="font-mono text-xs text-[#C7FF3E] uppercase mb-2">
              Research & Academic Projects
            </h4>
            <div className="space-y-3 text-[#929CAA]">
              <div>
                <strong className="text-[#F4F7FB]">Skin Disease Detection & Severity Classification:</strong> Built an OpenCV morphological preprocessing pipeline (black-hat artifact removal & CLAHE) and fine-tuned EfficientNet-B0 for multi-class skin lesion evaluation. Research submitted to SocProS 2026.
              </div>
              <div>
                <strong className="text-[#F4F7FB]">Full-Stack Financial Expense Platform:</strong> Architected a MERN web application with JWT auth and multi-stage MongoDB aggregation pipelines for real-time burn-rate analytics.
              </div>
              <div>
                <strong className="text-[#F4F7FB]">Celebration & Event Planner:</strong> Built a timeline milestone orchestrator in React and Node.js for tracking vendor contracts and budget variance.
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.065] pt-4">
            <h4 className="font-mono text-xs text-[#C7FF3E] uppercase mb-2">
              Competitive Achievements & Hackathons
            </h4>
            <ul className="list-disc list-inside space-y-1 text-[#929CAA]">
              <li>Solved 300+ Java DSA problems following Striver&apos;s A2Z roadmap across LeetCode & GFG.</li>
              <li>Smart India Hackathon (SIH Internal) & Eurogrip Hackathon Participant.</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end">
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
