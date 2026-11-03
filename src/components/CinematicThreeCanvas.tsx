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
  const [clickPulse, setClickPulse] = useState<boolean>(false);

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080b, 0.016);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // 2. Cinematic Lighting System
    const ambientLight = new THREE.AmbientLight(0x161b26, 2.2);
    scene.add(ambientLight);

    const limeKeyLight = new THREE.DirectionalLight(0xd4ff00, 4.0);
    limeKeyLight.position.set(7, 9, 8);
    scene.add(limeKeyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 3.2);
    cyanRimLight.position.set(-8, -7, -6);
    scene.add(cyanRimLight);

    const corePulseLight = new THREE.PointLight(0xd4ff00, 3.5, 18);
    corePulseLight.position.set(0, 0, 0);
    scene.add(corePulseLight);

    // 3. Central Artifact Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Core 01: Inner Luminous Plasma Core (Icosahedron)
    const innerGeom = new THREE.IcosahedronGeometry(1.45, 3);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x080a0e,
      emissive: 0xd4ff00,
      emissiveIntensity: 0.9,
      roughness: 0.12,
      metalness: 0.92,
      wireframe: false
    });
    const innerCoreMesh = new THREE.Mesh(innerGeom, innerMat);
    rootGroup.add(innerCoreMesh);

    // Core 02: Polyhedral Tensor Exoskeleton (Octahedral Cage)
    const exoGeom = new THREE.OctahedronGeometry(2.35, 0);
    const exoEdges = new THREE.EdgesGeometry(exoGeom);
    const exoLineMat = new THREE.LineBasicMaterial({
      color: 0xd4ff00,
      linewidth: 2,
      transparent: true,
      opacity: 0.9
    });
    const exoCage = new THREE.LineSegments(exoEdges, exoLineMat);
    rootGroup.add(exoCage);

    // Core 03: Faceted Glass Crystal Shell
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x111622,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.22,
      metalness: 0.15,
      roughness: 0.15,
      transmission: 0.65,
      thickness: 1.4,
      transparent: true,
      opacity: 0.5
    });
    const crystalMesh = new THREE.Mesh(exoGeom, crystalMat);
    rootGroup.add(crystalMesh);

    // Core 04: Shockwave Pulse Ring (Triggered on Click)
    const pulseRingGeom = new THREE.RingGeometry(1.6, 1.7, 64);
    const pulseRingMat = new THREE.MeshBasicMaterial({
      color: 0xd4ff00,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0
    });
    const pulseRing = new THREE.Mesh(pulseRingGeom, pulseRingMat);
    rootGroup.add(pulseRing);

    // 4. Multi-Axis Concentric Gimbal Orbital Rings
    const ringMaterials = [
      new THREE.MeshStandardMaterial({ color: 0x242c38, emissive: 0xd4ff00, emissiveIntensity: 0.4, roughness: 0.25, metalness: 0.85 }),
      new THREE.MeshStandardMaterial({ color: 0x1a2432, emissive: 0x00f0ff, emissiveIntensity: 0.45, roughness: 0.2, metalness: 0.92 }),
      new THREE.MeshStandardMaterial({ color: 0x242c38, emissive: 0xd4ff00, emissiveIntensity: 0.3, roughness: 0.3, metalness: 0.8 })
    ];

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.3, 0.038, 16, 140), ringMaterials[0]);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.95, 0.042, 16, 140), ringMaterials[1]);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(4.65, 0.032, 16, 140), ringMaterials[2]);

    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    ring3.rotation.z = Math.PI / 6;

    rootGroup.add(ring1);
    rootGroup.add(ring2);
    rootGroup.add(ring3);

    // 5. Interactive Telemetry Nodes Attached to Rings
    const nodeGeom = new THREE.SphereGeometry(0.14, 16, 16);
    const nodeSpecs = [
      { id: 'SYS.MERN', name: 'Full-Stack Architecture (MERN + Next.js App Router)', ring: ring1, angle: 0, color: 0xd4ff00 },
      { id: 'SYS.DSA', name: 'Java Algorithmic Rigor (300+ Problems Solved)', ring: ring1, angle: Math.PI, color: 0xd4ff00 },
      { id: 'SYS.CV', name: 'Applied AI (OpenCV + EfficientNet Diagnosis)', ring: ring2, angle: Math.PI / 2, color: 0x00f0ff },
      { id: 'SYS.REST', name: 'Resilient REST Contracts & Telemetry Simulation', ring: ring3, angle: Math.PI * 1.5, color: 0x00f0ff }
    ];

    const telemetryNodes: { mesh: THREE.Mesh; spec: typeof nodeSpecs[0] }[] = [];

    nodeSpecs.forEach((spec) => {
      const mat = new THREE.MeshStandardMaterial({
        color: spec.color,
        emissive: spec.color,
        emissiveIntensity: 0.95,
        roughness: 0.1
      });
      const nodeMesh = new THREE.Mesh(nodeGeom, mat);
      const r = spec.ring === ring1 ? 3.3 : spec.ring === ring2 ? 3.95 : 4.65;
      nodeMesh.position.set(Math.cos(spec.angle) * r, Math.sin(spec.angle) * r, 0);
      spec.ring.add(nodeMesh);
      telemetryNodes.push({ mesh: nodeMesh, spec });
    });

    // 6. Orbital Energy Particle Swarm (550 Particles with 3D Depth)
    const particleCount = 550;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 2.6 + Math.random() * 4.2;

      particlePositions[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = rad * Math.cos(phi);
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd4ff00,
      size: 0.055,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    rootGroup.add(particleSystem);

    // 7. Mouse Physics, Drag, and Camera Spatial Parallax
    let targetRotationX = 0.2;
    let targetRotationY = 0.3;
    let currentRotationX = 0.2;
    let currentRotationY = 0.3;

    let targetCameraX = 0;
    let targetCameraY = 0;
    let currentCameraX = 0;
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
        const deltaX = (e.clientX - dragStartX) * 0.009;
        const deltaY = (e.clientY - dragStartY) * 0.009;
        targetRotationY += deltaX;
        targetRotationX += deltaY;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
      } else {
        // Spatial camera parallax: camera shifts opposite to mouse for true 3D depth
        targetCameraX = normX * 1.4;
        targetCameraY = -normY * 1.1;

        // Object gently turns toward cursor
        targetRotationY = normX * 0.75;
        targetRotationX = normY * 0.5;
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
          setActiveTelemetryNode(`${matched.spec.id} // ${matched.spec.name}`);
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

    // Click anywhere on canvas to trigger an energy shockwave ring!
    const handleClick = () => {
      pulseScale = 1.0;
      pulseOpacity = 0.9;
      setClickPulse(true);
      setTimeout(() => setClickPulse(false), 800);
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

    // 8. Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const mult = speedMultiplier;

      // Smooth inertia damping for object rotation
      currentRotationX += (targetRotationX - currentRotationX) * 0.055;
      currentRotationY += (targetRotationY - currentRotationY) * 0.055;

      rootGroup.rotation.x = currentRotationX;
      rootGroup.rotation.y = currentRotationY + elapsed * 0.16 * mult;

      // Camera spatial parallax inertia
      currentCameraX += (targetCameraX - currentCameraX) * 0.05;
      currentCameraY += (targetCameraY - currentCameraY) * 0.05;
      camera.position.x = currentCameraX;
      camera.position.y = currentCameraY;
      camera.lookAt(0, 0, 0);

      // Independent multi-axis gimbal rotations
      ring1.rotation.z += 0.009 * mult;
      ring1.rotation.x += 0.006 * mult;

      ring2.rotation.y -= 0.013 * mult;
      ring2.rotation.z += 0.005 * mult;

      ring3.rotation.x += 0.007 * mult;
      ring3.rotation.y += 0.010 * mult;

      // Breathing Core pulse
      const pulse = 1 + Math.sin(elapsed * 2.6) * 0.09;
      innerCoreMesh.scale.set(pulse, pulse, pulse);
      corePulseLight.intensity = 2.4 + Math.sin(elapsed * 3.6) * 1.0;

      // Animate shockwave pulse ring
      if (pulseOpacity > 0.01) {
        pulseScale += 0.07;
        pulseOpacity *= 0.94;
        pulseRing.scale.set(pulseScale, pulseScale, 1);
        pulseRingMat.opacity = pulseOpacity;
      } else {
        pulseRingMat.opacity = 0;
      }

      // Rotate particle swarm
      particleSystem.rotation.y = elapsed * 0.045 * mult;
      particleSystem.rotation.z = elapsed * 0.025 * mult;

      // Dynamic Render Mode updates
      if (renderMode === 'wireframe') {
        innerMat.wireframe = true;
        crystalMat.wireframe = true;
        innerMat.color.setHex(0x00f0ff);
        exoLineMat.color.setHex(0xd4ff00);
      } else if (renderMode === 'lattice') {
        innerMat.wireframe = true;
        crystalMat.wireframe = false;
        crystalMat.opacity = 0.15;
        innerMat.color.setHex(0xd4ff00);
        exoLineMat.color.setHex(0x00f0ff);
      } else {
        innerMat.wireframe = false;
        crystalMat.wireframe = false;
        crystalMat.opacity = 0.5;
        innerMat.color.setHex(0x080a0e);
        exoLineMat.color.setHex(0xd4ff00);
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
  }, [reducedMotion, renderMode, speedMultiplier]);

  const handleResetView = () => {
    setSpeedMultiplier(1);
    setRenderMode('quantum');
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[460px] sm:h-[540px] lg:h-[620px] bg-gradient-to-b from-[#0A0D14]/90 via-[#07080B]/95 to-[#050608] border border-white/10 overflow-hidden flex flex-col justify-between group select-none shadow-[0_0_50px_rgba(0,0,0,0.8)] ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      aria-label="Interactive 3D WebGL Computational Artifact"
    >
      {/* Top HUD Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#0A0B0E]/85 backdrop-blur-md text-[11px] font-mono text-[#9499A3]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-[#D4FF00] animate-pulse" />
          <span className="text-[#F4F4F0] font-bold tracking-wider">
            THREE.JS // WEBGL QUANTUM ARTIFACT
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-[#00F0FF]">PARALLAX CAMERA: ACTIVE</span>
          <span className="text-[#D4FF00]">RAYCASTING: ON</span>
          <span>60 FPS</span>
        </div>
      </div>

      {/* Main 3D Canvas / Fallback */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center">
        {reducedMotion ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative bg-[#07080B]">
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
              [PREFERS-REDUCED-MOTION ACTIVE — 2D BLUEPRINT RENDER]
            </p>
          </div>
        ) : (
          <>
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Hover Telemetry Pill */}
            {activeTelemetryNode && (
              <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 bg-[#07080B]/95 border border-[#D4FF00] font-mono text-xs text-[#D4FF00] backdrop-blur-md shadow-[0_0_20px_rgba(212,255,0,0.3)]">
                <span className="animate-pulse mr-2">●</span>
                {activeTelemetryNode}
              </div>
            )}

            {/* Subtle Click / Drag Indicator */}
            <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] text-[#9499A3]/80 hidden sm:flex items-center gap-2">
              <span>[DRAG TO ROTATE • HOVER NODES FOR SPEC • CLICK TO PULSE]</span>
              {clickPulse && <span className="text-[#D4FF00] font-bold animate-ping">PULSE EMITTED</span>}
            </div>
          </>
        )}

        {/* Sci-Fi Corner Reticles */}
        <div className="pointer-events-none absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#D4FF00]/70" />
        <div className="pointer-events-none absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#D4FF00]/70" />
        <div className="pointer-events-none absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#D4FF00]/70" />
        <div className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#D4FF00]/70" />
      </div>

      {/* Interactive HUD Control Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-t border-white/10 bg-[#0A0B0E]/95 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="text-[#9499A3] text-[11px] hidden sm:inline mr-1">STATE:</span>
          {(['quantum', 'wireframe', 'lattice'] as const).map((m) => (
            <button
              key={m}
              type="button"
              disabled={reducedMotion}
              onClick={() => setRenderMode(m)}
              className={`px-3 py-1 border text-[11px] uppercase transition-all cursor-pointer ${
                renderMode === m
                  ? 'border-[#D4FF00] text-[#D4FF00] bg-[#D4FF00]/15 font-bold shadow-[0_0_10px_rgba(212,255,0,0.2)]'
                  : 'border-white/15 text-[#9499A3] hover:text-white hover:border-white/40'
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
                    ? 'border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/15 font-bold'
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
