'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HolographicBustSceneProps {
  reducedMotion: boolean;
}

export function HolographicBustScene({ reducedMotion }: HolographicBustSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 520;

    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    try {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x07090d, 0.02);

      camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(0, 0.6, 7.5);

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
    const ambientLight = new THREE.AmbientLight(0x0d1624, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xc7ff3e, 2.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLightCyan = new THREE.DirectionalLight(0x68e7ff, 3.0);
    rimLightCyan.position.set(-5, 2, -4);
    scene.add(rimLightCyan);

    const pedestalLight = new THREE.PointLight(0xc7ff3e, 2.8, 6);
    pedestalLight.position.set(0, -1.8, 0.8);
    scene.add(pedestalLight);

    // --- MATERIALS ---
    const marbleMat = new THREE.MeshStandardMaterial({
      color: 0xdde5ef,
      roughness: 0.28,
      metalness: 0.15,
      emissive: 0x051a24,
      emissiveIntensity: 0.25
    });

    const holographicWireMat = new THREE.MeshBasicMaterial({
      color: 0x68e7ff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });

    const neonLimeMat = new THREE.MeshBasicMaterial({
      color: 0xc7ff3e
    });

    const neonCyanMat = new THREE.MeshBasicMaterial({
      color: 0x68e7ff
    });

    // --- PROCEDURAL 3D NEOCLASSICAL HOLOGRAPHIC BUST ---
    const bustGroup = new THREE.Group();
    scene.add(bustGroup);

    // 1. Shoulders & Draped Chest (Classical Torso)
    const chestGeo = new THREE.CylinderGeometry(0.55, 0.9, 1.2, 16);
    chestGeo.scale(1.4, 1.0, 0.85);
    const chestMesh = new THREE.Mesh(chestGeo, marbleMat);
    chestMesh.position.set(0, -0.4, 0);
    bustGroup.add(chestMesh);

    const chestWire = new THREE.Mesh(chestGeo, holographicWireMat);
    chestWire.position.set(0, -0.4, 0);
    bustGroup.add(chestWire);

    // Shoulder curve caps
    const shoulderGeo = new THREE.SphereGeometry(0.35, 16, 16);
    shoulderGeo.scale(1.2, 0.7, 0.9);
    const leftShoulder = new THREE.Mesh(shoulderGeo, marbleMat);
    leftShoulder.position.set(-0.95, -0.15, 0);
    bustGroup.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(shoulderGeo, marbleMat);
    rightShoulder.position.set(0.95, -0.15, 0);
    bustGroup.add(rightShoulder);

    // 2. Columnar Neck
    const neckGeo = new THREE.CylinderGeometry(0.38, 0.44, 0.7, 16);
    const neckMesh = new THREE.Mesh(neckGeo, marbleMat);
    neckMesh.position.set(0, 0.45, 0.05);
    bustGroup.add(neckMesh);

    const neckWire = new THREE.Mesh(neckGeo, holographicWireMat);
    neckWire.position.set(0, 0.45, 0.05);
    bustGroup.add(neckWire);

    // 3. Classical Head & Face Structure
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.25, 0.1);

    // Cranium / Face Base
    const headGeo = new THREE.SphereGeometry(0.65, 24, 20);
    headGeo.scale(0.85, 1.1, 0.95);
    const headMesh = new THREE.Mesh(headGeo, marbleMat);
    headGroup.add(headMesh);

    const headWire = new THREE.Mesh(headGeo, holographicWireMat);
    headGroup.add(headWire);

    // Chiseled Jawline
    const jawGeo = new THREE.ConeGeometry(0.48, 0.6, 6);
    jawGeo.rotateX(Math.PI);
    jawGeo.scale(1.0, 1.0, 0.75);
    const jawMesh = new THREE.Mesh(jawGeo, marbleMat);
    jawMesh.position.set(0, -0.42, 0.12);
    headGroup.add(jawMesh);

    // Classical Nose Bridge
    const noseGeo = new THREE.ConeGeometry(0.09, 0.38, 4);
    noseGeo.rotateX(-Math.PI / 3);
    const noseMesh = new THREE.Mesh(noseGeo, marbleMat);
    noseMesh.position.set(0, 0.05, 0.62);
    headGroup.add(noseMesh);

    // Classical Hair Curls (Clustered low-poly nodes around crown)
    const hairClusterGeo = new THREE.DodecahedronGeometry(0.2, 0);
    const curlPositions = [
      [-0.45, 0.45, 0.3], [0, 0.65, 0.35], [0.45, 0.45, 0.3],
      [-0.55, 0.25, 0.1], [0.55, 0.25, 0.1],
      [-0.3, 0.6, -0.2], [0.3, 0.6, -0.2], [0, 0.7, -0.1],
      [-0.45, 0.3, -0.35], [0.45, 0.3, -0.35], [0, 0.4, -0.45],
      [-0.2, 0.55, 0.42], [0.2, 0.55, 0.42]
    ];

    curlPositions.forEach((pos) => {
      const curl = new THREE.Mesh(hairClusterGeo, marbleMat);
      curl.position.set(pos[0], pos[1], pos[2]);
      curl.rotation.set(Math.random(), Math.random(), Math.random());
      headGroup.add(curl);
    });

    bustGroup.add(headGroup);

    // Position and gentle posture tilt
    bustGroup.position.set(0, 0.2, 0);
    bustGroup.rotation.set(0.05, -0.25, 0.02);

    // --- CYBERPUNK PEDESTAL ---
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -1.8, 0);

    const pedBase1 = new THREE.CylinderGeometry(1.6, 1.8, 0.25, 32);
    const pedMat = new THREE.MeshStandardMaterial({
      color: 0x090e17,
      roughness: 0.5,
      metalness: 0.6
    });
    pedestalGroup.add(new THREE.Mesh(pedBase1, pedMat));

    const pedBase2 = new THREE.CylinderGeometry(1.3, 1.5, 0.2, 32);
    pedBase2.translate(0, 0.22, 0);
    pedestalGroup.add(new THREE.Mesh(pedBase2, pedMat));

    // Pedestal Glowing Neon Rings
    const ring1Geo = new THREE.TorusGeometry(1.65, 0.03, 12, 64);
    ring1Geo.rotateX(Math.PI / 2);
    const ring1 = new THREE.Mesh(ring1Geo, neonLimeMat);
    ring1.position.set(0, 0.12, 0);
    pedestalGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.35, 0.03, 12, 64);
    ring2Geo.rotateX(Math.PI / 2);
    const ring2 = new THREE.Mesh(ring2Geo, neonCyanMat);
    ring2.position.set(0, 0.32, 0);
    pedestalGroup.add(ring2);

    scene.add(pedestalGroup);

    // --- SURROUNDING HOLOGRAPHIC ORBITAL ENERGY RINGS ---
    const ringOrbitGroup = new THREE.Group();
    ringOrbitGroup.position.set(0, 0.4, 0);

    const energyRingGeo1 = new THREE.TorusGeometry(2.1, 0.03, 12, 100);
    energyRingGeo1.rotateX(Math.PI / 3);
    const energyRing1 = new THREE.Mesh(energyRingGeo1, neonLimeMat);
    ringOrbitGroup.add(energyRing1);

    const energyRingGeo2 = new THREE.TorusGeometry(2.35, 0.025, 12, 100);
    energyRingGeo2.rotateX(-Math.PI / 3.2);
    energyRingGeo2.rotateY(Math.PI / 4);
    const energyRing2 = new THREE.Mesh(energyRingGeo2, neonCyanMat);
    ringOrbitGroup.add(energyRing2);

    scene.add(ringOrbitGroup);

    // --- RISING HOLOGRAPHIC PARTICLE AURA ---
    const sparkCount = 120;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 1.0 + Math.random() * 1.4;
      sparkPositions[i * 3] = Math.cos(theta) * r;
      sparkPositions[i * 3 + 1] = -1.6 + Math.random() * 3.6;
      sparkPositions[i * 3 + 2] = Math.sin(theta) * r;
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0xc7ff3e,
      size: 0.065,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparks);

    // --- MOUSE TRACKING ---
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
      width = container.clientWidth || 500;
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

      // Subtle breathing float and mouse response
      bustGroup.position.y = 0.2 + Math.sin(elapsed * 1.2) * 0.05;
      bustGroup.rotation.y = -0.25 + mouseX * 0.5 + Math.sin(elapsed * 0.4) * 0.06;
      bustGroup.rotation.x = 0.05 - mouseY * 0.35;

      // Rotating energy rings
      energyRing1.rotation.z = elapsed * 0.75;
      energyRing2.rotation.z = -elapsed * 0.65;

      // Rising spark particles
      const pos = sparkGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < sparkCount; i++) {
        let y = pos.getY(i) + 0.015;
        if (y > 2.2) y = -1.6;
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
      chestGeo.dispose();
      shoulderGeo.dispose();
      neckGeo.dispose();
      headGeo.dispose();
      jawGeo.dispose();
      noseGeo.dispose();
      hairClusterGeo.dispose();
      pedBase1.dispose();
      pedBase2.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      energyRingGeo1.dispose();
      energyRingGeo2.dispose();
      sparkGeo.dispose();
      marbleMat.dispose();
      holographicWireMat.dispose();
      neonLimeMat.dispose();
      neonCyanMat.dispose();
      pedMat.dispose();
      sparkMat.dispose();
    };
  }, [reducedMotion]);

  if (!webGlSupported || reducedMotion) {
    return (
      <div className="w-full h-[440px] sm:h-[500px] bg-[#07090D] border border-white/10 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <svg viewBox="0 0 240 240" className="w-44 h-44 text-[#C7FF3E] stroke-current fill-none">
          <circle cx="120" cy="90" r="45" strokeWidth="1.8" />
          <path d="M 85 130 C 85 180, 155 180, 155 130" strokeWidth="1.8" />
          <ellipse cx="120" cy="110" rx="90" ry="35" stroke="#68E7FF" strokeWidth="1.2" transform="rotate(-20 120 110)" />
          <rect x="70" y="190" width="100" height="24" rx="4" strokeWidth="1.5" />
        </svg>
        <span className="font-mono text-xs text-[#929CAA] mt-3 uppercase tracking-wider">
          Digital Sculpture [2D Blueprint Mode]
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[440px] sm:h-[500px] lg:h-[540px] relative flex items-center justify-center"
      aria-label="3D Holographic Classical Bust Sculpture"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute bottom-4 right-4 pointer-events-none font-mono text-[10px] text-[#697483] bg-[#07090D]/80 border border-white/10 px-2.5 py-1 backdrop-blur-sm">
        DIGITAL ARCHIVE // NEO-CLASSICAL IDENTITY
      </div>
    </div>
  );
}
