'use client';

import React, { useState, useEffect } from 'react';
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
    const sections = ['home', 'about', 'skills', 'projects', 'journey', 'contact'];
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
    <div className="min-h-screen bg-[#0A0B0E] text-[#F4F4F0] selection:bg-[#D4FF00] selection:text-[#0A0B0E] font-sans antialiased relative overflow-x-hidden">
      {/* Subtle Architectural Blueprint Background Grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)
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
        onScrollToSection={scrollToSection}
      />

      {/* Main Landmark Structure */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection
          reducedMotion={reducedMotion}
          onExploreWork={() => scrollToSection('projects')}
          onOpenResume={() => setResumeModalOpen(true)}
        />

        <AboutSection />

        <SkillsSection />

        <ProjectsSection onOpenCaseStudy={(proj) => setActiveCaseStudy(proj)} />

        <JourneySection />

        <ContactSection />
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
