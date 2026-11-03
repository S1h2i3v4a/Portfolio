'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HolographicEnvelopeSceneProps {
  reducedMotion: boolean;
}

export function HolographicEnvelopeScene({ reducedMotion }: HolographicEnvelopeSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || 460;
    let height = container.clientHeight || 480;

    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    try {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x07090d, 0.02);

      camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(0, 0.4, 7.2);

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
    const ambientLight = new THREE.AmbientLight(0x0a1622, 2.0);
    scene.add(ambientLight);

    const dirLightLime = new THREE.DirectionalLight(0xc7ff3e, 2.5);
    dirLightLime.position.set(4, 5, 4);
    scene.add(dirLightLime);

    const dirLightCyan = new THREE.DirectionalLight(0x68e7ff, 3.0);
    dirLightCyan.position.set(-4, 3, -4);
    scene.add(dirLightCyan);

    const envelopeGlow = new THREE.PointLight(0x68e7ff, 2.8, 6);
    envelopeGlow.position.set(0, 0.2, 1.0);
    scene.add(envelopeGlow);

    // --- MATERIALS ---
    const glassBodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x071b28,
      emissive: 0x052a36,
      emissiveIntensity: 0.6,
      roughness: 0.12,
      metalness: 0.2,
      transmission: 0.75,
      thickness: 0.8,
      transparent: true,
      opacity: 0.85
    });

    const neonLimeMat = new THREE.MeshBasicMaterial({ color: 0xc7ff3e });
    const neonCyanMat = new THREE.MeshBasicMaterial({ color: 0x68e7ff });

    // --- PROCEDURAL 3D HOLOGRAPHIC ENVELOPE ---
    const envelopeGroup = new THREE.Group();
    scene.add(envelopeGroup);

    // 1. Envelope Main Body
    const bodyGeo = new THREE.BoxGeometry(2.4, 1.5, 0.2);
    const bodyMesh = new THREE.Mesh(bodyGeo, glassBodyMat);
    envelopeGroup.add(bodyMesh);

    // Envelope Glowing Edges
    const bodyEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(bodyGeo),
      new THREE.LineBasicMaterial({ color: 0x68e7ff, linewidth: 2 })
    );
    envelopeGroup.add(bodyEdges);

    // 2. Triangular Flap (Folded / slightly open)
    const flapShape = new THREE.Shape();
    flapShape.moveTo(-1.2, 0.75);
    flapShape.lineTo(1.2, 0.75);
    flapShape.lineTo(0, -0.15);
    flapShape.closePath();

    const flapGeo = new THREE.ShapeGeometry(flapShape);
    const flapMesh = new THREE.Mesh(
      flapGeo,
      new THREE.MeshBasicMaterial({
        color: 0x0a2233,
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide
      })
    );
    flapMesh.position.set(0, 0, 0.11);
    envelopeGroup.add(flapMesh);

    // Glowing flap seam lines (forming the classic envelope folds)
    const foldPoints = [
      new THREE.Vector3(-1.2, 0.75, 0.115),
      new THREE.Vector3(0, -0.15, 0.115),
      new THREE.Vector3(1.2, 0.75, 0.115),
      new THREE.Vector3(-1.2, -0.75, 0.115),
      new THREE.Vector3(0, -0.05, 0.115),
      new THREE.Vector3(1.2, -0.75, 0.115)
    ];
    const foldGeo = new THREE.BufferGeometry().setFromPoints(foldPoints);
    const foldLines = new THREE.Line(
      foldGeo,
      new THREE.LineBasicMaterial({ color: 0xc7ff3e, transparent: true, opacity: 0.9 })
    );
    envelopeGroup.add(foldLines);

    // 3. Holographic Letter / Digital Document inside
    const letterGeo = new THREE.PlaneGeometry(2.0, 1.2);
    const letterMat = new THREE.MeshBasicMaterial({
      color: 0xc7ff3e,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const letter = new THREE.Mesh(letterGeo, letterMat);
    letter.position.set(0, 0.35, 0);
    envelopeGroup.add(letter);

    // Laser Text Lines on Letter
    const lineMat = new THREE.LineBasicMaterial({ color: 0xc7ff3e, transparent: true, opacity: 0.75 });
    for (let i = 0; i < 4; i++) {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-0.7, 0.6 - i * 0.18, 0.01),
        new THREE.Vector3(0.7, 0.6 - i * 0.18, 0.01)
      ]);
      const textLine = new THREE.Line(lineGeo, lineMat);
      letter.add(textLine);
    }

    // Envelope tilt in 3D
    envelopeGroup.position.set(0, 0.3, 0);
    envelopeGroup.rotation.set(0.15, -0.2, 0.05);

    // --- CYBERPUNK PEDESTAL ---
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -1.8, 0);

    const pedGeo1 = new THREE.CylinderGeometry(1.8, 2.1, 0.25, 32);
    const pedMatDark = new THREE.MeshStandardMaterial({
      color: 0x090e17,
      roughness: 0.5,
      metalness: 0.6
    });
    pedestalGroup.add(new THREE.Mesh(pedGeo1, pedMatDark));

    const pedRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.85, 0.03, 12, 64).rotateX(Math.PI / 2),
      neonCyanMat
    );
    pedRing1.position.set(0, 0.12, 0);
    pedestalGroup.add(pedRing1);

    const pedRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.4, 0.025, 12, 64).rotateX(Math.PI / 2),
      neonLimeMat
    );
    pedRing2.position.set(0, 0.18, 0);
    pedestalGroup.add(pedRing2);

    scene.add(pedestalGroup);

    // Vertical Laser Beam projecting up from Pedestal
    const beamGeo = new THREE.CylinderGeometry(1.2, 1.2, 3.5, 32, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x68e7ff,
      transparent: true,
      opacity: 0.07,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const laserBeam = new THREE.Mesh(beamGeo, beamMat);
    laserBeam.position.set(0, 0, 0);
    pedestalGroup.add(laserBeam);

    // Laser Scanline ring floating up and down
    const scanRingGeo = new THREE.TorusGeometry(1.35, 0.02, 12, 64);
    scanRingGeo.rotateX(Math.PI / 2);
    const scanRing = new THREE.Mesh(scanRingGeo, neonLimeMat);
    scene.add(scanRing);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.35;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || 460;
      height = container.clientHeight || 480;
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

      // Floating envelope physics
      envelopeGroup.position.y = 0.3 + Math.sin(elapsed * 1.5) * 0.08;
      envelopeGroup.rotation.y = -0.2 + mouseX * 0.5 + Math.sin(elapsed * 0.6) * 0.05;
      envelopeGroup.rotation.x = 0.15 - mouseY * 0.35;

      // Gentle letter hover out of envelope
      letter.position.y = 0.35 + Math.sin(elapsed * 2.0) * 0.06;

      // Laser scanline floating up and down
      scanRing.position.y = -0.6 + Math.sin(elapsed * 2.2) * 1.2;

      envelopeGlow.intensity = 2.4 + Math.sin(elapsed * 3.0) * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      bodyGeo.dispose();
      flapGeo.dispose();
      foldGeo.dispose();
      letterGeo.dispose();
      pedGeo1.dispose();
      beamGeo.dispose();
      scanRingGeo.dispose();
      glassBodyMat.dispose();
      neonLimeMat.dispose();
      neonCyanMat.dispose();
      pedMatDark.dispose();
      beamMat.dispose();
    };
  }, [reducedMotion]);

  if (!webGlSupported || reducedMotion) {
    return (
      <div className="w-full h-[400px] sm:h-[460px] bg-[#07090D] border border-white/10 flex flex-col items-center justify-center p-6 text-center">
        <svg viewBox="0 0 240 200" className="w-48 h-40 text-[#C7FF3E] stroke-current fill-none">
          <rect x="30" y="40" width="180" height="120" rx="8" strokeWidth="2" />
          <path d="M 30 40 L 120 110 L 210 40" strokeWidth="2" />
          <path d="M 30 160 L 95 105 M 210 160 L 145 105" strokeWidth="1.5" stroke="#68E7FF" />
          <ellipse cx="120" cy="180" rx="80" ry="12" stroke="#C7FF3E" opacity="0.6" strokeDasharray="3 3" />
        </svg>
        <span className="font-mono text-xs text-[#929CAA] mt-3 uppercase tracking-wider">
          Holographic Dispatch [2D Blueprint Mode]
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[420px] sm:h-[480px] lg:h-[500px] relative flex items-center justify-center"
      aria-label="3D Holographic Envelope Scene"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute bottom-4 right-4 pointer-events-none font-mono text-[10px] text-[#697483] bg-[#07090D]/80 border border-white/10 px-2.5 py-1 backdrop-blur-sm">
        SECURE COMMUNICATIONS // ENCRYPTED DISPATCH
      </div>
    </div>
  );
}
