'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Project } from '@/data/portfolioData';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { JourneySection } from '@/components/JourneySection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { CaseStudyModal } from '@/components/CaseStudyModal';
import { ResumeModal } from '@/components/ResumeModal';
import { SourceCodeModal } from '@/components/SourceCodeModal';

const QuantumViewerSection = dynamic(
  () => import('@/components/QuantumViewerSection').then((mod) => mod.QuantumViewerSection),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] bg-[#090C11] border border-white/10 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#C7FF3E] border-t-transparent animate-spin" />
      </div>
    )
  }
);

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);
  const [sourceModalOpen, setSourceModalOpen] = useState<boolean>(false);

  // Detect system reduced motion preference on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setReducedMotion(true);
      }
    }
  }, []);

  // Scroll spy to update active navigation indicator
  useEffect(() => {
    const sections = ['home', 'showcase', 'about', 'skills', 'projects', 'journey', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 240;
      for (const secId of sections) {
        const el = document.getElementById(secId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(secId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-[#E9EDF4] selection:bg-[#C7FF3E] selection:text-[#07090D] font-sans antialiased relative overflow-x-hidden">
      {/* Subtle Architectural Cosmic Background Grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px'
        }}
      />

      {/* Sticky Header Navigation */}
      <Navigation
        activeSection={activeSection}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion((prev) => !prev)}
        onOpenSourceModal={() => setSourceModalOpen(true)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* Main Landmark Structure */}
      <main className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 space-y-6 sm:space-y-10">
        {/* Panel 1: Hero Section with Astronaut */}
        <HeroSection
          reducedMotion={reducedMotion}
          onExploreWork={() => scrollToSection('projects')}
          onWatchDemo={() => setResumeModalOpen(true)}
        />

        {/* Panel 2: 3D Quantum Viewer / Showcase */}
        <QuantumViewerSection reducedMotion={reducedMotion} />

        {/* Panel 3: About Me with 3D Holographic Bust */}
        <AboutSection reducedMotion={reducedMotion} />

        {/* Panel 4: My Skills with 3D Neural Constellation */}
        <SkillsSection reducedMotion={reducedMotion} />

        {/* Panel 5: My Projects with 4 Cinematic Floating Cards */}
        <ProjectsSection onOpenCaseStudy={(proj) => setActiveCaseStudy(proj)} />

        {/* Panel 6: My Journey with 3D Holographic Trophy */}
        <JourneySection reducedMotion={reducedMotion} />

        {/* Panel 7: Get In Touch with 3D Holographic Envelope */}
        <ContactSection reducedMotion={reducedMotion} />
      </main>

      {/* Footer Colophon */}
      <Footer
        onOpenSourceModal={() => setSourceModalOpen(true)}
        onScrollToTop={() => scrollToSection('home')}
      />

      {/* Global Modals */}
      <CaseStudyModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      <SourceCodeModal
        isOpen={sourceModalOpen}
        onClose={() => setSourceModalOpen(false)}
      />
    </div>
  );
}
