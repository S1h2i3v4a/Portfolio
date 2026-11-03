'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw } from 'lucide-react';

interface CinematicThreeCanvasProps {
  reducedMotion: boolean;
}

export function CinematicThreeCanvas({ reducedMotion }: CinematicThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Interactive controls state
  const [renderMode, setRenderMode] = useState<'quantum' | 'wireframe' | 'lattice'>('quantum');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [activeTelemetryNode, setActiveTelemetryNode] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0b0e, 0.018);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // 2. Lighting System (Electric Lime Key + Icy Cyan Accent + Ambient)
    const ambientLight = new THREE.AmbientLight(0x1a202c, 2.0);
    scene.add(ambientLight);

    const limeKeyLight = new THREE.DirectionalLight(0xd4ff00, 3.5);
    limeKeyLight.position.set(6, 8, 8);
    scene.add(limeKeyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 2.8);
    cyanRimLight.position.set(-8, -6, -6);
    scene.add(cyanRimLight);

    const corePulseLight = new THREE.PointLight(0xd4ff00, 3.0, 15);
    corePulseLight.position.set(0, 0, 0);
    scene.add(corePulseLight);

    // 3. Central Artifact Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Core 01: Inner Luminous Plasma Core
    const innerGeom = new THREE.IcosahedronGeometry(1.3, 3);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x0a0b0e,
      emissive: 0xd4ff00,
      emissiveIntensity: 0.85,
      roughness: 0.15,
      metalness: 0.9,
      wireframe: false
    });
    const innerCoreMesh = new THREE.Mesh(innerGeom, innerMat);
    rootGroup.add(innerCoreMesh);

    // Core 02: Polyhedral Tensor Exoskeleton (Octahedral Cage)
    const exoGeom = new THREE.OctahedronGeometry(2.1, 0);
    const exoEdges = new THREE.EdgesGeometry(exoGeom);
    const exoLineMat = new THREE.LineBasicMaterial({
      color: 0xd4ff00,
      linewidth: 2,
      transparent: true,
      opacity: 0.85
    });
    const exoCage = new THREE.LineSegments(exoEdges, exoLineMat);
    rootGroup.add(exoCage);

    // Core 03: Faceted Glass Crystal Shell
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x111622,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.18,
      metalness: 0.1,
      roughness: 0.2,
      transmission: 0.6,
      thickness: 1.2,
      transparent: true,
      opacity: 0.45
    });
    const crystalMesh = new THREE.Mesh(exoGeom, crystalMat);
    rootGroup.add(crystalMesh);

    // 4. Multi-Axis Concentric Gimbal Orbital Rings
    const ringMaterials = [
      new THREE.MeshStandardMaterial({ color: 0x222a35, emissive: 0xd4ff00, emissiveIntensity: 0.35, roughness: 0.3, metalness: 0.8 }),
      new THREE.MeshStandardMaterial({ color: 0x18202c, emissive: 0x00f0ff, emissiveIntensity: 0.4, roughness: 0.2, metalness: 0.9 }),
      new THREE.MeshStandardMaterial({ color: 0x222a35, emissive: 0xd4ff00, emissiveIntensity: 0.25, roughness: 0.4, metalness: 0.7 })
    ];

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.032, 16, 120), ringMaterials[0]);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.7, 0.038, 16, 120), ringMaterials[1]);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(4.3, 0.028, 16, 120), ringMaterials[2]);

    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    ring3.rotation.z = Math.PI / 6;

    rootGroup.add(ring1);
    rootGroup.add(ring2);
    rootGroup.add(ring3);

    // 5. Interactive Telemetry Nodes Attached to Rings
    const nodeGeom = new THREE.SphereGeometry(0.12, 16, 16);
    const nodeSpecs = [
      { id: 'SYS.MERN', name: 'Full-Stack Architecture (MERN + Next.js)', ring: ring1, angle: 0, color: 0xd4ff00 },
      { id: 'SYS.DSA', name: 'Java Algorithmic Rigor (300+ Problems)', ring: ring1, angle: Math.PI, color: 0xd4ff00 },
      { id: 'SYS.CV', name: 'Applied AI (OpenCV + EfficientNet)', ring: ring2, angle: Math.PI / 2, color: 0x00f0ff },
      { id: 'SYS.REST', name: 'Resilient REST Contracts & Telemetry', ring: ring3, angle: Math.PI * 1.5, color: 0x00f0ff }
    ];

    const telemetryNodes: { mesh: THREE.Mesh; spec: typeof nodeSpecs[0] }[] = [];

    nodeSpecs.forEach((spec) => {
      const mat = new THREE.MeshStandardMaterial({
        color: spec.color,
        emissive: spec.color,
        emissiveIntensity: 0.9,
        roughness: 0.1
      });
      const nodeMesh = new THREE.Mesh(nodeGeom, mat);
      const r = spec.ring === ring1 ? 3.1 : spec.ring === ring2 ? 3.7 : 4.3;
      nodeMesh.position.set(Math.cos(spec.angle) * r, Math.sin(spec.angle) * r, 0);
      spec.ring.add(nodeMesh);
      telemetryNodes.push({ mesh: nodeMesh, spec });
    });

    // 6. Orbital Energy Particle Cloud (450 Particles)
    const particleCount = 450;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 2.4 + Math.random() * 3.8;

      particlePositions[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = rad * Math.cos(phi);
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd4ff00,
      size: 0.05,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    rootGroup.add(particleSystem);

    // 7. Mouse Physics, Drag, and Scroll Interaction
    let targetRotationX = 0.25;
    let targetRotationY = 0.35;
    let currentRotationX = 0.25;
    let currentRotationY = 0.35;
    let dragStartX = 0;
    let dragStartY = 0;
    let isUserDragging = false;
    let scrollYOffset = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / height - 0.5) * 2;

      if (isUserDragging) {
        const deltaX = (e.clientX - dragStartX) * 0.008;
        const deltaY = (e.clientY - dragStartY) * 0.008;
        targetRotationY += deltaX;
        targetRotationX += deltaY;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
      } else {
        targetRotationY = normX * 0.65;
        targetRotationX = normY * 0.45;
      }

      // Raycasting for interactive telemetry nodes
      const mouseVec = new THREE.Vector2(normX, -normY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouseVec, camera);
      const meshesToTest = telemetryNodes.map((t) => t.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const matched = telemetryNodes.find((t) => t.mesh === hitMesh);
        if (matched) {
          setActiveTelemetryNode(`${matched.spec.id}: ${matched.spec.name}`);
        }
      } else if (!isUserDragging) {
        setActiveTelemetryNode(null);
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      isUserDragging = true;
      setIsDragging(true);
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    };

    const handlePointerUp = () => {
      isUserDragging = false;
      setIsDragging(false);
    };

    const handleScroll = () => {
      scrollYOffset = window.scrollY * 0.0018;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 8. Render Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const mult = speedMultiplier;

      // Smooth inertia damping
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;

      rootGroup.rotation.x = currentRotationX + scrollYOffset * 0.4;
      rootGroup.rotation.y = currentRotationY + elapsed * 0.15 * mult;

      // Independent multi-axis gimbal rotations
      ring1.rotation.z += 0.008 * mult;
      ring1.rotation.x += 0.005 * mult;

      ring2.rotation.y -= 0.012 * mult;
      ring2.rotation.z += 0.004 * mult;

      ring3.rotation.x += 0.006 * mult;
      ring3.rotation.y += 0.009 * mult;

      // Breathing Core pulse
      const pulse = 1 + Math.sin(elapsed * 2.5) * 0.08;
      innerCoreMesh.scale.set(pulse, pulse, pulse);
      corePulseLight.intensity = 2.2 + Math.sin(elapsed * 3.5) * 0.8;

      // Rotate particle cloud
      particleSystem.rotation.y = elapsed * 0.04 * mult;
      particleSystem.rotation.z = elapsed * 0.02 * mult;

      // Dynamic Render Mode updates
      if (renderMode === 'wireframe') {
        innerMat.wireframe = true;
        crystalMat.wireframe = true;
      } else if (renderMode === 'lattice') {
        innerMat.wireframe = false;
        crystalMat.wireframe = true;
      } else {
        innerMat.wireframe = false;
        crystalMat.wireframe = false;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      renderer.dispose();
    };
  }, [reducedMotion, renderMode, speedMultiplier]);

  // Reset rotation view
  const handleResetView = () => {
    setSpeedMultiplier(1);
    setRenderMode('quantum');
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[420px] sm:h-[480px] lg:h-[560px] bg-[#07080B]/90 border border-white/10 overflow-hidden flex flex-col justify-between group select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      aria-label="Interactive 3D WebGL Computational Artifact"
    >
      {/* Top HUD Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#0A0B0E]/85 backdrop-blur-md text-[11px] font-mono text-[#9499A3]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-[#D4FF00] rounded-none animate-pulse" />
          <span className="text-[#F4F4F0] font-semibold tracking-wider">
            WEBGL.SYS // QUANTUM TENSOR ARTIFACT
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-[#00F0FF]">PBR SHADING: ACTIVE</span>
          <span>DAMPING: INERTIA</span>
          <span className="text-[#D4FF00]">FPS: ~60</span>
        </div>
      </div>

      {/* Main 3D Canvas or Reduced-Motion Blueprint Fallback */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center">
        {reducedMotion ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative bg-[#0A0B0E]">
            <svg
              viewBox="0 0 400 320"
              className="w-full max-w-[360px] h-auto stroke-[#D4FF00]/80 fill-none"
              aria-label="Static blueprint diagram"
            >
              <circle cx="200" cy="160" r="120" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
              <circle cx="200" cy="160" r="90" stroke="rgba(0,240,255,0.25)" />
              <polygon
                points="200,50 300,105 300,215 200,270 100,215 100,105"
                stroke="rgba(244,244,240,0.45)"
                strokeWidth="1.2"
              />
              <polygon
                points="200,80 270,160 200,240 130,160"
                stroke="#D4FF00"
                strokeWidth="1.6"
              />
              <circle cx="200" cy="160" r="8" fill="#D4FF00" />
              <text x="215" y="164" fill="#D4FF00" fontSize="10" fontFamily="monospace">
                QUANTUM.CORE
              </text>
              <text x="140" y="42" fill="#9499A3" fontSize="9" fontFamily="monospace">
                FULL-STACK // DSA // APPLIED AI
              </text>
            </svg>
            <p className="text-xs font-mono text-[#9499A3] mt-2">
              [PREFERS-REDUCED-MOTION ACTIVE — STATIC ARCHITECTURAL BLUEPRINT]
            </p>
          </div>
        ) : (
          <>
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Hover Telemetry Pill Tooltip */}
            {activeTelemetryNode && (
              <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-[#0A0B0E]/90 border border-[#D4FF00] font-mono text-xs text-[#D4FF00] backdrop-blur-sm pointer-events-none shadow-lg">
                <span className="animate-pulse mr-1.5">●</span>
                {activeTelemetryNode}
              </div>
            )}

            {/* Subtle Guidance Indicator */}
            <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] text-[#9499A3]/70 hidden sm:block">
              [DRAG TO ROTATE 3D PERSPECTIVE • HOVER NODES FOR SPEC]
            </div>
          </>
        )}

        {/* Precision Sci-Fi Corner Reticles */}
        <div className="pointer-events-none absolute top-3 left-3 w-3 h-3 border-t border-l border-[#D4FF00]/60" />
        <div className="pointer-events-none absolute top-3 right-3 w-3 h-3 border-t border-r border-[#D4FF00]/60" />
        <div className="pointer-events-none absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#D4FF00]/60" />
        <div className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#D4FF00]/60" />
      </div>

      {/* Interactive HUD Control Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-t border-white/10 bg-[#0A0B0E]/95 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="text-[#9499A3] text-[11px] hidden sm:inline mr-1">MATERIAL:</span>
          {(['quantum', 'wireframe', 'lattice'] as const).map((m) => (
            <button
              key={m}
              type="button"
              disabled={reducedMotion}
              onClick={() => setRenderMode(m)}
              className={`px-2.5 py-1 border text-[11px] uppercase transition-colors cursor-pointer ${
                renderMode === m
                  ? 'border-[#D4FF00] text-[#D4FF00] bg-[#D4FF00]/10 font-bold'
                  : 'border-white/15 text-[#9499A3] hover:text-white'
              } disabled:opacity-40`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-[#9499A3]">
            <span>WARP:</span>
            {[0, 1, 2.5].map((spd, idx) => (
              <button
                key={spd}
                type="button"
                disabled={reducedMotion}
                onClick={() => setSpeedMultiplier(spd)}
                className={`px-2 py-0.5 border cursor-pointer ${
                  speedMultiplier === spd
                    ? 'border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/10 font-bold'
                    : 'border-white/10 text-[#9499A3] hover:text-white'
                } disabled:opacity-40`}
              >
                {idx === 0 ? 'PAUSE' : idx === 1 ? '1X' : '2.5X'}
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={reducedMotion}
            onClick={handleResetView}
            title="Reset Camera Orientation"
            className="p-1 border border-white/15 text-[#9499A3] hover:text-[#D4FF00] hover:border-[#D4FF00] transition-colors cursor-pointer disabled:opacity-40"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
