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
      <div className="bg-[#111318] border border-[#D4FF00]/60 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="font-mono text-xs text-[#D4FF00]">
              DOCUMENT {'//'} VERIFIED CURRICULUM VITAE
            </div>
            <h2 id="resume-modal-title" className="text-xl font-bold text-[#F4F4F0] mt-1">
              {profile.name} — Technical Resume Summary
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 border border-white/20 text-[#9499A3] hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Asset Configuration Note */}
        <div className="p-3.5 bg-[#0A0B0E] border border-[#D4FF00]/40 font-mono text-xs text-[#9499A3] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>
            <strong className="text-[#D4FF00]">ASSET CONFIG:</strong> Place your official PDF at{' '}
            <code className="text-[#F4F4F0]">{profile.resumePath}</code> or use Print / Save as PDF below.
          </span>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-[#D4FF00] text-[#0A0B0E] font-bold flex items-center gap-1.5 shrink-0 cursor-pointer hover:bg-[#e1ff33] transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>

        {/* Structured One-Page Engineering Resume Sheet */}
        <div className="bg-[#0A0B0E] border border-white/15 p-6 space-y-5 text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-[#F4F4F0]">{profile.name.toUpperCase()}</h3>
              <p className="text-[#9499A3] font-mono text-xs">
                {profile.academicStatus} • {profile.institution}
              </p>
            </div>
            <div className="font-mono text-xs text-[#D4FF00] space-y-0.5 sm:text-right">
              <div>github.com/S1h2i3v4a</div>
              <div>linkedin.com/in/shivam15keshari</div>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs text-[#D4FF00] uppercase mb-2">
              Technical Skills
            </h4>
            <p className="text-[#F4F4F0] leading-relaxed">
              <strong>Languages:</strong> Java, Python, JavaScript (ES6+), TypeScript, SQL •{' '}
              <strong>Web:</strong> React.js, Next.js, Node.js, Express.js, MongoDB, Tailwind CSS •{' '}
              <strong>AI/ML:</strong> EfficientNet, CNNs, OpenCV, TensorFlow/Keras, Scikit-Learn •{' '}
              <strong>Core CS:</strong> Data Structures & Algorithms (300+ in Java), OOP, DBMS, OS, LLD/HLD.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs text-[#D4FF00] uppercase mb-2">
              Selected Engineering Projects
            </h4>
            <div className="space-y-2.5 text-[#9499A3]">
              <div>
                <strong className="text-[#F4F4F0]">
                  1. Skin Disease Detection & Severity Stage Identification (Python, EfficientNet, OpenCV):
                </strong>{' '}
                Engineered morphological hair/artifact removal and lesion ROI segmentation with EfficientNet classification and severity grading; co-authored research manuscript for SocProS.
              </div>
              <div>
                <strong className="text-[#F4F4F0]">
                  2. Full-Stack Financial Expense & Budget Tracker (MongoDB, Express, React, Node.js):
                </strong>{' '}
                Built REST APIs and MongoDB aggregation pipelines for monthly category burn-rate analytics and JWT-authenticated ledgers.
              </div>
              <div>
                <strong className="text-[#F4F4F0]">
                  3. Celebration & Event Planner & Dynamic Mock API / Weather Telemetry Suite:
                </strong>{' '}
                Responsive React/TypeScript web applications for milestone coordination, schema-driven mock payload generation, and live meteorological telemetry.
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs text-[#D4FF00] uppercase mb-2">
              Achievements & Hackathons
            </h4>
            <ul className="list-disc list-inside text-[#9499A3] space-y-1">
              <li>Solved 300+ Data Structures & Algorithms problems in Java (Striver’s A2Z DSA Sheet).</li>
              <li>Co-authored research paper on dermatological severity grading using EfficientNet (2026).</li>
              <li>Active builder in Smart India Hackathon (SIH), Eurogrip Saathi 360 Case Study, and Skillinf Hackathon 2026.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
