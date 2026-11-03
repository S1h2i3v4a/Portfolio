'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Menu, X, FileText } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenSourceModal: () => void;
  onOpenResumeModal: () => void;
  onScrollToSection: (id: string) => void;
}

export function Navigation({
  activeSection,
  reducedMotion,
  onToggleReducedMotion,
  onOpenResumeModal,
  onScrollToSection
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '00 / HOME' },
    { id: 'about', label: '01 / IDENTITY' },
    { id: 'skills', label: '02 / CAPABILITIES' },
    { id: 'projects', label: '03 / PROJECTS' },
    { id: 'journey', label: '04 / JOURNEY' },
    { id: 'contact', label: '05 / CONTACT' }
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <header className="sticky top-0 z-40 h-[76px] border-b border-white/[0.065] bg-[#07090D]/90 backdrop-blur-md transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 h-full flex items-center justify-between">
        {/* Brand Logo on Left: SHIVAM.K */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3E] cursor-pointer"
            aria-label="Shivam Keshari Portfolio Home"
          >
            <span className="w-2.5 h-2.5 bg-[#C7FF3E] inline-block transition-transform group-hover:scale-125" />
            <span className="font-mono text-sm font-bold tracking-widest text-[#F4F7FB]">
              SHIVAM.K
            </span>
          </button>
          <span className="hidden xl:inline-block font-mono text-[11px] text-[#697483] border-l border-white/[0.065] pl-4">
            B.TECH CSE &apos;27 {'//'} APPLIED SYSTEMS
          </span>
        </div>

        {/* Main Navigation Centered/Right-Aligned */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-1 xl:gap-2 font-mono text-xs"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-2 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3E] ${
                  isActive
                    ? 'text-[#F4F7FB] font-semibold'
                    : 'text-[#929CAA] hover:text-[#E9EDF4]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#C7FF3E]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action: Motion Toggle + Resume Action */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleReducedMotion}
            title={reducedMotion ? 'Switch to 3D Scene' : 'Switch to 2D Blueprint'}
            className={`px-2.5 py-1.5 border font-mono text-[11px] flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3E] cursor-pointer ${
              reducedMotion
                ? 'border-[#C7FF3E] text-[#C7FF3E] bg-[#C7FF3E]/10'
                : 'border-white/10 text-[#929CAA] hover:text-[#E9EDF4] hover:border-white/20'
            }`}
          >
            {reducedMotion ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{reducedMotion ? '2D BLUEPRINT' : '3D MODE'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenResumeModal}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-transparent border border-white/10 hover:border-[#C7FF3E] text-[#E9EDF4] hover:text-[#C7FF3E] font-mono text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3E]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RESUME ↓</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 border border-white/10 text-[#E9EDF4] hover:border-[#C7FF3E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3E] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="lg:hidden border-b border-white/[0.065] bg-[#07090D] px-6 py-5 space-y-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3.5 py-2.5 border font-mono text-xs transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'border-[#C7FF3E] text-[#C7FF3E] bg-[#C7FF3E]/10 font-bold'
                    : 'border-white/10 text-[#E9EDF4] hover:border-white/30'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-white/[0.065]">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="w-full py-2.5 bg-[#C7FF3E] text-[#07090D] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" /> Download Shivam&apos;s Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
