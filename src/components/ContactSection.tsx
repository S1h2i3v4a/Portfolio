'use client';

import React, { useState, useMemo } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { Globe, ArrowUpRight, Copy, Check, Send } from 'lucide-react';

export function ContactSection() {
  const { profile } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Software Engineering / Full-Stack Role',
    message: ''
  });
  const [copied, setCopied] = useState(false);

  const engagementCategories = [
    'Software Engineering / Full-Stack Role',
    'Applied AI & Computer Vision Collaboration',
    'Open Source & Hackathon Teamwork',
    'General Technical Discussion'
  ];

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
    <section id="contact" className="py-16 sm:py-24 lg:py-28 relative">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline mb-14">
        <div className="lg:col-span-3">
          <div className="font-mono text-xs text-[#C7FF3E] uppercase tracking-[0.12em] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#C7FF3E]" />
            <span>05 / INITIATE</span>
          </div>
        </div>

        <div className="lg:col-span-9 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2
            className="font-black text-[#F4F7FB] tracking-tight leading-[1.05]"
            style={{ fontSize: 'clamp(2.1rem, 4vw, 3.8rem)' }}
          >
            Have a Problem
            <br />
            Worth <span className="text-[#C7FF3E]">Solving?</span>
          </h2>
          <p className="font-mono text-xs text-[#697483]">
            RESPONSE TIME / 24–48 HOURS
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Authentic Copy & Verified Channels (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <p className="text-base sm:text-lg text-[#929CAA] leading-[1.75]">
            Interested in software engineering, full-stack development, applied AI, or collaborative projects?
            Let’s connect.
          </p>

          <p className="text-sm text-[#697483] leading-relaxed">
            I am currently in my pre-final year of Computer Science (Class of 2027) and actively open
            to software engineering internships, technical apprenticeships, and applied vision projects.
          </p>

          {/* Verified Social & Code Channels */}
          <div className="space-y-3 pt-2">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#0D1219] border border-white/10 hover:border-[#C7FF3E] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#111923] border border-white/10 group-hover:border-[#C7FF3E]/40">
                  <GithubIcon className="w-5 h-5 text-[#C7FF3E]" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-[#F4F7FB]">GITHUB ARCHIVES</div>
                  <div className="font-mono text-xs text-[#929CAA]">github.com/S1h2i3v4a</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#929CAA] group-hover:text-[#C7FF3E] transition-colors" />
            </a>

            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#0D1219] border border-white/10 hover:border-[#68E7FF] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#111923] border border-white/10 group-hover:border-[#68E7FF]/40">
                  <LinkedinIcon className="w-5 h-5 text-[#68E7FF]" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-[#F4F7FB]">LINKEDIN PROFILE</div>
                  <div className="font-mono text-xs text-[#929CAA]">linkedin.com/in/shivam15keshari</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#929CAA] group-hover:text-[#68E7FF] transition-colors" />
            </a>

            <a
              href={profile.links.x}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#0D1219] border border-white/10 hover:border-[#C7FF3E] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#111923] border border-white/10 group-hover:border-[#C7FF3E]/40">
                  <Globe className="w-5 h-5 text-[#C7FF3E]" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-[#F4F7FB]">X (TWITTER) DISPATCH</div>
                  <div className="font-mono text-xs text-[#929CAA]">x.com/ShivamK11959343</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#929CAA] group-hover:text-[#C7FF3E] transition-colors" />
            </a>
          </div>
        </div>

        {/* Right Column: Accessible Functional Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0D1219] border border-white/10 p-6 sm:p-8 lg:p-9 space-y-5">
          <div className="border-b border-white/[0.065] pb-3 flex items-center justify-between font-mono text-xs">
            <span className="text-[#F4F7FB] font-bold">CONTACT DISPATCHER</span>
            <span className="text-[#697483] text-[11px]">OPENS YOUR EMAIL CLIENT OR COPIES PAYLOAD</span>
          </div>

          <form onSubmit={handleSend} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name-input" className="block font-mono text-xs text-[#929CAA] mb-1.5">
                  YOUR NAME *
                </label>
                <input
                  id="name-input"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Alex Chen"
                  className="w-full bg-[#07090D] border border-white/15 px-3.5 py-2.5 text-sm text-[#F4F7FB] placeholder:text-[#697483] focus:outline-none focus:border-[#C7FF3E] focus:ring-1 focus:ring-[#C7FF3E]"
                />
              </div>

              <div>
                <label htmlFor="email-input" className="block font-mono text-xs text-[#929CAA] mb-1.5">
                  YOUR EMAIL *
                </label>
                <input
                  id="email-input"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full bg-[#07090D] border border-white/15 px-3.5 py-2.5 text-sm text-[#F4F7FB] placeholder:text-[#697483] focus:outline-none focus:border-[#C7FF3E] focus:ring-1 focus:ring-[#C7FF3E]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="category-select" className="block font-mono text-xs text-[#929CAA] mb-1.5">
                ENGAGEMENT CATEGORY (OPTIONAL)
              </label>
              <select
                id="category-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#07090D] border border-white/15 px-3.5 py-2.5 text-sm text-[#F4F7FB] focus:outline-none focus:border-[#C7FF3E] focus:ring-1 focus:ring-[#C7FF3E] cursor-pointer"
              >
                {engagementCategories.map((c) => (
                  <option key={c} value={c} className="bg-[#07090D] text-[#F4F7FB]">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message-input" className="block font-mono text-xs text-[#929CAA] mb-1.5">
                MESSAGE *
              </label>
              <textarea
                id="message-input"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share project requirements, team details, or collaboration ideas..."
                className="w-full bg-[#07090D] border border-white/15 p-3.5 text-sm text-[#F4F7FB] placeholder:text-[#697483] focus:outline-none focus:border-[#C7FF3E] focus:ring-1 focus:ring-[#C7FF3E]"
              />
            </div>

            {/* Behavior Explanation Note */}
            <p className="text-[11px] font-mono text-[#697483]">
              * Clicking &quot;Launch Email Client&quot; creates a pre-filled mailto message in your default email application.
              Alternatively, use &quot;Copy Message Payload&quot; to paste directly into your preferred service.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="submit"
                className="px-6 py-3 bg-[#C7FF3E] hover:bg-[#bcf82e] text-[#07090D] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Launch Email Client</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="px-5 py-3 bg-[#111923] border border-white/10 hover:border-white/30 text-[#E9EDF4] font-mono text-xs font-medium uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#C7FF3E]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Payload Copied to Clipboard' : 'Copy Message Payload'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
