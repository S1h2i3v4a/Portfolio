'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Eye, EyeOff, Braces, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenSourceModal: () => void;
  onScrollToSection: (id: string) => void;
}

export function Navigation({
  activeSection,
  reducedMotion,
  onToggleReducedMotion,
  onOpenSourceModal,
  onScrollToSection
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '00.Home' },
    { id: 'about', label: '01.Identity' },
    { id: 'skills', label: '02.Matrix' },
    { id: 'projects', label: '03.Works' },
    { id: 'journey', label: '04.Trajectory' },
    { id: 'contact', label: '05.Initiate' }
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0A0B0E]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Identity Moniker */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4FF00]"
          >
            <span className="w-2.5 h-2.5 bg-[#D4FF00] inline-block group-hover:scale-125 transition-transform" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[#F4F4F0]">
              {PORTFOLIO_DATA.profile.handle}
            </span>
          </button>
          <span className="hidden xl:inline-block font-mono text-[11px] text-[#9499A3] border-l border-white/15 pl-3">
            CSE ’27 {'//'} FULL-STACK & AI
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 font-mono text-xs transition-colors relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4FF00] ${
                  isActive ? 'text-[#D4FF00] bg-[#D4FF00]/10' : 'text-[#9499A3] hover:text-[#F4F4F0]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4FF00]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Utility Controls: Reduced Motion + Source Inspector + Mobile Menu */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleReducedMotion}
            title="Toggle Reduced Motion / 2D Blueprint Mode"
            className={`px-2.5 py-1.5 border font-mono text-[11px] flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4FF00] ${
              reducedMotion
                ? 'border-[#D4FF00] text-[#D4FF00] bg-[#D4FF00]/10'
                : 'border-white/15 text-[#9499A3] hover:text-[#F4F4F0]'
            }`}
          >
            {reducedMotion ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{reducedMotion ? '2D BLUEPRINT' : '3D CORE'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenSourceModal}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 border border-white/15 bg-[#111318] hover:border-[#D4FF00]/60 text-[#F4F4F0] font-mono text-[11px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4FF00]"
          >
            <Braces className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>CONFIG.TS</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Drawer"
            className="md:hidden p-2 border border-white/15 text-[#F4F4F0] hover:border-[#D4FF00]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0A0B0E] px-4 py-4 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 border font-mono text-xs ${
                  activeSection === item.id
                    ? 'border-[#D4FF00] text-[#D4FF00] bg-[#D4FF00]/10'
                    : 'border-white/10 text-[#F4F4F0]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-2 flex items-center justify-between border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSourceModal();
              }}
              className="w-full py-2 border border-white/15 font-mono text-xs text-[#D4FF00] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Braces className="w-4 h-4" /> Inspect Next.js Source & Config
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
