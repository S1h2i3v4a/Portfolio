'use client';

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ConstellationNode {
  id: string;
  name: string;
  x: number;
  y: number;
  isMajor: boolean;
  category: 'languages' | 'frontend' | 'backend' | 'aiml' | 'cs-tools';
  context: string;
  explanation: string;
  repo: string;
  projectTitle: string;
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const nodes: ConstellationNode[] = [
    // Major Nodes
    {
      id: 'java',
      name: 'Java',
      x: 18,
      y: 30,
      isMajor: true,
      category: 'languages',
      context: 'Primary language for 300+ solved algorithmic problems on LeetCode & GFG.',
      explanation: 'Utilized for OOP implementations, graphs, trees, and strict memory/runtime problem constraints.',
      repo: 'https://github.com/S1h2i3v4a',
      projectTitle: 'Striver A2Z Java DSA Solutions'
    },
    {
      id: 'python',
      name: 'Python',
      x: 38,
      y: 20,
      isMajor: true,
      category: 'aiml',
      context: 'Core environment for OpenCV image processing and neural network modeling.',
      explanation: 'Powering automated artifact cleaning scripts, CLAHE contrast adjustments, and PyTorch/TensorFlow training loops.',
      repo: 'https://github.com/S1h2i3v4a/skin-disease-detection',
      projectTitle: 'Skin Lesion Severity Pipeline'
    },
    {
      id: 'react',
      name: 'React',
      x: 62,
      y: 28,
      isMajor: true,
      category: 'frontend',
      context: 'Component-driven user interfaces with modular state and custom hooks.',
      explanation: 'Built interactive dashboard components for finance management and dynamic event orchestration matrices.',
      repo: 'https://github.com/S1h2i3v4a/Expense-Tracker',
      projectTitle: 'Financial Expense Platform'
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      x: 82,
      y: 38,
      isMajor: true,
      category: 'frontend',
      context: 'App Router architecture with server components and edge rendering.',
      explanation: 'Engineered this high-performance cinematic portfolio and dynamic API telemetry pipelines.',
      repo: 'https://github.com/S1h2i3v4a/Portfolio',
      projectTitle: 'Cinematic Developer Portfolio'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      x: 58,
      y: 62,
      isMajor: true,
      category: 'backend',
      context: 'Asynchronous event-driven RESTful backends and API routing.',
      explanation: 'Developed Express controllers, JWT security middleware, and structured error boundary handlers.',
      repo: 'https://github.com/S1h2i3v4a/Event-planner',
      projectTitle: 'Event Coordinator Service'
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      x: 78,
      y: 72,
      isMajor: true,
      category: 'backend',
      context: 'Document store with multi-stage aggregation pipelines and indexing.',
      explanation: 'Designed monthly burn-rate queries, category grouping pipelines ($group, $match), and user ledgers.',
      repo: 'https://github.com/S1h2i3v4a/Expense-Tracker',
      projectTitle: 'Financial Ledger Backend'
    },
    {
      id: 'opencv',
      name: 'OpenCV',
      x: 16,
      y: 72,
      isMajor: true,
      category: 'aiml',
      context: 'Biomedical image preprocessing and morphological artifact removal.',
      explanation: 'Implemented black-hat hair artifact filtering, dual-threshold Otsu segmentation, and CLAHE normalization.',
      repo: 'https://github.com/S1h2i3v4a/skin-disease-detection',
      projectTitle: 'SocProS 2026 Research Paper'
    },

    // Secondary Nodes
    {
      id: 'typescript',
      name: 'TypeScript',
      x: 48,
      y: 42,
      isMajor: false,
      category: 'languages',
      context: 'Type-safe contracts across complex UI states and API data models.',
      explanation: 'Guarantees zero undefined-property runtime errors across interactive 3D and dashboard states.',
      repo: 'https://github.com/S1h2i3v4a/Portfolio',
      projectTitle: 'Strict Portfolio Architecture'
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      x: 32,
      y: 45,
      isMajor: false,
      category: 'languages',
      context: 'ES6+ async/await workflows, DOM lifecycle, and functional programming.',
      explanation: 'Core foundation for browser animations, WebGL canvas hooks, and asynchronous client state.',
      repo: 'https://github.com/S1h2i3v4a/Event-planner',
      projectTitle: 'Event Planner Core UI'
    },
    {
      id: 'efficientnet',
      name: 'EfficientNet',
      x: 30,
      y: 68,
      isMajor: false,
      category: 'aiml',
      context: 'Compound scaling convolutional neural network for lesion classification.',
      explanation: 'Fine-tuned pre-trained B0 weights for multi-class skin severity grading with cross-entropy loss.',
      repo: 'https://github.com/S1h2i3v4a/skin-disease-detection',
      projectTitle: 'Computer Vision Research Pipeline'
    },
    {
      id: 'tensorflow',
      name: 'TensorFlow',
      x: 42,
      y: 80,
      isMajor: false,
      category: 'aiml',
      context: 'Model definition, data augmentation generators, and training checkpoints.',
      explanation: 'Employed for automated learning-rate scheduling and test-set validation curves.',
      repo: 'https://github.com/S1h2i3v4a/skin-disease-detection',
      projectTitle: 'Deep Learning Evaluation'
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      x: 74,
      y: 18,
      isMajor: false,
      category: 'frontend',
      context: 'Utility-first token systems and responsive grid choreography.',
      explanation: 'Styled the entire high-contrast dark aesthetic with surgical lime/cyan accents.',
      repo: 'https://github.com/S1h2i3v4a/Portfolio',
      projectTitle: 'Production UI Design System'
    },
    {
      id: 'threejs',
      name: 'Three.js',
      x: 88,
      y: 56,
      isMajor: false,
      category: 'frontend',
      context: 'WebGL scene composition, custom shaders, and camera parallax.',
      explanation: 'Engineered the 3D quantum artifact with dynamic orbital rings and user interaction physics.',
      repo: 'https://github.com/S1h2i3v4a/Portfolio',
      projectTitle: 'Cinematic WebGL Canvas'
    },
    {
      id: 'sql',
      name: 'SQL',
      x: 66,
      y: 82,
      isMajor: false,
      category: 'backend',
      context: 'Relational data modeling, ACID transactions, and structured joins.',
      explanation: 'Designed normalized schemas and entity-relationship models during academic computer science coursework.',
      repo: 'https://github.com/S1h2i3v4a',
      projectTitle: 'Academic Database Management'
    },
    {
      id: 'git',
      name: 'Git',
      x: 10,
      y: 52,
      isMajor: false,
      category: 'cs-tools',
      context: 'Distributed version control, atomic commits, and GitHub collaboration.',
      explanation: 'Maintaining cleanly documented repositories, branching workflows, and Vercel CD integration.',
      repo: 'https://github.com/S1h2i3v4a/Portfolio',
      projectTitle: 'Repository Version Control'
    },
    {
      id: 'system-design',
      name: 'System Design',
      x: 46,
      y: 60,
      isMajor: false,
      category: 'cs-tools',
      context: 'Foundational architectural principles: modularity, latency, and fault tolerance.',
      explanation: 'Applying SOLID principles, clean API boundaries, and caching considerations in web builds.',
      repo: 'https://github.com/S1h2i3v4a',
      projectTitle: 'Core Engineering Systems'
    }
  ];

  const [selectedNode, setSelectedNode] = useState<ConstellationNode>(nodes[0]); // Default: Java

  const categoryOptions = [
    { id: 'all', label: 'ALL CAPABILITIES' },
    { id: 'languages', label: 'LANGUAGES & RUNTIMES' },
    { id: 'frontend', label: 'FRONTEND & WEB' },
    { id: 'backend', label: 'BACKEND & DATABASES' },
    { id: 'aiml', label: 'APPLIED AI & VISION' },
    { id: 'cs-tools', label: 'CORE CS & DEVTOOLS' }
  ];

  const filteredNodes =
    activeCategory === 'all'
      ? nodes
      : nodes.filter((n) => n.category === activeCategory);

  const activeNode = selectedNode || nodes[0];

  return (
    <section
      id="skills"
      className="py-16 sm:py-24 lg:py-28 border-b border-white/[0.065] relative"
    >
      {/* Editorial Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline mb-12">
        <div className="lg:col-span-3">
          <div className="font-mono text-xs text-[#C7FF3E] uppercase tracking-[0.12em] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#C7FF3E]" />
            <span>02 / TECHNICAL CAPABILITIES</span>
          </div>
        </div>

        <div className="lg:col-span-9 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2
            className="font-black text-[#F4F7FB] tracking-tight leading-[1.05]"
            style={{ fontSize: 'clamp(2.1rem, 4vw, 3.8rem)' }}
          >
            The Tools Behind
            <br />
            the Systems.
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#929CAA] max-w-md">
            Interactive topology representing verified engineering capabilities. Click or select any
            node to view its production implementation context.
          </p>
        </div>
      </div>

      {/* Category Filter Options */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Skill Categories">
        {categoryOptions.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 font-mono text-xs border transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C7FF3E] ${
              activeCategory === cat.id
                ? 'border-[#C7FF3E] bg-[#C7FF3E] text-[#07090D] font-bold shadow-[0_0_12px_rgba(199,255,62,0.2)]'
                : 'border-white/10 bg-[#0D1219] text-[#929CAA] hover:text-[#E9EDF4] hover:border-white/20'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Interactive Topology Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Constellation Map (7 Cols) */}
        <div className="lg:col-span-7 bg-[#090C11] border border-white/10 p-5 sm:p-7 relative overflow-hidden">
          {/* Subtle Technical Grid Background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px'
            }}
          />

          <div className="relative z-10 flex items-center justify-between border-b border-white/[0.065] pb-3 mb-4 font-mono text-xs text-[#697483]">
            <span className="text-[#C7FF3E] font-semibold">TOPOLOGY MAP</span>
            <span className="hidden sm:inline">SELECT ANY NODE TO TRACE CONTEXT</span>
          </div>

          {/* SVG Connecting Cyan Lines */}
          <div className="relative w-full h-[280px] sm:h-[340px]">
            <svg
              className="w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Restrained Cyan Topology Lines */}
              <line x1="18" y1="30" x2="38" y2="20" stroke="rgba(104,231,255,0.22)" strokeWidth="0.5" />
              <line x1="38" y1="20" x2="62" y2="28" stroke="rgba(104,231,255,0.22)" strokeWidth="0.5" />
              <line x1="62" y1="28" x2="82" y2="38" stroke="rgba(104,231,255,0.22)" strokeWidth="0.5" />
              <line x1="82" y1="38" x2="58" y2="62" stroke="rgba(104,231,255,0.22)" strokeWidth="0.5" />
              <line x1="58" y1="62" x2="78" y2="72" stroke="rgba(104,231,255,0.22)" strokeWidth="0.5" />
              <line x1="18" y1="30" x2="16" y2="72" stroke="rgba(104,231,255,0.22)" strokeWidth="0.5" />
              <line x1="16" y1="72" x2="30" y2="68" stroke="rgba(104,231,255,0.22)" strokeWidth="0.5" />
              <line x1="30" y1="68" x2="42" y2="80" stroke="rgba(104,231,255,0.22)" strokeWidth="0.5" />
              <line x1="62" y1="28" x2="48" y2="42" stroke="rgba(104,231,255,0.22)" strokeWidth="0.5" />
              <line x1="48" y1="42" x2="58" y2="62" stroke="rgba(104,231,255,0.22)" strokeWidth="0.5" />
              <line x1="82" y1="38" x2="88" y2="56" stroke="rgba(104,231,255,0.22)" strokeWidth="0.5" />
              <line x1="62" y1="28" x2="74" y2="18" stroke="rgba(104,231,255,0.22)" strokeWidth="0.5" />
              <line x1="58" y1="62" x2="66" y2="82" stroke="rgba(104,231,255,0.22)" strokeWidth="0.5" />
              <line x1="18" y1="30" x2="10" y2="52" stroke="rgba(104,231,255,0.22)" strokeWidth="0.5" />
              <line x1="48" y1="42" x2="46" y2="60" stroke="rgba(104,231,255,0.22)" strokeWidth="0.5" />
            </svg>

            {/* Interactive HTML Nodes Positioned via Percentage */}
            {filteredNodes.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNode(node)}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 transition-all cursor-pointer group flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C7FF3E] ${
                    isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                  }`}
                  aria-label={`Select skill: ${node.name}`}
                >
                  <span
                    className={`block transition-all ${
                      node.isMajor ? 'w-3 h-3' : 'w-2 h-2'
                    } ${
                      isSelected
                        ? 'bg-[#C7FF3E] shadow-[0_0_12px_#C7FF3E]'
                        : 'bg-[#07090D] border border-[#68E7FF]/70 group-hover:border-[#C7FF3E]'
                    }`}
                  />
                  <span
                    className={`font-mono text-[10px] sm:text-[11px] px-1.5 py-0.5 border backdrop-blur-md whitespace-nowrap transition-colors ${
                      isSelected
                        ? 'bg-[#17222C] text-[#F4F7FB] border-[#C7FF3E] font-bold'
                        : 'bg-[#07090D]/90 text-[#929CAA] border-white/10 group-hover:text-[#F4F7FB] group-hover:border-white/30'
                    }`}
                  >
                    {node.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick List for Mobile Alternative */}
          <div className="pt-4 mt-2 border-t border-white/[0.065] lg:hidden flex flex-wrap gap-2">
            {filteredNodes.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelectedNode(n)}
                className={`px-2.5 py-1 font-mono text-[11px] border cursor-pointer ${
                  selectedNode.id === n.id
                    ? 'border-[#C7FF3E] text-[#C7FF3E] bg-[#C7FF3E]/10 font-bold'
                    : 'border-white/10 text-[#929CAA]'
                }`}
              >
                {n.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Selected Node Verified Telemetry Detail Panel (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0D1219] border border-white/10 p-6 sm:p-7 space-y-5">
          <div className="border-b border-white/[0.065] pb-4 flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] text-[#C7FF3E] uppercase tracking-wider">
                NODE TELEMETRY
              </div>
              <h3 className="text-2xl font-bold text-[#F4F7FB] mt-0.5">{activeNode.name}</h3>
            </div>
            <span
              className={`px-2.5 py-0.5 font-mono text-[10px] uppercase font-bold border ${
                activeNode.isMajor
                  ? 'bg-[#C7FF3E]/10 border-[#C7FF3E]/40 text-[#C7FF3E]'
                  : 'bg-[#68E7FF]/10 border-[#68E7FF]/40 text-[#68E7FF]'
              }`}
            >
              {activeNode.isMajor ? 'CORE NODE' : 'FOUNDATION'}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="font-mono text-[11px] text-[#697483] uppercase tracking-wider">
              ENGINEERING CONTEXT
            </div>
            <p className="text-sm text-[#E9EDF4] leading-relaxed bg-[#07090D] border border-white/[0.065] p-3.5">
              {activeNode.context}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="font-mono text-[11px] text-[#697483] uppercase tracking-wider">
              SYSTEM EXPLANATION
            </div>
            <p className="text-xs sm:text-sm text-[#929CAA] leading-relaxed">
              {activeNode.explanation}
            </p>
          </div>

          <div className="space-y-2 pt-1 border-t border-white/[0.065]">
            <div className="font-mono text-[11px] text-[#697483] uppercase tracking-wider">
              VERIFIED IMPLEMENTATION
            </div>
            <a
              href={activeNode.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-[#111923] border border-white/10 hover:border-[#C7FF3E] text-xs font-mono transition-colors group"
            >
              <div>
                <div className="text-[#F4F7FB] font-semibold group-hover:text-[#C7FF3E] transition-colors">
                  {activeNode.projectTitle}
                </div>
                <div className="text-[#697483] text-[10px] mt-0.5 truncate max-w-[240px]">
                  {activeNode.repo.replace('https://', '')}
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#929CAA] group-hover:text-[#C7FF3E] transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
