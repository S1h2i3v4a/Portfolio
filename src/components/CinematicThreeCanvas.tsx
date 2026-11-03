'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Pause, Play } from 'lucide-react';

interface CinematicThreeCanvasProps {
  reducedMotion: boolean;
}

export function CinematicThreeCanvas({ reducedMotion }: CinematicThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Interactive controls state
  const [renderMode, setRenderMode] = useState<'quantum' | 'wireframe' | 'lattice'>('quantum');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check WebGL availability safely
    try {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090d, 0.018);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    // Position core slightly off-center (offset x slightly for editorial balance)
    camera.position.set(0.15, 0, 9.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    // 2. Cinematic Precision Lighting
    // Ambient light - deep cool tone
    const ambientLight = new THREE.AmbientLight(0x0e1520, 2.4);
    scene.add(ambientLight);

    // Directional Cyan lighting for cool depth
    const cyanKeyLight = new THREE.DirectionalLight(0x68e7ff, 3.8);
    cyanKeyLight.position.set(-8, 7, 7);
    scene.add(cyanKeyLight);

    // Directional Lime rim lighting
    const limeRimLight = new THREE.DirectionalLight(0xc7ff3e, 3.2);
    limeRimLight.position.set(8, -6, 5);
    scene.add(limeRimLight);

    // Core point light
    const corePointLight = new THREE.PointLight(0xc7ff3e, 2.8, 14);
    corePointLight.position.set(0, 0, 0);
    scene.add(corePointLight);

    // 3. Central Computational Artifact Hierarchy
    const rootGroup = new THREE.Group();
    // Subtle off-center position for balanced layout
    rootGroup.position.set(0.12, 0, 0);
    scene.add(rootGroup);

    // --- Core Component A: Faceted Central Icosahedron ---
    const innerGeom = new THREE.IcosahedronGeometry(1.4, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x090d14,
      emissive: 0xc7ff3e,
      emissiveIntensity: 0.65,
      roughness: 0.18,
      metalness: 0.88,
      wireframe: false
    });
    const innerCoreMesh = new THREE.Mesh(innerGeom, innerMat);
    rootGroup.add(innerCoreMesh);

    // --- Core Component B: Polyhedral Exoskeleton Edge Cage ---
    const exoGeom = new THREE.OctahedronGeometry(2.2, 0);
    const exoEdges = new THREE.EdgesGeometry(exoGeom);
    const exoLineMat = new THREE.LineBasicMaterial({
      color: 0x68e7ff,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.85
    });
    const exoCage = new THREE.LineSegments(exoEdges, exoLineMat);
    rootGroup.add(exoCage);

    // --- Core Component C: Layered Transparent Cyan Shell ---
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: 0x071520,
      emissive: 0x68e7ff,
      emissiveIntensity: 0.25,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.7,
      thickness: 1.2,
      transparent: true,
      opacity: 0.45
    });
    const shellMesh = new THREE.Mesh(exoGeom, shellMat);
    rootGroup.add(shellMesh);

    // --- Core Component D: Interactive Shockwave Pulse Ring ---
    const pulseRingGeom = new THREE.RingGeometry(1.6, 1.68, 64);
    const pulseRingMat = new THREE.MeshBasicMaterial({
      color: 0xc7ff3e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0
    });
    const pulseRing = new THREE.Mesh(pulseRingGeom, pulseRingMat);
    rootGroup.add(pulseRing);

    // 4. Multiple Independent Orbital Rings (Concentric Gimbal Array)
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x111923,
      emissive: 0x68e7ff,
      emissiveIntensity: 0.5,
      roughness: 0.25,
      metalness: 0.9
    });
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x17222c,
      emissive: 0xc7ff3e,
      emissiveIntensity: 0.45,
      roughness: 0.2,
      metalness: 0.85
    });
    const ringMat3 = new THREE.MeshStandardMaterial({
      color: 0x111923,
      emissive: 0x68e7ff,
      emissiveIntensity: 0.35,
      roughness: 0.3,
      metalness: 0.9
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.032, 16, 120), ringMat1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.75, 0.038, 16, 120), ringMat2);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.028, 16, 120), ringMat3);

    ring1.rotation.x = Math.PI / 3.2;
    ring2.rotation.y = Math.PI / 4.5;
    ring3.rotation.z = Math.PI / 6.0;

    rootGroup.add(ring1);
    rootGroup.add(ring2);
    rootGroup.add(ring3);

    // 5. Small Swarm of Orbital Dust Particles (Depth Simulation)
    const particleCount = 280;
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
      color: 0x68e7ff,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    rootGroup.add(particleSystem);

    // 6. Interaction & Mouse Physics
    let targetRotationX = 0.15;
    let targetRotationY = 0.25;
    let currentRotationX = 0.15;
    let currentRotationY = 0.25;

    let targetCameraX = 0.15;
    let targetCameraY = 0;
    let currentCameraX = 0.15;
    let currentCameraY = 0;

    let dragStartX = 0;
    let dragStartY = 0;
    let isUserDragging = false;
    let pulseScale = 1.0;
    let pulseOpacity = 0;

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
        // Pointer-responsive parallax: camera shifts opposite for genuine depth
        targetCameraX = 0.15 + normX * 1.2;
        targetCameraY = -normY * 0.9;

        // Subtle object tilt toward cursor
        targetRotationY = normX * 0.65;
        targetRotationX = normY * 0.45;
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      // Prevent default on canvas to avoid text-selection drag behavior
      e.preventDefault();
      isUserDragging = true;
      setIsDragging(true);
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    };

    const handlePointerUp = () => {
      isUserDragging = false;
      setIsDragging(false);
    };

    // Click triggers an energy shockwave ring pulse
    const handleClick = () => {
      pulseScale = 1.0;
      pulseOpacity = 0.95;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    container.addEventListener('click', handleClick);
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

    // 7. Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const mult = isPaused ? 0 : speedMultiplier;

      // Smooth inertia damping for object rotation
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;

      rootGroup.rotation.x = currentRotationX;
      rootGroup.rotation.y = currentRotationY + elapsed * 0.14 * mult;

      // Camera spatial parallax inertia
      currentCameraX += (targetCameraX - currentCameraX) * 0.05;
      currentCameraY += (targetCameraY - currentCameraY) * 0.05;
      camera.position.x = currentCameraX;
      camera.position.y = currentCameraY;
      camera.lookAt(rootGroup.position);

      // Independent multi-axis gimbal rotations at varying speeds
      ring1.rotation.z += 0.008 * mult;
      ring1.rotation.x += 0.005 * mult;

      ring2.rotation.y -= 0.011 * mult;
      ring2.rotation.z += 0.004 * mult;

      ring3.rotation.x += 0.006 * mult;
      ring3.rotation.y += 0.009 * mult;

      // Core pulse
      const pulse = 1 + Math.sin(elapsed * 2.4) * 0.07;
      innerCoreMesh.scale.set(pulse, pulse, pulse);
      corePointLight.intensity = 2.2 + Math.sin(elapsed * 3.2) * 0.8;

      // Animate shockwave ring
      if (pulseOpacity > 0.01) {
        pulseScale += 0.065;
        pulseOpacity *= 0.94;
        pulseRing.scale.set(pulseScale, pulseScale, 1);
        pulseRingMat.opacity = pulseOpacity;
      } else {
        pulseRingMat.opacity = 0;
      }

      // Rotate particle swarm
      particleSystem.rotation.y = elapsed * 0.035 * mult;
      particleSystem.rotation.z = elapsed * 0.02 * mult;

      // Visual Mode Material Swapping: 3 genuinely distinct states
      if (renderMode === 'wireframe') {
        innerMat.wireframe = true;
        shellMat.wireframe = true;
        innerMat.color.setHex(0x68e7ff);
        innerMat.emissive.setHex(0x68e7ff);
        exoLineMat.color.setHex(0xc7ff3e);
        ringMat1.wireframe = true;
        ringMat2.wireframe = true;
      } else if (renderMode === 'lattice') {
        innerMat.wireframe = true;
        shellMat.wireframe = false;
        shellMat.opacity = 0.12;
        innerMat.color.setHex(0xc7ff3e);
        innerMat.emissive.setHex(0xc7ff3e);
        exoLineMat.color.setHex(0x68e7ff);
        ringMat1.wireframe = false;
        ringMat2.wireframe = false;
      } else {
        // QUANTUM mode (Default)
        innerMat.wireframe = false;
        shellMat.wireframe = false;
        shellMat.opacity = 0.45;
        innerMat.color.setHex(0x090d14);
        innerMat.emissive.setHex(0xc7ff3e);
        exoLineMat.color.setHex(0x68e7ff);
        ringMat1.wireframe = false;
        ringMat2.wireframe = false;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('mouseup', handlePointerUp);
      renderer.dispose();
    };
  }, [reducedMotion, renderMode, speedMultiplier, isPaused]);

  const handleResetView = () => {
    setSpeedMultiplier(1);
    setIsPaused(false);
    setRenderMode('quantum');
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[480px] sm:h-[560px] lg:h-[640px] bg-[#07090D] border border-white/10 overflow-hidden flex flex-col justify-between group select-none shadow-[0_0_60px_rgba(0,0,0,0.85)] ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      aria-label="Interactive Three.js 3D Computational Artifact"
    >
      {/* Top HUD Telemetry Bar with Specified Secondary Technical Labels */}
      <div className="relative z-10 flex items-center justify-between px-4 py-2.5 border-b border-white/[0.065] bg-[#07090D]/85 backdrop-blur-md text-[11px] font-mono text-[#697483]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#C7FF3E] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#C7FF3E] animate-pulse" />
            WEBGL / ACTIVE
          </span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-[#929CAA]">CORE / 01</span>
        </div>
        <div className="flex items-center gap-4 text-[#929CAA]">
          <span className="text-[#68E7FF]">ORBITAL SYSTEM</span>
          <span className="hidden md:inline text-[#C7FF3E]">INTERACTION / ENABLED</span>
        </div>
      </div>

      {/* Main 3D Canvas / Reduced-Motion Fallback */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center">
        {reducedMotion || !webGlSupported ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative bg-[#090C11]">
            <svg
              viewBox="0 0 400 320"
              className="w-full max-w-[340px] h-auto stroke-[#C7FF3E]/80 fill-none"
              aria-label="Vector Blueprint Architecture"
            >
              <circle cx="200" cy="160" r="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
              <circle cx="200" cy="160" r="90" stroke="rgba(104,231,255,0.25)" />
              <polygon
                points="200,50 300,105 300,215 200,270 100,215 100,105"
                stroke="rgba(244,247,251,0.35)"
                strokeWidth="1.2"
              />
              <polygon
                points="200,80 270,160 200,240 130,160"
                stroke="#C7FF3E"
                strokeWidth="1.5"
              />
              <circle cx="200" cy="160" r="7" fill="#C7FF3E" />
              <text x="215" y="164" fill="#C7FF3E" fontSize="10" fontFamily="monospace">
                CORE / 01
              </text>
              <text x="135" y="40" fill="#929CAA" fontSize="9" fontFamily="monospace">
                PARAMETRIC COMPUTATIONAL ARTIFACT
              </text>
            </svg>
            <p className="text-xs font-mono text-[#697483] mt-3">
              [PREFERS-REDUCED-MOTION ACTIVE — 2D ARCHITECTURAL BLUEPRINT]
            </p>
          </div>
        ) : (
          <>
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Drag & Pulse Interaction Hint */}
            <div className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] text-[#697483] hidden sm:flex items-center gap-2">
              <span>[DRAG TO ROTATE • POINTER PARALLAX • CLICK TO PULSE]</span>
            </div>
          </>
        )}

        {/* Fine Architectural Reticle Brackets */}
        <div className="pointer-events-none absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-[#C7FF3E]/60" />
        <div className="pointer-events-none absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-[#C7FF3E]/60" />
        <div className="pointer-events-none absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-[#C7FF3E]/60" />
        <div className="pointer-events-none absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-[#C7FF3E]/60" />
      </div>

      {/* Interactive HUD Control Strip: Modes, Speed 1x/2x, Pause/Resume, Reset */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-t border-white/[0.065] bg-[#07090D]/95 text-xs font-mono">
        {/* 3 Visual Modes: QUANTUM, WIREFRAME, LATTICE */}
        <div className="flex items-center gap-1.5">
          <span className="text-[#697483] text-[11px] hidden sm:inline mr-1">MODE:</span>
          {(['quantum', 'wireframe', 'lattice'] as const).map((m) => (
            <button
              key={m}
              type="button"
              disabled={reducedMotion}
              onClick={() => setRenderMode(m)}
              className={`px-3 py-1 border text-[11px] uppercase transition-all cursor-pointer ${
                renderMode === m
                  ? 'border-[#C7FF3E] text-[#C7FF3E] bg-[#C7FF3E]/10 font-bold shadow-[0_0_12px_rgba(199,255,62,0.18)]'
                  : 'border-white/10 text-[#929CAA] hover:text-[#F4F7FB] hover:border-white/25'
              } disabled:opacity-30`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Playback & Speed Controls: Pause/Resume, 1x, 2x, Reset */}
        <div className="flex items-center gap-2.5">
          {/* Pause / Resume Control */}
          <button
            type="button"
            disabled={reducedMotion}
            onClick={() => setIsPaused((prev) => !prev)}
            title={isPaused ? 'Resume Rotation' : 'Pause Rotation'}
            className={`px-2 py-1 border text-[11px] font-mono flex items-center gap-1 cursor-pointer transition-colors ${
              isPaused
                ? 'border-[#C7FF3E] text-[#C7FF3E] bg-[#C7FF3E]/10 font-bold'
                : 'border-white/10 text-[#929CAA] hover:text-white hover:border-white/20'
            } disabled:opacity-30`}
          >
            {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            <span>{isPaused ? 'RESUME' : 'PAUSE'}</span>
          </button>

          {/* Speed Controls: 1x, 2x */}
          <div className="flex items-center gap-1 text-[11px] text-[#929CAA]">
            {[1, 2].map((spd) => (
              <button
                key={spd}
                type="button"
                disabled={reducedMotion || isPaused}
                onClick={() => setSpeedMultiplier(spd)}
                className={`px-2 py-1 border cursor-pointer transition-colors ${
                  speedMultiplier === spd && !isPaused
                    ? 'border-[#68E7FF] text-[#68E7FF] bg-[#68E7FF]/10 font-bold'
                    : 'border-white/10 text-[#929CAA] hover:text-white'
                } disabled:opacity-30`}
              >
                {spd}×
              </button>
            ))}
          </div>

          {/* Reset View Control */}
          <button
            type="button"
            disabled={reducedMotion}
            onClick={handleResetView}
            title="Reset View and Speed"
            className="p-1.5 border border-white/10 text-[#929CAA] hover:text-[#C7FF3E] hover:border-[#C7FF3E] transition-colors cursor-pointer disabled:opacity-30"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
