'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import './hero.css';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { ArrowDown } from 'lucide-react';

const HeroLaptopScene = dynamic(() => import('@/components/HeroLaptopScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#050a10]/60 border border-white/5 rounded-2xl p-6 text-center">
      <div className="w-12 h-12 rounded-full border-2 border-[#c7ff3e] border-t-transparent animate-spin mb-4" />
      <p className="text-xs font-mono text-[#68e7ff] tracking-widest uppercase">
        INITIALIZING 3D UNIVERSE...
      </p>
    </div>
  )
});

interface HeroSectionProps {
  reducedMotion?: boolean;
  onExploreWork?: () => void;
  onWatchDemo?: () => void;
}

export function HeroSection({
  reducedMotion = false,
  onExploreWork,
  onWatchDemo
}: HeroSectionProps) {
  const { profile } = PORTFOLIO_DATA;
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-animate', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.12
      });
      gsap.from('.hero-3d', {
        opacity: 0,
        scale: 0.94,
        x: 28,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.18
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onExploreWork) {
      e.preventDefault();
      onExploreWork();
    }
  };

  return (
    <section ref={sectionRef} className="hero-section" id="home">
      {/* Left Column: Hero Content & Typography */}
      <div className="hero-content">
        <span className="hero-badge hero-animate">
          <span className="hero-badge-dot" />
          AVAILABLE FOR OPPORTUNITIES
        </span>

        <p className="hero-intro hero-animate">HELLO, WORLD. I&apos;M</p>

        <h1 className="hero-animate">
          Shivam<span>.</span>
          <br />
          Keshari
        </h1>

        <h2 className="hero-animate">Full-Stack Developer &amp; Builder</h2>

        <p className="hero-description hero-animate">
          I turn ideas into intelligent, scalable digital experiences by combining thoughtful
          engineering with emerging technologies.
        </p>

        <div className="hero-buttons hero-animate">
          <a
            href="#projects"
            onClick={handleExploreClick}
            className="hero-primary"
            aria-label="Explore Projects"
          >
            <span>Explore Projects</span>
            <span aria-hidden="true">↗</span>
          </a>

          <a
            href="#contact"
            className="hero-secondary"
            aria-label="Let's Connect"
          >
            <span>Let&apos;s Connect</span>
            <span aria-hidden="true">↗</span>
          </a>

          {onWatchDemo && (
            <button
              type="button"
              onClick={onWatchDemo}
              className="hero-secondary"
              aria-label="Watch Demo or View Resume"
            >
              <span>Demo Video</span>
              <span aria-hidden="true">▶</span>
            </button>
          )}
        </div>

        {/* Quick Verified Links: Official Resume PDF, GitHub, LinkedIn */}
        <div className="hero-links hero-animate">
          <a
            href="/resume.pdf"
            download="Shivam_Keshari_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-link accent"
            aria-label="Download Official Resume PDF"
          >
            <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Resume PDF</span>
          </a>

          <span className="text-white/20">•</span>

          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-link"
            aria-label="Shivam's GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <span className="text-white/20">•</span>

          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-link"
            aria-label="Shivam's LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Technical Ticker */}
        <div className="hero-tech hero-animate">
          JAVA <span>•</span> REACT <span>•</span> NEXT.JS <span>•</span> NODE.JS <span>•</span> AI / ML
        </div>
      </div>

      {/* Right Column: Interactive 3D Cyber Universe */}
      <div className="hero-3d">
        <HeroLaptopScene reducedMotion={reducedMotion} />
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="hero-bottom">
        <span>SCROLL TO EXPLORE</span>
        <div />
        <span>01 — 07</span>
      </div>
    </section>
  );
}

export default HeroSection;
