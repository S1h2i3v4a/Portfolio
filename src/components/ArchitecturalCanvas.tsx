'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ArchitecturalCanvasProps {
  reducedMotion: boolean;
}

export function ArchitecturalCanvas({ reducedMotion }: ArchitecturalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [wireframeMode, setWireframeMode] = useState<boolean>(true);
  const [pulseActive, setPulseActive] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const labels = [
      'REACT.19',
      'NEXT.APP',
      'JAVA.DSA',
      'EFFICIENTNET',
      'OPENCV.ROI',
      'MONGODB',
      'NODE.API',
      'TS.STRICT',
      'SYSTEM.HLD',
      'GRAPH.ALGO',
      'CNN.TENSOR',
      'REST.CORE'
    ];

    const phi = (1 + Math.sqrt(5)) / 2;
    const rawCoords: [number, number, number][] = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
      [0.6, 0, 0], [-0.6, 0, 0], [0, 0.6, 0], [0, -0.6, 0], [0, 0, 0.6], [0, 0, -0.6]
    ];

    const nodes = rawCoords.map((coord, idx) => {
      const isCore = idx >= 12;
      return {
        x: coord[0] * (isCore ? 75 : 85),
        y: coord[1] * (isCore ? 75 : 85),
        z: coord[2] * (isCore ? 75 : 85),
        isCore,
        label: labels[idx % labels.length],
        id: idx
      };
    });

    const edges: [number, number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 185) {
          edges.push([i, j, dist]);
        }
      }
    }

    let angleX = 0.35;
    let angleY = 0.55;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let tick = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / width - 0.5) * 2;
      const my = ((e.clientY - rect.top) / height - 0.5) * 2;
      targetMouseX = mx * 0.6;
      targetMouseY = my * 0.6;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      tick += 0.016;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) / 380;

      // Subtle architectural radar rings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;
      [90, 145, 195].forEach((r) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r * scale, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Crosshair axes
      ctx.beginPath();
      ctx.moveTo(cx - 210 * scale, cy);
      ctx.lineTo(cx + 210 * scale, cy);
      ctx.moveTo(cx, cy - 210 * scale);
      ctx.lineTo(cx, cy + 210 * scale);
      ctx.strokeStyle = 'rgba(212, 255, 0, 0.06)';
      ctx.stroke();

      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      angleY += 0.0045 * rotationSpeed;
      angleX += 0.0025 * rotationSpeed;

      const rx = angleX + currentMouseY;
      const ry = angleY + currentMouseX;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      // Project 3D points to 2D
      const projected = nodes.map((n) => {
        const pulseFactor = pulseActive && n.isCore ? 1 + Math.sin(tick * 3 + n.id) * 0.12 : 1;
        const nx = n.x * pulseFactor * scale;
        const ny = n.y * pulseFactor * scale;
        const nz = n.z * pulseFactor * scale;

        const x1 = nx * cosY - nz * sinY;
        const z1 = nz * cosY + nx * sinY;
        const y2 = ny * cosX - z1 * sinX;
        const z2 = z1 * cosX + ny * sinX;

        const fov = 460;
        const perspective = fov / (fov + z2);
        return {
          x: cx + x1 * perspective,
          y: cy + y2 * perspective,
          z: z2,
          perspective,
          isCore: n.isCore,
          label: n.label,
          id: n.id
        };
      });

      // Draw edges sorted by depth
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const depthAlpha = Math.max(0.06, Math.min(0.65, (avgZ + 180) / 340));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        if (p1.isCore && p2.isCore) {
          ctx.strokeStyle = `rgba(212, 255, 0, ${depthAlpha * 0.75})`;
          ctx.lineWidth = 1.4;
        } else if (p1.isCore || p2.isCore) {
          ctx.strokeStyle = `rgba(212, 255, 0, ${depthAlpha * 0.28})`;
          ctx.lineWidth = 0.9;
        } else {
          ctx.strokeStyle = wireframeMode
            ? `rgba(244, 244, 240, ${depthAlpha * 0.35})`
            : `rgba(212, 255, 0, ${depthAlpha * 0.18})`;
          ctx.lineWidth = 1;
        }
        ctx.stroke();

        // Data packets on core edges
        if (pulseActive && (i + j) % 5 === 0) {
          const t = (tick * 0.45 + i * 0.17) % 1;
          const px = p1.x + (p2.x - p1.x) * t;
          const py = p1.y + (p2.y - p1.y) * t;
          ctx.fillStyle = '#D4FF00';
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw vertices & tags
      projected.forEach((p, idx) => {
        const alpha = Math.max(0.2, Math.min(1, (p.z + 170) / 320));
        const radius = p.isCore ? 4 * p.perspective : 2.8 * p.perspective;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isCore ? `rgba(212, 255, 0, ${alpha})` : `rgba(244, 244, 240, ${alpha})`;
        ctx.fill();

        if (p.isCore || (idx % 3 === 0 && p.z > 20)) {
          ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
          ctx.fillStyle = p.isCore
            ? `rgba(212, 255, 0, ${alpha * 0.9})`
            : `rgba(148, 153, 163, ${alpha * 0.75})`;
          ctx.fillText(p.label, p.x + 8, p.y + 3);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [reducedMotion, wireframeMode, pulseActive, rotationSpeed]);

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[500px] bg-[#0D0F14] border border-white/10 rounded-none overflow-hidden flex flex-col justify-between group">
      {/* Top Blueprint Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#0A0B0E]/80 backdrop-blur-sm text-[11px] font-mono text-[#9499A3]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[#D4FF00] animate-pulse" />
          <span className="text-[#F4F4F0] font-medium">SYS.CORE // 3D TENSOR LATTICE</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>NODES: 18</span>
          <span>MODE: {reducedMotion ? 'STATIC.BLUEPRINT' : wireframeMode ? 'WIREFRAME' : 'HYBRID'}</span>
        </div>
      </div>

      {/* Main Visual Canvas or Static Architectural Blueprint */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center">
        {reducedMotion ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative">
            <svg
              viewBox="0 0 400 300"
              className="w-full max-w-[340px] h-auto stroke-[#D4FF00]/70 fill-none"
              aria-label="Static architectural blueprint diagram"
            >
              <circle cx="200" cy="150" r="110" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
              <circle cx="200" cy="150" r="75" stroke="rgba(212,255,0,0.25)" />
              <polygon
                points="200,45 295,100 295,200 200,255 105,200 105,100"
                stroke="rgba(244,244,240,0.4)"
                strokeWidth="1.2"
              />
              <polygon
                points="200,75 268,150 200,225 132,150"
                stroke="#D4FF00"
                strokeWidth="1.5"
              />
              <line x1="105" y1="100" x2="295" y2="200" stroke="rgba(255,255,255,0.15)" />
              <line x1="295" y1="100" x2="105" y2="200" stroke="rgba(255,255,255,0.15)" />
              <circle cx="200" cy="150" r="5" fill="#D4FF00" />
              <text x="212" y="153" fill="#D4FF00" fontSize="10" fontFamily="monospace">
                CORE.ARCHITECT
              </text>
              <text x="145" y="40" fill="#9499A3" fontSize="9" fontFamily="monospace">
                FULL-STACK // DSA // AI
              </text>
            </svg>
            <p className="text-xs font-mono text-[#9499A3] mt-2">
              [REDUCED MOTION ACTIVE — STATIC BLUEPRINT RENDER]
            </p>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing block"
            aria-label="Interactive 3D architectural lattice representing full-stack, DSA, and AI systems"
          />
        )}

        {/* Corner Architectural Crosshairs */}
        <div className="pointer-events-none absolute top-3 left-3 w-3 h-3 border-t border-l border-[#D4FF00]/50" />
        <div className="pointer-events-none absolute top-3 right-3 w-3 h-3 border-t border-r border-[#D4FF00]/50" />
        <div className="pointer-events-none absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#D4FF00]/50" />
        <div className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#D4FF00]/50" />
      </div>

      {/* Interactive Control Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-t border-white/10 bg-[#0A0B0E]/90 text-xs font-mono">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setWireframeMode((prev) => !prev)}
            disabled={reducedMotion}
            className={`px-2.5 py-1 border text-[11px] transition-colors ${
              wireframeMode
                ? 'border-[#D4FF00]/60 text-[#D4FF00] bg-[#D4FF00]/10'
                : 'border-white/15 text-[#9499A3] hover:text-white'
            } disabled:opacity-40`}
          >
            MESH: {wireframeMode ? 'ARCHITECT' : 'TENSOR'}
          </button>
          <button
            type="button"
            onClick={() => setPulseActive((prev) => !prev)}
            disabled={reducedMotion}
            className={`px-2.5 py-1 border text-[11px] transition-colors ${
              pulseActive
                ? 'border-[#D4FF00]/60 text-[#D4FF00] bg-[#D4FF00]/10'
                : 'border-white/15 text-[#9499A3] hover:text-white'
            } disabled:opacity-40`}
          >
            TELEMETRY: {pulseActive ? 'LIVE' : 'PAUSED'}
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#9499A3]">
          <span>ORBIT:</span>
          {[0, 1, 2.2].map((spd, idx) => (
            <button
              key={spd}
              type="button"
              disabled={reducedMotion}
              onClick={() => setRotationSpeed(spd)}
              className={`px-2 py-0.5 border ${
                rotationSpeed === spd
                  ? 'border-[#D4FF00] text-[#D4FF00]'
                  : 'border-white/10 text-[#9499A3] hover:text-white'
              } disabled:opacity-40`}
            >
              {idx === 0 ? '0x' : idx === 1 ? '1x' : '2x'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
