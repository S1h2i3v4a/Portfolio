'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SkillsConstellationSceneProps {
  reducedMotion: boolean;
  highlightedSkill: string | null;
}

export function SkillsConstellationScene({
  reducedMotion,
  highlightedSkill
}: SkillsConstellationSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  const highlightedRef = useRef<string | null>(highlightedSkill);
  useEffect(() => {
    highlightedRef.current = highlightedSkill;
  }, [highlightedSkill]);

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || 460;
    let height = container.clientHeight || 460;

    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    try {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(0, 0, 7.8);

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    } catch {
      setWebGlSupported(false);
      return;
    }

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0x0e1726, 2.0);
    scene.add(ambientLight);

    const centerPointLight = new THREE.PointLight(0xc7ff3e, 3.5, 8);
    scene.add(centerPointLight);

    const cyanRimLight = new THREE.PointLight(0x68e7ff, 2.2, 8);
    cyanRimLight.position.set(3, 3, 2);
    scene.add(cyanRimLight);

    // --- CONSTELLATION GROUP ---
    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // 1. Central Core Node: Glowing Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x091420,
      emissive: 0x082b24,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.3,
      transparent: true,
      opacity: 0.9,
      transmission: 0.4
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    constellationGroup.add(coreMesh);

    // Central Wireframe Shell
    const coreWireGeo = new THREE.WireframeGeometry(coreGeo);
    const coreWireMat = new THREE.LineBasicMaterial({
      color: 0xc7ff3e,
      transparent: true,
      opacity: 0.85
    });
    const coreWire = new THREE.LineSegments(coreWireGeo, coreWireMat);
    constellationGroup.add(coreWire);

    // Inner Glowing Core Sphere
    const innerCoreGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const innerCoreMat = new THREE.MeshBasicMaterial({ color: 0xc7ff3e });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    constellationGroup.add(innerCore);

    // Equator Pulse Ring around Core
    const pulseRingGeo = new THREE.TorusGeometry(1.2, 0.02, 12, 64);
    pulseRingGeo.rotateX(Math.PI / 2);
    const pulseRing = new THREE.Mesh(pulseRingGeo, new THREE.MeshBasicMaterial({ color: 0x68e7ff }));
    constellationGroup.add(pulseRing);

    // 2. Satellite Nodes (mapped to skills)
    const skillList = [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Python',
      'Three.js',
      'Node.js',
      'MongoDB',
      'Java'
    ];

    const satellites: {
      name: string;
      mesh: THREE.Mesh;
      wireMesh: THREE.Mesh;
      baseRadius: number;
      angle: number;
      speed: number;
      elevation: number;
      line: THREE.Line;
    }[] = [];

    const nodeGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const nodeWireGeo = new THREE.IcosahedronGeometry(0.24, 0);

    skillList.forEach((skillName, idx) => {
      const angle = (idx / skillList.length) * Math.PI * 2;
      const baseRadius = 2.4 + (idx % 2 === 0 ? 0.35 : -0.25);
      const elevation = Math.sin(idx * 1.5) * 0.7;

      const satMat = new THREE.MeshStandardMaterial({
        color: 0x07111b,
        emissive: 0x68e7ff,
        emissiveIntensity: 0.6,
        roughness: 0.3,
        metalness: 0.8
      });

      const satMesh = new THREE.Mesh(nodeGeo, satMat);
      satMesh.position.set(
        Math.cos(angle) * baseRadius,
        elevation,
        Math.sin(angle) * baseRadius
      );
      constellationGroup.add(satMesh);

      const wireMesh = new THREE.Mesh(
        nodeWireGeo,
        new THREE.MeshBasicMaterial({ color: 0xc7ff3e, wireframe: true })
      );
      satMesh.add(wireMesh);

      // Connecting Beam Line to Core
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        satMesh.position.clone()
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x68e7ff,
        transparent: true,
        opacity: 0.3
      });
      const line = new THREE.Line(lineGeo, lineMat);
      constellationGroup.add(line);

      satellites.push({
        name: skillName,
        mesh: satMesh,
        wireMesh,
        baseRadius,
        angle,
        speed: 0.3 + (idx % 3) * 0.1,
        elevation,
        line
      });
    });

    // 3. Inter-satellite Web Lines
    const webPairs = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Frontend web
      [4, 5], [5, 6], [6, 7], [7, 8], // Full-Stack & Systems web
      [1, 5], [4, 8]                   // Cross-cutting links
    ];

    const webLines: { line: THREE.Line; i1: number; i2: number }[] = [];
    webPairs.forEach(([i1, i2]) => {
      if (satellites[i1] && satellites[i2]) {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          satellites[i1].mesh.position,
          satellites[i2].mesh.position
        ]);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0xc7ff3e,
          transparent: true,
          opacity: 0.2
        });
        const line = new THREE.Line(lineGeo, lineMat);
        constellationGroup.add(line);
        webLines.push({ line, i1, i2 });
      }
    });

    // Background neural dust
    const dustCount = 100;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const r = 1.5 + Math.random() * 2.8;
      const th = Math.random() * Math.PI * 2;
      const ph = (Math.random() - 0.5) * Math.PI;
      dustPos[i * 3] = r * Math.cos(th) * Math.cos(ph);
      dustPos[i * 3 + 1] = r * Math.sin(ph);
      dustPos[i * 3 + 2] = r * Math.sin(th) * Math.cos(ph);
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x68e7ff,
      size: 0.05,
      transparent: true,
      opacity: 0.5
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    constellationGroup.add(dust);

    // Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || 460;
      height = container.clientHeight || 460;
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

      // Slow orbital drift
      constellationGroup.rotation.y = elapsed * 0.12;
      constellationGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.08;

      // Pulse core
      innerCore.scale.setScalar(1.0 + Math.sin(elapsed * 2.5) * 0.15);
      pulseRing.scale.setScalar(1.0 + Math.cos(elapsed * 2.0) * 0.1);
      pulseRing.rotation.z = elapsed * 0.4;

      const currentHighlight = highlightedRef.current;

      // Animate satellites & update connecting lines
      satellites.forEach((sat) => {
        const theta = sat.angle + elapsed * sat.speed * 0.25;
        sat.mesh.position.x = Math.cos(theta) * sat.baseRadius;
        sat.mesh.position.z = Math.sin(theta) * sat.baseRadius;
        sat.mesh.position.y = sat.elevation + Math.sin(elapsed * 1.5 + sat.angle) * 0.12;

        sat.wireMesh.rotation.y = elapsed * 0.8;
        sat.wireMesh.rotation.x = elapsed * 0.5;

        // Check if currently highlighted
        const isMatch = currentHighlight && sat.name.toLowerCase().includes(currentHighlight.toLowerCase());
        const mat = sat.mesh.material as THREE.MeshStandardMaterial;
        const lineMat = sat.line.material as THREE.LineBasicMaterial;

        if (isMatch) {
          mat.emissive.setHex(0xc7ff3e);
          mat.emissiveIntensity = 1.4;
          sat.mesh.scale.setScalar(1.4);
          lineMat.color.setHex(0xc7ff3e);
          lineMat.opacity = 0.9;
        } else {
          mat.emissive.setHex(0x68e7ff);
          mat.emissiveIntensity = 0.6;
          sat.mesh.scale.setScalar(1.0);
          lineMat.color.setHex(0x68e7ff);
          lineMat.opacity = 0.25;
        }

        // Update line geometry
        const linePos = sat.line.geometry.attributes.position as THREE.BufferAttribute;
        linePos.setXYZ(1, sat.mesh.position.x, sat.mesh.position.y, sat.mesh.position.z);
        linePos.needsUpdate = true;
      });

      // Update inter-satellite web lines
      webLines.forEach(({ line, i1, i2 }) => {
        const p1 = satellites[i1].mesh.position;
        const p2 = satellites[i2].mesh.position;
        const linePos = line.geometry.attributes.position as THREE.BufferAttribute;
        linePos.setXYZ(0, p1.x, p1.y, p1.z);
        linePos.setXYZ(1, p2.x, p2.y, p2.z);
        linePos.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      coreGeo.dispose();
      coreWireGeo.dispose();
      innerCoreGeo.dispose();
      pulseRingGeo.dispose();
      nodeGeo.dispose();
      nodeWireGeo.dispose();
      dustGeo.dispose();
      coreMat.dispose();
      coreWireMat.dispose();
      innerCoreMat.dispose();
      dustMat.dispose();
      satellites.forEach((s) => {
        s.line.geometry.dispose();
        (s.line.material as THREE.Material).dispose();
      });
      webLines.forEach(({ line }) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
    };
  }, [reducedMotion]);

  if (!webGlSupported || reducedMotion) {
    return (
      <div className="w-full h-[360px] sm:h-[440px] bg-[#07090D] border border-white/10 flex flex-col items-center justify-center p-6 text-center">
        <svg viewBox="0 0 200 200" className="w-40 h-40 text-[#C7FF3E] stroke-current fill-none">
          <circle cx="100" cy="100" r="70" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          <circle cx="100" cy="100" r="22" strokeWidth="1.5" />
          <text x="92" y="105" fill="#C7FF3E" fontSize="14" fontFamily="monospace">
            {'</>'}
          </text>
          <circle cx="50" cy="70" r="8" fill="#68E7FF" />
          <circle cx="150" cy="70" r="8" fill="#68E7FF" />
          <circle cx="60" cy="140" r="8" fill="#C7FF3E" />
          <circle cx="140" cy="140" r="8" fill="#C7FF3E" />
          <line x1="100" y1="100" x2="50" y2="70" stroke="#68E7FF" opacity="0.6" />
          <line x1="100" y1="100" x2="150" y2="70" stroke="#68E7FF" opacity="0.6" />
          <line x1="100" y1="100" x2="60" y2="140" stroke="#C7FF3E" opacity="0.6" />
          <line x1="100" y1="100" x2="140" y2="140" stroke="#C7FF3E" opacity="0.6" />
        </svg>
        <span className="font-mono text-xs text-[#929CAA] mt-2 uppercase">
          Neural Constellation [Vector Mode]
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[380px] sm:h-[440px] lg:h-[480px] relative flex items-center justify-center"
      aria-label="3D Technology Constellation Scene"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Central Code Insignia Badge positioned over the core */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-16 h-16 rounded-full bg-[#07090D]/80 border border-[#C7FF3E]/60 flex items-center justify-center text-[#C7FF3E] font-mono text-base font-black shadow-[0_0_20px_rgba(199,255,62,0.3)] backdrop-blur-sm">
          {'</>'}
        </div>
      </div>
    </div>
  );
}
