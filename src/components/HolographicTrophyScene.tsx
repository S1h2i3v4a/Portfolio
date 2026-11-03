'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HolographicTrophySceneProps {
  reducedMotion: boolean;
}

export function HolographicTrophyScene({ reducedMotion }: HolographicTrophySceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || 480;
    let height = container.clientHeight || 520;

    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    try {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x07090d, 0.02);

      camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(0, 0.5, 7.5);

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
    } catch {
      setWebGlSupported(false);
      return;
    }

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0x0d1824, 2.0);
    scene.add(ambientLight);

    const dirLightLime = new THREE.DirectionalLight(0xc7ff3e, 2.8);
    dirLightLime.position.set(5, 5, 5);
    scene.add(dirLightLime);

    const dirLightCyan = new THREE.DirectionalLight(0x68e7ff, 3.0);
    dirLightCyan.position.set(-5, 3, -4);
    scene.add(dirLightCyan);

    const trophyInnerLight = new THREE.PointLight(0xc7ff3e, 3.2, 5);
    trophyInnerLight.position.set(0, 0.8, 0);
    scene.add(trophyInnerLight);

    // --- MATERIALS ---
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0xc4d7e8,
      roughness: 0.18,
      metalness: 0.85,
      emissive: 0x071e16,
      emissiveIntensity: 0.4
    });

    const holographicMat = new THREE.MeshBasicMaterial({
      color: 0x68e7ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });

    const neonLimeMat = new THREE.MeshBasicMaterial({ color: 0xc7ff3e });
    const neonCyanMat = new THREE.MeshBasicMaterial({ color: 0x68e7ff });

    // --- PROCEDURAL 3D TROPHY MODEL ---
    const trophyGroup = new THREE.Group();
    scene.add(trophyGroup);

    // 1. Plinth / Base
    const basePlinthGeo = new THREE.CylinderGeometry(0.8, 0.95, 0.35, 24);
    const basePlinth = new THREE.Mesh(basePlinthGeo, metalMat);
    basePlinth.position.set(0, -1.0, 0);
    trophyGroup.add(basePlinth);

    const plinthRingGeo = new THREE.TorusGeometry(0.85, 0.025, 8, 32);
    plinthRingGeo.rotateX(Math.PI / 2);
    const plinthRing = new THREE.Mesh(plinthRingGeo, neonLimeMat);
    plinthRing.position.set(0, -0.83, 0);
    trophyGroup.add(plinthRing);

    // 2. Slender Fluted Stem
    const stemGeo = new THREE.CylinderGeometry(0.2, 0.35, 0.65, 16);
    const stem = new THREE.Mesh(stemGeo, metalMat);
    stem.position.set(0, -0.5, 0);
    trophyGroup.add(stem);

    const stemNodeGeo = new THREE.SphereGeometry(0.28, 16, 16);
    const stemNode = new THREE.Mesh(stemNodeGeo, metalMat);
    stemNode.position.set(0, -0.3, 0);
    trophyGroup.add(stemNode);

    // 3. Chalice / Cup Body
    const cupBaseGeo = new THREE.CylinderGeometry(0.55, 0.25, 0.4, 24);
    const cupBase = new THREE.Mesh(cupBaseGeo, metalMat);
    cupBase.position.set(0, 0.0, 0);
    trophyGroup.add(cupBase);

    const cupMainGeo = new THREE.CylinderGeometry(1.0, 0.55, 1.1, 24, 1, true);
    const cupMain = new THREE.Mesh(cupMainGeo, metalMat);
    cupMain.position.set(0, 0.75, 0);
    trophyGroup.add(cupMain);

    const cupWire = new THREE.Mesh(cupMainGeo, holographicMat);
    cupWire.position.set(0, 0.75, 0);
    trophyGroup.add(cupWire);

    // Cup Rim
    const cupRimGeo = new THREE.TorusGeometry(1.0, 0.045, 12, 48);
    cupRimGeo.rotateX(Math.PI / 2);
    const cupRim = new THREE.Mesh(cupRimGeo, neonLimeMat);
    cupRim.position.set(0, 1.3, 0);
    trophyGroup.add(cupRim);

    // Inner Glowing Crystal inside Cup
    const innerGemGeo = new THREE.OctahedronGeometry(0.42, 0);
    const innerGem = new THREE.Mesh(innerGemGeo, new THREE.MeshBasicMaterial({ color: 0xc7ff3e, wireframe: true }));
    innerGem.position.set(0, 0.7, 0);
    trophyGroup.add(innerGem);

    // 4. Dual Sculpted Handles
    const handleCurveLeft = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.95, 1.2, 0),
      new THREE.Vector3(-1.6, 0.9, 0),
      new THREE.Vector3(-1.5, 0.3, 0),
      new THREE.Vector3(-0.6, 0.2, 0)
    ]);
    const handleGeoLeft = new THREE.TubeGeometry(handleCurveLeft, 24, 0.065, 10, false);
    const handleLeft = new THREE.Mesh(handleGeoLeft, metalMat);
    trophyGroup.add(handleLeft);

    const handleCurveRight = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.95, 1.2, 0),
      new THREE.Vector3(1.6, 0.9, 0),
      new THREE.Vector3(1.5, 0.3, 0),
      new THREE.Vector3(0.6, 0.2, 0)
    ]);
    const handleGeoRight = new THREE.TubeGeometry(handleCurveRight, 24, 0.065, 10, false);
    const handleRight = new THREE.Mesh(handleGeoRight, metalMat);
    trophyGroup.add(handleRight);

    // 5. Multi-Tiered Pedestal Base
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -1.65, 0);

    const pedGeo1 = new THREE.CylinderGeometry(1.6, 1.8, 0.25, 32);
    const pedMatDark = new THREE.MeshStandardMaterial({
      color: 0x090e17,
      roughness: 0.5,
      metalness: 0.6
    });
    pedestalGroup.add(new THREE.Mesh(pedGeo1, pedMatDark));

    const pedGeo2 = new THREE.CylinderGeometry(1.3, 1.45, 0.2, 32);
    pedGeo2.translate(0, 0.2, 0);
    pedestalGroup.add(new THREE.Mesh(pedGeo2, pedMatDark));

    const pedRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.65, 0.03, 12, 64).rotateX(Math.PI / 2),
      neonLimeMat
    );
    pedRing1.position.set(0, 0.12, 0);
    pedestalGroup.add(pedRing1);

    const pedRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.35, 0.03, 12, 64).rotateX(Math.PI / 2),
      neonCyanMat
    );
    pedRing2.position.set(0, 0.3, 0);
    pedestalGroup.add(pedRing2);

    scene.add(pedestalGroup);

    // --- RISING DOUBLE-HELIX ENERGY PARTICLES ---
    const helixParticleCount = 180;
    const helixGeo = new THREE.BufferGeometry();
    const helixPositions = new Float32Array(helixParticleCount * 3);
    const helixColors = new Float32Array(helixParticleCount * 3);

    for (let i = 0; i < helixParticleCount; i++) {
      const t = i / helixParticleCount;
      const angle = t * Math.PI * 8;
      const radius = 1.1 + Math.sin(t * Math.PI) * 0.4;
      const y = -1.5 + t * 3.8;

      // Strand 1 or Strand 2
      const strandAngle = i % 2 === 0 ? angle : angle + Math.PI;

      helixPositions[i * 3] = Math.cos(strandAngle) * radius;
      helixPositions[i * 3 + 1] = y;
      helixPositions[i * 3 + 2] = Math.sin(strandAngle) * radius;

      // Lime to Cyan gradient
      helixColors[i * 3] = i % 2 === 0 ? 0.78 : 0.41;
      helixColors[i * 3 + 1] = i % 2 === 0 ? 1.0 : 0.91;
      helixColors[i * 3 + 2] = i % 2 === 0 ? 0.24 : 1.0;
    }

    helixGeo.setAttribute('position', new THREE.BufferAttribute(helixPositions, 3));
    helixGeo.setAttribute('color', new THREE.BufferAttribute(helixColors, 3));

    const helixMat = new THREE.PointsMaterial({
      size: 0.075,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const helixPoints = new THREE.Points(helixGeo, helixMat);
    scene.add(helixPoints);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.4;
      targetY = y * 0.3;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || 480;
      height = container.clientHeight || 520;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // --- 60FPS RAF LOOP ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Gentle floating & rotation
      trophyGroup.rotation.y = elapsed * 0.45 + mouseX * 0.5;
      trophyGroup.rotation.x = 0.04 - mouseY * 0.25;
      trophyGroup.position.y = Math.sin(elapsed * 1.5) * 0.06;

      innerGem.rotation.y = -elapsed * 1.5;
      innerGem.rotation.z = elapsed * 1.2;

      trophyInnerLight.intensity = 2.8 + Math.sin(elapsed * 3.0) * 0.8;

      // Spiral particles upward
      helixPoints.rotation.y = -elapsed * 0.8;
      const pos = helixGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < helixParticleCount; i++) {
        let y = pos.getY(i) + 0.012;
        if (y > 2.4) y = -1.5;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      basePlinthGeo.dispose();
      plinthRingGeo.dispose();
      stemGeo.dispose();
      stemNodeGeo.dispose();
      cupBaseGeo.dispose();
      cupMainGeo.dispose();
      cupRimGeo.dispose();
      innerGemGeo.dispose();
      handleGeoLeft.dispose();
      handleGeoRight.dispose();
      pedGeo1.dispose();
      pedGeo2.dispose();
      helixGeo.dispose();
      metalMat.dispose();
      holographicMat.dispose();
      neonLimeMat.dispose();
      neonCyanMat.dispose();
      pedMatDark.dispose();
      helixMat.dispose();
    };
  }, [reducedMotion]);

  if (!webGlSupported || reducedMotion) {
    return (
      <div className="w-full h-[420px] sm:h-[480px] bg-[#07090D] border border-white/10 flex flex-col items-center justify-center p-6 text-center">
        <svg viewBox="0 0 200 240" className="w-36 h-48 text-[#C7FF3E] stroke-current fill-none">
          <path d="M 60 40 L 140 40 L 125 110 C 125 140, 75 140, 75 110 Z" strokeWidth="2" />
          <path d="M 60 55 C 30 55, 30 95, 75 100" strokeWidth="1.8" />
          <path d="M 140 55 C 170 55, 170 95, 125 100" strokeWidth="1.8" />
          <line x1="100" y1="135" x2="100" y2="180" strokeWidth="2.5" />
          <rect x="65" y="180" width="70" height="24" rx="3" strokeWidth="1.8" />
          <circle cx="100" cy="85" r="14" fill="#68E7FF" opacity="0.6" stroke="none" />
        </svg>
        <span className="font-mono text-xs text-[#929CAA] mt-3 uppercase tracking-wider">
          Achievement Monument [2D Mode]
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[440px] sm:h-[500px] lg:h-[540px] relative flex items-center justify-center"
      aria-label="3D Holographic Achievement Trophy Scene"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute bottom-4 right-4 pointer-events-none font-mono text-[10px] text-[#697483] bg-[#07090D]/80 border border-white/10 px-2.5 py-1 backdrop-blur-sm">
        ACADEMIC & HACKATHON MERIT // 3D MONUMENT
      </div>
    </div>
  );
}
