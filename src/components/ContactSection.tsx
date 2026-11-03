'use client';

import React, { useState, useMemo } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import {
  Globe,
  Compass,
  ArrowUpRight,
  Mail,
  Check,
  Copy,
  Terminal
} from 'lucide-react';

export function ContactSection() {
  const { profile } = PORTFOLIO_DATA;
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    context: 'Software Engineering Internship / Full-Time Role',
    message: ''
  });
  const [contactCopied, setContactCopied] = useState(false);

  const formattedInquiryText = useMemo(() => {
    return [
      `To: Shivam Keshari (${profile.links.linkedin})`,
      `From: ${contactForm.name || '[Your Name]'} (${contactForm.email || '[Your Email]'})`,
      `Subject: ${contactForm.context}`,
      `----------------------------------------`,
      contactForm.message ||
        'Hello Shivam, I reviewed your engineering portfolio and would love to connect regarding software engineering opportunities...'
    ].join('\n');
  }, [contactForm, profile.links.linkedin]);

  const handleCopyInquiry = () => {
    navigator.clipboard.writeText(formattedInquiryText);
    setContactCopied(true);
    setTimeout(() => setContactCopied(false), 2500);
  };

  const handleLaunchMailClient = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[Portfolio Inquiry] ${contactForm.context} — from ${contactForm.name || 'Visitor'}`
    );
    const body = encodeURIComponent(formattedInquiryText);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-16 sm:py-24 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Direct Links & Availability Terminal (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D4FF00]" />
              <span>05 {'//'} INITIATE TRANSMISSION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#F4F4F0] tracking-tight">
              Let’s Build Production Systems Together.
            </h2>
          </div>

          <p className="text-base text-[#9499A3] leading-relaxed">
            Final-year Computer Science undergraduate at United Institute of Technology (Class of 2027),
            actively open to software engineering internships, backend/full-stack roles, and applied AI systems builds.
          </p>

          {/* Direct Verified Transmission Links */}
          <div className="space-y-3 pt-2">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#0E1015] border border-white/10 hover:border-[#D4FF00] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#151922] border border-white/10 group-hover:border-[#D4FF00]/60">
                  <GithubIcon className="w-5 h-5 text-[#D4FF00]" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-[#F4F4F0]">GITHUB ARCHIVES</div>
                  <div className="font-mono text-xs text-[#9499A3]">github.com/S1h2i3v4a</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#9499A3] group-hover:text-[#D4FF00] transition-colors" />
            </a>

            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#0E1015] border border-white/10 hover:border-[#00F0FF] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#151922] border border-white/10 group-hover:border-[#00F0FF]/60">
                  <LinkedinIcon className="w-5 h-5 text-[#00F0FF]" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-[#F4F4F0]">LINKEDIN NETWORK</div>
                  <div className="font-mono text-xs text-[#9499A3]">
                    linkedin.com/in/shivam15keshari
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#9499A3] group-hover:text-[#00F0FF] transition-colors" />
            </a>

            <a
              href={profile.links.x}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#0E1015] border border-white/10 hover:border-[#D4FF00] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#151922] border border-white/10 group-hover:border-[#D4FF00]/60">
                  <Globe className="w-5 h-5 text-[#D4FF00]" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-[#F4F4F0]">X (TWITTER) DISPATCH</div>
                  <div className="font-mono text-xs text-[#9499A3]">x.com/ShivamK11959343</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#9499A3] group-hover:text-[#D4FF00] transition-colors" />
            </a>

            <a
              href={profile.links.previousPortfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#0E1015] border border-white/10 hover:border-[#9D4EDD] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#151922] border border-white/10 group-hover:border-[#9D4EDD]/60">
                  <Compass className="w-5 h-5 text-[#9D4EDD]" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-[#F4F4F0]">
                    PREVIOUS PORTFOLIO DEPLOYMENT
                  </div>
                  <div className="font-mono text-xs text-[#9499A3]">
                    my-portfolio-od9l.onrender.com
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#9499A3] group-hover:text-[#9D4EDD] transition-colors" />
            </a>
          </div>
        </div>

        {/* Right Column: Honest, Functional Dispatch Terminal (7 cols) */}
        <div className="lg:col-span-7 bg-[#0E1015] border border-white/10 p-6 sm:p-8 lg:p-10 relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 font-mono text-xs">
            <span className="text-[#F4F4F0] font-bold flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#D4FF00]" />
              <span>DIRECT MESSAGE DISPATCHER</span>
            </span>
            <span className="text-[#D4FF00] font-semibold">VERIFIED MAILTO + CLIPBOARD PAYLOAD</span>
          </div>

          <form onSubmit={handleLaunchMailClient} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="visitor-name"
                  className="block font-mono text-xs text-[#9499A3] mb-1.5"
                >
                  YOUR NAME *
                </label>
                <input
                  id="visitor-name"
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="e.g., Rohan Verma"
                  className="w-full bg-[#07080B] border border-white/15 px-3.5 py-2.5 text-sm text-[#F4F4F0] focus:outline-none focus:border-[#D4FF00]"
                />
              </div>
              <div>
                <label
                  htmlFor="visitor-email"
                  className="block font-mono text-xs text-[#9499A3] mb-1.5"
                >
                  YOUR EMAIL *
                </label>
                <input
                  id="visitor-email"
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full bg-[#07080B] border border-white/15 px-3.5 py-2.5 text-sm text-[#F4F4F0] focus:outline-none focus:border-[#D4FF00]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="inquiry-context"
                className="block font-mono text-xs text-[#9499A3] mb-1.5"
              >
                ENGAGEMENT CONTEXT
              </label>
              <select
                id="inquiry-context"
                value={contactForm.context}
                onChange={(e) => setContactForm({ ...contactForm, context: e.target.value })}
                className="w-full bg-[#07080B] border border-white/15 px-3.5 py-2.5 text-sm text-[#F4F4F0] focus:outline-none focus:border-[#D4FF00]"
              >
                <option value="Software Engineering Internship / Full-Time Role">
                  Software Engineering Internship / Full-Time Role
                </option>
                <option value="Full-Stack Web Architecture Collaboration">
                  Full-Stack Web Architecture Collaboration
                </option>
                <option value="Applied Computer Vision / AI Discussion">
                  Applied Computer Vision / AI Discussion
                </option>
                <option value="Hackathon / Engineering Project Inquiry">
                  Hackathon / Engineering Project Inquiry
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="inquiry-message"
                className="block font-mono text-xs text-[#9499A3] mb-1.5"
              >
                MESSAGE PAYLOAD *
              </label>
              <textarea
                id="inquiry-message"
                rows={4}
                required
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Share your role requirements, project scope, or collaboration context..."
                className="w-full bg-[#07080B] border border-white/15 p-3.5 text-sm text-[#F4F4F0] focus:outline-none focus:border-[#D4FF00]"
              />
            </div>

            {/* Action Buttons: Mailto + Copy Payload */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="px-6 py-3.5 bg-[#D4FF00] text-[#0A0B0E] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#e2ff4d] transition-all cursor-pointer shadow-[0_0_20px_rgba(212,255,0,0.2)]"
              >
                <Mail className="w-4 h-4" />
                <span>Transmit via Native Mail Client</span>
              </button>

              <button
                type="button"
                onClick={handleCopyInquiry}
                className="px-5 py-3.5 bg-[#07080B] border border-white/20 hover:border-[#D4FF00] text-[#F4F4F0] font-mono text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                {contactCopied ? (
                  <>
                    <Check className="w-4 h-4 text-[#D4FF00]" />
                    <span className="text-[#D4FF00]">PAYLOAD COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#9499A3]" />
                    <span>Copy Formatted Payload for LinkedIn / X</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] font-mono text-[#9499A3] pt-1">
              * Zero fake success banners: launches your native email client with pre-filled headers, or copies the structured message to your clipboard for direct messaging on LinkedIn/X.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
