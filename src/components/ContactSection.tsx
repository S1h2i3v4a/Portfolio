'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { Mail, MapPin, ArrowRight, Copy, Check } from 'lucide-react';

const HolographicEnvelopeScene = dynamic(
  () => import('@/components/HolographicEnvelopeScene').then((mod) => mod.HolographicEnvelopeScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[420px] sm:h-[480px] bg-[#07090D] border border-white/10 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-full border-2 border-[#68E7FF] border-t-transparent animate-spin mb-3" />
        <p className="font-mono text-xs text-[#929CAA] tracking-wider uppercase">
          INITIALIZING SECURE ENCRYPTED BEAM...
        </p>
      </div>
    )
  }
);

interface ContactSectionProps {
  reducedMotion?: boolean;
}

export function ContactSection({ reducedMotion = false }: ContactSectionProps) {
  const { profile } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Software Engineering / Full-Stack Role',
    message: ''
  });
  const [copied, setCopied] = useState(false);

  const preparedPayload = useMemo(() => {
    return [
      `To: Shivam Keshari (shivamkeshari1510@gmail.com)`,
      `From: ${formData.name || '[Your Name]'} (${formData.email || '[Your Email]'})`,
      `Category: ${formData.category}`,
      `----------------------------------------`,
      formData.message || 'Hello Shivam, I reviewed your engineering portfolio and would like to connect...'
    ].join('\n');
  }, [formData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(preparedPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Portfolio Contact] ${formData.category} - ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(preparedPayload);
    window.location.href = `mailto:shivamkeshari1510@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-28 relative overflow-hidden">
      {/* Background glow accent */}
      <div
        className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(104,231,255,0.2) 0%, transparent 70%)'
        }}
      />

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column matching reference image */}
        <div className="lg:col-span-7 space-y-7">
          <div className="space-y-2">
            <div className="font-mono text-xs text-[#C7FF3E] uppercase tracking-[0.14em] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#C7FF3E] rounded-full animate-pulse" />
              <span>06 / GET IN TOUCH</span>
            </div>
            <h2
              className="font-black text-[#F4F7FB] tracking-tight leading-[1.05]"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.0rem)' }}
            >
              Get In Touch
            </h2>
            <div className="text-xl sm:text-2xl font-bold text-[#C7FF3E] tracking-tight">
              Let&apos;s Build Something Amazing Together
            </div>
          </div>

          {/* 4 Contact Links with Circular Glass Badges matching Reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Email */}
            <a
              href="mailto:shivamkeshari1510@gmail.com"
              className="flex items-center gap-3 p-3.5 bg-[#0D1219]/90 border border-white/10 hover:border-[#C7FF3E] rounded-xl transition-all group backdrop-blur-md"
            >
              <div className="p-2.5 rounded-lg bg-[#07090D] border border-white/10 group-hover:border-[#C7FF3E]/40 text-[#C7FF3E]">
                <Mail className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="font-mono text-xs text-[#697483] uppercase">Email</div>
                <div className="font-mono text-xs font-bold text-[#F4F7FB] group-hover:text-[#C7FF3E] truncate">
                  shivamkeshari1510@gmail.com
                </div>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-3 p-3.5 bg-[#0D1219]/90 border border-white/10 rounded-xl backdrop-blur-md">
              <div className="p-2.5 rounded-lg bg-[#07090D] border border-white/10 text-[#68E7FF]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-xs text-[#697483] uppercase">Location</div>
                <div className="font-mono text-xs font-bold text-[#F4F7FB]">
                  Prayagraj, India
                </div>
              </div>
            </div>

            {/* LinkedIn */}
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 bg-[#0D1219]/90 border border-white/10 hover:border-[#C7FF3E] rounded-xl transition-all group backdrop-blur-md"
            >
              <div className="p-2.5 rounded-lg bg-[#07090D] border border-white/10 group-hover:border-[#C7FF3E]/40 text-[#C7FF3E]">
                <LinkedinIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-xs text-[#697483] uppercase">LinkedIn</div>
                <div className="font-mono text-xs font-bold text-[#F4F7FB] group-hover:text-[#C7FF3E]">
                  /in/shivam15keshari
                </div>
              </div>
            </a>

            {/* GitHub */}
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 bg-[#0D1219]/90 border border-white/10 hover:border-[#C7FF3E] rounded-xl transition-all group backdrop-blur-md"
            >
              <div className="p-2.5 rounded-lg bg-[#07090D] border border-white/10 group-hover:border-[#C7FF3E]/40 text-[#C7FF3E]">
                <GithubIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-xs text-[#697483] uppercase">GitHub</div>
                <div className="font-mono text-xs font-bold text-[#F4F7FB] group-hover:text-[#C7FF3E]">
                  /S1h2i3v4a
                </div>
              </div>
            </a>
          </div>

          {/* Interactive Message Form */}
          <form
            onSubmit={handleSend}
            className="p-5 sm:p-6 bg-[#0D1219]/90 border border-white/10 rounded-2xl space-y-4 backdrop-blur-md"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#929CAA] block">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Chen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#07090D] border border-white/10 focus:border-[#C7FF3E] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#F4F7FB] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#929CAA] block">Your Email</label>
                <input
                  type="email"
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#07090D] border border-white/10 focus:border-[#C7FF3E] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#F4F7FB] outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs text-[#929CAA] block">Message</label>
              <textarea
                rows={3}
                placeholder="Describe your project, internship, or collaborative idea..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#07090D] border border-white/10 focus:border-[#C7FF3E] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#F4F7FB] outline-none transition-colors resize-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2 border border-white/15 hover:border-white/30 text-[#929CAA] hover:text-[#F4F7FB] font-mono text-xs rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#C7FF3E]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Payload Copied!' : 'Copy Formatted Text'}</span>
              </button>

              {/* Send Message Solid Button matching reference */}
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#C7FF3E] hover:bg-[#bcf82e] text-[#07090D] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_18px_rgba(199,255,62,0.25)] hover:scale-105 active:scale-95"
              >
                <span>Send Message</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Right 3D Holographic Envelope Scene matching reference */}
        <div className="lg:col-span-5 w-full">
          <HolographicEnvelopeScene reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
