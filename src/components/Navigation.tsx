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
    { id: 'home', label: 'Home' },
    { id: 'showcase', label: '3D Viewer' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'journey', label: 'Journey' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <header className="sticky top-0 z-40 h-[72px] border-b border-white/[0.065] bg-[#07090D]/90 backdrop-blur-md transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 h-full flex items-center justify-between">
        {/* Brand Logo on Left: S1h2i3v4a with glowing green dot */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3E] cursor-pointer"
            aria-label="S1h2i3v4a Portfolio Home"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#C7FF3E] inline-block shadow-[0_0_10px_#C7FF3E] animate-pulse" />
            <span className="font-mono text-base font-bold tracking-wider text-[#F4F7FB]">
              S1h2i3v4a
            </span>
          </button>
          <span className="hidden xl:inline-block font-mono text-[11px] text-[#697483] border-l border-white/[0.065] pl-4">
            SHIVAM KESHARI // APPLIED SYSTEMS & 3D
          </span>
        </div>

        {/* Main Navigation Centered */}
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
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#C7FF3E] shadow-[0_0_8px_#C7FF3E]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action: 3D Toggle + Glowing Resume Pill Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleReducedMotion}
            title={reducedMotion ? 'Switch to 3D Scenes' : 'Switch to 2D Blueprints'}
            className={`px-2.5 py-1.5 border font-mono text-[11px] flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3E] cursor-pointer ${
              reducedMotion
                ? 'border-[#C7FF3E] text-[#C7FF3E] bg-[#C7FF3E]/10'
                : 'border-white/10 text-[#929CAA] hover:text-[#E9EDF4] hover:border-white/20'
            }`}
          >
            {reducedMotion ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-[#C7FF3E]" />}
            <span className="hidden sm:inline">{reducedMotion ? '2D BLUEPRINT' : '3D MODE'}</span>
          </button>

          {/* Glowing Resume Pill matching reference image */}
          <button
            type="button"
            onClick={onOpenResumeModal}
            className="flex items-center gap-2 px-4 py-1.5 bg-[#C7FF3E]/10 border border-[#C7FF3E] hover:bg-[#C7FF3E] text-[#C7FF3E] hover:text-[#07090D] font-mono text-xs font-bold tracking-wider uppercase rounded-full transition-all cursor-pointer shadow-[0_0_14px_rgba(199,255,62,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3E]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
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

          <div className="pt-2 border-t border-white/[0.065] flex items-center justify-between">
            <span className="font-mono text-xs text-[#929CAA]">OFFICIAL CV:</span>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="px-4 py-1.5 bg-[#C7FF3E] text-[#07090D] font-mono text-xs font-bold rounded-full"
            >
              Open Resume Sheet
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
