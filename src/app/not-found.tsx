import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#F4F4F0] flex flex-col items-center justify-center p-6 text-center selection:bg-[#D4FF00] selection:text-[#0A0B0E] font-sans">
      <div className="border border-white/10 bg-[#111318] p-8 sm:p-12 max-w-lg w-full space-y-6">
        <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-widest">
          ERROR 404 {'//'} ROUTE NOT FOUND
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F4F0]">
          Segment Outside System Boundary
        </h1>
        <p className="text-sm text-[#9499A3] leading-relaxed">
          The requested coordinate does not exist in the Shivam Keshari 2026 developer portfolio architecture.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#D4FF00] text-[#0A0B0E] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#e1ff33] transition-colors"
          >
            ← Return to System Overview
          </Link>
        </div>
      </div>
    </div>
  );
}
