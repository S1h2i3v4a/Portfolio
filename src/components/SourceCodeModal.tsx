'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { X, Check, Copy } from 'lucide-react';

interface SourceCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SourceCodeModal({ isOpen, onClose }: SourceCodeModalProps) {
  const [activeSourceTab, setActiveSourceTab] = useState<'portfolioData' | 'packageJson' | 'readmeMd'>('portfolioData');
  const [copiedSource, setCopiedSource] = useState(false);

  if (!isOpen) return null;

  const sourceFiles = {
    portfolioData: `// src/data/portfolioData.ts
// Single source of truth for Shivam Keshari's Portfolio (Skillinf Hackathon 2026)

export const PORTFOLIO_DATA = ${JSON.stringify(PORTFOLIO_DATA, null, 2)} as const;
`,
    packageJson: `{
  "name": "shivam-keshari-portfolio-2026",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.5.28",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "three": "^0.182.0",
    "lucide-react": "^1.16.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/three": "^0.182.0",
    "eslint": "^9",
    "eslint-config-next": "15.5.28",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}`,
    readmeMd: `# Shivam Keshari — Developer Portfolio 2026
Built for the **Portfolio Design Hackathon 2026 by Skillinf**.

## Tech Stack & Architecture
- **Framework**: Next.js 15.5.28 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Custom Argon Palette (Obsidian #07090D & Electric Lime #C7FF3E)
- **Interactive 3D**: Three.js WebGL Cinematic Computational Core with spatial parallax, pulse shockwave, and 2D vector blueprint fallback
- **Icons**: Lucide React
- **Hosting**: Vercel ready

## Quick Start
\`\`\`bash
cd portfolio
npm install
npm run dev
\`\`\`
Visit http://localhost:3000
`
  };

  const handleCopySourceFile = () => {
    navigator.clipboard.writeText(sourceFiles[activeSourceTab]);
    setCopiedSource(true);
    setTimeout(() => setCopiedSource(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="source-modal-title"
    >
      <div className="bg-[#0D1219] border border-[#C7FF3E]/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5">
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.065] pb-4">
          <div>
            <div className="font-mono text-xs text-[#C7FF3E]">
              DEVELOPER HANDOFF {'//'} NEXT.JS APP ROUTER WORKSPACE
            </div>
            <h2 id="source-modal-title" className="text-xl font-bold text-[#F4F7FB] mt-1">
              Editable Project Configuration & Deployment Files
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

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {[
              { id: 'portfolioData' as const, label: 'src/data/portfolioData.ts' },
              { id: 'packageJson' as const, label: 'package.json' },
              { id: 'readmeMd' as const, label: 'README.md' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSourceTab(tab.id)}
                className={`px-3 py-1.5 border cursor-pointer ${
                  activeSourceTab === tab.id
                    ? 'border-[#C7FF3E] bg-[#C7FF3E]/10 text-[#C7FF3E]'
                    : 'border-white/15 text-[#929CAA] hover:text-[#F4F7FB]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleCopySourceFile}
            className="px-3.5 py-1.5 bg-[#C7FF3E] hover:bg-[#bcf82e] text-[#07090D] font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {copiedSource ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSource ? 'COPIED TO CLIPBOARD' : 'COPY FILE'}</span>
          </button>
        </div>

        <pre className="p-4 bg-[#07090D] border border-white/10 font-mono text-xs text-[#E9EDF4] overflow-x-auto max-h-[50vh]">
          {sourceFiles[activeSourceTab]}
        </pre>
      </div>
    </div>
  );
}
