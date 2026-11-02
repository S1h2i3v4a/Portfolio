import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const viewport: Viewport = {
  themeColor: '#0A0B0E',
  colorScheme: 'dark'
};

export const metadata: Metadata = {
  title: 'Shivam Keshari — Full-Stack Developer & Applied AI Systems Builder',
  description:
    'Engineering practical full-stack systems, algorithmic rigor (300+ Java DSA), and applied AI workflows. Built for the Skillinf Portfolio Design Hackathon 2026.',
  keywords: [
    'Shivam Keshari',
    'Full-Stack Developer',
    'Next.js Portfolio',
    'React Developer',
    'Java DSA',
    'Applied AI',
    'Computer Vision',
    'EfficientNet',
    'Skillinf Hackathon 2026'
  ],
  authors: [{ name: 'Shivam Keshari', url: 'https://github.com/S1h2i3v4a' }],
  creator: 'Shivam Keshari',
  openGraph: {
    title: 'Shivam Keshari — Full-Stack Developer & Applied AI Systems Builder',
    description:
      'Engineering practical full-stack systems, algorithmic rigor in Java, and applied AI workflows. Final-year CSE student at United Institute of Technology.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Shivam Keshari Portfolio 2026'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shivam Keshari — Full-Stack Developer & Applied AI Systems Builder',
    description:
      'Engineering practical full-stack systems, algorithmic rigor in Java, and applied AI workflows.',
    creator: '@ShivamK11959343'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#0A0B0E] text-[#F4F4F0] selection:bg-[#D4FF00] selection:text-[#0A0B0E]`}
      >
        {children}
      </body>
    </html>
  );
}
