'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface QuantumViewerSectionProps {
  reducedMotion: boolean;
}

export function QuantumViewerSection({ reducedMotion }: QuantumViewerSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [mode, setMode] = useState<'quantum' | 'wireframe' | 'lattice'>('quantum');
  const [activePreset, setActivePreset] = useState<number>(0);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  const modeRef = useRef<'quantum' | 'wireframe' | 'lattice'>('quantum');
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  // Camera presets
  const presets = [
    { name: 'Isometric', pos: [0, 1.2, 8.5] as [number, number, number] },
    { name: 'Equatorial', pos: [0, 0, 8.0] as [number, number, number] },
    { name: 'Top-Down', pos: [0, 6.5, 6.0] as [number, number, number] }
  ];

  const targetCameraPos = useRef<[number, number, number]>([0, 1.2, 8.5]);

  const handleSelectPreset = (index: number) => {
    setActivePreset(index);
    targetCameraPos.current = presets[index].pos;
  };

  const handleNextPreset = () => {
    const next = (activePreset + 1) % presets.length;
    handleSelectPreset(next);
  };

  const handlePrevPreset = () => {
    const prev = (activePreset - 1 + presets.length) % presets.length;
    handleSelectPreset(prev);
  };

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 560;

    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    try {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x07090d, 0.018);

      camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(0, 1.2, 8.5);

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;
    } catch {
      setWebGlSupported(false);
      return;
    }

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0x0a1420, 2.0);
    scene.add(ambientLight);

    const dirLightLime = new THREE.DirectionalLight(0xc7ff3e, 2.5);
    dirLightLime.position.set(6, 6, 6);
    scene.add(dirLightLime);

    const dirLightCyan = new THREE.DirectionalLight(0x68e7ff, 2.8);
    dirLightCyan.position.set(-6, -4, -4);
    scene.add(dirLightCyan);

    const coreLight = new THREE.PointLight(0xc7ff3e, 3.5, 8);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // --- MAIN CORE ARTIFACT ---
    const artifactGroup = new THREE.Group();
    scene.add(artifactGroup);

    // 1. Quantum Faceted Crystal
    const crystalGeo = new THREE.OctahedronGeometry(1.6, 1);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x68e7ff,
      emissive: 0x082b24,
      emissiveIntensity: 0.6,
      roughness: 0.15,
      metalness: 0.2,
      transmission: 0.65,
      thickness: 1.2,
      transparent: true,
      opacity: 0.88,
      flatShading: true
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    artifactGroup.add(crystalMesh);

    // Inner Glowing Seed
    const seedGeo = new THREE.IcosahedronGeometry(0.75, 0);
    const seedMat = new THREE.MeshBasicMaterial({
      color: 0xc7ff3e,
      wireframe: true
    });
    const seedMesh = new THREE.Mesh(seedGeo, seedMat);
    artifactGroup.add(seedMesh);

    // 2. Wireframe Overlay
    const wireGeo = new THREE.WireframeGeometry(crystalGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xc7ff3e,
      transparent: true,
      opacity: 0.8
    });
    const wireLines = new THREE.LineSegments(wireGeo, wireMat);
    artifactGroup.add(wireLines);

    // 3. Lattice Node Geometry (for 'lattice' mode)
    const latticeGroup = new THREE.Group();
    const latticeNodes: THREE.Mesh[] = [];
    const latticePos = crystalGeo.attributes.position;
    const nodeSphereGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const nodeSphereMat = new THREE.MeshBasicMaterial({ color: 0x68e7ff });

    // Deduplicate vertices to spawn nodes at vertices
    const uniqueVertices: THREE.Vector3[] = [];
    for (let i = 0; i < latticePos.count; i++) {
      const v = new THREE.Vector3(latticePos.getX(i), latticePos.getY(i), latticePos.getZ(i));
      let isDuplicate = false;
      for (const u of uniqueVertices) {
        if (u.distanceTo(v) < 0.05) {
          isDuplicate = true;
          break;
        }
      }
      if (!isDuplicate) {
        uniqueVertices.push(v);
        const nodeMesh = new THREE.Mesh(nodeSphereGeo, nodeSphereMat);
        nodeMesh.position.copy(v);
        latticeGroup.add(nodeMesh);
        latticeNodes.push(nodeMesh);
      }
    }
    artifactGroup.add(latticeGroup);

    // 4. Dual Metallic & Glowing Orbital Rings
    const ringGroup = new THREE.Group();
    artifactGroup.add(ringGroup);

    // Inner Bronze / Metallic Ring
    const innerRingGeo = new THREE.TorusGeometry(2.6, 0.065, 16, 120);
    innerRingGeo.rotateX(Math.PI / 3);
    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0xc89d6b,
      metalness: 0.9,
      roughness: 0.25
    });
    const innerRing = new THREE.Mesh(innerRingGeo, bronzeMat);
    ringGroup.add(innerRing);

    // Outer Neon Cyan / Lime Ring
    const outerRingGeo = new THREE.TorusGeometry(3.6, 0.05, 16, 140);
    outerRingGeo.rotateX(-Math.PI / 3.5);
    outerRingGeo.rotateY(Math.PI / 6);
    const cyberRingMat = new THREE.MeshStandardMaterial({
      color: 0x11222e,
      emissive: 0x68e7ff,
      emissiveIntensity: 0.85,
      metalness: 0.7,
      roughness: 0.2
    });
    const outerRing = new THREE.Mesh(outerRingGeo, cyberRingMat);
    ringGroup.add(outerRing);

    // Third Thin Lime Equator Ring
    const equatorRingGeo = new THREE.TorusGeometry(3.1, 0.02, 12, 120);
    equatorRingGeo.rotateX(Math.PI / 2);
    const equatorRingMat = new THREE.MeshBasicMaterial({
      color: 0xc7ff3e,
      wireframe: true
    });
    const equatorRing = new THREE.Mesh(equatorRingGeo, equatorRingMat);
    ringGroup.add(equatorRing);

    // Satellites orbiting the rings
    const satGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const satMatLime = new THREE.MeshStandardMaterial({
      color: 0xc7ff3e,
      emissive: 0xc7ff3e,
      emissiveIntensity: 1.0
    });
    const satMatCyan = new THREE.MeshStandardMaterial({
      color: 0x68e7ff,
      emissive: 0x68e7ff,
      emissiveIntensity: 1.0
    });

    const sat1 = new THREE.Mesh(satGeo, satMatLime);
    const sat2 = new THREE.Mesh(satGeo, satMatCyan);
    const sat3 = new THREE.Mesh(satGeo, satMatLime);
    ringGroup.add(sat1);
    ringGroup.add(sat2);
    ringGroup.add(sat3);

    // 5. Base Pedestal Platform with Energy Rings
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -2.6, 0);

    const baseGeo1 = new THREE.CylinderGeometry(2.8, 3.2, 0.2, 32);
    const baseMatDark = new THREE.MeshStandardMaterial({
      color: 0x090e16,
      roughness: 0.6,
      metalness: 0.5
    });
    const base1 = new THREE.Mesh(baseGeo1, baseMatDark);
    pedestalGroup.add(base1);

    const baseRingGeo = new THREE.TorusGeometry(2.9, 0.035, 12, 64);
    baseRingGeo.rotateX(Math.PI / 2);
    const baseRing = new THREE.Mesh(baseRingGeo, new THREE.MeshBasicMaterial({ color: 0xc7ff3e }));
    baseRing.position.set(0, 0.1, 0);
    pedestalGroup.add(baseRing);

    const baseRingInner = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.025, 12, 64).rotateX(Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0x68e7ff })
    );
    baseRingInner.position.set(0, 0.1, 0);
    pedestalGroup.add(baseRingInner);

    artifactGroup.add(pedestalGroup);

    // Surrounding ambient particle halo
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;
      particlePos[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePos[i * 3 + 1] = radius * Math.sin(phi);
      particlePos[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc7ff3e,
      size: 0.065,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    artifactGroup.add(particles);

    // --- INTERACTION: DRAG TO ROTATE & SCROLL TO ZOOM ---
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotVelX = 0.005;
    let rotVelY = 0.008;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      artifactGroup.rotation.y += deltaX * 0.008;
      artifactGroup.rotation.x += deltaY * 0.008;

      rotVelX = deltaY * 0.002;
      rotVelY = deltaX * 0.002;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = THREE.MathUtils.clamp(camera.position.z + e.deltaY * 0.005, 5.0, 14.0);
    };

    // Touch controls
    let prevTouchX = 0;
    let prevTouchY = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevTouchX = e.touches[0].clientX;
        prevTouchY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevTouchX;
      const deltaY = e.touches[0].clientY - prevTouchY;
      prevTouchX = e.touches[0].clientX;
      prevTouchY = e.touches[0].clientY;

      artifactGroup.rotation.y += deltaX * 0.01;
      artifactGroup.rotation.x += deltaY * 0.01;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    // Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || 800;
      height = container.clientHeight || 560;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // --- 60FPS RENDER LOOP ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation towards active preset
      camera.position.x += (targetCameraPos.current[0] - camera.position.x) * 0.05;
      camera.position.y += (targetCameraPos.current[1] - camera.position.y) * 0.05;
      camera.position.z += (targetCameraPos.current[2] - camera.position.z) * 0.05;
      camera.lookAt(0, 0, 0);

      // Handle rendering modes dynamically
      const activeMode = modeRef.current;
      if (activeMode === 'quantum') {
        crystalMesh.visible = true;
        crystalMat.wireframe = false;
        wireLines.visible = true;
        wireMat.opacity = 0.5;
        latticeGroup.visible = false;
      } else if (activeMode === 'wireframe') {
        crystalMesh.visible = true;
        crystalMat.wireframe = true;
        wireLines.visible = true;
        wireMat.opacity = 0.9;
        latticeGroup.visible = false;
      } else if (activeMode === 'lattice') {
        crystalMesh.visible = false;
        wireLines.visible = true;
        wireMat.opacity = 0.4;
        latticeGroup.visible = true;
      }

      // Inertial auto-rotation when not dragging
      if (!isDragging) {
        artifactGroup.rotation.y += rotVelY;
        artifactGroup.rotation.x += rotVelX;
        rotVelX *= 0.96;
        rotVelY = THREE.MathUtils.lerp(rotVelY, 0.006, 0.02);
      }

      // Pulsing crystal seed light
      coreLight.intensity = 2.8 + Math.sin(elapsed * 3.5) * 0.8;
      seedMesh.rotation.y = -elapsed * 0.6;
      seedMesh.rotation.z = elapsed * 0.4;

      // Independent counter-rotation for orbital rings
      innerRing.rotation.z = elapsed * 0.8;
      outerRing.rotation.z = -elapsed * 0.6;
      equatorRing.rotation.z = elapsed * 0.4;

      // Satellites orbiting
      sat1.position.set(
        Math.cos(elapsed * 1.5) * 2.6,
        Math.sin(elapsed * 1.5) * 1.3,
        Math.sin(elapsed * 1.5) * 2.2
      );
      sat2.position.set(
        Math.cos(-elapsed * 1.2) * 3.6,
        Math.sin(-elapsed * 1.2) * 1.8,
        Math.sin(-elapsed * 1.2) * 3.0
      );
      sat3.position.set(
        Math.sin(elapsed * 0.9) * 3.1,
        0,
        Math.cos(elapsed * 0.9) * 3.1
      );

      particles.rotation.y = -elapsed * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      crystalGeo.dispose();
      seedGeo.dispose();
      wireGeo.dispose();
      nodeSphereGeo.dispose();
      innerRingGeo.dispose();
      outerRingGeo.dispose();
      equatorRingGeo.dispose();
      satGeo.dispose();
      baseGeo1.dispose();
      baseRingGeo.dispose();
      particleGeo.dispose();
      crystalMat.dispose();
      seedMat.dispose();
      wireMat.dispose();
      nodeSphereMat.dispose();
      bronzeMat.dispose();
      cyberRingMat.dispose();
      equatorRingMat.dispose();
      satMatLime.dispose();
      satMatCyan.dispose();
      baseMatDark.dispose();
      particleMat.dispose();
    };
  }, [reducedMotion]);

  const handleReset = () => {
    handleSelectPreset(0);
    targetCameraPos.current = [0, 1.2, 8.5];
  };

  return (
    <section id="showcase" className="py-16 sm:py-20 border-b border-white/[0.065] relative">
      {/* Panel container with glassmorphic border */}
      <div className="bg-[#090C11] border border-white/10 p-6 sm:p-8 lg:p-10 relative overflow-hidden group">
        {/* Subtle background glow */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(199,255,62,0.2) 0%, transparent 70%)'
          }}
        />

        {/* Top Header Strip matching Reference Image */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.065] pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C7FF3E] animate-pulse" />
            <h2 className="font-mono text-sm sm:text-base font-bold tracking-wider text-[#F4F7FB] uppercase">
              3D Quantum Viewer
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[#929CAA]">
              <Sparkles className="w-3.5 h-3.5 text-[#C7FF3E]" />
              <span>INTERACTIVE TENSOR KERNEL</span>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 border border-white/15 text-[#929CAA] hover:text-[#C7FF3E] hover:border-[#C7FF3E] transition-colors cursor-pointer"
              title="Reset 3D Viewpoint"
              aria-label="Reset 3D View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main 3D Canvas Area */}
        <div
          ref={containerRef}
          className="w-full h-[480px] sm:h-[560px] lg:h-[620px] relative bg-[#07090D] border border-white/[0.065] overflow-hidden"
        >
          {webGlSupported && !reducedMotion ? (
            <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <svg viewBox="0 0 240 240" className="w-48 h-48 text-[#C7FF3E] stroke-current fill-none">
                <polygon points="120,30 200,90 200,170 120,210 40,170 40,90" strokeWidth="1.5" />
                <polygon points="120,60 170,120 120,180 70,120" stroke="#68E7FF" strokeWidth="1.2" />
                <circle cx="120" cy="120" r="10" fill="#C7FF3E" />
              </svg>
              <p className="font-mono text-xs text-[#929CAA] mt-3 uppercase tracking-wider">
                Quantum Tensor Lattice [Static Vector Blueprint]
              </p>
            </div>
          )}

          {/* Left Mode Selection Buttons (Floating exactly as shown in reference) */}
          <div className="absolute top-6 left-6 z-10 flex flex-col gap-2.5">
            {(['quantum', 'wireframe', 'lattice'] as const).map((m) => {
              const isActive = mode === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`px-4 py-2 font-mono text-xs uppercase tracking-wider border rounded-full transition-all cursor-pointer text-left flex items-center gap-2 backdrop-blur-md ${
                    isActive
                      ? 'border-[#C7FF3E] bg-[#C7FF3E]/15 text-[#F4F7FB] font-bold shadow-[0_0_16px_rgba(199,255,62,0.25)]'
                      : 'border-white/10 bg-[#0D1219]/80 text-[#929CAA] hover:text-[#F4F7FB] hover:border-white/25'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#C7FF3E]' : 'bg-white/30'}`}
                  />
                  <span>{m.charAt(0).toUpperCase() + m.slice(1)}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Right Instruction Overlay exactly as in reference */}
          <div className="absolute bottom-6 right-6 z-10 pointer-events-none font-mono text-xs text-[#929CAA] text-right space-y-1 bg-[#07090D]/85 border border-white/10 p-3 backdrop-blur-md">
            <div className="text-[#F4F7FB] font-semibold">Drag to rotate</div>
            <div className="text-[#68E7FF]">Scroll to zoom</div>
            <div className="text-[#C7FF3E]">Click to interact</div>
          </div>

          {/* Bottom Center Carousel Navigation Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 bg-[#0D1219]/90 border border-white/15 px-3 py-1.5 rounded-full backdrop-blur-md font-mono text-xs">
            <button
              type="button"
              onClick={handlePrevPreset}
              className="p-1 text-[#929CAA] hover:text-[#C7FF3E] cursor-pointer"
              aria-label="Previous viewpoint"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {presets.map((p, idx) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => handleSelectPreset(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    activePreset === idx ? 'bg-[#C7FF3E] w-4' : 'bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Viewpoint ${p.name}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNextPreset}
              className="p-1 text-[#929CAA] hover:text-[#C7FF3E] cursor-pointer"
              aria-label="Next viewpoint"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
