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
  Copy
} from 'lucide-react';

export function ContactSection() {
  const { profile } = PORTFOLIO_DATA;
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    context: 'Software Engineering Internship / Role',
    message: ''
  });
  const [contactCopied, setContactCopied] = useState(false);

  const formattedInquiryText = useMemo(() => {
    return [
      `To: Shivam Keshari (${profile.links.linkedin})`,
      `From: ${contactForm.name || '[Your Name]'} (${contactForm.email || '[Your Email]'})`,
      `Context: ${contactForm.context}`,
      `----------------------------------------`,
      contactForm.message ||
        'Hello Shivam, I reviewed your engineering portfolio and would love to connect regarding...'
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
    <section id="contact" className="py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Links & Availability Context (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest mb-2">
              05 {'//'} INITIATE CONNECTION
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#F4F4F0] tracking-tight">
              Let’s Discuss Engineering Roles & Projects.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#9499A3] leading-relaxed">
            Currently completing my B.Tech in Computer Science & Engineering (Class of 2027)
            and open to software engineering internships, full-stack product builds, and
            applied AI collaborations.
          </p>

          {/* Verified Social Channels List */}
          <div className="space-y-3 pt-2">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#111318] border border-white/10 hover:border-[#D4FF00] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <GithubIcon className="w-5 h-5 text-[#D4FF00]" />
                <div>
                  <div className="font-mono text-xs font-bold text-[#F4F4F0]">GITHUB</div>
                  <div className="font-mono text-xs text-[#9499A3]">github.com/S1h2i3v4a</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#9499A3] group-hover:text-[#D4FF00]" />
            </a>

            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#111318] border border-white/10 hover:border-[#D4FF00] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <LinkedinIcon className="w-5 h-5 text-[#D4FF00]" />
                <div>
                  <div className="font-mono text-xs font-bold text-[#F4F4F0]">LINKEDIN</div>
                  <div className="font-mono text-xs text-[#9499A3]">
                    linkedin.com/in/shivam15keshari
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#9499A3] group-hover:text-[#D4FF00]" />
            </a>

            <a
              href={profile.links.x}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#111318] border border-white/10 hover:border-[#D4FF00] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#D4FF00]" />
                <div>
                  <div className="font-mono text-xs font-bold text-[#F4F4F0]">X (TWITTER)</div>
                  <div className="font-mono text-xs text-[#9499A3]">x.com/ShivamK11959343</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#9499A3] group-hover:text-[#D4FF00]" />
            </a>

            <a
              href={profile.links.previousPortfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#111318] border border-white/10 hover:border-[#D4FF00] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-[#D4FF00]" />
                <div>
                  <div className="font-mono text-xs font-bold text-[#F4F4F0]">
                    PREVIOUS PORTFOLIO REFERENCE
                  </div>
                  <div className="font-mono text-xs text-[#9499A3]">
                    my-portfolio-od9l.onrender.com
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#9499A3] group-hover:text-[#D4FF00]" />
            </a>
          </div>
        </div>

        {/* Right Column: Honest, Functional Dispatch Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#111318] border border-white/10 p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 font-mono text-xs">
            <span className="text-[#F4F4F0] font-bold">DIRECT MESSAGE DISPATCHER</span>
            <span className="text-[#D4FF00]">VERIFIED MAILTO + PAYLOAD COPY</span>
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
                  className="w-full bg-[#0A0B0E] border border-white/15 px-3.5 py-2.5 text-sm text-[#F4F4F0] focus:outline-none focus:border-[#D4FF00]"
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
                  className="w-full bg-[#0A0B0E] border border-white/15 px-3.5 py-2.5 text-sm text-[#F4F4F0] focus:outline-none focus:border-[#D4FF00]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="inquiry-context"
                className="block font-mono text-xs text-[#9499A3] mb-1.5"
              >
                INQUIRY CONTEXT
              </label>
              <select
                id="inquiry-context"
                value={contactForm.context}
                onChange={(e) => setContactForm({ ...contactForm, context: e.target.value })}
                className="w-full bg-[#0A0B0E] border border-white/15 px-3.5 py-2.5 text-sm text-[#F4F4F0] focus:outline-none focus:border-[#D4FF00]"
              >
                <option value="Software Engineering Internship / Role">
                  Software Engineering Internship / Role
                </option>
                <option value="Full-Stack / AI Project Collaboration">
                  Full-Stack / AI Project Collaboration
                </option>
                <option value="Hackathon / Research Discussion">
                  Hackathon / Research Discussion
                </option>
                <option value="General Engineering Inquiry">
                  General Engineering Inquiry
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
                placeholder="Share project details, role requirements, or collaboration context..."
                className="w-full bg-[#0A0B0E] border border-white/15 p-3.5 text-sm text-[#F4F4F0] focus:outline-none focus:border-[#D4FF00]"
              />
            </div>

            {/* Real Action Buttons — Zero Fake Success Alerts */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="px-5 py-3 bg-[#D4FF00] text-[#0A0B0E] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#e1ff33] transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Mail Client (Mailto)</span>
              </button>

              <button
                type="button"
                onClick={handleCopyInquiry}
                className="px-4 py-3 bg-[#0A0B0E] border border-white/20 hover:border-[#D4FF00] text-[#F4F4F0] font-mono text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                {contactCopied ? (
                  <>
                    <Check className="w-4 h-4 text-[#D4FF00]" />
                    <span className="text-[#D4FF00]">COPIED FORMATTED MESSAGE</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#9499A3]" />
                    <span>Copy Formatted Message for LinkedIn / X</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] font-mono text-[#9499A3] pt-1">
              * Zero fake form submissions: launches your native mail client with pre-populated headers or copies the structured message to your clipboard for direct LinkedIn/X outreach.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
