'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  ReactIcon,
  NextjsIcon,
  TypeScriptIcon,
  TailwindIcon,
  PythonIcon,
  ThreejsIcon,
  NodejsIcon,
  MongodbIcon,
  JavaIcon
} from '@/components/Icons';
import { Activity } from 'lucide-react';

const SkillsConstellationScene = dynamic(
  () => import('@/components/SkillsConstellationScene').then((mod) => mod.SkillsConstellationScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] sm:h-[440px] bg-[#07090D] border border-white/10 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-full border-2 border-[#68E7FF] border-t-transparent animate-spin mb-3" />
        <p className="font-mono text-xs text-[#929CAA] tracking-wider uppercase">
          CALCULATING NEURAL MESH NODES...
        </p>
      </div>
    )
  }
);

interface SkillsSectionProps {
  reducedMotion?: boolean;
}

export function SkillsSection({ reducedMotion = false }: SkillsSectionProps) {
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>('React');

  // Left Column Technologies
  const leftSkills = [
    {
      name: 'React',
      level: 'Advanced',
      icon: ReactIcon,
      color: '#68E7FF',
      context: 'Component architecture, custom hooks, virtual DOM optimizations & interactive state.'
    },
    {
      name: 'Next.js',
      level: 'Expert',
      icon: NextjsIcon,
      color: '#F4F7FB',
      context: 'App Router architecture, SSR/SSG orchestration, route handlers, & SEO optimization.'
    },
    {
      name: 'TypeScript',
      level: 'Advanced',
      icon: TypeScriptIcon,
      color: '#3178C6',
      context: 'Strict compile-time type safety, interface contracts, generics & schema models.'
    },
    {
      name: 'Tailwind CSS',
      level: 'Expert',
      icon: TailwindIcon,
      color: '#38BDF8',
      context: 'Modern utility-first responsive styling, design tokens & dark-mode systems.'
    }
  ];

  // Right Column Technologies
  const rightSkills = [
    {
      name: 'Python',
      level: 'Advanced',
      icon: PythonIcon,
      color: '#FFD43B',
      context: 'Deep learning pipelines, OpenCV image processing, NumPy, and research automation.'
    },
    {
      name: 'Three.js',
      level: 'Expert',
      icon: ThreejsIcon,
      color: '#C7FF3E',
      context: 'WebGL shaders, procedural 3D geometries, particle systems & 60fps animations.'
    },
    {
      name: 'Node.js',
      level: 'Advanced',
      icon: NodejsIcon,
      color: '#68A063',
      context: 'RESTful API servers, middleware chains, controller logic & JWT authentication.'
    },
    {
      name: 'MongoDB',
      level: 'Expert',
      icon: MongodbIcon,
      color: '#47A248',
      context: 'Mongoose schemas, multi-stage aggregation pipelines ($match, $group), & indexing.'
    }
  ];

  // Active skill info lookup
  const allSkills = [...leftSkills, rightSkills[0], rightSkills[1], rightSkills[2], rightSkills[3]];
  const activeSkillObj = allSkills.find((s) => s.name === highlightedSkill) || leftSkills[0];

  return (
    <section
      id="skills"
      className="py-16 sm:py-24 lg:py-28 border-b border-white/[0.065] relative overflow-hidden"
    >
      {/* Background glow accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(199,255,62,0.18) 0%, transparent 65%)'
        }}
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-2">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#C7FF3E] uppercase tracking-[0.14em]">
          <span className="w-2 h-2 bg-[#C7FF3E] rounded-full animate-pulse" />
          <span>03 / TECHNICAL STACK</span>
        </div>
        <h2
          className="font-black text-[#F4F7FB] tracking-tight leading-[1.05]"
          style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.0rem)' }}
        >
          My Skills
        </h2>
        <div className="text-xl sm:text-2xl font-bold text-[#C7FF3E] tracking-tight">
          Technologies I Work With
        </div>
      </div>

      {/* 3-Column Layout: Left Badges / Center 3D Constellation / Right Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column (4 Cards) */}
        <div className="lg:col-span-3 space-y-3.5 order-2 lg:order-1">
          {leftSkills.map((skill) => {
            const Icon = skill.icon;
            const isSelected = highlightedSkill === skill.name;
            return (
              <button
                key={skill.name}
                type="button"
                onMouseEnter={() => setHighlightedSkill(skill.name)}
                onClick={() => setHighlightedSkill(skill.name)}
                className={`w-full text-left p-3.5 border rounded-xl transition-all cursor-pointer backdrop-blur-md flex items-center justify-between gap-3 group ${
                  isSelected
                    ? 'bg-[#111923] border-[#C7FF3E] shadow-[0_0_16px_rgba(199,255,62,0.22)] scale-[1.02]'
                    : 'bg-[#0D1219]/90 border-white/10 hover:border-white/25 hover:bg-[#111923]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#07090D] border border-white/10 group-hover:border-[#C7FF3E]/40 text-[#F4F7FB]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-sm font-bold text-[#F4F7FB]">
                      {skill.name}
                    </div>
                    <div className="text-xs text-[#929CAA] font-mono">
                      {skill.level}
                    </div>
                  </div>
                </div>
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-[#C7FF3E] shadow-[0_0_8px_#C7FF3E]' : 'bg-white/20'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Center Column: 3D Interconnected Constellation */}
        <div className="lg:col-span-6 w-full order-1 lg:order-2 flex flex-col items-center justify-center">
          <SkillsConstellationScene
            reducedMotion={reducedMotion}
            highlightedSkill={highlightedSkill}
          />

          {/* Interactive Context Pill below Constellation */}
          <div className="w-full max-w-lg mt-3 p-3.5 bg-[#090C11] border border-white/10 rounded-lg text-center backdrop-blur-sm">
            <div className="font-mono text-xs text-[#C7FF3E] uppercase font-bold tracking-wider">
              {activeSkillObj.name} {'//'} {activeSkillObj.level}
            </div>
            <p className="text-xs text-[#929CAA] mt-1 leading-relaxed">
              {activeSkillObj.context}
            </p>
          </div>
        </div>

        {/* Right Column (4 Cards) */}
        <div className="lg:col-span-3 space-y-3.5 order-3">
          {rightSkills.map((skill) => {
            const Icon = skill.icon;
            const isSelected = highlightedSkill === skill.name;
            return (
              <button
                key={skill.name}
                type="button"
                onMouseEnter={() => setHighlightedSkill(skill.name)}
                onClick={() => setHighlightedSkill(skill.name)}
                className={`w-full text-left p-3.5 border rounded-xl transition-all cursor-pointer backdrop-blur-md flex items-center justify-between gap-3 group ${
                  isSelected
                    ? 'bg-[#111923] border-[#C7FF3E] shadow-[0_0_16px_rgba(199,255,62,0.22)] scale-[1.02]'
                    : 'bg-[#0D1219]/90 border-white/10 hover:border-white/25 hover:bg-[#111923]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#07090D] border border-white/10 group-hover:border-[#C7FF3E]/40 text-[#F4F7FB]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-sm font-bold text-[#F4F7FB]">
                      {skill.name}
                    </div>
                    <div className="text-xs text-[#929CAA] font-mono">
                      {skill.level}
                    </div>
                  </div>
                </div>
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-[#C7FF3E] shadow-[0_0_8px_#C7FF3E]' : 'bg-white/20'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Core Foundations Banner */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <div className="p-4 bg-[#0D1219] border border-white/10 rounded-xl flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-[#111923] border border-white/10 text-[#C7FF3E]">
            <JavaIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="font-mono text-xs font-bold text-[#F4F7FB] uppercase">
              Java & DSA (300+ Problems)
            </div>
            <div className="text-xs text-[#929CAA] mt-0.5">
              Trees, Graphs, DP, OOP & Low-Level Design (LeetCode & GFG)
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#0D1219] border border-white/10 rounded-xl flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-[#111923] border border-white/10 text-[#68E7FF]">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="font-mono text-xs font-bold text-[#F4F7FB] uppercase">
              OpenCV & Applied AI Vision
            </div>
            <div className="text-xs text-[#929CAA] mt-0.5">
              Dermatological Lesion Segmentation & EfficientNet-B0 (SocProS 2026)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
