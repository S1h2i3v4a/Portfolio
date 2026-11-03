'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export function AboutSection() {
  const { profile, philosophyQuote } = PORTFOLIO_DATA;

  const capabilities = [
    {
      index: '01',
      title: 'FULL-STACK DEVELOPMENT',
      summary:
        'Architecting resilient web systems with Next.js App Router, React, Node.js, Express, and MongoDB. Experienced in designing aggregation pipelines, JWT-authenticated API contracts, and clean component hierarchies.',
      tech: 'Next.js • React • Node.js • Express • MongoDB • Tailwind CSS'
    },
    {
      index: '02',
      title: 'ALGORITHMIC PROBLEM SOLVING',
      summary:
        'Consistent daily practice in Java 17+, having solved 300+ problems across LeetCode and GeeksforGeeks following Striver’s A2Z roadmap. Strong foundation in arrays, graphs, recursion, and object-oriented low-level design.',
      tech: 'Java (Core & OOP) • Data Structures • Graph Algorithms • Dynamic Programming'
    },
    {
      index: '03',
      title: 'APPLIED AI & COMPUTER VISION',
      summary:
        'Translating computer vision theory into reproducible pipelines. Authored research evaluating morphological black-hat filtering, CLAHE, Otsu ROI segmentation, and transfer learning with EfficientNet-B0 for skin lesion severity classification.',
      tech: 'Python • OpenCV • EfficientNet-B0 • Transfer Learning • Scikit-Learn'
    }
  ];

  return (
    <section
      id="about"
      className="py-16 sm:py-24 lg:py-28 border-b border-white/[0.065] relative"
    >
      {/* Header: Section index on left, Large heading on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline mb-16">
        <div className="lg:col-span-3">
          <div className="font-mono text-xs text-[#C7FF3E] uppercase tracking-[0.12em] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#C7FF3E]" />
            <span>01 / IDENTITY</span>
          </div>
        </div>

        <div className="lg:col-span-9">
          <h2
            className="font-black text-[#F4F7FB] tracking-tight leading-[1.05]"
            style={{ fontSize: 'clamp(2.1rem, 4vw, 3.8rem)' }}
          >
            Built Through Implementation,
            <br />
            Not Passive Theory.
          </h2>
        </div>
      </div>

      {/* Two-Column Layout: Left (Authentic Bio & Pull Quote) / Right (Three Strong Capability Summaries with Subtle Border Separators) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column (5 Cols): Short Authentic Biography + Real Development Philosophy */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <p className="text-base sm:text-lg text-[#929CAA] leading-[1.75]">
              I am <strong className="text-[#F4F7FB] font-semibold">{profile.name}</strong>, a
              Computer Science & Engineering undergraduate at {profile.institution} (2023–2027).
              My engineering approach prioritizes hands-on construction over speculative theory.
            </p>
            <p className="text-sm sm:text-base text-[#929CAA] leading-[1.75]">
              Whether optimizing OpenCV preprocessing filters for biomedical classification,
              structuring performant MongoDB aggregations, or practicing daily algorithmic problem
              solving in Java, I focus on building systems that are verifiable, maintainable, and
              grounded in sound computer science principles.
            </p>
          </div>

          {/* Pull Quote Expressing Real Development Philosophy */}
          <div className="border-l-2 border-[#C7FF3E] pl-5 py-2 space-y-2">
            <blockquote className="text-base sm:text-lg italic text-[#F4F7FB] leading-relaxed">
              &ldquo;{philosophyQuote}&rdquo;
            </blockquote>
            <div className="font-mono text-xs text-[#697483] uppercase tracking-wider">
              — Development Philosophy
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Three Strong Capability Summaries with Subtle Border Separators */}
        <div className="lg:col-span-7 divide-y divide-white/[0.065]">
          {capabilities.map((cap) => (
            <div key={cap.index} className="py-7 first:pt-0 last:pb-0 space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#C7FF3E] font-bold">
                  {cap.index} —
                </span>
                <h3 className="font-mono text-sm sm:text-base font-bold text-[#F4F7FB] tracking-wide">
                  {cap.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#929CAA] leading-[1.7]">
                {cap.summary}
              </p>

              <div className="font-mono text-xs text-[#697483] pt-1">
                <span className="text-[#68E7FF]/80">STACK: </span>
                <span>{cap.tech}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
