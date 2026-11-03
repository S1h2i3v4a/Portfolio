'use client';

import React, { useState } from 'react';
import { Project } from '@/data/portfolioData';
import { Activity } from 'lucide-react';

interface InteractiveDemosProps {
  project: Project;
}

export function InteractiveDemos({ project }: InteractiveDemosProps) {
  // 1. Skin Disease Diagnostic Pipeline Inspector
  const [cvStage, setCvStage] = useState<number>(0);
  const cvStages = [
    {
      name: '1. Raw Clinical Input',
      metrics: 'Resolution: 224×224px | RGB Channels | Hair & Glare Present',
      confidence: 'Unprocessed Input',
      visualNote: 'Raw dermatological capture containing hair occlusions and uneven illumination.'
    },
    {
      name: '2. OpenCV Black-Hat + CLAHE',
      metrics: 'Kernel: 17×17 Morphological | Inpaint Radius: 3px | Contrast Normalized',
      confidence: 'Artifact Reduction: High',
      visualNote: 'Hair strands isolated via morphological black-hat filtering and inpainted; contrast equalized.'
    },
    {
      name: '3. Otsu ROI Lesion Masking',
      metrics: 'Threshold: Adaptive Otsu | Border Asymmetry & Area Ratio Computed',
      confidence: 'ROI Isolated',
      visualNote: 'Lesion boundary segmented from surrounding healthy epidermis for targeted feature extraction.'
    },
    {
      name: '4. EfficientNet + Severity Output',
      metrics: 'Backbone: EfficientNet-B0 | Dual Head: Class + Severity Stage',
      confidence: 'Predicted Stage: Moderate (Stage II) — Multi-Class Output Ready',
      visualNote: 'MBConv feature maps evaluated for texture, pigmentation variance, and severity staging.'
    }
  ];

  // 2. Expense Tracker Aggregation Simulator
  const [sampleExpenses, setSampleExpenses] = useState([
    { id: 1, title: 'Cloud Server & Domain', category: 'Engineering', amount: 1450 },
    { id: 2, title: 'DSA Reference Books', category: 'Education', amount: 890 },
    { id: 3, title: 'Campus Mess & Nutrition', category: 'Living', amount: 3200 },
    { id: 4, title: 'Hackathon Travel', category: 'Engineering', amount: 1800 }
  ]);
  const [newExpTitle, setNewExpTitle] = useState('');
  const [newExpAmount, setNewExpAmount] = useState('');
  const [newExpCat, setNewExpCat] = useState('Engineering');

  // 3. Mock API & Weather Telemetry Simulator
  const [mockStatus, setMockStatus] = useState<number>(200);
  const [selectedCity, setSelectedCity] = useState<'Prayagraj' | 'Bengaluru' | 'Mumbai' | 'Delhi'>('Prayagraj');
  const cityTelemetry = {
    Prayagraj: { temp: '31°C', humidity: '44%', wind: '12 km/h NW', pressure: '1008 hPa', condition: 'Clear Sky' },
    Bengaluru: { temp: '25°C', humidity: '62%', wind: '16 km/h W', pressure: '1012 hPa', condition: 'Partly Cloudy' },
    Mumbai: { temp: '30°C', humidity: '74%', wind: '19 km/h SW', pressure: '1009 hPa', condition: 'Humid Coastal' },
    Delhi: { temp: '33°C', humidity: '38%', wind: '14 km/h NW', pressure: '1007 hPa', condition: 'Warm & Hazy' }
  };

  if (project.interactiveType === 'cv-pipeline') {
    const activeStage = cvStages[cvStage];
    return (
      <div className="border border-white/10 bg-[#07090D] p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.065] pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#C7FF3E]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#F4F7FB]">
              Interactive Pipeline Inspector // OpenCV → EfficientNet
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#C7FF3E]">STAGE 0{cvStage + 1} / 04</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {cvStages.map((s, idx) => (
            <button
              key={s.name}
              type="button"
              onClick={() => setCvStage(idx)}
              className={`text-left p-2.5 border font-mono text-xs transition-all cursor-pointer ${
                cvStage === idx
                  ? 'border-[#C7FF3E] bg-[#C7FF3E]/10 text-[#F4F7FB] font-bold'
                  : 'border-white/10 bg-[#111923] text-[#929CAA] hover:border-white/30'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-[#0D1219] border border-white/10 p-4">
          <div className="flex flex-col items-center justify-center p-3 border border-white/10 bg-[#07090D] h-40 relative">
            <svg viewBox="0 0 160 120" className="w-36 h-28" aria-label="Simulated lesion segmentation render">
              <rect x="10" y="10" width="140" height="100" fill="#0D1219" stroke="rgba(255,255,255,0.12)" />
              <ellipse
                cx="80"
                cy="60"
                rx={cvStage >= 2 ? '32' : '30'}
                ry={cvStage >= 2 ? '24' : '22'}
                fill={cvStage === 2 ? 'rgba(104,231,255,0.22)' : 'rgba(220, 95, 75, 0.45)'}
                stroke={cvStage >= 2 ? '#68E7FF' : 'rgba(255,255,255,0.3)'}
                strokeWidth="1.5"
                strokeDasharray={cvStage === 2 ? '3 2' : 'none'}
              />
              {cvStage === 0 && (
                <>
                  <path d="M 30 25 Q 80 65 130 35" stroke="rgba(255,255,255,0.45)" strokeWidth="1" fill="none" />
                  <path d="M 45 95 Q 75 50 120 85" stroke="rgba(255,255,255,0.45)" strokeWidth="1" fill="none" />
                </>
              )}
              {cvStage === 3 && (
                <>
                  <rect x="42" y="30" width="76" height="60" fill="none" stroke="#C7FF3E" strokeWidth="1.2" />
                  <text x="45" y="26" fill="#C7FF3E" fontSize="8" fontFamily="monospace">
                    ROI // STAGE II
                  </text>
                </>
              )}
            </svg>
          </div>

          <div className="md:col-span-2 space-y-2">
            <div className="text-sm font-semibold text-[#F4F7FB]">{activeStage.name}</div>
            <p className="text-xs text-[#929CAA] leading-relaxed">{activeStage.visualNote}</p>
            <div className="pt-2 flex flex-wrap gap-2 font-mono text-[11px]">
              <span className="px-2 py-1 bg-[#07090D] border border-white/10 text-[#929CAA]">
                {activeStage.metrics}
              </span>
              <span className="px-2 py-1 bg-[#C7FF3E]/10 border border-[#C7FF3E]/40 text-[#C7FF3E]">
                {activeStage.confidence}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (project.interactiveType === 'budget-sim') {
    const totalSpend = sampleExpenses.reduce((acc, item) => acc + item.amount, 0);
    const handleAddExpense = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newExpTitle.trim() || !Number(newExpAmount)) return;
      setSampleExpenses((prev) => [
        ...prev,
        { id: Date.now(), title: newExpTitle.trim(), category: newExpCat, amount: Number(newExpAmount) }
      ]);
      setNewExpTitle('');
      setNewExpAmount('');
    };

    return (
      <div className="border border-white/10 bg-[#07090D] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.065] pb-3">
          <span className="font-mono text-xs uppercase text-[#F4F7FB]">
            Interactive MongoDB Aggregation Preview // Live Ledger
          </span>
          <span className="font-mono text-xs text-[#C7FF3E]">TOTAL: ₹{totalSpend.toLocaleString('en-IN')}</span>
        </div>

        <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <input
            type="text"
            placeholder="Transaction label..."
            value={newExpTitle}
            onChange={(e) => setNewExpTitle(e.target.value)}
            className="bg-[#111923] border border-white/15 px-3 py-1.5 text-xs text-[#F4F7FB] focus:outline-none focus:border-[#C7FF3E]"
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            value={newExpAmount}
            onChange={(e) => setNewExpAmount(e.target.value)}
            className="bg-[#111923] border border-white/15 px-3 py-1.5 text-xs text-[#F4F7FB] focus:outline-none focus:border-[#C7FF3E]"
          />
          <select
            value={newExpCat}
            onChange={(e) => setNewExpCat(e.target.value)}
            className="bg-[#111923] border border-white/15 px-3 py-1.5 text-xs text-[#F4F7FB] focus:outline-none focus:border-[#C7FF3E]"
          >
            <option value="Engineering">Engineering</option>
            <option value="Education">Education</option>
            <option value="Living">Living</option>
          </select>
          <button
            type="submit"
            className="bg-[#C7FF3E] hover:bg-[#bcf82e] text-[#07090D] font-mono text-xs font-semibold px-3 py-1.5 transition-colors cursor-pointer"
          >
            + APPEND LOG
          </button>
        </form>

        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {sampleExpenses.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-3 py-2 bg-[#111923] border border-white/5 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] px-1.5 py-0.5 border border-white/15 text-[#929CAA]">
                  {item.category}
                </span>
                <span className="text-[#E9EDF4]">{item.title}</span>
              </div>
              <span className="font-mono text-[#C7FF3E]">₹{item.amount.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border border-white/10 bg-[#07090D] p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.065] pb-3">
        <span className="font-mono text-xs uppercase text-[#F4F7FB]">
          Interactive Telemetry & Mock Payload Simulator
        </span>
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          {[200, 429, 500].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setMockStatus(code)}
              className={`px-2 py-0.5 border cursor-pointer ${
                mockStatus === code
                  ? 'border-[#C7FF3E] text-[#C7FF3E] bg-[#C7FF3E]/10'
                  : 'border-white/10 text-[#929CAA]'
              }`}
            >
              HTTP {code}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(cityTelemetry) as (keyof typeof cityTelemetry)[]).map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => setSelectedCity(city)}
            className={`px-3 py-1 text-xs font-mono border cursor-pointer ${
              selectedCity === city
                ? 'border-[#C7FF3E] bg-[#C7FF3E]/10 text-[#F4F7FB]'
                : 'border-white/10 bg-[#111923] text-[#929CAA]'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      <pre className="p-3 bg-[#111923] border border-white/10 text-[11px] font-mono text-[#F4F7FB] overflow-x-auto">
        {mockStatus === 200
          ? JSON.stringify(
              {
                status: 200,
                station: selectedCity,
                telemetry: cityTelemetry[selectedCity],
                schemaVerified: true
              },
              null,
              2
            )
          : JSON.stringify(
              {
                status: mockStatus,
                error: mockStatus === 429 ? 'RATE_LIMIT_EXCEEDED' : 'UPSTREAM_SENSOR_TIMEOUT',
                retryAfterMs: 1500,
                fallbackMode: 'CACHED_SNAPSHOT_ACTIVE'
              },
              null,
              2
            )}
      </pre>
    </div>
  );
}
